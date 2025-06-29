import { getAuxiliaDetachmentConfigurationForDetachmentName, getAuxiliaDetachmentNamesForSlot, getShapeForAuxiliaFormationName, getStatsForAuxiliaModelType } from "./auxiliaList.ts";
import { AllAuxiliaModelNames, AuxiliaDetachmentName, AuxiliaFormationName, AuxiliaFormationNames, AuxiliaModelName } from "./auxiliaTypes.ts";
import { getStatsForLegionModelType, getLegionDetachmentConfigurationForDetachmentName, getLegionDetachmentNamesForSlot, getShapeForLegionFormationName } from "./legionList.ts";
import { AllLegionModelNames, LegionDetachmentName, LegionFormationName, LegionFormationNames, LegionModelName } from "./legionTypes.ts";
import { getDarkMechanicumDetachmentNamesForSlot, getMechanicumDetachmentConfigurationForDetachmentName, getMechanicumDetachmentNamesForSlot, getShapeForDarkMechanicumFormationName, getShapeForMechanicumFormationName, getStatsForMechanicumModelName } from "./mechanicumList.ts";
import { DarkMechanicumFormationName, DarkMechanicumFormationNames, DarkMechanicumModelName, DarkMechanicumModelNames, MechanicumDetachmentName, MechanicumFormationName, MechanicumFormationNames, MechanicumModelName, MechanicumModelNames } from "./mechanicumTypes.ts";
import { getCollegiaTitanicaDetachmentNamesForSlot, getQuestorisFamiliaDetachmentNamesForSlot, getShapeForCollegiaTitanicaFormationName, getShapeForQuestorisFamiliaFormationName, getShapeForStrategicAssetFormationName, getStatsForStrategicAssetModelType, getStrategicAssetDetachmentConfigurationForDetachmentName, getStrategicAssetDetachmentNamesForSlot } from "./strategicAssetList.ts";
import { AllStrategicAssetModelNames, CollegiaTitanicaFormationName, CollegiaTitanicaFormationNames, QuestorisFamiliaFormationName, QuestorisFamiliaFormationNames, StrategicAssetDetachmentName, StrategicAssetFormationName, StrategicAssetFormationNames, StrategicAssetModelName } from "./strategicAssetTypes.ts";
import { Allegiance, ArmyListName, DetachmentConfiguration, DetachmentName, FormationShape, FormationSlot, FormationName, ModelName, Stats } from "./types.ts";


const formationNamesForArmyListName: Map<ArmyListName, FormationName[]> = new Map([
    //yes this is bad, but whatever
    ["Collegia Titanica", CollegiaTitanicaFormationNames as unknown as FormationName[]], 
    ["Dark Mechanicum", DarkMechanicumFormationNames as unknown as FormationName[]],
    ["Legiones Astartes", LegionFormationNames as unknown as FormationName[]], 
    ["Legions Astartes" as ArmyListName, LegionFormationNames as unknown as FormationName[]], 
    ["Mechanicum Taghmata", MechanicumFormationNames as unknown as FormationName[]],
    ["Questoris Familia", QuestorisFamiliaFormationNames as unknown as FormationName[]],
    ["Solar Auxilia", AuxiliaFormationNames as unknown as FormationName[]],
    ["Strategic Asset", StrategicAssetFormationNames as unknown as FormationName[]],
]);

export function getFormationNamesForArmyListName(armyListName: ArmyListName | "") {
    if(armyListName === "")
        return [];
    return formationNamesForArmyListName.get(armyListName) ?? [];
}

export function getShapeForFormationName(armyListName: ArmyListName | "", formationName: FormationName | ""): FormationShape {
    if(armyListName == "") return { slotRequirements: [] };
    if(formationName == "") return { slotRequirements: [] };

    switch(armyListName) {
        case "Collegia Titanica":
            return getShapeForCollegiaTitanicaFormationName(formationName as CollegiaTitanicaFormationName);
        case "Dark Mechanicum":
            return getShapeForDarkMechanicumFormationName(formationName as DarkMechanicumFormationName)
        case "Legiones Astartes":
            return getShapeForLegionFormationName(formationName as LegionFormationName);
        case "Legions Astartes" as ArmyListName:
            return getShapeForLegionFormationName(formationName as LegionFormationName);
        case "Mechanicum Taghmata":
            return getShapeForMechanicumFormationName(formationName as MechanicumFormationName)
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
        case "Dark Mechanicum":
                return getDarkMechanicumDetachmentNamesForSlot(slot, allegiance);
        case "Legiones Astartes":
            return getLegionDetachmentNamesForSlot(slot);
        case "Legions Astartes" as ArmyListName:
            return getLegionDetachmentNamesForSlot(slot);
        case "Mechanicum Taghmata":
            return getMechanicumDetachmentNamesForSlot(slot, allegiance);
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
        case "Legiones Astartes":
        case "Legions Astartes" as ArmyListName:
            return getLegionDetachmentConfigurationForDetachmentName(detachmentName as LegionDetachmentName);
        case "Solar Auxilia":
            return getAuxiliaDetachmentConfigurationForDetachmentName(detachmentName as AuxiliaDetachmentName);
        case "Dark Mechanicum":
        case "Mechanicum Taghmata":
            return getMechanicumDetachmentConfigurationForDetachmentName(detachmentName as MechanicumDetachmentName);
        case "Questoris Familia":
        case "Strategic Asset":
        case "Collegia Titanica":
            return getStrategicAssetDetachmentConfigurationForDetachmentName(detachmentName as StrategicAssetDetachmentName);
    }
}

export function getStatsForModelName(modelName: ModelName): Stats | undefined {
    if(AllLegionModelNames.findIndex(a=>a==modelName) != -1) {
        return getStatsForLegionModelType(modelName as LegionModelName);
    }
    if(AllStrategicAssetModelNames.findIndex(a=>a==modelName) != -1) {
        return getStatsForStrategicAssetModelType(modelName as StrategicAssetModelName);
    }
    if(AllAuxiliaModelNames.findIndex(a=>a==modelName) != -1) {
        return getStatsForAuxiliaModelType(modelName as AuxiliaModelName);
    }
    if(MechanicumModelNames.findIndex(a=>a==modelName) != -1) {
        return getStatsForMechanicumModelName(modelName as MechanicumModelName)
    }
    if(DarkMechanicumModelNames.findIndex(a=>a==modelName) != -1) {
        return getStatsForMechanicumModelName(modelName as DarkMechanicumModelName)
    }
}
