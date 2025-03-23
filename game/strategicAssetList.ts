import { Detachment, DetachmentConfiguration, FormationShape, FormationSlot, StrategicAssetDetachmentType, StrategicAssetFormationType } from "./types.ts";

const formationShapes = new Map<StrategicAssetFormationType, FormationShape>([
    [ "Knight Household Lance", { slotRequirements: [
        {   slot: "Knight",     slotRequirementType: "Required" },
    ]}],
    [ "Legion Support", { slotRequirements: [
        {   slot: "Titan",      slotRequirementType: "Required" },
    ]}]
]);

export function getShapeForStrategicAssetFormationType(formationType: StrategicAssetFormationType | ""): FormationShape {
    if(formationType == "") return { slotRequirements: [] };
    return formationShapes.get(formationType) ?? { slotRequirements: [] };
}

const detachmentTypesForSlot = new Map<FormationSlot, StrategicAssetDetachmentType[]>([
    [ "Knight", [ 
        "Questoris Knight Banner"
    ] ],
    [ "Titan", [
        "Warhound Hunting Pack"
    ]]
]);

export function getStrategicAssetDetachmentTypesForSlot(slot: FormationSlot): StrategicAssetDetachmentType[] {
    return detachmentTypesForSlot.get(slot) ?? [];
}

const detachmentConfigurationForDetachmentType: Map<StrategicAssetDetachmentType, DetachmentConfiguration> = new Map([
    ["Questoris Knight Banner", {minModels: 1, 
        customValidation: (detachment: Detachment) => {
            console.log("Questoris Knight Banner custom val")
            //max 3 knights
            const questorisKnights = ["Knight Crusader", "Knight Errant", "Knight Gallant", "Knight Magaera", "Knight Paladin", "Knight Styrix"];
            let numQuestorisKnights = 0;
            for(let i= 0; i < questorisKnights.length; ++i) {
                const k = detachment.modelGroups.find(m=>m.modelType == questorisKnights[i]);
                numQuestorisKnights += k?.modelLoadoutGroups.reduce((p, g)=> p + g.number, 0) ?? 0;
            }
            if(numQuestorisKnights > 3)
                return {valid: false, error: "Too many models in detachment", data: "max 3 Questoris knights"};
            if(numQuestorisKnights == 0)
                return {valid: false, error: "Too few models in detachment", data: "min 1 Questoris knight"};

            const armigerKnights = ["Knight Armiger", "Knight Moirax"];
            let numArmigerKnights = 0;
            for(let i= 0; i < armigerKnights.length; ++i) {
                const k = detachment.modelGroups.find(m=>m.modelType == armigerKnights[i]);
                const num = k?.modelLoadoutGroups.reduce((p, g)=> p + g.number, 0) ?? 0;
                if(num > 3)
                    return {valid: false, error: "Too many models in detachment", data: "Max 3 " + armigerKnights[i]};
                if(num < 3 && num != 0)
                    return {valid: false, error: "Too few models in detachment", data: "Must be 0 or 3 " + armigerKnights[i]};
                numArmigerKnights += num;
            }

            if(numArmigerKnights > 3)
                return {valid: false, error: "Too many models in detachment", data: "may have either Armigers or Moiraxes but not both"};

            return {valid: true}
        },
        modelGroupShapes: [
            
            {modelType: "Knight Crusader", modelLoadoutSlots: [
                {name: "Carapace", possibleModelLoadouts: [
                    {loadout: "Nothing", points: 0}, 
                    {loadout: "Rocket pods", points: 5},
                ]}
            ], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 1, points: 180}, {num: 2, points: 180+180}, {num: 3, points: 180+340}
            ]},
            {modelType: "Knight Errant", modelLoadoutSlots: [
                {name: "Close combat", possibleModelLoadouts: [
                    {loadout: "Reaper chainsword", points: 0}, 
                    {loadout: "Thunderstrike gauntlet", points: 2},
                ]},
                {name: "Carapace", possibleModelLoadouts: [
                    {loadout: "Nothing", points: 0}, 
                    {loadout: "Rocket pods", points: 5},
                ]}
            ], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 1, points: 180}, {num: 2, points: 180+180}, {num: 3, points: 180+340}
            ]},
            {modelType: "Knight Gallant", modelLoadoutSlots: [
                {name: "Close combat 2", possibleModelLoadouts: [
                    {loadout: "Reaper chainsword", points: 0}, 
                    {loadout: "Thunderstrike gauntlet", points: 2},
                ]},
                {name: "Carapace", possibleModelLoadouts: [
                    {loadout: "Nothing", points: 0}, 
                    {loadout: "Rocket pods", points: 5},
                ]}
            ], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 1, points: 180}, {num: 2, points: 180+180}, {num: 3, points: 180+340}
            ]},
            {modelType: "Knight Magaera", modelLoadoutSlots: [
            ], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 1, points: 180+15}, {num: 2, points: 180+180+15*2}, {num: 3, points: 180+340+15*3}
            ]},
            {modelType: "Knight Paladin", modelLoadoutSlots: [
                {name: "Close combat", possibleModelLoadouts: [
                    {loadout: "Reaper chainsword", points: 0}, 
                    {loadout: "Thunderstrike gauntlet", points: 2},
                ]},
                {name: "Carapace", possibleModelLoadouts: [
                    {loadout: "Nothing", points: 0}, 
                    {loadout: "Rocket pods", points: 5},
                ]}
            ], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 1, points: 180}, {num: 2, points: 180+180}, {num: 3, points: 180+340}
            ]},
            {modelType: "Knight Styrix", modelLoadoutSlots: [
            ], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 1, points: 180+15}, {num: 2, points: 180+180+15*2}, {num: 3, points: 180+340+15*3}
            ]},
            {modelType: "Knight Warden", modelLoadoutSlots: [
                {name: "Close combat", possibleModelLoadouts: [
                    {loadout: "Reaper chainsword", points: 0}, 
                    {loadout: "Thunderstrike gauntlet", points: 2},
                ]},
                {name: "Carapace", possibleModelLoadouts: [
                    {loadout: "Nothing", points: 0}, 
                    {loadout: "Rocket pods", points: 5},
                ]}
            ], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 1, points: 180}, {num: 2, points: 180+180}, {num: 3, points: 180+340}
            ]},
            {modelType: "Knight Armiger", modelLoadoutSlots: [
                {name: "Close combat", possibleModelLoadouts: [
                    {loadout: "Reaper chain-cleaver", points: 0}, 
                    {loadout: "Armiger autocannon", points: 0},
                ]},
            ], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 3, points: 180}
            ]},
            {modelType: "Knight Moirax", modelLoadoutSlots: [
                {name: "Close combat", possibleModelLoadouts: [
                    {loadout: "Armiger lightning locks", points: 0}, 
                    {loadout: "Volkite veuglaire", points: 0},
                ]},
            ], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 3, points: 200}
            ]},
        ]
    }],
]);

export function getStrategicAssetDetachmentConfigurationForDetachmentType(detachmentType: StrategicAssetDetachmentType): DetachmentConfiguration {
    return detachmentConfigurationForDetachmentType.get(detachmentType) ?? {modelGroupShapes: []}
}