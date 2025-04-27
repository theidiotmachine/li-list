import { MechanicumDetachmentName, MechanicumFormationName } from "./mechanicumTypes.ts";
import { Allegiance, DetachmentConfiguration, DetachmentName, FormationShape, FormationSlot } from "./types.ts";

const formationShapes = new Map<MechanicumFormationName, FormationShape>([
    ["Autokratorii Regiment", {slotRequirements: [
        {   slot: "Battle Tank",    slotRequirementType: "Required"                 },
        {   slot: "Battle Tank",    slotRequirementType: "Required"                 },
        {   slot: "Battle Tank",    slotRequirementType: "Required"                 },
        {   slot: "HQ",             slotRequirementType: "Optional"                 },
        {   slot: "Tech-Priest Auxilia", slotRequirementType: "Optional"            },
        {   slot: "Transport",      slotRequirementType: "Optional"                 },
        {   slot: "Support",        slotRequirementType: "Optional"                 },
        {   slot: "Support",        slotRequirementType: "Optional"                 },
        {   slot: "Transport",      slotRequirementType: "Optional"                 },
    ]}]
]);

export function getShapeForMechanicumFormationName(formationName: MechanicumFormationName | ""): FormationShape {
    if(formationName == "") return { slotRequirements: [] };
    return formationShapes.get(formationName) ?? { slotRequirements: [] };
}

const detachmentNamesForSlot = new Map<FormationSlot, MechanicumDetachmentName[]>([
]);

export function getMechanicumDetachmentNamesForSlot(slot: FormationSlot, allegiance: Allegiance | ""): MechanicumDetachmentName[] {
    return detachmentNamesForSlot.get(slot) ?? [];
}
const detachmentConfigurationForDetachmentName: Map<DetachmentName, DetachmentConfiguration> = new Map([
]);

export function getMechanicumDetachmentConfigurationForDetachmentName(detachmentName: MechanicumDetachmentName): DetachmentConfiguration {
    return detachmentConfigurationForDetachmentName.get(detachmentName) ?? {modelGroupShapes: []}
}