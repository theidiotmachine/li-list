import { Detachment, DetachmentConfiguration, DetachmentValidationState, FormationShape, FormationSlot, Stats, StrategicAssetDetachmentType, StrategicAssetFormationType, StrategicAssetModelType } from "./types.ts";

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
        "Acastus Knight Banner",
        "Cerastus Knight Banner",
        "Questoris Knight Banner",
    ] ],
    [ "Titan", [
        "Warhound Hunting Pack"
    ]]
]);

export function getStrategicAssetDetachmentTypesForSlot(slot: FormationSlot): StrategicAssetDetachmentType[] {
    return detachmentTypesForSlot.get(slot) ?? [];
}

const validateTalons = (detachment: Detachment): DetachmentValidationState => {
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
};

const detachmentConfigurationForDetachmentType: Map<StrategicAssetDetachmentType, DetachmentConfiguration> = new Map([
    ["Acastus Knight Banner", {minModels: 1, 
        customValidation: (detachment: Detachment): DetachmentValidationState => {
            //max 2 knights
            const acastusKnights = ["Acastus Knight Asterius", "Acastus Knight Porphyrion"];
            let numAcastusKnights = 0;
            for(let i= 0; i < acastusKnights.length; ++i) {
                const k = detachment.modelGroups.find(m=>m.modelType == acastusKnights[i]);
                if(k === undefined) continue;
                //stupid asterius is not configurable
                if(i == 0)
                    numAcastusKnights += k.number;
                else 
                    numAcastusKnights += (k.modelLoadoutGroups.reduce((p, g)=> p + g.number, 0) ?? 0);
            }
            if(numAcastusKnights > 2)
                return {valid: false, error: "Too many models in detachment", data: "max 2 Acastus knights"};
            if(numAcastusKnights == 0)
                return {valid: false, error: "Too few models in detachment", data: "min 1 Acastus knight"};

            return validateTalons(detachment);
        },
        modelGroupShapes: [
            {modelType: "Acastus Knight Asterius", modelLoadoutSlots: [
            ], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 1, points: 250+20}, {num: 2, points: 250+250+20*2}
            ]},
            {modelType: "Acastus Knight Porphyrion", modelLoadoutSlots: [
                {name: "Body", possibleModelLoadouts: [
                    {loadout: "Acastus lascannon", points: 0}, 
                    {loadout: "Acastus autocannon", points: 0},
                ]},
                {name: "Carapace", possibleModelLoadouts: [
                    {loadout: "Ironstorm missile pod", points: 0}, 
                    {loadout: "Helios defence missiles", points: 0},
                ]}
            ], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 1, points: 250}, {num: 2, points: 250+250}
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
    ["Cerastus Knight Banner", {minModels: 1, 
        customValidation: (detachment: Detachment): DetachmentValidationState => {
            //max 3 knights
            const cerastusKnights = ["Cerastus Knight Atrapos", "Knight Acheron", "Knight Castigator", "Knight Lancer"];
            let numCerastusKnights = 0;
            for(let i= 0; i < cerastusKnights.length; ++i) {
                const k = detachment.modelGroups.find(m=>m.modelType == cerastusKnights[i]);
                if(k === undefined) continue;
                numCerastusKnights += k.number;
            }
            if(numCerastusKnights > 3)
                return {valid: false, error: "Too many models in detachment", data: "max 3 Cerastus knights"};
            if(numCerastusKnights == 0)
                return {valid: false, error: "Too few models in detachment", data: "min 1 Cerastus knight"};

            return validateTalons(detachment);
        },
        modelGroupShapes: [
            {modelType: "Cerastus Knight Atrapos", modelLoadoutSlots: [], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 1, points: 215+20}, {num: 2, points: 215+200+20*2}, {num: 3, points: 215+390+20*3}
            ]},
            {modelType: "Knight Acheron", modelLoadoutSlots: [], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 1, points: 215}, {num: 2, points: 215+200}, {num: 3, points: 215+390}
            ]},
            {modelType: "Knight Castigator", modelLoadoutSlots: [], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 1, points: 215}, {num: 2, points: 215+200}, {num: 3, points: 215+390}
            ]},
            {modelType: "Knight Lancer", modelLoadoutSlots: [], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 1, points: 215}, {num: 2, points: 215+200}, {num: 3, points: 215+390}
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
        ]}
    ],
    ["Questoris Knight Banner", {minModels: 1, 
        customValidation: (detachment: Detachment): DetachmentValidationState => {
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

            return validateTalons(detachment);
        },
        modelGroupShapes: [
            {modelType: "Knight Crusader", modelLoadoutSlots: [
                {name: "Carapace", possibleModelLoadouts: [
                    {loadout: "Nothing", points: 0}, 
                    {loadout: "Rocket pods", points: 5},
                ]},
                {name: "Primary", possibleModelLoadouts: [
                    {loadout: "Questoris-avenger gatling cannon", points: 0}, 
                    {loadout: "Rapid-fire battlecannon", points: 0},
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
const statsForModelType = new Map<StrategicAssetModelType, Stats>([
    ["Knight Crusader", {
        unitType: "Knight", scale: 4, advance: 8, charge: 16, march: 16, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 4, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 8, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        weaponTypes: ["Heavy stubber", "Questoris-avenger gatling cannon", "Rapid-fire battlecannon", "Thermal cannon"],
        unitTraits: ["Independent", "Nimble"]
    }]
]);

export function getStatsForStrategicAssetModelType(modelType: StrategicAssetModelType): Stats | undefined {
    return statsForModelType.get(modelType)
}