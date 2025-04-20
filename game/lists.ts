import { getAuxiliaDetachmentConfigurationForDetachmentName, getAuxiliaDetachmentNamesForSlot, getShapeForAuxiliaFormationName, getStatsForAuxiliaModelType } from "./auxiliaList.ts";
import { AllAuxiliaModelTypes, AuxiliaDetachmentName, AuxiliaFormationName, AuxiliaFormationNames, AuxiliaModelType } from "./auxiliaTypes.ts";
import { getStatsForLegionModelType, getLegionDetachmentConfigurationForDetachmentName, getLegionDetachmentNamesForSlot, getShapeForLegionFormationName } from "./legionList.ts";
import { AllLegionModelTypes, LegionDetachmentName, LegionFormationName, LegionFormationNames, LegionModelType } from "./legionTypes.ts";
import { getCollegiaTitanicaDetachmentNamesForSlot, getQuestorisFamiliaDetachmentNamesForSlot, getShapeForCollegiaTitanicaFormationName, getShapeForQuestorisFamiliaFormationName, getShapeForStrategicAssetFormationName, getStatsForStrategicAssetModelType, getStrategicAssetDetachmentConfigurationForDetachmentName, getStrategicAssetDetachmentNamesForSlot } from "./strategicAssetList.ts";
import { AllStrategicAssetModelTypes, CollegiaTitanicaFormationName, CollegiaTitanicaFormationNames, QuestorisFamiliaFormationName, QuestorisFamiliaFormationNames, StrategicAssetDetachmentName, StrategicAssetFormationName, StrategicAssetFormationNames, StrategicAssetModelType } from "./strategicAssetTypes.ts";
import { Allegiance, ArmyListName, DetachmentConfiguration, DetachmentName, FormationShape, FormationSlot, FormationName, ModelType, Stats } from "./types.ts";


const formationTypesForArmyListName: Map<ArmyListName, FormationName[]> = new Map([
    //yes this is bad, but whatever
    ["Collegia Titanica", CollegiaTitanicaFormationNames as unknown as FormationName[]], 
    ["Legions Astartes", LegionFormationNames as unknown as FormationName[]], 
    ["Questoris Familia", QuestorisFamiliaFormationNames as unknown as FormationName[]],
    ["Solar Auxilia", AuxiliaFormationNames as unknown as FormationName[]],
    ["Strategic Asset", StrategicAssetFormationNames as unknown as FormationName[]],
]);

export function getFormationTypesForArmyListName(armyListName: ArmyListName | "") {
    if(armyListName === "")
        return [];
    return formationTypesForArmyListName.get(armyListName) ?? [];
}

export function getShapeForFormationName(armyListName: ArmyListName | "", formationName: FormationName | ""): FormationShape {
    if(armyListName == "") return { slotRequirements: [] };
    if(formationName == "") return { slotRequirements: [] };

    switch(armyListName) {
        case "Collegia Titanica":
            return getShapeForCollegiaTitanicaFormationName(formationName as CollegiaTitanicaFormationName);
        case "Legions Astartes":
            return getShapeForLegionFormationName(formationName as LegionFormationName);
        case "Questoris Familia":
            return getShapeForQuestorisFamiliaFormationName(formationName as QuestorisFamiliaFormationName);
        case "Solar Auxilia":
            return getShapeForAuxiliaFormationName(formationName as AuxiliaFormationName);
        case "Strategic Asset":
            return getShapeForStrategicAssetFormationName(formationName as StrategicAssetFormationName);
    }
}

export function getDetachmentNamesForSlot(armyListName: ArmyListName, slot: FormationSlot, allegiance: Allegiance | ""): DetachmentName[] {
    switch(armyListName) {
        case "Collegia Titanica":
            return getCollegiaTitanicaDetachmentNamesForSlot(slot, allegiance);
        case "Legions Astartes":
            return getLegionDetachmentNamesForSlot(slot);
        case "Questoris Familia":
            return getQuestorisFamiliaDetachmentNamesForSlot(slot, allegiance);
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
        case "Questoris Familia":
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
