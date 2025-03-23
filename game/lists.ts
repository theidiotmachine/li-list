import { getAuxiliaDetachmentConfigurationForDetachmentType, getAuxiliaDetachmentTypesForSlot, getShapeForAuxiliaFormationType } from "./auxiliaList.ts";
import { getStatsForLegionModelType, getLegionDetachmentConfigurationForDetachmentType, getLegionDetachmentTypesForSlot, getShapeForLegionFormationType } from "./legionList.ts";
import { getShapeForStrategicAssetFormationType, getStrategicAssetDetachmentConfigurationForDetachmentType, getStrategicAssetDetachmentTypesForSlot } from "./strategicAssetList.ts";
import { AllLegionModelTypes, ArmyListName, AuxiliaDetachmentType, AuxiliaFormationType, AuxiliaFormationTypes, DetachmentConfiguration, DetachmentType, FormationShape, FormationSlot, FormationType, LegionDetachmentType, LegionFormationType, LegionFormationTypes, LegionModelType, ModelType, Stats, StrategicAssetDetachmentType, StrategicAssetFormationType, StrategicAssetFormationTypes } from "./types.ts";


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

export function getDetachmentTypesForSlot(armyListName: ArmyListName, slot: FormationSlot): DetachmentType[] {
    switch(armyListName) {
        case "Legions Astartes":
            return getLegionDetachmentTypesForSlot(slot);
        case "Solar Auxilia":
            return getAuxiliaDetachmentTypesForSlot(slot);
        case "Strategic Asset":
            return getStrategicAssetDetachmentTypesForSlot(slot);
    }
}

export function getDetachmentConfigurationForDetachmentType(armyListName: ArmyListName, detachmentType: DetachmentType): DetachmentConfiguration {
    switch(armyListName) {
        case "Legions Astartes":
            return getLegionDetachmentConfigurationForDetachmentType(detachmentType as LegionDetachmentType);
        case "Solar Auxilia":
            return getAuxiliaDetachmentConfigurationForDetachmentType(detachmentType as AuxiliaDetachmentType);
        case "Strategic Asset":
            return getStrategicAssetDetachmentConfigurationForDetachmentType(detachmentType as StrategicAssetDetachmentType);
    }
}

export function getStatsForModelType(modelType: ModelType): Stats | undefined {
    if(AllLegionModelTypes.findIndex(a=>a==modelType) != -1) {
        return getStatsForLegionModelType(modelType as LegionModelType);
    }
}