import { AuxiliaDetachmentType, AuxiliaFormationType, DetachmentConfiguration, FormationShape, FormationSlot } from "./types.ts";
const formationShapes = new Map<AuxiliaFormationType, FormationShape>([
    [ "Solar Auxilia Sub-Cohort", { slotRequirements: [
        {   slot: "HQ",                 slotRequirementType: "Required"                 },
        {   slot: "Support",            slotRequirementType: "Required"                 },
        {   slot: "Auxilia Lasrifle",   slotRequirementType: "Required"                 },
        {   slot: "Auxilia Lasrifle",   slotRequirementType: "Required"                 },
        {   slot: "Transport",          slotRequirementType: "Optional"                 },
        {   slot: "Transport",          slotRequirementType: "Optional"                 },
        {   slot: "Transport",          slotRequirementType: "Optional"                 },
        {   slot: "Support",            slotRequirementType: "Optional"                 },
        {   slot: "Support",            slotRequirementType: "Optional"                 },
        {   slot: "Core",               slotRequirementType: "Optional"                 },
        {   slot: "Light Armour",       slotRequirementType: "One Of",  oneOfGroup: 1   },
        {   slot: "Vanguard",           slotRequirementType: "One Of",  oneOfGroup: 1   },
        {   slot: "Artillery",          slotRequirementType: "One Of",  oneOfGroup: 2   },
        {   slot: "Battle Tank",        slotRequirementType: "One Of",  oneOfGroup: 2   },
        {   slot: "Air Support",        slotRequirementType: "One Of",  oneOfGroup: 2   },
    ]}],
    //todo tank commander
    [ "Solar Auxilia Armoured Company", { slotRequirements: [
        {   slot: "Battle Tank",        slotRequirementType: "Required"                 },
        {   slot: "Battle Tank",        slotRequirementType: "Required"                 },
        {   slot: "Heavy Armour",       slotRequirementType: "Required"                 },
        {   slot: "Battle Tank",        slotRequirementType: "Optional"                 },
        {   slot: "Battle Tank",        slotRequirementType: "Optional"                 },
        {   slot: "Heavy Armour",       slotRequirementType: "Optional"                 },
        {   slot: "Battle Tank",        slotRequirementType: "One Of",  oneOfGroup: 1   },
        {   slot: "Artillery",          slotRequirementType: "One Of",  oneOfGroup: 1   },
        {   slot: "Air Support",        slotRequirementType: "One Of",  oneOfGroup: 1   },
    ]}],
    [ "Solar Auxilia Pioneer Company", { slotRequirements: [
        {   slot: "HQ",                 slotRequirementType: "Required"                 },
        {   slot: "Bastion",            slotRequirementType: "Required"                 },
        {   slot: "Storm Section",      slotRequirementType: "Required"                 },
        {   slot: "Bastion",            slotRequirementType: "Required"                 },
        {   slot: "Support",            slotRequirementType: "Optional"                 },
        {   slot: "Core",               slotRequirementType: "Optional"                 },
        {   slot: "Air Support",        slotRequirementType: "Optional"                 },
        {   slot: "Vanguard",           slotRequirementType: "Optional"                 },
        {   slot: "Vanguard",           slotRequirementType: "Optional"                 },
        {   slot: "Battle Tank",        slotRequirementType: "One Of",  oneOfGroup: 1   },
        {   slot: "Artillery",          slotRequirementType: "One Of",  oneOfGroup: 1   },
        {   slot: "Air Support",        slotRequirementType: "One Of",  oneOfGroup: 1   },
    ]}]
])

export function getShapeForAuxiliaFormationType(formationType: AuxiliaFormationType | ""): FormationShape {
    if(formationType == "") return { slotRequirements: [] };
    return formationShapes.get(formationType) ?? { slotRequirements: [] };
}

const detachmentTypesForSlot = new Map<FormationSlot, AuxiliaDetachmentType[]>([
    [ "Air Support", [
        "Auxilia Avenger Strike Fighter Squadron",
        "Auxilia Lightning Fighter Squadron",
        "Auxilia Marauder Bomber Squadron",
        "Auxilia Thunderbolt Squadron",
    ] ],
    [ "Artillery", [] ], 
    [ "Auxilia Lasrifle", [ "Auxilia Lasrifle Tercio" ] ],
    [ "Bastion", [
        "Auxilia Rapier Battery",
        "Auxilia Tarantula Battery",
    ] ],
    [ "Battle Tank", [
        "Leman Russ Strike Squadron",
        "Malcador Tank Squadron",
    ] ],
    [ "Core", [ 
        "Auxilia Lasrifle Tercio"
    ] ],  
    [ "Heavy Armour", [
        "Auxilia Super-Heavy Tank Squadron"
    ] ],
    [ "HQ", [ 
        "Auxilia Tactical Command Detachment",
        "Legate Commander Detachment",
    ] ],
    [ "Light Armour", [] ],
    [ "Storm Section", [ "Auxilia Veletaris Storm Section" ] ],
    [ "Support", [ 
        "Auxilia Ogryn Charonite Section", 
        "Auxilia Veletaris Storm Section",
    ] ],
    [ "Transport", [ 
        "Auxilia Arvus Lighter",
    ] ], 
    [ "Vanguard", [
        "Auxilia Aethon Heavy Sentinel Patrol",
    ] ]
]);

export function getAuxiliaDetachmentTypesForSlot(slot: FormationSlot): AuxiliaDetachmentType[] {
    return detachmentTypesForSlot.get(slot) ?? [];
}

const detachmentConfigurationForDetachmentType: Map<AuxiliaDetachmentType, DetachmentConfiguration> = new Map([
    ["Legate Commander Detachment", {modelGroupShapes: [
        {modelType: "Auxilia Commander", modelLoadoutSlots: [], possibleModelGroupQuantities: [{num: 1, points: 16}]},
    ]}],
    ["Auxilia Tactical Command Detachment", {modelGroupShapes: [
        {modelType: "Tactical Command", modelLoadoutSlots: [], possibleModelGroupQuantities: [{num: 1, points: 10}]},
    ]}],
    ["Auxilia Lasrifle Tercio", {maxModels: 16, modelGroupShapes: [
        {modelType: "Auxiliaries", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 30}, {num: 6, points: 30+12}, {num: 8, points: 30+12*2}, {num: 10, points: 30+12*3},
            {num: 12, points: 30+12*4}, {num: 14, points: 30+12*5}, {num: 16, points: 30+12*6}
        ]},
        {modelType: "Auxiliaries with Flamers", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 2, points: 12}, {num: 4, points: 12*2}, {num: 6, points: 12*3},
            {num: 8, points: 12*4}, {num: 10, points: 12*5}, {num: 12, points: 12*6}
        ]},
        {modelType: "Veletarii", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 2, points: 12}, {num: 4, points: 12*2}, {num: 6, points: 12*3},
            {num: 8, points: 12*4}, {num: 10, points: 12*5}, {num: 12, points: 12*6}
        ]},
        {modelType: "Charonite Ogryns", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 2, points: 15}, {num: 4, points: 15*2}, {num: 6, points: 15*3},
            {num: 8, points: 15*4}, {num: 10, points: 15*5}, {num: 12, points: 15*6}
        ]},
    ]}],
    ["Auxilia Ogryn Charonite Section", {maxModels: 8, modelGroupShapes: [
        {modelType: "Charonite Ogryns", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 50}, {num: 4+2, points: 50+15}, {num: 4+4, points: 50+30}
        ]},
    ]}],
    ["Auxilia Veletaris Storm Section", {maxModels: 8, modelGroupShapes: [
        {modelType: "Veletarii", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 40}, {num: 4+2, points: 40+10}, {num: 4+4, points: 40+20}
        ]},
    ]}],
    ["Auxilia Rapier Battery", {minModels: 3, maxModels: 9, modelGroupShapes: [
        {modelType: "Auxilia Rapier", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts:[
                {loadout: "Laser destroyer array", points: 0},
                {loadout: "Quad launcher", points: 0},
                {loadout: "Mole mortar", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 3, points: 50}, {num: 3+3, points: 50+40}, {num: 3+6, points: 50+70}
        ]},
    ]}],
    ["Auxilia Tarantula Battery", {minModels: 4, maxModels: 8, modelGroupShapes: [
        {modelType: "Auxilia Tarantula", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts:[
                {loadout: "Tarantula lascannon array", points: 0},
                {loadout: "Hyperios air-defence missile launcher", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 4, points: 36}, {num: 4+2, points: 36+15}, {num: 4+4, points: 36+30}
        ]},
    ]}],
    ["Auxilia Aethon Heavy Sentinel Patrol", {modelGroupShapes: [
        {modelType: "Aethon Heavy Sentinel", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 35}, {num: 2+2, points: 35+25}, {num: 2+4, points: 35+45}, {num: 2+6, points: 35+65}
        ]},
    ]}],
    ["Leman Russ Strike Squadron", {minModels: 4, maxModels: 10, modelGroupShapes: [
        {modelType: "Leman Russ Tank", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Leman Russ battlecannon", points: 0}, 
                {loadout: "Vanquisher battlecannon", points: 0}
            ]},
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", points: 0}, {loadout: "Lascannon", points: 0}, 
            ]}
        ], possibleModelGroupQuantities: [
            {num: 4, points: 175}, {num: 4+2, points: 175+85}, {num: 4+4, points: 175+160},
            {num: 4+6, points: 175+220}, 
        ]}
    ]}],
    ["Malcador Tank Squadron", {minModels: 2, maxModels: 6, modelGroupShapes: [
        {modelType: "Malcador Tank", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Malcador battlecannon", points: 0}, 
                {loadout: "Malcador Vanquisher battlecannon", points: 0},
                {loadout: "Malcador lascannon turret", points: 0}
            ]},
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", points: 0}, {loadout: "Lascannon", points: 0}, 
                {loadout: "Autocannon", points: 0}, {loadout: "Demolisher cannon", points: 0}, 
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Malcador heavy bolters", points: 0}, {loadout: "Malcador lascannon", points: 0}, {loadout: "Malcador autocannon", points: 0}, 
            ]}
        ], possibleModelGroupQuantities: [
            {num: 2, points: 165}, {num: 2+1, points: 165+70}, {num: 2+2, points: 165+130},
            {num: 2+1+2, points: 165+70+130}, {num: 2+4, points: 165+240}, 
        ]}
    ]}],
    ["Auxilia Super-Heavy Tank Squadron", {minModels: 1, maxModels: 6, modelGroupShapes: [
        {modelType: "Auxilia Super-heavy", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Baneblade cannon", points: 0}, 
                {loadout: "Hellhammer cannon", points: 0},
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Baneblade heavy bolters", points: 0}, {loadout: "Baneblade heavy flamer", points: 0}, {loadout: "Baneblade autocannon", points: 0}, 
            ]}
        ], possibleModelGroupQuantities: [
            {num: 1, points: 100}, {num: 2, points: 100+90}, {num: 3, points: 100+90+90},
            {num: 1+3, points: 100+255}, {num: 1+1+3, points: 100+90+255}, {num: 1+5, points: 100+390}, 
        ]}
    ]}],
    ["Auxilia Thunderbolt Squadron", {minModels: 1, maxModels: 4, modelGroupShapes: [
        {modelType: "Thunderbolt Fighter", modelLoadoutSlots: [
            {name: "Cannon", possibleModelLoadouts: [
                {loadout: "Thunderbolt twin-linked lascannon", points: 0}, 
                {loadout: "Avenger bolt cannon", points: 3},
            ]},
            {name: "Missiles", possibleModelLoadouts: [
                {loadout: "Hellstrike missiles", points: 0}, {loadout: "Skystrike missiles", points: 0}, {loadout: "Wing bombs", points: 0}, 
            ]}
        ], possibleModelGroupQuantities: [
            {num: 1, points: 80}, {num: 2, points: 80+80}, {num: 1+2, points: 80+150},
            {num: 1+3, points: 80+210},
        ]}
    ]}],
    ["Auxilia Avenger Strike Fighter Squadron", {minModels: 1, maxModels: 4, modelGroupShapes: [
        {modelType: "Avenger Strike Fighter", modelLoadoutSlots: [
            {name: "Cannon", possibleModelLoadouts: [
                {loadout: "Avenger lascannon", points: 0}, 
                {loadout: "Avenger autocannon", points: 3},
            ]},
            {name: "Missiles", possibleModelLoadouts: [
                {loadout: "Hellstrike missiles", points: 0}, {loadout: "Skystrike missiles", points: 0}, {loadout: "Wing bombs", points: 0}, 
            ]}
        ], possibleModelGroupQuantities: [
            {num: 1, points: 85}, {num: 2, points: 85+85}, {num: 1+2, points: 85+160},
            {num: 1+3, points: 85+220},
        ]}
    ]}],
    ["Auxilia Lightning Fighter Squadron", {minModels: 1, maxModels: 4, modelGroupShapes: [
        {modelType: "Lightning Fighter", modelLoadoutSlots: [
            {name: "Cannon", possibleModelLoadouts: [
                {loadout: "Lightning twin lascannon", points: 0}, 
                {loadout: "Lightning twin multi-laser", points: 0},
            ]},
            {name: "Missiles 1", possibleModelLoadouts: [
                {loadout: "Hellstrike missiles", points: 0}, {loadout: "Skystrike missiles", points: 0}, {loadout: "Phosphex bomb clusters", points: 0}, 
            ]},
            {name: "Missiles 2", possibleModelLoadouts: [
                {loadout: "Hellstrike missiles", points: 0}, {loadout: "Skystrike missiles", points: 0}, {loadout: "Phosphex bomb clusters", points: 0}, 
            ]}
        ], possibleModelGroupQuantities: [
            {num: 1, points: 85}, {num: 2, points: 85+85}, {num: 1+2, points: 85+160},
            {num: 1+3, points: 85+220},
        ]}
    ]}],
    ["Auxilia Marauder Bomber Squadron", {minModels: 1, maxModels: 4, modelGroupShapes: [
        {modelType: "Marauder Bomber", modelLoadoutSlots: [
            {name: "Missiles 1", possibleModelLoadouts: [
                {loadout: "Hellstrike missiles", points: 0}, {loadout: "Skystrike missiles", points: 0}, {loadout: "Wing bombs", points: 0}, 
            ]},
            {name: "Missiles 2", possibleModelLoadouts: [
                {loadout: "Hellstrike missiles", points: 0}, {loadout: "Skystrike missiles", points: 0}, {loadout: "Wing bombs", points: 0}, 
            ]}
        ], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 85}, {num: 2, points: 85+85}, {num: 1+2, points: 85+160},
            {num: 1+3, points: 85+220},
        ]},
        {modelType: "Marauder Pathfinder", modelLoadoutSlots: [
            {name: "Missiles 1", possibleModelLoadouts: [
                {loadout: "Hellstrike missiles", points: 0}, {loadout: "Skystrike missiles", points: 0}, {loadout: "Wing bombs", points: 0}, 
            ]},
            {name: "Missiles 2", possibleModelLoadouts: [
                {loadout: "Hellstrike missiles", points: 0}, {loadout: "Skystrike missiles", points: 0}, {loadout: "Wing bombs", points: 0}, 
            ]}
        ], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 85}, {num: 2, points: 85+85}, {num: 1+2, points: 85+160},
            {num: 1+3, points: 85+220},
        ]},
        {modelType: "Marauder Colossus", modelLoadoutSlots: [
            {name: "Missiles 1", possibleModelLoadouts: [
                {loadout: "Hellstrike missiles", points: 0}, {loadout: "Skystrike missiles", points: 0}, {loadout: "Wing bombs", points: 0}, 
            ]},
            {name: "Missiles 2", possibleModelLoadouts: [
                {loadout: "Hellstrike missiles", points: 0}, {loadout: "Skystrike missiles", points: 0}, {loadout: "Wing bombs", points: 0}, 
            ]}
        ], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 85}, {num: 2, points: 85+85}, {num: 1+2, points: 85+160},
            {num: 1+3, points: 85+220},
        ]},
        {modelType: "Marauder Destroyer", modelLoadoutSlots: [
            {name: "Missiles 1", possibleModelLoadouts: [
                {loadout: "Hellstrike missiles", points: 0}, {loadout: "Skystrike missiles", points: 0}, {loadout: "Wing bombs", points: 0}, 
            ]},
            {name: "Missiles 2", possibleModelLoadouts: [
                {loadout: "Hellstrike missiles", points: 0}, {loadout: "Skystrike missiles", points: 0}, {loadout: "Wing bombs", points: 0}, 
            ]}
        ], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 85+10}, {num: 2, points: 85+85+10}, {num: 1+2, points: 85+160+10},
            {num: 1+3, points: 85+220+10},
        ]}
    ]}],
    ["Auxilia Arvus Lighter", {modelGroupShapes: [
        {modelType: "Arvus Lighter", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            //p128 - max transport size is 8
            {num: 1, points: 12}, {num: 2, points: 24}, {num: 3, points: 36}, {num: 4, points: 48}, 
            {num: 5, points: 60}, {num: 6, points: 72}, {num: 7, points: 84}, {num: 8, points: 96}, 
        ]}
    ]}],
    
]);

export function getAuxiliaDetachmentConfigurationForDetachmentType(detachmentType: AuxiliaDetachmentType): DetachmentConfiguration {
    return detachmentConfigurationForDetachmentType.get(detachmentType) ?? {modelGroupShapes: []}
}