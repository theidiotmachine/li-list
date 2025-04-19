import { getAuxiliaDetachmentConfigurationForDetachmentName, getAuxiliaDetachmentNamesForSlot, getShapeForAuxiliaFormationType, getStatsForAuxiliaModelType } from "./auxiliaList.ts";
import { AllAuxiliaModelTypes, AuxiliaDetachmentName, AuxiliaFormationType, AuxiliaFormationTypes, AuxiliaModelType } from "./auxiliaTypes.ts";
import { getStatsForLegionModelType, getLegionDetachmentConfigurationForDetachmentName, getLegionDetachmentNamesForSlot, getShapeForLegionFormationType } from "./legionList.ts";
import { AllLegionModelTypes, LegionDetachmentName, LegionFormationType, LegionFormationTypes, LegionModelType } from "./legionTypes.ts";
import { getShapeForStrategicAssetFormationType, getStatsForStrategicAssetModelType, getStrategicAssetDetachmentConfigurationForDetachmentName, getStrategicAssetDetachmentNamesForSlot } from "./strategicAssetList.ts";
import { Allegiance, AllStrategicAssetModelTypes, ArmyListName, DetachmentConfiguration, DetachmentName, FormationShape, FormationSlot, FormationType, ModelType, Stats, StrategicAssetDetachmentName, StrategicAssetFormationType, StrategicAssetFormationTypes } from "./types.ts";


const formationTypesForArmyListName: Map<ArmyListName, FormationType[]> = new Map([
    //yes this is bad, but whatever
    ["Legions Astartes", LegionFormationTypes as unknown as FormationType[]], 
    ["Solar Auxilia", AuxiliaFormationTypes as unknown as FormationType[]],
    ["Strategic Asset", StrategicAssetFormationTypes as unknown as FormationType[]],
]);

export function getFormationTypesForArmyListName(armyListName: ArmyListName | "") {
    if(armyListName === "")
        return [];
    return formationTypesForArmyListName.get(armyListName) ?? [];
}

export function getShapeForFormationType(armyListName: ArmyListName | "", formationType: FormationType | ""): FormationShape {
    if(armyListName == "") return { slotRequirements: [] };
    if(formationType == "") return { slotRequirements: [] };

    switch(armyListName) {
        case "Legions Astartes":
            return getShapeForLegionFormationType(formationType as LegionFormationType);
        case "Solar Auxilia":
            return getShapeForAuxiliaFormationType(formationType as AuxiliaFormationType);
        case "Strategic Asset":
            return getShapeForStrategicAssetFormationType(formationType as StrategicAssetFormationType);
    }
}

export function getDetachmentNamesForSlot(armyListName: ArmyListName, slot: FormationSlot, allegiance: Allegiance | ""): DetachmentName[] {
    switch(armyListName) {
        case "Legions Astartes":
            return getLegionDetachmentNamesForSlot(slot);
        case "Solar Auxilia":
            return getAuxiliaDetachmentNamesForSlot(slot);
        case "Strategic Asset":
            return getStrategicAssetDetachmentNamesForSlot(slot, allegiance);
    }
}

export function getDetachmentConfigurationForDetachmentName(armyListName: ArmyListName, detachmentName: DetachmentName): DetachmentConfiguration {
    switch(armyListName) {
        case "Legions Astartes":
            return getLegionDetachmentConfigurationForDetachmentName(detachmentName as LegionDetachmentName);
        case "Solar Auxilia":
            return getAuxiliaDetachmentConfigurationForDetachmentName(detachmentName as AuxiliaDetachmentName);
        case "Strategic Asset":
            return getStrategicAssetDetachmentConfigurationForDetachmentName(detachmentName as StrategicAssetDetachmentName);
    }
}

export function getStatsForModelType(modelType: ModelType): Stats | undefined {
    if(AllLegionModelTypes.findIndex(a=>a==modelType) != -1) {
        return getStatsForLegionModelType(modelType as LegionModelType);
    }
    if(AllStrategicAssetModelTypes.findIndex(a=>a==modelType) != -1) {
        return getStatsForStrategicAssetModelType(modelType as LegionModelType);
    }
    if(AllAuxiliaModelTypes.findIndex(a=>a==modelType) != -1) {
        return getStatsForAuxiliaModelType(modelType as AuxiliaModelType);
    }
}
