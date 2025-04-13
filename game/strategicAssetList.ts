import { Allegiance, Detachment, DetachmentConfiguration, DetachmentValidationState, FormationShape, FormationSlot, Stats, StrategicAssetDetachmentType, StrategicAssetFormationType, StrategicAssetModelType } from "./types.ts";

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
type DetachmentTypeData = {
    detachmentType: StrategicAssetDetachmentType;
    allegiance?: Allegiance;
}

const detachmentTypesForSlot = new Map<FormationSlot, DetachmentTypeData[]>([
    [ "Knight", [ 
        { detachmentType: "Acastus Knight Banner" },
        { detachmentType: "Cerastus Knight Banner" },
        { detachmentType: "Questoris Knight Banner" },
    ] ],
    [ "Titan", [
        { detachmentType: "Dire Wolf Heavy Scout Titan" },
        { detachmentType: "Reaver Battle Titan" },
        { detachmentType: "Warhound Hunting Pack" },
        { detachmentType: "Warbringer Nemesis Titan" },
        { detachmentType: "Warlord Battle Titan" },
        { detachmentType: "Warlord-Sinister Battle Titan", allegiance: "Loyalist" },
    ]]
]);

export function getStrategicAssetDetachmentTypesForSlot(slot: FormationSlot, allegiance: Allegiance | ""): StrategicAssetDetachmentType[] {
    return (detachmentTypesForSlot.get(slot) ?? []).filter((t)=>t.allegiance == undefined || t.allegiance == allegiance).map((t)=>t.detachmentType);
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
                    {loadout: "Nothing", points: 0, weaponTypes: []}, 
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
                    {loadout: "Nothing", points: 0, weaponTypes: []}, 
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
                    {loadout: "Nothing", points: 0, weaponTypes: []}, 
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
                    {loadout: "Nothing", points: 0, weaponTypes: []}, 
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
    ["Warhound Hunting Pack", {minModels: 1, modelGroupShapes: [
        {modelType: "Warhound Titan", modelLoadoutSlots: [
            {name: "Left", possibleModelLoadouts: [
                {loadout: "Conversion beam dissolutor", points: 0},
                {loadout: "Graviton eradicator", points: 0},
                {loadout: "Incisor pattern melta lance", points: 0},
                {loadout: "Inferno gun", points: 0},
                {loadout: "Natrix shock lance", points: 0},
                {loadout: "Plasma blastgun", points: 0},
                {loadout: "Turbo-laser destructor", points: 0},
                {loadout: "Ursus claw", points: 0},
                {loadout: "Volkite eradicator", points: 0},
                {loadout: "Vulcan mega-bolter", points: 0},
                {loadout: "Warhound shudder missiles", points: 0},
                {loadout: "Warhound swarmer missiles", points: 0},
            ]},
            {name: "Right", possibleModelLoadouts: [
                {loadout: "Conversion beam dissolutor", points: 0},
                {loadout: "Graviton eradicator", points: 0},
                {loadout: "Incisor pattern melta lance", points: 0},
                {loadout: "Inferno gun", points: 0},
                {loadout: "Natrix shock lance", points: 0},
                {loadout: "Plasma blastgun", points: 0},
                {loadout: "Turbo-laser destructor", points: 0},
                {loadout: "Ursus claw", points: 0},
                {loadout: "Volkite eradicator", points: 0},
                {loadout: "Vulcan mega-bolter", points: 0},
                {loadout: "Warhound shudder missiles", points: 0},
                {loadout: "Warhound swarmer missiles", points: 0},
            ]}
        ], possibleModelGroupQuantities: [
            {num: 1, points: 330}, {num: 2, points: 660}, {num: 3, points: 330+640}
        ]},
    ]}],
    ["Dire Wolf Heavy Scout Titan", {modelGroupShapes: [
        {modelType: "Dire Wolf Titan", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Conversion beam dissipator", points: 0},
                {loadout: "Neutron laser", points: 0},
                {loadout: "Volcanon cannon", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 1, points: 385}
        ]},
    ]}],
    ["Reaver Battle Titan", {modelGroupShapes: [
        {modelType: "Reaver Battle Titan", modelLoadoutSlots: [
            {name: "Left", possibleModelLoadouts: [
                {loadout: "Reaver chainfist", points: 0},
                {loadout: "Reaver gatling blaster", points: 0},
                {loadout: "Reaver laser blaster", points: 0},
                {loadout: "Reaver melta cannon", points: 0},
                {loadout: "Reaver power fist", points: 0},
                {loadout: "Reaver volcano cannon", points: 0},
            ]},
            {name: "Right", possibleModelLoadouts: [
                {loadout: "Reaver chainfist", points: 0},
                {loadout: "Reaver gatling blaster", points: 0},
                {loadout: "Reaver laser blaster", points: 0},
                {loadout: "Reaver melta cannon", points: 0},
                {loadout: "Reaver power fist", points: 0},
                {loadout: "Reaver volcano cannon", points: 0},
            ]},
            {name: "Carapace", possibleModelLoadouts: [
                {loadout: "Reaver apocalypse missile launcher", points: 0},
                {loadout: "Reaver Vulcan mega-bolter", points: 0},
                {loadout: "Reaver Titan warp missile", points: 0},
                {loadout: "Reaver turbo-laser destructor", points: 0},
                {loadout: "Reaver volkite eradicator", points: 0},
                {loadout: "Reaver graviton eradicator", points: 0},
                {loadout: "Reaver conversion beam dissolutor", points: 0},
            ]}
        ], possibleModelGroupQuantities: [
            {num: 1, points: 415}
        ]},
    ]}],
    ["Warbringer Nemesis Titan", {modelGroupShapes: [
        {modelType: "Warbringer Nemesis Titan", modelLoadoutSlots: [
            {name: "Left", possibleModelLoadouts: [
                {loadout: "Reaver gatling blaster", points: 0},
                {loadout: "Reaver laser blaster", points: 0},
                {loadout: "Reaver melta cannon", points: 0},
                {loadout: "Reaver volcano cannon", points: 0},
            ]},
            {name: "Right", possibleModelLoadouts: [
                {loadout: "Reaver gatling blaster", points: 0},
                {loadout: "Reaver laser blaster", points: 0},
                {loadout: "Reaver melta cannon", points: 0},
                {loadout: "Reaver volcano cannon", points: 0},
            ]},
            {name: "Carapace", possibleModelLoadouts: [
                {loadout: "Mori quake cannon", points: 0},
                {loadout: "Belicosa volcano cannon", points: 0},
            ]}
        ], possibleModelGroupQuantities: [
            {num: 1, points: 525}
        ]},
    ]}],
    ["Warlord Battle Titan", {modelGroupShapes: [
        {modelType: "Warlord Battle Titan", modelLoadoutSlots: [
            {name: "Left", possibleModelLoadouts: [
                {loadout: "Belicosa volcano cannon", points: 0},
                {loadout: "Sunfury plasma annihilator", points: 0},
                {loadout: "Macro-gatling blaster", points: 0},
                {loadout: "Mori quake cannon", points: 0},
                {loadout: "Arioch power claw", points: 0},
                {loadout: "Volkite destructor", points: 0},
                {loadout: "Warlord graviton ruinator", points: 0},
                {loadout: "Conversion beam extripator", points: 0},
            ]},
            {name: "Right", possibleModelLoadouts: [
                {loadout: "Belicosa volcano cannon", points: 0},
                {loadout: "Sunfury plasma annihilator", points: 0},
                {loadout: "Macro-gatling blaster", points: 0},
                {loadout: "Mori quake cannon", points: 0},
                {loadout: "Arioch power claw", points: 0},
                {loadout: "Volkite destructor", points: 0},
                {loadout: "Warlord graviton ruinator", points: 0},
                {loadout: "Conversion beam extripator", points: 0},
            ]},
            {name: "Carapace", possibleModelLoadouts: [
                {loadout: "Apocalypse missile launchers", points: 0},
                {loadout: "Paired gatling blasters", points: 0},
                {loadout: "Paired turbo-laser destructors", points: 0},
                {loadout: "Vulcan mega-bolter array", points: 0},
                {loadout: "Paired laser blaster", points: 0},
            ]}
        ], possibleModelGroupQuantities: [
            {num: 1, points: 600}
        ]}
    ]}],
    ["Warlord-Sinister Battle Titan", {modelGroupShapes: [
        {modelType: "Warlord-Sinister", modelLoadoutSlots: [
            {name: "Right", possibleModelLoadouts: [
                {loadout: "Belicosa volcano cannon", points: 0},
                {loadout: "Sunfury plasma annihilator", points: 0},
                {loadout: "Macro-gatling blaster", points: 0},
                {loadout: "Mori quake cannon", points: 0},
                {loadout: "Arioch power claw", points: 0},
                {loadout: "Volkite destructor", points: 0},
                {loadout: "Warlord graviton ruinator", points: 0},
                {loadout: "Conversion beam extripator", points: 0},
            ]},
            {name: "Carapace", possibleModelLoadouts: [
                {loadout: "Apocalypse missile launchers", points: 0},
                {loadout: "Paired gatling blasters", points: 0},
                {loadout: "Paired turbo-laser destructors", points: 0},
                {loadout: "Vulcan mega-bolter array", points: 0},
                {loadout: "Paired laser blaster", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 1, points: 675}
        ]}
    ]}],
    ["Warmaster Heavy Battle Titan", {modelGroupShapes: [
        {modelType: "Warmaster Titan", modelLoadoutSlots: [
            {name: "Left", possibleModelLoadouts: [
                {loadout: "Apocalypse missile array", points: 0},
                {loadout: "Melta cannon", points: 0},
                {loadout: "Inferno gun", points: 0},
                {loadout: "Vulcan mega-bolter", points: 0},
                {loadout: "Turbo-laser destructor", points: 0},
                {loadout: "Plasma blastgun", points: 0},
            ]},
            {name: "Right", possibleModelLoadouts: [
                {loadout: "Apocalypse missile array", points: 0},
                {loadout: "Melta cannon", points: 0},
                {loadout: "Inferno gun", points: 0},
                {loadout: "Vulcan mega-bolter", points: 0},
                {loadout: "Turbo-laser destructor", points: 0},
                {loadout: "Plasma blastgun", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 1, points: 750}
        ]}
    ]}],
    ["Warmaster Iconoclast Titan", {modelGroupShapes: [
        {modelType: "Warmaster Iconoclast", modelLoadoutSlots: [
            {name: "Left", possibleModelLoadouts: [
                {loadout: "Apocalypse missile array", points: 0},
                {loadout: "Melta cannon", points: 0},
                {loadout: "Inferno gun", points: 0},
                {loadout: "Vulcan mega-bolter", points: 0},
                {loadout: "Turbo-laser destructor", points: 0},
                {loadout: "Plasma blastgun", points: 0},
            ]},
            {name: "Right", possibleModelLoadouts: [
                {loadout: "Apocalypse missile array", points: 0},
                {loadout: "Melta cannon", points: 0},
                {loadout: "Inferno gun", points: 0},
                {loadout: "Vulcan mega-bolter", points: 0},
                {loadout: "Turbo-laser destructor", points: 0},
                {loadout: "Plasma blastgun", points: 0},
            ]},
            {name: "Melee", possibleModelLoadouts: [
                {loadout: "Kirus siege drill", points: 0},
                {loadout: "Kirus grav imploder", points: 10},
            ]}
        ], possibleModelGroupQuantities: [
            {num: 1, points: 750}
        ]}
    ]}]
]);

export function getStrategicAssetDetachmentConfigurationForDetachmentType(detachmentType: StrategicAssetDetachmentType): DetachmentConfiguration {
    return detachmentConfigurationForDetachmentType.get(detachmentType) ?? {modelGroupShapes: []}
}
const statsForModelType = new Map<StrategicAssetModelType, Stats>([
    ["Acastus Knight Asterius", {
        unitType: "Knight", scale: 4, move: 6, saves: [
            {saveType: "Armour", save: 2, arc: "Front"}, {saveType: "Armour", save: 3, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 4, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 7, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        weaponTypes: [],//TODO
        requiredWeaponTypes: [],//TODO
        unitTraits: ["Blessed Auto-simulacra", "Independent"],
    }],
    ["Acastus Knight Porphyrion", {
        unitType: "Knight", scale: 4, move: 6, saves: [
            {saveType: "Armour", save: 2, arc: "Front"}, {saveType: "Armour", save: 3, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 4, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 7, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        weaponTypes: ["Acastus autocannon", "Acastus lascannon", "Twin magna lascannon"],//TODO
        requiredWeaponTypes: ["Twin magna lascannon"],//TODO
        unitTraits: ["Blessed Auto-simulacra", "Independent"],
    }],
    ["Cerastus Knight Atrapos", {
        unitType: "Knight", scale: 4, move: 9, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 3, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 11, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        weaponTypes: ["Atrapos lascutter", "Graviton singularity cannon"],
        requiredWeaponTypes: ["Atrapos lascutter", "Graviton singularity cannon"],
        unitTraits: ["Furious Charge", "Independent", "Macro-extinction Targeting Protocols", "Nimble"]
    }],
    ["Knight Acheron", {
        unitType: "Knight", scale: 4, move: 9, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 4, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 11, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        weaponTypes: ["Acheron pattern flame cannon", "Reaper chainfist", "In-built twin-linked heavy bolters"],
        requiredWeaponTypes: ["Acheron pattern flame cannon", "Reaper chainfist", "In-built twin-linked heavy bolters"],
        unitTraits: ["Furious Charge", "Independent", "Nimble"]
    }],
    ["Knight Castigator", {
        unitType: "Knight", scale: 4, move: 9, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 4, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 11, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        weaponTypes: ["Castigator pattern bolt cannon", "Tempest warblade"],
        requiredWeaponTypes: ["Castigator pattern bolt cannon", "Tempest warblade"],
        unitTraits: ["Furious Charge", "Independent", "Nimble"]
    }],
    ["Knight Crusader", {
        unitType: "Knight", scale: 4, move: 8, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 4, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 8, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        weaponTypes: ["Heavy stubber", "Questoris-avenger gatling cannon", "Rapid-fire battlecannon", "Rocket pods", "Thermal cannon"],
        requiredWeaponTypes: ["Heavy stubber", "Thermal cannon"],
        unitTraits: ["Independent", "Nimble"]
    }],
    ["Knight Errant", {
        unitType: "Knight", scale: 4, move: 8, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 4, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 8, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        weaponTypes: ["Heavy stubber", "Reaper chainsword", "Rocket pods", "Thermal cannon", "Thunderstrike gauntlet"],
        requiredWeaponTypes: ["Heavy stubber", "Thermal cannon"],
        unitTraits: ["Independent", "Nimble"]
    }],
    ["Knight Gallant", {
        unitType: "Knight", scale: 4, move: 8, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 4, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 8, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        weaponTypes: ["Meltagun", "Reaper chainsword", "Rocket pods", "Thunderstrike gauntlet"],
        requiredWeaponTypes: ["Meltagun", "Thermal cannon"],
        unitTraits: ["Independent", "Nimble"]
    }],
    ["Knight Lancer", {
        unitType: "Knight", scale: 4, move: 9, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 3, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 11, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        weaponTypes: ["Shock lance", "Ion gauntlet shield"],
        requiredWeaponTypes: ["Shock lance", "Ion gauntlet shield"],
        unitTraits: ["Furious Charge", "Independent", "Nimble"]
    }],
    ["Knight Magaera", {
        unitType: "Knight", scale: 4, move: 8, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 4, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 8, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        weaponTypes: ["Hekaton siege claw", "Lightning cannon", "Phased plasma-fusil"],
        requiredWeaponTypes: ["Hekaton siege claw", "Lightning cannon", "Phased plasma-fusil"],
        unitTraits: ["Blessed Auto-simulacra", "Independent", "Ionic Flare Shield", "Nimble"]
    }],
    ["Knight Paladin", {
        unitType: "Knight", scale: 4, move: 8, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 4, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 8, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        requiredWeaponTypes: ["Heavy stubber", "Rapid-fire battlecannon"],
        weaponTypes: ["Heavy stubber", "Rapid-fire battlecannon", "Reaper chainsword", "Rocket pods", "Thunderstrike gauntlet"],
        unitTraits: ["Independent", "Nimble"]
    }],
    ["Knight Styrix", {
        unitType: "Knight", scale: 4, move: 8, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 4, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 8, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        weaponTypes: ["Graviton gun", "Hekaton siege claw", "Volkite chieorovile"],
        requiredWeaponTypes: ["Graviton gun", "Hekaton siege claw", "Volkite chieorovile"],
        unitTraits: ["Blessed Auto-simulacra", "Independent", "Ionic Flare Shield", "Nimble"]
    }],
    ["Knight Warden", {
        unitType: "Knight", scale: 4, move: 8, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 4, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 8, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        weaponTypes: ["Questoris-avenger gatling cannon", "Meltagun", "Reaper chainsword", "Rocket pods", "Thunderstrike gauntlet"],
        requiredWeaponTypes: ["Questoris-avenger gatling cannon", "Meltagun"],
        unitTraits: ["Independent", "Nimble"]
    }],

    //Titans
    ["Dire Wolf Titan", {
        unitType: "Titan", scale: 5, move: 7, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 10, wounds: 4, tacticalStrength: 0, voidShields: 2,
        weaponTypes: [], //TODO,
        requiredWeaponTypes: [], //TODO
        unitTraits: ["Agile", "Infiltrate"],
    }],
    ["Reaver Battle Titan", {
        unitType: "Titan", scale: 5, move: 6, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 12, wounds: 5, tacticalStrength: 0, voidShields: 4,
        weaponTypes: [], //TODO
        unitTraits: [],
    }],
    ["Warbringer Nemesis Titan", {
        unitType: "Titan", scale: 5, move: 5, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 12, wounds: 5, tacticalStrength: 0, voidShields: 6,
        weaponTypes: [], //TODO
        requiredWeaponTypes: [], //TODO
        unitTraits: [],
    }],
    ["Warhound Titan", {
        unitType: "Titan", scale: 5, move: 7, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 10, wounds: 4, tacticalStrength: 0, voidShields: 2,
        weaponTypes: [], //TODO
        unitTraits: ["Agile"],
    }],
    ["Warlord Battle Titan", {
        unitType: "Titan", scale: 5, move: 10, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 14, wounds: 6, tacticalStrength: 0, voidShields: 6,
        weaponTypes: [], //TODO
        requiredWeaponTypes: [], //TODO
        unitTraits: [],
    }],
    ["Warlord-Sinister", {
        unitType: "Titan", scale: 5, move: 10, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 14, wounds: 6, tacticalStrength: 0, voidShields: 6,
        weaponTypes: [], //TODO
        requiredWeaponTypes: [], //TODO
        unitTraits: ["Dread Aura (8)", "Loyalist", "Nechrotechnica"],
    }],
    ["Warmaster Titan", {
        unitType: "Titan", scale: 5, move: 5, saves: [
            {saveType: "Armour", save: 1, arc: "Front"},
            {saveType: "Armour", save: 2, arc: "Rear"},
        ],
        caf: 18, wounds: 7, tacticalStrength: 0, voidShields: 12,
        weaponTypes: [], //TODO
        requiredWeaponTypes: [], //TODO
        unitTraits: [],
    }],
    ["Warmaster Iconoclast", {
        unitType: "Titan", scale: 5, move: 6, saves: [
            {saveType: "Armour", save: 1, arc: "Front"},
            {saveType: "Armour", save: 2, arc: "Rear"},
        ],
        caf: 18, wounds: 7, tacticalStrength: 0, voidShields: 12,
        weaponTypes: [], //TODO
        requiredWeaponTypes: [], //TODO
        unitTraits: [],
    }],
]);

export function getStatsForStrategicAssetModelType(modelType: StrategicAssetModelType): Stats | undefined {
    return statsForModelType.get(modelType)
}