import { Signal, signal, effect, computed } from "@preact/signals";
import { DetachmentType, FormationType, ModelType, FormationShape, ArmyListName, DetachmentValidationState, Detachment, ModelLoadout, ModelGroup } from "./game/types.ts";
import { getDetachmentConfigurationForDetachmentType, getShapeForFormationType, getStatsForModelType } from "./game/lists.ts";
import { _common } from "$std/path/_common/common.ts";

export type Formation = {
    armyListName: ArmyListName | "";
    formationType: FormationType | "";
    points: number;
    detachments: Detachment[];
    uuid: string;
    breakPoint: number;
};

export type Army = {
    formations: Formation[];
    points: number;
};

export type AddFormation = () => void;
export type RemoveFormation = (uuid: string) => void;
export type ChangeFormationArmyList = (uuid: string, armyListName: ArmyListName | "") => void;
export type ChangeFormationType = (uuid: string, formationType: FormationType | "") => void;
export type ChangeDetachmentType = (uuid: string, detachmentIndex: number, detachmentType: DetachmentType | "") => void;
export type ChangeModelNumber = (uuid: string, detachmentIndex: number, modelType: ModelType, num: number) => void;
export type ChangeModelLoadout = (uuid: string, detachmentIndex: number, modelType: ModelType, modelLoadoutGroupIndex: number, modelLoadoutSlotIndex: number, loadout: string) => void;
export type AddModelLoadoutGroup = (uuid: string, detachmentIndex: number, modelType: ModelType) => void;
export type RemoveModelLoadoutGroup = (uuid: string, detachmentIndex: number, modelType: ModelType, modelLoadoutGroupIndex: number) => void;
export type ChangeModelLoadoutGroupNumber = (uuid: string, detachmentIndex: number, modelType: ModelType, modelLoadoutGroupIndex: number, number: number) => void;
export type Undo = () => void;
export type Redo = () => void;

export type AppStateType = {
    army: Signal<Army>; 
    addFormation: AddFormation;
    removeFormation: RemoveFormation;
    changeFormationArmyList: ChangeFormationArmyList;
    changeFormationType: ChangeFormationType;
    changeDetachmentType: ChangeDetachmentType;
    changeModelNumber: ChangeModelNumber;
    changeModelLoadout: ChangeModelLoadout;
    addModelLoadoutGroup: AddModelLoadoutGroup;
    removeModelLoadoutGroup: RemoveModelLoadoutGroup;
    changeModelLoadoutGroupNumber: ChangeModelLoadoutGroupNumber;
    undo: Undo;
    redo: Redo;
};

function calcModelLoadoutGroupPoints(modelLoadoutGroup: ModelLoadout) {
    //find the value of loadout each slot option, sum them, and multiply by the number in the group
    return modelLoadoutGroup.number * modelLoadoutGroup.modelLoadoutSlots.reduce((p2, m2) => p2 + m2.modelLoadout.points, 0)
}

function calcModelGroupPoints(armyListName: ArmyListName, modelGroup: ModelGroup, detachmentType: DetachmentType) {
    //add up the points for the models and the loadouts. Model points require looking up.
    const config = getDetachmentConfigurationForDetachmentType(armyListName, detachmentType);
    const c = config?.modelGroupShapes.find((x)=>x.modelType == modelGroup.modelType);
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
        if(formation.armyListName == "" || d.detachmentType == "")
            return p;
        const config = getDetachmentConfigurationForDetachmentType(formation.armyListName, d.detachmentType);
        if(config === undefined)
            return p;

        return p + d.modelGroups.reduce((p2, mg) => {
            const stats = getStatsForModelType(mg.modelType);
            const c = config.modelGroupShapes.find(x=>x.modelType == mg.modelType);
            if(c === undefined)
                return p2;

            let woundsPerModel = 1;
            if(stats !== undefined) {
                if(stats.unitType == "Knight" || stats.unitType == "Titan")
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

function calcArmyPoints(formations: Formation[]) {
    return formations.reduce((p, d) => p + d.points, 0);
}

function calcDetachmentValidation(formation: Formation, detachmentIndex: number, formationShape: FormationShape): DetachmentValidationState {
    const detachment = formation.detachments[detachmentIndex];
    const slotRequirements = formationShape.slotRequirements[detachmentIndex];
    if(slotRequirements.slotRequirementType == "Required" && detachment.modelGroups.length === 0) {
        return { valid: false, error: "Required detachment missing" };
    }
        
    if(formation.armyListName != "" && detachment.detachmentType != "") {
        const c = getDetachmentConfigurationForDetachmentType(formation.armyListName, detachment.detachmentType);
        if( c ) {
            let numModels = 0;

            type TransportData = {
                numModels: number;
                
            };
            let transportCapacity = 0;
            let assaultTransportCapacity = 0;
            let largeTransportCapacity = 0;
            let largeAssaultTransportCapacity = 0;

            let slimModels = 0;
            let bulkyModels = 0;
            let walkerModels = 0;

            for(let i = 0; i < detachment.modelGroups.length; ++i) {
                const m = detachment.modelGroups[i];
                const shapeIdx = c.modelGroupShapes.findIndex(x=>x.modelType == m.modelType);
                if(shapeIdx == -1)
                    continue;
                const shape = c.modelGroupShapes[shapeIdx];
                if(shape.minModels != undefined && m.number < shape.minModels)
                    return { valid: false, error: "Too few models in group", data: m.modelType + ". Min: " + shape.minModels };
                if(shape.maxModels != undefined && m.number > shape.maxModels)
                    return { valid: false, error: "Too many models in group", data: m.modelType  + ". Max: " + shape.maxModels  };
                if(shape.possibleModelGroupQuantities.findIndex(x=>x.num == m.number) == -1) {
                    console.log("Invalid number of models in group", m.number, shape.possibleModelGroupQuantities);
                    const possibleModelNumbers = shape.possibleModelGroupQuantities.map(m=>m.num.toString());
                    return { valid: false, error: "Invalid number of models in group", data: m.modelType + ". Could be: " + 
                        possibleModelNumbers.join(", ")
                     };
                }

                const stats = getStatsForModelType(m.modelType);

                //don't include dedicated detachments for the purposes of validation
                if(!shape.dedicatedTransport) {
                    numModels += m.number;
                    if(stats) {
                        if(stats.unitType == "Walker")
                            walkerModels += m.number;
                        else {
                            const isBulky = stats.unitTraits.findIndex((x)=>x==="Bulky" || x==="Jump Packs") !== -1;
                            if(isBulky) 
                                bulkyModels += m.number;
                            else
                                slimModels += m.number;
                        }
                    }
                } else {
                    //okay, figure out the transport capacity of dedicated transports
                    if(stats) {
                        //eww
                        const transportTrait = stats.unitTraits.find((x)=>x.startsWith("Transport"));
                        if(transportTrait) {
                            const matches = /Transport \([0-9]\)/.exec(transportTrait);
                            transportCapacity += parseInt(matches![0]);
                        }else{
                            const assaultTransportTrait = stats.unitTraits.find((x)=>x.startsWith("Assault Transport"));
                            if(assaultTransportTrait) {
                                const matches = /Assault Transport \([0-9]\)/.exec(assaultTransportTrait);
                                assaultTransportCapacity += parseInt(matches![0]);
                            } else {
                                const largeTransportTrait = stats.unitTraits.find((x)=>x.startsWith("Large Transport"));
                                if(largeTransportTrait) { 
                                    const matches = /Large Transport \([0-9]\)/.exec(largeTransportTrait);
                                    largeTransportCapacity += parseInt(matches![0]);
                                } else {
                                    const largeAssaultTransportTrait = stats.unitTraits.find((x)=>x.startsWith("Large Assault Transport"));
                                    if(largeAssaultTransportTrait) { 
                                        const matches = /Large Assault Transport \([0-9]\)/.exec(largeAssaultTransportTrait);
                                        largeAssaultTransportCapacity += parseInt(matches![0]);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if(c.maxModels !== undefined && c.maxModels < numModels)
                return { valid: false, error: "Too many models in detachment", data: "max " + c.maxModels}
            if(c.minModels !== undefined && c.minModels > numModels)
                return { valid: false, error: "Too few models in detachment", data: "min " + c.minModels}

            if(transportCapacity + assaultTransportCapacity + largeTransportCapacity + largeAssaultTransportCapacity > 0) {
                //work down from walkers to slims
                
            }

            if(c.customValidation !== undefined){
                const validationState = c.customValidation(detachment);
                if(validationState.error)
                    return validationState;
            }
        }
        if(slotRequirements.slotRequirementType == "One Of" && slotRequirements.oneOfGroup !== undefined) {
            const g = slotRequirements.oneOfGroup;
            for (let i = 0; i < formation.detachments.length; i++) {
                if(i == detachmentIndex)
                    continue;
                if(formation.detachments[i].detachmentType != "" 
                    && formationShape.slotRequirements[i].slotRequirementType == "One Of" 
                    && formationShape.slotRequirements[i].oneOfGroup == g
                )
                    return { valid: false, error: "Only one of these detachments should be present" };
            }
        }
    }

    return { valid: true };
}

//recalc all points and validations
function refreshFormation(newFormation: Formation) {
    const formationShape = getShapeForFormationType(newFormation.armyListName, newFormation.formationType);
    newFormation.detachments.forEach(
        (x, i) => {
            x.modelGroups.forEach((y)=>{
                //some numbers are calculated from their model loadout groups.
                if(y.modelLoadoutGroups.length != 0)
                    y.number = y.modelLoadoutGroups.reduce((p, z) => p + z.number, 0);

                y.modelLoadoutGroups.forEach((z)=>{
                    z.points = calcModelLoadoutGroupPoints(z);
                });
                if(x.detachmentType == "" || newFormation.armyListName == "")
                    y.points = 0;
                else
                    y.points = calcModelGroupPoints(newFormation.armyListName, y, x.detachmentType);
            })
            x.validationState = calcDetachmentValidation(newFormation, i, formationShape);
            x.points = calcDetachmentPoints(x);
        }
    );
    newFormation.points = calcFormationPoints(newFormation);
}

function createAppState(): AppStateType {
    let undoStack: Army[] = [{points: 0, formations: []}];
    let undoIndex = 0;
    const army = signal<Army>({formations: [], points: 0});

    const pushOntoUndoStack = (army: Army) => {
        if(undoIndex < undoStack.length - 1) {
            undoStack = undoStack.slice(0, undoIndex + 1);
        }
            
        undoStack.push(army);
        undoIndex = undoStack.length - 1;
    }

    const undo = () => {
        if(undoIndex > 0) {
            undoIndex--;
            army.value = undoStack[undoIndex];
        }
    }

    const redo = () => {
        if(undoIndex < undoStack.length - 1) {
            undoIndex++;
            army.value = undoStack[undoIndex];
        }
    }

    const setFormationAtIdx = (newFormation: Formation, formationIdx: number) => {
        refreshFormation(newFormation);

        const newArmy = {...army.value};
        newArmy.formations = newArmy.formations.slice();
        newArmy.formations[formationIdx] = newFormation;
        newFormation.breakPoint = calcFormationBreakPoint(newFormation);
        newArmy.points = calcArmyPoints(newArmy.formations);

        pushOntoUndoStack(newArmy);
        army.value = newArmy;
    }

    const addFormation: AddFormation = (): void => {
        const uuid = crypto.randomUUID();

        const newArmy = {...army.value};
        newArmy.formations = newArmy.formations.slice();
        newArmy.formations.push({armyListName: "", formationType: "", points: 0, detachments:[], uuid, breakPoint: 0});
        newArmy.points = calcArmyPoints(newArmy.formations);

        pushOntoUndoStack(newArmy);
        army.value = newArmy;
    };

    const removeFormation: RemoveFormation = (uuid: string) => {
        const newArmy = {...army.value};

        newArmy.formations = newArmy.formations.filter((elem: Formation) => elem.uuid != uuid)
        newArmy.points = calcArmyPoints(newArmy.formations);

        pushOntoUndoStack(newArmy);
        army.value = newArmy;
    };

    const changeFormationArmyList: ChangeFormationArmyList = (uuid: string, armyListName: ArmyListName | "") => {
        const formationIdx = army.value.formations.findIndex((f: Formation) => f.uuid == uuid);
        if(formationIdx === -1)
            return;

        if(army.value.formations[formationIdx].armyListName == armyListName)
            return;

        const newFormation = {...army.value.formations[formationIdx]}

        newFormation.armyListName = armyListName;
        newFormation.formationType = "";
        newFormation.detachments = [];

        setFormationAtIdx(newFormation, formationIdx);
    }

    const changeFormationType: ChangeFormationType = (uuid: string, formationType: FormationType | "") => {
        const formationIdx = army.value.formations.findIndex((f: Formation) => f.uuid == uuid);
        if(formationIdx === -1)
            return;

        if(army.value.formations[formationIdx].formationType == formationType)
            return;

        const newFormation = {...army.value.formations[formationIdx]}

        newFormation.formationType = formationType;
        
        const formationShape = getShapeForFormationType(newFormation.armyListName, formationType);
        newFormation.detachments = formationShape.slotRequirements.map((s)=>{return {
            slot: s.slot, modelGroups: [], points: 0, detachmentType: "", validationState: {valid: true}
        }});

        setFormationAtIdx(newFormation, formationIdx);
    };

    const changeDetachmentType: ChangeDetachmentType = (uuid: string, detachmentIndex: number, detachmentType: DetachmentType | "") => {
        const formationIdx = army.value.formations.findIndex((f: Formation) => f.uuid == uuid);
        if(formationIdx === -1)
            return;

        if(army.value.formations[formationIdx].detachments[detachmentIndex].detachmentType == detachmentType)
            return;

        const newFormation = { ...army.value.formations[formationIdx] };
        newFormation.detachments = newFormation.detachments.slice();
        newFormation.detachments[detachmentIndex] = {...newFormation.detachments[detachmentIndex]};
        newFormation.detachments[detachmentIndex].detachmentType = detachmentType;
        newFormation.detachments[detachmentIndex].modelGroups = [];

        if(newFormation.armyListName != "" && detachmentType != "") {
            const config = getDetachmentConfigurationForDetachmentType(newFormation.armyListName, detachmentType);
            if(config?.modelGroupShapes) {
                newFormation.detachments[detachmentIndex].modelGroups = config.modelGroupShapes
                    .filter((x) => (x.formationType === undefined) || (x.formationType === newFormation.formationType))
                    .map((x) => {
                        let modelLoadoutGroups: ModelLoadout[] = [];
                        if(x.modelLoadoutSlots.length > 0) {
                            modelLoadoutGroups = [{
                                number: x.possibleModelGroupQuantities[0].num, modelLoadoutSlots: x.modelLoadoutSlots.map(
                                    (y)=>{return{name: y.name, modelLoadout: y.possibleModelLoadouts[0]}}
                                ), points: -1
                            }];
                        }
                        return {
                            modelType: x.modelType, number: x.possibleModelGroupQuantities[0].num, points: -1,
                            modelLoadoutGroups: modelLoadoutGroups
                        };
                    });
            }
        } else {
            newFormation.detachments[detachmentIndex].modelGroups = [];
        }
        
        setFormationAtIdx(newFormation, formationIdx);
    };

    const changeModelNumber: ChangeModelNumber = (uuid: string, detachmentIndex: number, modelType: ModelType, num: number) => {
        const formationIdx = army.value.formations.findIndex((f: Formation) => f.uuid == uuid);
        if(formationIdx === -1)
            return;

        const modelGroupIdx = army.value.formations[formationIdx].detachments[detachmentIndex].modelGroups.findIndex((m: ModelGroup) => m.modelType == modelType);
        if(modelGroupIdx === -1)
            return;

        const newFormation = { ...army.value.formations[formationIdx] };
        newFormation.detachments = newFormation.detachments.slice();
        newFormation.detachments[detachmentIndex]= {...newFormation.detachments[detachmentIndex]};
        newFormation.detachments[detachmentIndex].modelGroups = newFormation.detachments[detachmentIndex].modelGroups.slice();
        newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx] = {...newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx]};
        newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx].number = num;

        const detachmentType = newFormation.detachments[detachmentIndex].detachmentType;
        if(detachmentType === "") {
            newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx].points = 0;
            newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx].modelLoadoutGroups = [];
        } else {
            if(newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx].modelLoadoutGroups.length === 1) {
                newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx].modelLoadoutGroups = 
                    newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx].modelLoadoutGroups.slice();
                newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx].modelLoadoutGroups[0] = {
                    ...newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx].modelLoadoutGroups[0]
                };
                newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx].modelLoadoutGroups[0].number = num;
            }
        }

        setFormationAtIdx(newFormation, formationIdx);
    };

    const changeModelLoadout: ChangeModelLoadout = (
        uuid: string, detachmentIndex: number, modelType: ModelType, modelLoadoutGroupIndex: number, modelLoadoutSlotIndex: number, loadout: string
    ) => {
        const formationIdx = army.value.formations.findIndex((f: Formation) => f.uuid == uuid);
        if(formationIdx === -1)
            return;

        const modelGroupIdx = army.value.formations[formationIdx].detachments[detachmentIndex].modelGroups.findIndex((m: ModelGroup) => m.modelType == modelType);
        if(modelGroupIdx === -1)
            return;

        const newFormation = { ...army.value.formations[formationIdx] };

        const detachmentType = newFormation.detachments[detachmentIndex].detachmentType;
        if(detachmentType === "")
            return;

        if(newFormation.armyListName == "")
            return;

        const config = getDetachmentConfigurationForDetachmentType(newFormation.armyListName, detachmentType);
        const c = config?.modelGroupShapes.find((x)=>x.modelType == modelType);
        const l = c?.modelLoadoutSlots[modelLoadoutSlotIndex].possibleModelLoadouts.find((m)=>m.loadout === loadout);
        if(l === undefined)
            return;

        newFormation.detachments = newFormation.detachments.slice();
        newFormation.detachments[detachmentIndex] = {...newFormation.detachments[detachmentIndex]};
        newFormation.detachments[detachmentIndex].modelGroups = newFormation.detachments[detachmentIndex].modelGroups.slice();
        newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx] = {...newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx]};
        newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx].modelLoadoutGroups = 
            newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx].modelLoadoutGroups.slice();
        newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx].modelLoadoutGroups[modelLoadoutGroupIndex] = 
            {...newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx].modelLoadoutGroups[modelLoadoutGroupIndex]};
        newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx].modelLoadoutGroups[modelLoadoutGroupIndex].modelLoadoutSlots = 
            newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx].modelLoadoutGroups[modelLoadoutGroupIndex].modelLoadoutSlots.slice();
        newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx].modelLoadoutGroups[modelLoadoutGroupIndex].modelLoadoutSlots[modelLoadoutSlotIndex] = 
            {...newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx].modelLoadoutGroups[modelLoadoutGroupIndex].modelLoadoutSlots[modelLoadoutSlotIndex]};
        newFormation.detachments[detachmentIndex].modelGroups[modelGroupIdx].modelLoadoutGroups[modelLoadoutGroupIndex].modelLoadoutSlots[modelLoadoutSlotIndex].modelLoadout = l;
        
        setFormationAtIdx(newFormation, formationIdx);
    };

    const addModelLoadoutGroup: AddModelLoadoutGroup = (uuid: string, detachmentIndex: number, modelType: ModelType) => {
        const formationIdx = army.value.formations.findIndex((f: Formation) => f.uuid == uuid);
        if(formationIdx === -1)
            return;

        const modelGroupIndex = army.value.formations[formationIdx].detachments[detachmentIndex].modelGroups.findIndex((m: ModelGroup) => m.modelType == modelType);
        if(modelGroupIndex === -1)
            return;

        const newFormation = { ...army.value.formations[formationIdx] };

        const detachmentType = newFormation.detachments[detachmentIndex].detachmentType;
        if(detachmentType === "")
            return;

        if(newFormation.armyListName == "")
            return;

        const config = getDetachmentConfigurationForDetachmentType(newFormation.armyListName, detachmentType);
        const c = config?.modelGroupShapes.find((x)=>x.modelType == modelType);
        if(c === undefined)
            return;

        const newModelLoadoutGroup: ModelLoadout = 
            {number: 0, modelLoadoutSlots: c.modelLoadoutSlots.map((y)=>
                {return {name: y.name, modelLoadout: y.possibleModelLoadouts[0]}}
            ), points: -1};

        newFormation.detachments = newFormation.detachments.slice();
        newFormation.detachments[detachmentIndex] = {...newFormation.detachments[detachmentIndex]};
        newFormation.detachments[detachmentIndex].modelGroups = newFormation.detachments[detachmentIndex].modelGroups.slice();
        newFormation.detachments[detachmentIndex].modelGroups[modelGroupIndex] = {...newFormation.detachments[detachmentIndex].modelGroups[modelGroupIndex]};
        newFormation.detachments[detachmentIndex].modelGroups[modelGroupIndex].modelLoadoutGroups = 
            newFormation.detachments[detachmentIndex].modelGroups[modelGroupIndex].modelLoadoutGroups.slice();
            
        newFormation.detachments[detachmentIndex].modelGroups[modelGroupIndex].modelLoadoutGroups.push(newModelLoadoutGroup);

        setFormationAtIdx(newFormation, formationIdx);
    };

    const removeModelLoadoutGroup: RemoveModelLoadoutGroup = (uuid: string, detachmentIndex: number, modelType: ModelType, modelLoadoutGroupIndex: number) => {
        const formationIdx = army.value.formations.findIndex((f: Formation) => f.uuid == uuid);
        if(formationIdx === -1)
            return;

        const modelGroupIndex = army.value.formations[formationIdx].detachments[detachmentIndex].modelGroups.findIndex((m: ModelGroup) => m.modelType == modelType);
        if(modelGroupIndex === -1)
            return;

        const newFormation = { ...army.value.formations[formationIdx] };

        const detachmentType = newFormation.detachments[detachmentIndex].detachmentType;
        if(detachmentType === "")
            return;

        newFormation.detachments = newFormation.detachments.slice();
        newFormation.detachments[detachmentIndex] = {...newFormation.detachments[detachmentIndex]};
        newFormation.detachments[detachmentIndex].modelGroups = newFormation.detachments[detachmentIndex].modelGroups.slice();
        newFormation.detachments[detachmentIndex].modelGroups[modelGroupIndex] =
            {...newFormation.detachments[detachmentIndex].modelGroups[modelGroupIndex]};
        
        newFormation.detachments[detachmentIndex].modelGroups[modelGroupIndex].modelLoadoutGroups = 
            newFormation.detachments[detachmentIndex].modelGroups[modelGroupIndex].modelLoadoutGroups.filter((_, i)=>i!=modelLoadoutGroupIndex);

        setFormationAtIdx(newFormation, formationIdx);
    };

    const changeModelLoadoutGroupNumber: ChangeModelLoadoutGroupNumber = (uuid: string, detachmentIndex: number, modelType: ModelType, modelLoadoutGroupIndex: number, number: number) => {
        const formationIdx = army.value.formations.findIndex((f: Formation) => f.uuid == uuid);
        if(formationIdx === -1)
            return;

        const modelGroupIndex = army.value.formations[formationIdx].detachments[detachmentIndex].modelGroups.findIndex((m: ModelGroup) => m.modelType == modelType);
        if(modelGroupIndex === -1)
            return;

        const newFormation = { ...army.value.formations[formationIdx] };

        const detachmentType = newFormation.detachments[detachmentIndex].detachmentType;
        if(detachmentType === "")
            return;

        newFormation.detachments = newFormation.detachments.slice();
        newFormation.detachments[detachmentIndex] = {...newFormation.detachments[detachmentIndex]};
        newFormation.detachments[detachmentIndex].modelGroups = newFormation.detachments[detachmentIndex].modelGroups.slice();
        newFormation.detachments[detachmentIndex].modelGroups[modelGroupIndex] 
            = {...newFormation.detachments[detachmentIndex].modelGroups[modelGroupIndex]};
        newFormation.detachments[detachmentIndex].modelGroups[modelGroupIndex].modelLoadoutGroups = 
            newFormation.detachments[detachmentIndex].modelGroups[modelGroupIndex].modelLoadoutGroups.slice();
        newFormation.detachments[detachmentIndex].modelGroups[modelGroupIndex].modelLoadoutGroups[modelLoadoutGroupIndex] = 
            {...newFormation.detachments[detachmentIndex].modelGroups[modelGroupIndex].modelLoadoutGroups[modelLoadoutGroupIndex]};
        newFormation.detachments[detachmentIndex].modelGroups[modelGroupIndex].modelLoadoutGroups[modelLoadoutGroupIndex].number = number;
       
        setFormationAtIdx(newFormation, formationIdx);
    };

    return {army, addFormation, removeFormation, changeFormationArmyList, changeFormationType, changeDetachmentType, changeModelNumber, 
        changeModelLoadout, addModelLoadoutGroup, removeModelLoadoutGroup, changeModelLoadoutGroupNumber, undo, redo};
}

export default createAppState();