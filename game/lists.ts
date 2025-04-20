import { getAuxiliaDetachmentConfigurationForDetachmentName, getAuxiliaDetachmentNamesForSlot, getShapeForAuxiliaFormationType, getStatsForAuxiliaModelType } from "./auxiliaList.ts";
import { AllAuxiliaModelTypes, AuxiliaDetachmentName, AuxiliaFormationType, AuxiliaFormationTypes, AuxiliaModelType } from "./auxiliaTypes.ts";
import { getStatsForLegionModelType, getLegionDetachmentConfigurationForDetachmentName, getLegionDetachmentNamesForSlot, getShapeForLegionFormationType } from "./legionList.ts";
import { AllLegionModelTypes, LegionDetachmentName, LegionFormationType, LegionFormationTypes, LegionModelType } from "./legionTypes.ts";
import { getCollegiaTitanicaDetachmentNamesForSlot, getShapeForCollegiaTitanicaFormationType, getShapeForStrategicAssetFormationType, getStatsForStrategicAssetModelType, getStrategicAssetDetachmentConfigurationForDetachmentName, getStrategicAssetDetachmentNamesForSlot } from "./strategicAssetList.ts";
import { AllStrategicAssetModelTypes, CollegiaTitanicaFormationType, CollegiaTitanicaFormationTypes, StrategicAssetDetachmentName, StrategicAssetFormationType, StrategicAssetFormationTypes, StrategicAssetModelType } from "./strategicAssetTypes.ts";
import { Allegiance, ArmyListName, DetachmentConfiguration, DetachmentName, FormationShape, FormationSlot, FormationType, ModelType, Stats } from "./types.ts";


const formationTypesForArmyListName: Map<ArmyListName, FormationType[]> = new Map([
    //yes this is bad, but whatever
    ["Collegia Titanica", CollegiaTitanicaFormationTypes as unknown as FormationType[]], 
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
        case "Collegia Titanica":
            return getShapeForCollegiaTitanicaFormationType(formationType as CollegiaTitanicaFormationType);
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
        case "Collegia Titanica":
            return getCollegiaTitanicaDetachmentNamesForSlot(slot, allegiance);
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
        case "Collegia Titanica":
            return getStrategicAssetDetachmentConfigurationForDetachmentName(detachmentName as StrategicAssetDetachmentName);
    }
}

export function getStatsForModelType(modelType: ModelType): Stats | undefined {
    if(AllLegionModelTypes.findIndex(a=>a==modelType) != -1) {
        return getStatsForLegionModelType(modelType as LegionModelType);
    }
    if(AllStrategicAssetModelTypes.findIndex(a=>a==modelType) != -1) {
        return getStatsForStrategicAssetModelType(modelType as StrategicAssetModelType);
    }
    if(AllAuxiliaModelTypes.findIndex(a=>a==modelType) != -1) {
        return getStatsForAuxiliaModelType(modelType as AuxiliaModelType);
    }
}
