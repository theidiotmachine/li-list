import { Signal, signal, computed } from "@preact/signals";
import { DetachmentName, FormationName, ModelName, FormationShape, ArmyListName, DetachmentValidationState, Detachment, ModelLoadoutGroup, ModelGroup, Army, Formation, Allegiance, statsHasTrait, ArmyValidationState, Stats, DetachmentConfiguration } from "../game/types.ts";
import { getDetachmentConfigurationForDetachmentName, getDetachmentNamesForSlot, getShapeForFormationName, getStatsForModelName } from "../game/lists.ts";
import { getArmyNamesLocally, loadArmyLocally, saveArmyLocally } from "../storage/localStorage.ts";
import { LegionName } from "../game/legionTypes.ts";
import { deleteArmyLocally } from "../storage/localStorage.ts";
import { SaveState } from "../storage/storageTypes.ts";
import { deleteArmyKv, saveArmyKv } from "../storage/kvStorage.ts";
import { KVStoredArmy } from "../server/KVStoredArmy.ts";


export type AddFormation = () => void;
export type RemoveFormation = (uuid: string) => void;
export type ChangeFormationArmyList = (uuid: string, armyListName: ArmyListName | "") => void;
export type ChangeModelNumber = (uuid: string, detachmentIndex: number, modelName: ModelName, num: number) => void;
export type ChangeModelLoadout = (uuid: string, detachmentIndex: number, modelName: ModelName, modelLoadoutGroupIndex: number, modelLoadoutSlotName: string, loadout: string) => void;
export type AddModelLoadoutGroup = (uuid: string, detachmentIndex: number, modelName: ModelName) => void;
export type RemoveModelLoadoutGroup = (uuid: string, detachmentIndex: number, modelName: ModelName, modelLoadoutGroupIndex: number) => void;
export type ChangeModelLoadoutGroupNumber = (uuid: string, detachmentIndex: number, modelName: ModelName, modelLoadoutGroupIndex: number, number: number) => void;
export type Undo = () => void;
export type Redo = () => void;

export enum LoadingState{
    NotStarted,
    Loading,
    Loaded,
    Failed,
}

export enum ArmyLoadSource{
    None, 
    Local,
    KV
}

export type AppStateType = {
    army: Signal<Army>; 
    makeNewArmy: () => void;
    changeArmyName: (name: string) => void;
    changeArmyMaxPoints: (points: number) => void;
    changePrimaryArmyListName: (armyListName: ArmyListName | "") => void;
    changeArmyAllegiance: (allegiance: Allegiance | "") => void;
    addFormation: AddFormation;
    removeFormation: RemoveFormation;
    changeFormationArmyList: ChangeFormationArmyList;
    changeFormationLegionName: (uuid: string, legionName: LegionName) => void;
    changeFormationName: (uuid: string, formationName: FormationName | "") => void;
    changeDetachmentName: (uuid: string, detachmentIndex: number, detachmentName: DetachmentName | "") => void;
    changeDetachmentAttachment: (uuid: string, detachmentIndex: number, attachedDetachmentIndex: number) => void;
    changeModelNumber: ChangeModelNumber;
    changeModelLoadout: ChangeModelLoadout;
    addModelLoadoutGroup: AddModelLoadoutGroup;
    removeModelLoadoutGroup: RemoveModelLoadoutGroup;
    changeModelLoadoutGroupNumber: ChangeModelLoadoutGroupNumber;
    undo: Undo;
    canUndo: Signal<boolean>;
    redo: Redo;
    canRedo: Signal<boolean>;

    //storage
    armyLoadSource: Signal<ArmyLoadSource>;
    isLoggedIn: Signal<boolean>;
    username: Signal<string>;
    kvArmyOwner: Signal<string>;
    //local
    armiesLocalLoadState: Signal<LoadingState>;
    armyLocalLoadState: Signal<LoadingState>;
    localSaves: Signal<SaveState[]>;
    refreshLocalSaves: () => void;
    localLoad: (uuid: string) => void;
    deleteLocalSave: (uuid: string) => void;
    canCloneArmy: Signal<boolean>;
    cloneArmy: () => void;
    //kv
    canMoveToKv: Signal<boolean>;
    moveToKv: () => void;
    armiesKvLoadState: Signal<LoadingState>;
    armyKvLoadState: Signal<LoadingState>;
    kvSaves: Signal<SaveState[]>;
    refreshKvSaves: () => void;
    kvLoad: (uuid: string) => void;
    deleteKvSave: (uuid: string) => void;

    //ui -- open and close the model group editor
    modelGroupOpenState: Signal<Map<string, boolean>>;
    getModelGroupKey: (uuid: string, detachmentIndex: number, modelName: ModelName) => string;
    openModelGroup: (uuid: string, detachmentIndex: number, modelName: ModelName) => void;
    closeModelGroup: (uuid: string, detachmentIndex: number, modelName: ModelName) => void;

    //ui -- open and close formations
    formationClosedState: Signal<Map<string, boolean>>;
    openFormation: (uuid: string) => void;
    closeFormation: (uuid: string) => void;
};

function calcModelLoadoutGroupPoints(modelLoadoutGroup: ModelLoadoutGroup) {
    //find the value of loadout each slot option, sum them, and multiply by the number in the group
    return modelLoadoutGroup.number * modelLoadoutGroup.modelLoadoutSlots.reduce((p2, m2) => p2 + m2.modelLoadout.points, 0)
}

function calcModelGroupPoints(armyListName: ArmyListName, modelGroup: ModelGroup, detachmentName: DetachmentName) {
    //add up the points for the models and the loadouts. Model points require looking up.
    const config = getDetachmentConfigurationForDetachmentName(armyListName, detachmentName);
    const c = config?.modelGroupShapes.find((x)=>x.modelName == modelGroup.modelName);
    const points = c?.possibleModelGroupQuantities.find((m)=>m.num == modelGroup.number)?.points ?? 0;
    return modelGroup.modelLoadoutGroups.reduce((p, m) => p + m.points, 0) + points;
}

function calcDetachmentPoints(detachment: Detachment) {
    return detachment.modelGroups.reduce((p, m) => p + m.points, 0);
}

/*
**
    A Formation’s Break Point is equal to half the total
    number of the models within the Formation at the start of
    the battle – unless otherwise noted, this includes models
    that were on the battlefield and off the battlefield, due
    to being in Reserve or for another reason. Break Points
    are rounded up. Titan and Knight models add their total
    starting Wounds characteristic, rather than the number of
    models, to the total model count of a Formation instead,
    and the current number of Wounds lost counts towards
    the Formation’s Break Point.

    For example, a Formation with 28 models has a Break Point
    of 14, while a Formation with 27 models will also have a
    Break Point of 14 (rounded up from 13.5).

    CRB p63

    Automated Sentry: Detachments with this special rule
    are ignored for the purposes of calculating a Formation’s
    Break Point.

    CRB p87

    In addition,
    Drop Pod models are ignored for the purposes of
    calculating a Formation’s Break Point.

    CRB p88

    Dedicated Transports are ignored for the purposes of
    calculating Break Point.

    CRB p129

*/
function calcFormationBreakPoint(formation: Formation): number {
    const wounds = formation.detachments.reduce((p, d) => {
        if(formation.armyListName == "" || d.detachmentName == "")
            return p;
        const config = getDetachmentConfigurationForDetachmentName(formation.armyListName, d.detachmentName);
        if(config === undefined)
            return p;

        return p + d.modelGroups.reduce((p2, mg) => {
            const stats = getStatsForModelName(mg.modelName);
            const c = config.modelGroupShapes.find(x=>x.modelName == mg.modelName);
            if(c === undefined)
                return p2;

            let woundsPerModel = 1;
            if(stats !== undefined) {
                if(stats.detachmentType == "Knight" || stats.detachmentType == "Titan")
                    woundsPerModel = stats.wounds;
                if(c.dedicatedTransport)
                    woundsPerModel = 0;
                if(stats.unitTraits.find(x=>x == "Automated Sentry" || x == "Drop Pod") != undefined)
                    woundsPerModel = 0;
            }
                
            return p2 + mg.number * woundsPerModel;
        }, 0)
    }, 0);
    return Math.ceil(wounds / 2);
}

function calcFormationPoints(formation: Formation) {
    return formation.detachments.reduce((p, d) => p + d.points, 0);
}

function calcFormationActivations(formation: Formation) {
    return formation.detachments.reduce((a, d) => {
        //attached detachments don't activate independently
        const isAttachedDetachment = d.attachedDetachmentIndex != undefined && d.attachedDetachmentIndex != -1;
        if(isAttachedDetachment)
            return a + 0;
        let hasDedicatedTransports = false;
        let hasIndependentModels = false;
        let independentModels = 0;
        let independentModelGroups = 0;
        let hasNormalModelGroup = false;
        
        if(formation.armyListName != "" && d.detachmentName != ""){
            const c = getDetachmentConfigurationForDetachmentName(formation.armyListName, d.detachmentName);
            for(const mg of d.modelGroups) {
                if(mg.number > 0) {
                    const mgs = c.modelGroupShapes.find((t)=>t.modelName == mg.modelName);
                    if(mgs != undefined) {
                        //dedicated transports get their own activation
                        if(mgs.dedicatedTransport)
                            hasDedicatedTransports = true;
                        //knights get a special rule where every knight model is independent
                        else if(mgs.independentModels) {
                            hasIndependentModels = true;
                            independentModels += mg.number;
                        } else { 
                            //the unit could be Independent through its own stats, or through stats it acquired
                            //from the Detachment. If it is, record it as independent
                            const stats = getStatsForModelName(mg.modelName);
                            if((mgs.unitTraits != undefined && mgs.unitTraits.findIndex((t)=>t == "Independent") != -1)
                                || (stats != undefined && statsHasTrait(stats, "Independent"))
                            ) {
                                independentModelGroups += 1;
                            } else {
                                hasNormalModelGroup = true;
                            }
                        }
                    }
                }
            }
        }
        
        if(hasIndependentModels) {
            //if the models are independent then any 'normal' groups get rolled up into the
            //activations of the independent ones. I honestly don't think they will ever have
            //dedicated transports, but I guess you never know
            return a + independentModels + independentModelGroups + (hasDedicatedTransports?1:0);
        } else {
            //if there are no independent models, then there is the base group plus all the 
            //independent groups, plus the dedicated transports
            return a + (hasNormalModelGroup?1:0) + independentModelGroups + (hasDedicatedTransports?1:0);
        }
    }, 0);
}

type ArmyPoints = {
    points: number;
    alliedPoints: number;
    primaryPoints: number;
}

function calcArmyPoints(formations: Formation[], primaryArmyListName: ArmyListName | ""): ArmyPoints {
    const out = formations.reduce((p, d) => {
        if(d.armyListName == primaryArmyListName)
            p.primaryPoints += d.points;
        else
            p.alliedPoints += d.points;
        p.points += d.points;
        return p
    }, {
        points: 0, alliedPoints: 0, primaryPoints: 0
    });
    return out;
}

type TransportData = {
    capacity: number;
    remainingCapacity: number;
    takesWalkers: boolean;
    takesBulky: boolean;
    bulkyIs: number
};

function calculateTransportData(stats: Stats, modelGroup: ModelGroup, transports: TransportData[]) {
    const unitTraits = stats.unitTraits;
    
    for(const mlg of modelGroup.modelLoadoutGroups) {
        let traits = unitTraits;
        const numberModels = mlg.number;
        for(const slot of mlg.modelLoadoutSlots) {
            const statsSlot = stats.modelLoadoutSlots.find((s)=>s.name == slot.name);
            const statsLoadout = statsSlot?.possibleModelLoadouts.find((s)=>s.loadout == slot.modelLoadout.loadout);
            traits = traits.concat(statsLoadout?.unitTraits??[]);
        }
        const transportTrait = traits.find((x) => x.startsWith("Transport"));
        if (transportTrait) {
            const matches = transportTrait.match(/Transport \(([0-9])\)/);
            const transportCapacity = parseInt(matches![1]);
            for (let i = 0; i < numberModels; ++i)
            transports.push(
                {capacity: transportCapacity, remainingCapacity: transportCapacity, takesWalkers: false, takesBulky: false, bulkyIs: 0}
            );
        } else {
            const assaultTransportTrait = traits.find((x) => x.startsWith("Assault Transport"));
            if (assaultTransportTrait) {
            const matches = /Assault Transport \(([0-9])\)/.exec(assaultTransportTrait);
            const transportCapacity = parseInt(matches![1]);
            for (let i = 0; i < numberModels; ++i)
                transports.push(
                    {capacity: transportCapacity, remainingCapacity: transportCapacity, takesWalkers: false, takesBulky: true, bulkyIs: 2}
                );
            } else {
                const largeTransportTrait = traits.find((x) => x.startsWith("Large Transport") || x.startsWith("Large Assault Transport"));
                if (largeTransportTrait) {
                    const matches = /.* Transport \(([0-9])\)/.exec(largeTransportTrait);
                    const transportCapacity = parseInt(matches![1]);
                    for (let i = 0; i < numberModels; ++i)
                    transports.push(
                        { capacity: transportCapacity, remainingCapacity: transportCapacity, takesWalkers: true, takesBulky: true, bulkyIs: 1 }
                    );
                }
            }
        }
    }
}

//If this detachment is a commander, is it valid?
function calcDetachmentCommanderValidation(formation: Formation, detachmentIndex: number, detachment: Detachment, stats: Stats | undefined): DetachmentValidationState {
    if(stats != undefined && statsHasTrait(stats, "Commander")) {
        if(detachment.attachedDetachmentIndex != undefined) {
            //Command validations. There must be max one, and 
            //if it could be attached to a detachment it is
            for(let i = 0; i < formation.detachments.length; ++i) {
                if(i === detachmentIndex) 
                    continue;
                const otherDetachment = formation.detachments[i];
                if(otherDetachment.modelGroups.length > 0) {
                    const otherStats = getStatsForModelName(otherDetachment.modelGroups[0].modelName);
                    if(otherStats != undefined) {
                        if(statsHasTrait(otherStats, "Commander"))
                            return {valid: false, error: "Multiple Commanders in Formation"}
                        //if(detachment.attachedDetachmentIndex == -1 && otherStats?.detachmentType == stats.detachmentType)
                            //return {valid: false, error: "Commander not attached to detachment"}
                    }
                }
            }
        }
    }
    return {valid: true}
}

//If this detachment is attached, is it valid?
function calcDetachmentAttachedDeploymentValidation(formation: Formation, detachmentIndex: number, detachment: Detachment, stats: Stats | undefined): DetachmentValidationState {
    if(stats != undefined && statsHasTrait(stats, "Attached Deployment")) {
        if(detachment.attachedDetachmentIndex != undefined) {
            //Attached Deployment. It must be attached to another detachment.
            for(let i = 0; i < formation.detachments.length; ++i) {
                if(i === detachmentIndex) 
                    continue;
                const otherDetachment = formation.detachments[i];
                if(otherDetachment.modelGroups.length > 0) {
                    const otherStats = getStatsForModelName(otherDetachment.modelGroups[0].modelName);
                    if(otherStats != undefined) {
                        if(detachment.attachedDetachmentIndex == -1 && otherStats?.detachmentType == stats.detachmentType)
                            return {valid: false, error: "Attached Deployment not attached to detachment"}
                    }
                }
            }
        }
    }
    return {valid: true}
}

type ModelNumbersForDetachment = {
    numModels: number;
    walkerModels: number;
    bulkyModels: number;
    slimModels: number;
};

function recordModelNumbersForModelGroup(out: ModelNumbersForDetachment, modelGroup: ModelGroup, stats: Stats | undefined): void {
    const unitTraits = stats?.unitTraits??[];
    out.numModels += modelGroup.number;
    if(stats) {
        if(stats.detachmentType == "Walker")
            out.walkerModels += modelGroup.number;
        else if(stats.detachmentType == "Infantry") {
            const isBulky = unitTraits.findIndex((x)=>x==="Bulky" || x==="Jump Packs") !== -1;
            if(isBulky) 
                out.bulkyModels += modelGroup.number;
            else
                out.slimModels += modelGroup.number;
        } else if (stats.detachmentType == "Vehicle" && statsHasTrait(stats, "Compact"))
            out.bulkyModels += modelGroup.number;
    }
}

function calcDetachmentValidation(formation: Formation, detachmentIndex: number, formationShape: FormationShape): DetachmentValidationState {
    const detachment = formation.detachments[detachmentIndex];
    const slotRequirements = formationShape.slotRequirements[detachmentIndex];
    if(slotRequirements.slotRequirementType == "Required" && detachment.modelGroups.length === 0) {
        return {valid: false, error: "Required detachment missing"};
    }
        
    if(formation.armyListName != "") { 
        if(detachment.detachmentName != "") {
            const c = getDetachmentConfigurationForDetachmentName(formation.armyListName, detachment.detachmentName);
            const modelNumbersForDetachment: ModelNumbersForDetachment = {
                numModels: 0,
                slimModels: 0,
                bulkyModels: 0,
                walkerModels: 0
            };
            
            const transports: TransportData[] = [];

            for(let i = 0; i < detachment.modelGroups.length; ++i) {
                const modelGroup = detachment.modelGroups[i];
                const shapeIdx = c.modelGroupShapes.findIndex(x=>x.modelName == modelGroup.modelName);
                if(shapeIdx == -1)
                    continue;
                const shape = c.modelGroupShapes[shapeIdx];
                if(shape.minModels != undefined && modelGroup.number < shape.minModels)
                    return {valid: false, error: "Too few models in group", data: modelGroup.modelName + ". Min: " + shape.minModels};
                if(shape.maxModels != undefined && modelGroup.number > shape.maxModels)
                    return {valid: false, error: "Too many models in group", data: modelGroup.modelName  + ". Max: " + shape.maxModels};
                if(shape.possibleModelGroupQuantities.findIndex(x=>x.num == modelGroup.number) == -1) {
                    const possibleModelNumbers = shape.possibleModelGroupQuantities.map(m=>m.num.toString());
                    return {valid: false, error: "Invalid number of models in group", data: modelGroup.modelName + ". Could be: " + 
                        possibleModelNumbers.join(", ")
                    };
                }

                const stats = getStatsForModelName(modelGroup.modelName);

                const commanderValidation = calcDetachmentCommanderValidation(formation, detachmentIndex, detachment, stats);
                if(!commanderValidation.valid)
                    return commanderValidation;

                const attachedDeploymentValidation = calcDetachmentAttachedDeploymentValidation(formation, detachmentIndex, detachment, stats);
                if(!attachedDeploymentValidation.valid)
                    return attachedDeploymentValidation;
                
                //scoop up numbers of models
                if(shape.dedicatedTransport === undefined || shape.dedicatedTransport === false) {
                    //not a transport, so could go in a transport
                    recordModelNumbersForModelGroup(modelNumbersForDetachment, modelGroup, stats);
                } else if(modelGroup.number > 0) {
                    //okay, figure out the transport capacity of dedicated transports
                    if(stats) {
                        calculateTransportData(stats, modelGroup, transports);
                    }
                }
            }

            if(c.maxModels !== undefined && c.maxModels < modelNumbersForDetachment.numModels)
                return {valid: false, error: "Too many models in detachment", data: "max " + c.maxModels}
            if(c.minModels !== undefined && c.minModels > modelNumbersForDetachment.numModels)
                return {valid: false, error: "Too few models in detachment", data: "min " + c.minModels}

            //okay now we need to get any attached detachment numbers
            const attachedDetachment = formation.detachments.find((f)=>f.attachedDetachmentIndex == detachmentIndex);
            if(attachedDetachment != null) {
                for(let i = 0; i < attachedDetachment.modelGroups.length; ++i) {
                    const attachedModelGroup = attachedDetachment.modelGroups[i];
                    if(attachedDetachment.detachmentName == "")
                        continue;
                    const attachedConfiguration = getDetachmentConfigurationForDetachmentName(formation.armyListName, attachedDetachment.detachmentName);
                    const attachedShape = attachedConfiguration.modelGroupShapes.find(x=>x.modelName == attachedModelGroup.modelName);
                    if(attachedShape == undefined)
                        continue;
                    const attachedStats = getStatsForModelName(attachedModelGroup.modelName);
                    //scoop up numbers of models that are attached
                    if(attachedShape.dedicatedTransport === undefined || attachedShape.dedicatedTransport === false) {
                        recordModelNumbersForModelGroup(modelNumbersForDetachment, attachedModelGroup, attachedStats);
                    } else if(attachedModelGroup.number > 0) {
                        //okay, figure out the transport capacity of dedicated transports
                        if(attachedStats) {
                            calculateTransportData(attachedStats, attachedModelGroup, transports);
                        }
                    }
                }
            }

            if(transports.length > 0 && (detachment.attachedDetachmentIndex == undefined || detachment.attachedDetachmentIndex == -1)) {
                //work down from walkers to slims
                while(modelNumbersForDetachment.walkerModels > 0) {
                    const transport = transports.find((x)=>x.takesWalkers && x.remainingCapacity >= 2);
                    if(transport === undefined)
                        return {valid: false, error: "Need more dedicated transports", data: "remaining walkers: " + modelNumbersForDetachment.walkerModels};

                    const walkerLoad = modelNumbersForDetachment.walkerModels * 2;
                    if(transport.remainingCapacity >= walkerLoad) {
                        transport.remainingCapacity -= walkerLoad;
                        break;
                    }

                    if(transport.remainingCapacity % 2 == 0) {
                        modelNumbersForDetachment.walkerModels -= transport.remainingCapacity / 2;
                        transport.remainingCapacity = 0;
                    } else {
                        const numToLoad = Math.floor(transport.remainingCapacity / 2);
                        transport.remainingCapacity -= numToLoad * 2;
                        modelNumbersForDetachment.walkerModels -= numToLoad; 
                    }
                }

                //now bulky
                while(modelNumbersForDetachment.bulkyModels > 0) {
                    const transport = transports.find((x)=>x.takesBulky && x.remainingCapacity >= x.bulkyIs);
                    if(transport === undefined) 
                        return {valid: false, error: "Need more dedicated transports", data: "remaining bulky models: " + modelNumbersForDetachment.bulkyModels};
                    
                    const bulkyLoad = modelNumbersForDetachment.bulkyModels * transport.bulkyIs;
                    if(transport.remainingCapacity >= bulkyLoad) {
                        transport.remainingCapacity -= bulkyLoad;
                        break;
                    }

                    if(transport.remainingCapacity % transport.bulkyIs == 0) {
                        modelNumbersForDetachment.bulkyModels -= transport.remainingCapacity / transport.bulkyIs;
                        transport.remainingCapacity = 0;
                    } else {
                        const numToLoad = Math.floor(transport.remainingCapacity / transport.bulkyIs);
                        transport.remainingCapacity -= numToLoad * transport.bulkyIs;
                        modelNumbersForDetachment.bulkyModels -= numToLoad; 
                    }
                }

                //finally, slim
                while(modelNumbersForDetachment.slimModels > 0) {
                    const transport = transports.find((x)=>x.remainingCapacity > 0);
                    if(transport === undefined)
                        return {valid: false, error: "Need more dedicated transports", data: "remaining models: " + modelNumbersForDetachment.slimModels};
                    if(transport.remainingCapacity >= modelNumbersForDetachment.slimModels) {
                        transport.remainingCapacity -= modelNumbersForDetachment.slimModels;
                        break;
                    }
                    modelNumbersForDetachment.slimModels -= transport.remainingCapacity;
                    transport.remainingCapacity = 0;
                }

                //okay now make sure we're not overprovisioned
                const transport = transports.find((x)=>x.remainingCapacity == x.capacity);
                if(transport !== undefined)
                    return {valid: false, error: "Too many dedicated transports"};
            }

            if(c.customValidation !== undefined){
                const validationState = c.customValidation(detachment);
                if(validationState.error)
                    return validationState;
            }

            if(slotRequirements.slotRequirementType == "One Of" && slotRequirements.oneOfGroup !== undefined) {
                const g = slotRequirements.oneOfGroup;
                for (let i = 0; i < formation.detachments.length; i++) {
                    if(i == detachmentIndex)
                        continue;
                    if(formation.detachments[i].detachmentName != "" 
                        && formationShape.slotRequirements[i].slotRequirementType == "One Of" 
                        && formationShape.slotRequirements[i].oneOfGroup == g
                    )
                        return {valid: false, error: "Only one of these detachments should be present"};
                }
            } else if((slotRequirements.slotRequirementType == "One Of Group" || slotRequirements.slotRequirementType == "Required One Of Group") 
                && slotRequirements.oneOfGroup !== undefined 
                && slotRequirements.oneOfGroupGroup !== undefined
            ) {
                const g = slotRequirements.oneOfGroup;
                const gg = slotRequirements.oneOfGroupGroup;
                for (let i = 0; i < formation.detachments.length; i++) {
                    if(i == detachmentIndex)
                        continue;
                    if(formation.detachments[i].detachmentName != "" 
                        && (formationShape.slotRequirements[i].slotRequirementType == "One Of Group" 
                            || formationShape.slotRequirements[i].slotRequirementType == "Required One Of Group")
                        && formationShape.slotRequirements[i].oneOfGroup == g
                        && formationShape.slotRequirements[i].oneOfGroupGroup != gg
                    )
                        return {valid: false, error: "Only one of these detachments should be present"};
                }   
            } 
        } else {
            //empty detachment
            if(slotRequirements.slotRequirementType == "Required One Of Group") {
                const g = slotRequirements.oneOfGroup;
                const gg = slotRequirements.oneOfGroupGroup;

                let hasAnyInThisGroup = false;
                let hasAnyInThisGroupGroup = false;
                for (let i = 0; i < formation.detachments.length; i++) {
                    if(i == detachmentIndex)
                        continue;
                    if(formationShape.slotRequirements[i].oneOfGroup == g && formation.detachments[i].detachmentName != "") {
                        hasAnyInThisGroup = true;
                        if(formationShape.slotRequirements[i].oneOfGroupGroup == gg)
                            hasAnyInThisGroupGroup = true;
                    }
                }
                if(hasAnyInThisGroupGroup || !hasAnyInThisGroup)
                    return {valid: false, error: "Required detachment missing"};
            }
        }
    }

    if(formationShape.customValidation != undefined) {
        const validationState = formationShape.customValidation(formation, detachmentIndex);
        if(validationState.error)
            return validationState;
    }

    return { valid: true };
}

//recalc all points and validations
function refreshFormation(newFormation: Formation) {
    const formationShape = getShapeForFormationName(newFormation.armyListName, newFormation.formationName);
    newFormation.detachments.forEach(
        (x, i) => {
            x.modelGroups.forEach((y)=>{
                //some numbers are calculated from their model loadout groups.
                if(y.modelLoadoutGroups.length != 0)
                    y.number = y.modelLoadoutGroups.reduce((p, z) => p + z.number, 0);

                y.modelLoadoutGroups.forEach((z)=>{
                    z.points = calcModelLoadoutGroupPoints(z);
                });
                if(x.detachmentName == "" || newFormation.armyListName == "")
                    y.points = 0;
                else
                    y.points = calcModelGroupPoints(newFormation.armyListName, y, x.detachmentName);
            })
            x.validationState = calcDetachmentValidation(newFormation, i, formationShape);
            x.points = calcDetachmentPoints(x);            
        }
    );
    newFormation.points = calcFormationPoints(newFormation);
    newFormation.activations = calcFormationActivations(newFormation);
}

function calcArmyValidation(army: Army): ArmyValidationState {
    let numNormalFormations = 0;
    let numSupportFormations = 0;
    for(const formation of army.formations) {
        const formationShape = getShapeForFormationName(formation.armyListName, formation.formationName);
        if(formationShape.formationType == undefined || formationShape.formationType == "Normal")
            numNormalFormations++;
        else
            numSupportFormations++;

        for(const detachment of formation.detachments) {
            if(!detachment.validationState.valid) 
                return {valid: false, error: "Detachments invalid"};
        }
    }

    if(numNormalFormations < numSupportFormations)
        return {valid: false, error: "Too many Support formations"};

    if(army.points > army.maxPoints)
        return {valid: false, error: "Too many points"};

    if(army.alliedPoints > army.maxPoints * 0.3)
        return {valid: false, error: "Too many points on allied detachments"};

    return {valid: true};
}

function calcArmyActivations(army: Army): number {
    return army.formations.reduce((p, f)=>p+f.activations, 0);
}

//Given a configuration, create the default loadout for a detachment. That means choosing the first 
//option in each loadout shape
function getDefaultModelGroupsForDetachment(config: DetachmentConfiguration, formationName: FormationName): ModelGroup[] {
    return config.modelGroupShapes
        .filter((x) => (x.formationNames === undefined) || (x.formationNames.findIndex((s)=>s == formationName)!=-1))
        .map((x) => {
            let modelLoadoutGroups: ModelLoadoutGroup[] = [];
            if(x.modelLoadoutSlots.length > 0) {
                modelLoadoutGroups = [{
                    number: x.possibleModelGroupQuantities[0].num, modelLoadoutSlots: x.modelLoadoutSlots.map(
                        (y)=>{return{name: y.name, modelLoadout: y.possibleModelLoadouts[0]}}
                    ), points: -1
                }];
            }
            const out = {
                modelName: x.modelName, number: x.possibleModelGroupQuantities[0].num, points: -1,
                modelLoadoutGroups: modelLoadoutGroups, unitTraits: x.unitTraits ?? []
            };    
            return out;
        });
}

const pluaralNouns = [
    'Sons', 'Children', 'Ladz', 'Fists', 'Swords', 'Brothers', 'Hunters', 'Wolves', 
    'Ravens', 'Eagles', 'Hawks', 'Bears', 'Lions', 'Tigers', 'Dragons', 'Serpents',
    'Wraiths', 'Ghosts', 'Shadows', 'Storms', 'Winds', 'Flames', 'Embers', 'Ashes',
    'Sharks', 'Griffons', 'Teeth', 'Jaws',
    'Fists','Blades', 'Brotherhood', 'Bolters', 'Claws', 'Wings',
    'Knives', 'Remnants', 'Walls', 'Guard', 'Watch', 'Knights', 'Shields', 'Hands', 
    'Angels', 'Scars', 'Talons', 'Wolves', 'Scars', 'Apostles', 'Skulls', 'Warriors',
    'Templars',
    'Eaters', 'Slayers', 'Hunters', 'Bringers', 'Keepers', 'Bearers', 'Drinkers',
    'Killers', 'Takers', 'Destroyers', 'Seekers', 'Betrayers', 
    'Sticks', 'Scythes'
];
const singularProperNouns = [
    'the Emperor', 'the Imperium', 'the Galaxy', 'the Void', 'the Warmaster', 
    'Silence', 'the Storm', 'the Hurricane', 'Thunder', 'Fury', 'the Dawn',
    'the Night', 'the Stars', 'the Skies', 'the Earth', 'the Forge', 'the Omnissiah',
    'Terra', 'Saturn', 'Mars', 'Titan', 'the Damned', 'the Dead', 'the Wicked',
    'the Darkness', 'the Sun'
];
const adjectives = [
    'Dark', 'Bright', 'Iron', 'Steel', 'Blazing', 'Burning', 'Forgotten', 'Grey', 'Tarnished',
    'Broken', 'Cunning', 'Silent', 'Shattered', 'Furious', 'Bitter', 'Bleeding', 'Crimson',
    'Screaming', 'Howling', 'Fallen', 'Deathless', 'Imperial', 'Emperor\'s',
    'War', 'Blood', 'Brutal', 'White', 'Saturnine', 'Astral', 'Space', 'Secret', 
    'Silent', 'Warmaster\'s', 'Corpse', 'Fallen', 'Silver', 'Brass', 'Stone',
    'Pointy'
];
const singularNouns = [
    'World', 'City', 'Word', 'Death', 'War', 'Battle', 'Storm', 'Forge', 'Blood', 'Flesh',
    'Planet', 'Titan', 'Knife', 'Blade', 'Skull', 'Rainbow', 'Sword', 'Armour',
    'Fortress', 'Nova'
];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function takeRandom(words: string[]): string {
    const r = getRandomInt(words.length);
    return words[r];
}

function defaultArmyName(): string {
    
    const r1 = getRandomInt(5);
    switch(r1) {
        case 0: return 'The ' + takeRandom(pluaralNouns) + ' of ' + takeRandom(singularProperNouns);
        case 1: return 'The ' + takeRandom(adjectives) + ' ' + takeRandom(pluaralNouns) + ' of ' +takeRandom(singularProperNouns);
        case 2: return 'The ' + takeRandom(adjectives) + ' ' +takeRandom(pluaralNouns);
        case 3: return 'The ' + takeRandom(singularNouns) + ' ' + takeRandom(pluaralNouns);
        case 4: return 'The ' + takeRandom(adjectives) + ' ' + takeRandom(singularNouns) + ' ' + takeRandom(pluaralNouns);
        default: return 'Are We The Baddies?';
    }
}

function createAppState(): AppStateType {
    const newArmy = {
        formations: [], points: 0, alliedPoints: 0,
        primaryPoints: 0,
        uuid: crypto.randomUUID(), name: defaultArmyName(), maxPoints: 0, primaryArmyListName: "" as ArmyListName | "",
        allegiance: "" as Allegiance | "",
        validationState: { valid: true },
        activations: 0,
    };
    const undoStack= signal<Army[]>([newArmy]);
    const undoIndex = signal<number>(0);
    const army = signal<Army>(newArmy);
    const modelGroupOpenState = signal<Map<string, boolean>>(new Map());
    const getModelGroupKey = (uuid: string, detachmentIndex: number, modelName: ModelName): string => {
        return uuid + ":" + detachmentIndex + ":" + modelName;
    }
    const openModelGroup = (uuid: string, detachmentIndex: number, modelName: ModelName) => {
        const key = getModelGroupKey(uuid, detachmentIndex, modelName);
        const newState = structuredClone(modelGroupOpenState.value);
        newState.set(key, true);
        modelGroupOpenState.value = newState;
    }
    const closeModelGroup = (uuid: string, detachmentIndex: number, modelName: ModelName) => {
        const key = getModelGroupKey(uuid, detachmentIndex, modelName);
        const newState = structuredClone(modelGroupOpenState.value);
        newState.delete(key);
        modelGroupOpenState.value = newState;
    }
    const formationClosedState = signal<Map<string, boolean>>(new Map());
    const openFormation = (uuid: string) => {
        const newState = structuredClone(formationClosedState.value);
        newState.delete(uuid);
        formationClosedState.value = newState;
    }
    const closeFormation = (uuid: string) => {
        const newState = structuredClone(formationClosedState.value);
        newState.set(uuid, true);
        formationClosedState.value = newState;
    }

    const canUndo = computed(()=>{
        return undoIndex.value > 0;
    });
    const canRedo = computed(()=>{
        return undoIndex.value < undoStack.value.length - 1;
    });
    
    const armiesLocalLoadState = signal<LoadingState>(LoadingState.NotStarted);
    const armyLocalLoadState = signal<LoadingState>(LoadingState.NotStarted);
    const armyKvLoadState = signal<LoadingState>(LoadingState.NotStarted);
    const armiesKvLoadState = signal<LoadingState>(LoadingState.NotStarted);

    const armyLoadSource = signal<ArmyLoadSource>(ArmyLoadSource.None);
    const isLoggedIn = signal<boolean>(false);
    const username = signal<string>("");
    const kvArmyOwner = signal<string>("");

    const localSaves = signal<SaveState[]>([]);
    const kvSaves = signal<SaveState[]>([]);

    const refreshLocalSaves = async () => {
        if(armiesLocalLoadState.value === LoadingState.Loading || armiesLocalLoadState.value === LoadingState.Loaded)
            return;

        armiesLocalLoadState.value = LoadingState.Loading;
        localSaves.value = await getArmyNamesLocally();
        armiesLocalLoadState.value = LoadingState.Loaded;
    }

    const refreshKvSaves = async () => {
        if(!isLoggedIn.value)
            return;

        if(armiesKvLoadState.value === LoadingState.Loading || armiesKvLoadState.value === LoadingState.Loaded)
            return;

        armiesKvLoadState.value = LoadingState.Loading;
        const url = new URL(globalThis.location.href);
        const response = await fetch(url.origin + "/api/data/armies-for-user");
        if(!response.ok) {
            armiesKvLoadState.value = LoadingState.NotStarted;
        } else {
            const kvSavesData = await response.json();
            kvSaves.value = kvSavesData as SaveState[];
        }
        armiesKvLoadState.value = LoadingState.Loaded;
    }

    const deleteLocalSave = async (uuid: string) => {
        await deleteArmyLocally(uuid);
        armiesLocalLoadState.value = LoadingState.NotStarted;
        refreshLocalSaves();
    }

    const deleteKvSave = (uuid: string) => {
        if(!isLoggedIn.value) 
            return;

        deleteArmyKv(uuid);
        armiesKvLoadState.value = LoadingState.NotStarted;
        refreshKvSaves();
    }

    const armyHasName = ()=>army.value.name != "";
    const save = async () => {
        if(armyHasName()) {
            if(armyLoadSource.value == ArmyLoadSource.Local) {
                await saveArmyLocally(army.value);
            } else if(armyLoadSource.value == ArmyLoadSource.KV && isLoggedIn.value && username.value == kvArmyOwner.value) {
                await saveArmyKv(army.value);
            }
        }
    }

    const localLoad = async (uuid: string) => {
        if(armyLocalLoadState.value === LoadingState.Loading || armyLocalLoadState.value === LoadingState.Loaded)
            return;

        if(armyLoadSource.value != ArmyLoadSource.Local)
            armyLoadSource.value = ArmyLoadSource.Local;

        armyLocalLoadState.value = LoadingState.Loading;
        const storedArmy = await loadArmyLocally(uuid);
        if(storedArmy != undefined) {
            army.value = storedArmy;
            undoStack.value = [storedArmy];
            undoIndex.value = 0;
        }
        armyLocalLoadState.value = LoadingState.Loaded;
    }

    const kvLoad = async (uuid: string) => {
        if(armyKvLoadState.value === LoadingState.Loading || armyKvLoadState.value === LoadingState.Loaded || armyKvLoadState.value === LoadingState.Failed)
            return;

        armyKvLoadState.value = LoadingState.Loading;
        const url = new URL(globalThis.location.href);
        const response = await fetch(url.origin + "/api/data/armies/" + uuid);
        if(response.status != 200) {
            //hmmm not sure
            armyKvLoadState.value = LoadingState.Failed;
            return;
        }

        const kvStoredArmy: KVStoredArmy = await response.json();

        const storedArmy = await JSON.parse(kvStoredArmy.jsonData);
        if(storedArmy != undefined) {
            army.value = storedArmy;
            armyLoadSource.value = ArmyLoadSource.KV;
            undoStack.value = [storedArmy];
            undoIndex.value = 0;
            kvArmyOwner.value = kvStoredArmy.username;
        }
        armyKvLoadState.value = LoadingState.Loaded;
    }

    const canMoveToKvFn = () => {
        return isLoggedIn.value && armyLoadSource.value == ArmyLoadSource.Local && armyHasName();
    };

    const canMoveToKv = computed(canMoveToKvFn);

    const moveToKv = async () => {
        if(!canMoveToKvFn())
            return;

        const res = await saveArmyKv(army.value);
        if(!res) {
            return;
        }

        await deleteArmyLocally(army.value.uuid);
        armyLoadSource.value = ArmyLoadSource.KV;

        location.href = "./?clouduuid="+army.value.uuid;
    }

    const pushOntoUndoStack = (army: Army) => {
        if(undoIndex.value < undoStack.value.length - 1) {
            undoStack.value = undoStack.value.slice(0, undoIndex.value + 1);
        }
        
        const newUndoStack = undoStack.value.slice();
        newUndoStack.push(army);
        undoStack.value = newUndoStack;
        undoIndex.value = undoStack.value.length - 1;
    }

    const undo = () => {
        if(undoIndex.value > 0) {
            undoIndex.value = undoIndex.value-1;
            army.value = undoStack.value[undoIndex.value];
        }
    }

    const redo = () => {
        if(undoIndex.value < undoStack.value.length - 1) {
            undoIndex.value = undoIndex.value + 1;
            army.value = undoStack.value[undoIndex.value];
        }
    }

    const makeNewArmy = () => {
        const newArmy = {
            formations: [], points: 0, uuid: crypto.randomUUID(), name: defaultArmyName(), maxPoints: 0, 
            primaryArmyListName: "" as ArmyListName | "", allegiance: "" as Allegiance | "",
            alliedPoints: 0,
            primaryPoints: 0,
            validationState: { valid: true },
            activations: 0
        };
        undoStack.value = [newArmy];
        undoIndex.value = 0;
        army.value = newArmy;
        armyLoadSource.value = ArmyLoadSource.Local;
        save();
        location.href = "./?localuuid="+newArmy.uuid;
    }

    const canCloneArmy = computed(()=>armyHasName());
    //I think there was a movie about this
    const cloneArmy = async () => {

        const storedArmy = structuredClone(army.value);
        
        storedArmy.uuid = crypto.randomUUID();
        storedArmy.name = "Copy of " + storedArmy.name;

        undoStack.value = [storedArmy];
        undoIndex.value = 0;
        army.value = storedArmy;
        if(armyLoadSource.value == ArmyLoadSource.KV)
            kvArmyOwner.value = username.value;
        
        await save();

        if(armyLoadSource.value == ArmyLoadSource.Local)
            location.href = "./?localuuid="+storedArmy.uuid;
        else if(armyLoadSource.value == ArmyLoadSource.KV)
            location.href = "./?clouduuid="+storedArmy.uuid;
    }

    const setNewArmy = (newArmy: Army) => {
        pushOntoUndoStack(newArmy);
        army.value = newArmy;
        save();
    }

    const changeArmyName = (name: string) => {
        const newArmy = {...army.value};
        newArmy.name = name;
        setNewArmy(newArmy);
    }

    const changeArmyMaxPoints = (value: number) => {
        const newArmy = {...army.value};
        newArmy.maxPoints = value;
        const points = calcArmyPoints(newArmy.formations, newArmy.primaryArmyListName);
        newArmy.points = points.points
        newArmy.alliedPoints = points.alliedPoints;
        newArmy.primaryPoints = points.primaryPoints;
        newArmy.validationState = calcArmyValidation(newArmy);
        newArmy.activations = calcArmyActivations(newArmy);

        setNewArmy(newArmy);
    }

    const changeArmyAllegiance = (allegiance: Allegiance | "") => {
        const newArmy = {...army.value};
        newArmy.allegiance = allegiance;
        const points = calcArmyPoints(newArmy.formations, newArmy.primaryArmyListName);
        newArmy.points = points.points
        newArmy.alliedPoints = points.alliedPoints;
        newArmy.primaryPoints = points.primaryPoints;
        newArmy.validationState = calcArmyValidation(newArmy);
        newArmy.activations = calcArmyActivations(newArmy);

        setNewArmy(newArmy);
    }
    
    const changePrimaryArmyListName = (armyListName: ArmyListName | "") => {
        const newArmy = {...army.value};
        newArmy.primaryArmyListName = armyListName;
        const points = calcArmyPoints(newArmy.formations, newArmy.primaryArmyListName);
        newArmy.points = points.points
        newArmy.alliedPoints = points.alliedPoints;
        newArmy.primaryPoints = points.primaryPoints;
        newArmy.validationState = calcArmyValidation(newArmy);
        newArmy.activations = calcArmyActivations(newArmy);

        setNewArmy(newArmy);
    }

    const setFormationAtIdx = (newFormation: Formation, formationIdx: number) => {
        refreshFormation(newFormation);

        const newArmy = {...army.value};
        newArmy.formations = newArmy.formations.slice();
        newArmy.formations[formationIdx] = newFormation;
        newFormation.breakPoint = calcFormationBreakPoint(newFormation);
        const points = calcArmyPoints(newArmy.formations, newArmy.primaryArmyListName);
        newArmy.points = points.points
        newArmy.alliedPoints = points.alliedPoints;
        newArmy.primaryPoints = points.primaryPoints;
        newArmy.validationState = calcArmyValidation(newArmy);
        newArmy.activations = calcArmyActivations(newArmy);

        setNewArmy(newArmy);
    }

    const addFormation: AddFormation = (): void => {
        const uuid = crypto.randomUUID();

        const newArmy = {...army.value};
        newArmy.formations = newArmy.formations.slice();
        newArmy.formations.push({armyListName: "", formationName: "", points: 0, detachments:[], uuid, breakPoint: 0, activations: 0});
        const points = calcArmyPoints(newArmy.formations, newArmy.primaryArmyListName);
        newArmy.points = points.points
        newArmy.alliedPoints = points.alliedPoints;
        newArmy.primaryPoints = points.primaryPoints;
        newArmy.validationState = calcArmyValidation(newArmy);
        newArmy.activations = calcArmyActivations(newArmy);

        setNewArmy(newArmy);
    };

    const removeFormation: RemoveFormation = (uuid: string) => {
        const newArmy = {...army.value};

        newArmy.formations = newArmy.formations.filter((elem: Formation) => elem.uuid != uuid)
        const points = calcArmyPoints(newArmy.formations, newArmy.primaryArmyListName);
        newArmy.points = points.points
        newArmy.alliedPoints = points.alliedPoints;
        newArmy.primaryPoints = points.primaryPoints;
        newArmy.validationState = calcArmyValidation(newArmy);
        newArmy.activations = calcArmyActivations(newArmy);

        setNewArmy(newArmy);
    };

    const changeFormationArmyList: ChangeFormationArmyList = (uuid: string, armyListName: ArmyListName | "") => {
        const formationIdx = army.value.formations.findIndex((f: Formation) => f.uuid == uuid);
        if(formationIdx === -1)
            return;

        if(army.value.formations[formationIdx].armyListName == armyListName)
            return;

        if(army.value.formations[formationIdx].armyListName == "Legions Astartes" as ArmyListName && armyListName == "Legiones Astartes") {
            const newFormation = structuredClone(army.value.formations[formationIdx]);
            newFormation.armyListName = armyListName;
            setFormationAtIdx(newFormation, formationIdx);    
            return;
        }
        
        const newFormation = structuredClone(army.value.formations[formationIdx])

        newFormation.armyListName = armyListName;
        newFormation.formationName = "";
        newFormation.detachments = [];
        if(armyListName == "Legiones Astartes") {
            newFormation.legionName = "";
        } else {
            delete newFormation.legionName;
        } 

        setFormationAtIdx(newFormation, formationIdx);
    }

    const changeFormationLegionName = (uuid: string, legionName: LegionName) => {
        const formationIdx = army.value.formations.findIndex((f: Formation) => f.uuid == uuid);
        if(formationIdx === -1)
            return;

        if(army.value.formations[formationIdx].legionName == legionName)
            return;

        const newFormation = structuredClone(army.value.formations[formationIdx])

        newFormation.legionName = legionName;

        setFormationAtIdx(newFormation, formationIdx);
    }

    const changeFormationName = (uuid: string, formationName: FormationName | "") => {
        const formationIdx = army.value.formations.findIndex((f: Formation) => f.uuid == uuid);
        if(formationIdx === -1)
            return;

        if(army.value.formations[formationIdx].formationName == formationName)
            return;

        const newFormation = structuredClone(army.value.formations[formationIdx])

        newFormation.formationName = formationName;
        
        const formationShape = getShapeForFormationName(newFormation.armyListName, formationName);
        newFormation.detachments = formationShape.slotRequirements.map((s) => {
            //fill in anything which we have no options on
            if(s.slotRequirementType == "Required" && newFormation.armyListName != "") {
                const dtfs = getDetachmentNamesForSlot(newFormation.armyListName, s.slot, army.value.allegiance);
                if(dtfs.length == 1 && newFormation.formationName != "") {
                    const config = getDetachmentConfigurationForDetachmentName(newFormation.armyListName, dtfs[0]);
                    const out: Detachment = {
                        slot: s.slot, modelGroups: getDefaultModelGroupsForDetachment(config, newFormation.formationName), 
                        points: 0, detachmentName: dtfs[0], validationState: {valid: true}
                    };
                    if(out.modelGroups.length > 0) {
                        const stats = getStatsForModelName(out.modelGroups[0].modelName);
                        if(stats && (statsHasTrait(stats, "Commander") || statsHasTrait(stats, "Attached Deployment")))
                            out.attachedDetachmentIndex = -1;
                    }
                    return out;
                }
            }

            return {
                slot: s.slot, modelGroups: [], points: 0, detachmentName: "", validationState: {valid: true}
            }
        });

        setFormationAtIdx(newFormation, formationIdx);
    };

    const changeDetachmentName = (uuid: string, detachmentIndex: number, detachmentName: DetachmentName | "") => {
        const formationIdx = army.value.formations.findIndex((f: Formation) => f.uuid == uuid);
        if(formationIdx === -1)
            return;

        if(army.value.formations[formationIdx].detachments[detachmentIndex].detachmentName == detachmentName)
            return;

        const newFormation = structuredClone(army.value.formations[formationIdx]);
        newFormation.detachments[detachmentIndex].detachmentName = detachmentName;
        newFormation.detachments[detachmentIndex].modelGroups = [];
        delete newFormation.detachments[detachmentIndex].attachedDetachmentIndex;

        if(newFormation.armyListName != "") {
            if(detachmentName != "") {
                const config = getDetachmentConfigurationForDetachmentName(newFormation.armyListName, detachmentName);
                if(newFormation.formationName != "" && config?.modelGroupShapes) {
                    newFormation.detachments[detachmentIndex].modelGroups = getDefaultModelGroupsForDetachment(config, newFormation.formationName);
    
                    if(newFormation.detachments[detachmentIndex].modelGroups.length > 0) {
                        const stats = getStatsForModelName(newFormation.detachments[detachmentIndex].modelGroups[0].modelName);
                        if(stats && (statsHasTrait(stats, "Commander") || statsHasTrait(stats, "Attached Deployment"))) {
                            newFormation.detachments[detachmentIndex].attachedDetachmentIndex = -1;
                        }
                    }
                }
            } else {
                //clear down any other linked tech priests.
                const shape = getShapeForFormationName(newFormation.armyListName, newFormation.formationName);
                if(shape) {
                    for(let i = 0; i < shape.slotRequirements.length; ++i) {
                        if(shape.slotRequirements[i].linkedSlotIndex == detachmentIndex) {
                            newFormation.detachments[i].detachmentName = detachmentName;
                            newFormation.detachments[i].modelGroups = [];
                            delete newFormation.detachments[i].attachedDetachmentIndex;
                        }
                    }
                }
            }
        }
        
        setFormationAtIdx(newFormation, formationIdx);
    };

    const changeDetachmentAttachment = (uuid: string, detachmentIndex: number, attachedDetachmentIndex: number) => {
        const formationIdx = army.value.formations.findIndex((f: Formation) => f.uuid == uuid);
        if(formationIdx === -1)
            return;

        if(army.value.formations[formationIdx].detachments[detachmentIndex].attachedDetachmentIndex == attachedDetachmentIndex)
            return;

        const newFormation = structuredClone(army.value.formations[formationIdx]);
        newFormation.detachments[detachmentIndex].attachedDetachmentIndex = attachedDetachmentIndex;

        setFormationAtIdx(newFormation, formationIdx);
    };

    const changeModelNumber: ChangeModelNumber = (uuid: string, detachmentIndex: number, modelName: ModelName, num: number) => {
        const formationIdx = army.value.formations.findIndex((f: Formation) => f.uuid == uuid);
        if(formationIdx === -1)
            return;

        const modelGroupIdx = army.value.formations[formationIdx].detachments[detachmentIndex].modelGroups.findIndex((m: ModelGroup) => m.modelName == modelName);
        if(modelGroupIdx === -1)
            return;

        const newFormation = structuredClone(army.value.formations[formationIdx]);
        newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx].number = num;

        const detachmentName = newFormation.detachments[detachmentIndex].detachmentName;
        if(detachmentName === "") {
            newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx].points = 0;
            newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx].modelLoadoutGroups = [];
        } else {
            if(newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx].modelLoadoutGroups.length === 1) {
                newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx].modelLoadoutGroups[0].number = num;
            }
        }

        setFormationAtIdx(newFormation, formationIdx);
    };

    const changeModelLoadout: ChangeModelLoadout = (
        uuid: string, detachmentIndex: number, modelName: ModelName, modelLoadoutGroupIndex: number, modelLoadoutSlotName: string, loadout: string
    ) => {
        const formationIdx = army.value.formations.findIndex((f: Formation) => f.uuid == uuid);
        if(formationIdx === -1)
            return;

        const modelGroupIdx = army.value.formations[formationIdx].detachments[detachmentIndex].modelGroups.findIndex((m: ModelGroup) => m.modelName == modelName);
        if(modelGroupIdx === -1)
            return;

        const newFormation = structuredClone(army.value.formations[formationIdx]);

        const detachmentName = newFormation.detachments[detachmentIndex].detachmentName;
        if(detachmentName === "")
            return;

        if(newFormation.armyListName == "")
            return;

        const config = getDetachmentConfigurationForDetachmentName(newFormation.armyListName, detachmentName);
        const c = config?.modelGroupShapes.find((x)=>x.modelName == modelName);
        const modelLoadoutSlotIndex = c?.modelLoadoutSlots.findIndex(s=>s.name === modelLoadoutSlotName);
        if(modelLoadoutSlotIndex===undefined || modelLoadoutSlotIndex === -1)
            return;
        const l = c?.modelLoadoutSlots[modelLoadoutSlotIndex].possibleModelLoadouts.find((m)=>m.loadout === loadout);
        if(l === undefined)
            return;

        newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx].modelLoadoutGroups[modelLoadoutGroupIndex].modelLoadoutSlots[modelLoadoutSlotIndex].modelLoadout = l;
        
        setFormationAtIdx(newFormation, formationIdx);
    };

    const addModelLoadoutGroup: AddModelLoadoutGroup = (uuid: string, detachmentIndex: number, modelName: ModelName) => {
        const formationIdx = army.value.formations.findIndex((f: Formation) => f.uuid == uuid);
        if(formationIdx === -1)
            return;

        const modelGroupIndex = army.value.formations[formationIdx].detachments[detachmentIndex].modelGroups.findIndex((m: ModelGroup) => m.modelName == modelName);
        if(modelGroupIndex === -1)
            return;

        const newFormation = structuredClone(army.value.formations[formationIdx]);

        const detachmentName = newFormation.detachments[detachmentIndex].detachmentName;
        if(detachmentName === "")
            return;

        if(newFormation.armyListName == "")
            return;

        const config = getDetachmentConfigurationForDetachmentName(newFormation.armyListName, detachmentName);
        const c = config?.modelGroupShapes.find((x)=>x.modelName == modelName);
        if(c === undefined)
            return;

        const newModelLoadoutGroup: ModelLoadoutGroup = 
            {number: 0, modelLoadoutSlots: c.modelLoadoutSlots.map((y)=>
                {return {name: y.name, modelLoadout: y.possibleModelLoadouts[0]}}
            ), points: -1};

        newFormation.detachments[detachmentIndex].modelGroups[modelGroupIndex].modelLoadoutGroups.push(newModelLoadoutGroup);

        setFormationAtIdx(newFormation, formationIdx);
    };

    const removeModelLoadoutGroup: RemoveModelLoadoutGroup = (uuid: string, detachmentIndex: number, modelName: ModelName, modelLoadoutGroupIndex: number) => {
        const formationIdx = army.value.formations.findIndex((f: Formation) => f.uuid == uuid);
        if(formationIdx === -1)
            return;

        const modelGroupIndex = army.value.formations[formationIdx].detachments[detachmentIndex].modelGroups.findIndex((m: ModelGroup) => m.modelName == modelName);
        if(modelGroupIndex === -1)
            return;

        const newFormation = structuredClone(army.value.formations[formationIdx] );

        const detachmentName = newFormation.detachments[detachmentIndex].detachmentName;
        if(detachmentName === "")
            return;

        newFormation.detachments[detachmentIndex].modelGroups[modelGroupIndex].modelLoadoutGroups = 
            newFormation.detachments[detachmentIndex].modelGroups[modelGroupIndex].modelLoadoutGroups.filter((_, i)=>i!=modelLoadoutGroupIndex);

        setFormationAtIdx(newFormation, formationIdx);
    };

    const changeModelLoadoutGroupNumber: ChangeModelLoadoutGroupNumber = (uuid: string, detachmentIndex: number, modelName: ModelName, modelLoadoutGroupIndex: number, number: number) => {
        const formationIdx = army.value.formations.findIndex((f: Formation) => f.uuid == uuid);
        if(formationIdx === -1)
            return;

        const modelGroupIndex = army.value.formations[formationIdx].detachments[detachmentIndex].modelGroups.findIndex((m: ModelGroup) => m.modelName == modelName);
        if(modelGroupIndex === -1)
            return;

        const newFormation = structuredClone(army.value.formations[formationIdx]);

        const detachmentName = newFormation.detachments[detachmentIndex].detachmentName;
        if(detachmentName === "")
            return;

        newFormation.detachments[detachmentIndex].modelGroups[modelGroupIndex].modelLoadoutGroups[modelLoadoutGroupIndex].number = number;
       
        setFormationAtIdx(newFormation, formationIdx);
    };

    return {army, makeNewArmy, changeArmyName, changeArmyMaxPoints, changePrimaryArmyListName, changeArmyAllegiance,
        addFormation, removeFormation, changeFormationArmyList, changeFormationLegionName,
        changeFormationName, changeDetachmentName, changeDetachmentAttachment, changeModelNumber, 
        changeModelLoadout, addModelLoadoutGroup, removeModelLoadoutGroup, changeModelLoadoutGroupNumber, canUndo, undo, canRedo, redo,
        armyLoadSource, isLoggedIn, username,
        armiesLocalLoadState, armyLocalLoadState, localSaves, refreshLocalSaves, localLoad, deleteLocalSave, canCloneArmy, cloneArmy,
        armiesKvLoadState, armyKvLoadState, kvSaves, refreshKvSaves, kvLoad, deleteKvSave,
        canMoveToKv, moveToKv, kvArmyOwner,
        modelGroupOpenState, openModelGroup, closeModelGroup, getModelGroupKey,
        openFormation, closeFormation, formationClosedState,
    };
}

export default createAppState();