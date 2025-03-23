import { DetachmentType, FormationSlot, FormationShape, LegionFormationType, LegionDetachmentType, DetachmentConfiguration, LegionModelType, Stats } from "./types.ts";

const formationShapes = new Map<LegionFormationType, FormationShape>([
    [ "Legion Demi-Company", { slotRequirements: [
        {   slot: "HQ",             slotRequirementType: "Required"                 },
        {   slot: "Support",        slotRequirementType: "Required"                 },
        {   slot: "Core",           slotRequirementType: "Required"                 },
        {   slot: "Core",           slotRequirementType: "Required"                 },
        {   slot: "Bastion",        slotRequirementType: "Optional"                 },
        {   slot: "Core",           slotRequirementType: "Optional"                 },
        {   slot: "Transport",      slotRequirementType: "Optional"                 },
        {   slot: "Transport",      slotRequirementType: "Optional"                 },
        {   slot: "Support",        slotRequirementType: "Optional"                 },
        {   slot: "Support",        slotRequirementType: "Optional"                 },
        {   slot: "Vanguard",       slotRequirementType: "Optional"                 },
        {   slot: "Light Armour",   slotRequirementType: "One Of",  oneOfGroup: 1   },
        {   slot: "Air Support",    slotRequirementType: "One Of",  oneOfGroup: 1   },
        {   slot: "Artillery",      slotRequirementType: "One Of",  oneOfGroup: 2   },
        {   slot: "Battle Tank",    slotRequirementType: "One Of",  oneOfGroup: 2   },
        {   slot: "Heavy Armour",   slotRequirementType: "One Of",  oneOfGroup: 2   },
    ] } ],
    ["Legion Garrison Force", { slotRequirements: [
        {   slot: "HQ",             slotRequirementType: "Required"                 },
        {   slot: "Support",        slotRequirementType: "Required"                 },
        {   slot: "Core",           slotRequirementType: "Required"                 },
        {   slot: "Bastion",        slotRequirementType: "Required"                 },
        {   slot: "Bastion",        slotRequirementType: "Optional"                 },
        {   slot: "Core",           slotRequirementType: "Optional"                 },
        {   slot: "Air Support",    slotRequirementType: "Optional"                 },
        {   slot: "Bastion",        slotRequirementType: "Optional"                 },
        {   slot: "Support",        slotRequirementType: "Optional"                 },
        {   slot: "Support",        slotRequirementType: "Optional"                 },
        {   slot: "Artillery",      slotRequirementType: "Optional"                 },
        {   slot: "Heavy Armour",   slotRequirementType: "One Of",  oneOfGroup: 1   },
        {   slot: "Artillery",      slotRequirementType: "One Of",  oneOfGroup: 1   },
    ] } ],
    [ "Legion Armoured Company", { slotRequirements: [
        {   slot: "Battle Tank",    slotRequirementType: "Required"                 },
        {   slot: "Battle Tank",    slotRequirementType: "Required"                 },
        {   slot: "Heavy Armour",   slotRequirementType: "Required"                 },
        {   slot: "Light Armour",   slotRequirementType: "Optional"                 },
        {   slot: "Heavy Armour",   slotRequirementType: "Optional"                 },
        {   slot: "Battle Tank",    slotRequirementType: "Optional"                 },
        {   slot: "Battle Tank",    slotRequirementType: "Optional"                 },
        {   slot: "Air Support",    slotRequirementType: "One Of",  oneOfGroup: 1   },
        {   slot: "Heavy Armour",   slotRequirementType: "One Of",  oneOfGroup: 1   },
    ] } ],
    [ "Legion Aerial Assault", { slotRequirements: [
        {   slot: "HQ",             slotRequirementType: "Required"                 },
        {   slot: "Support",        slotRequirementType: "Required"                 },
        {   slot: "Core",           slotRequirementType: "Required"                 },
        {   slot: "Core",           slotRequirementType: "Required"                 },
        {   slot: "Support",        slotRequirementType: "Optional"                 },
        {   slot: "Core",           slotRequirementType: "Optional"                 },
        {   slot: "Air Support",    slotRequirementType: "Optional"                 },
        {   slot: "Support",        slotRequirementType: "Optional"                 },
        {   slot: "Vanguard",       slotRequirementType: "Optional"                 },
        {   slot: "Air Support",    slotRequirementType: "Optional"                 },
    ] } ]
])

export function getShapeForLegionFormationType(formationType: LegionFormationType | ""): FormationShape {
    if(formationType == "") return { slotRequirements: [] };
    return formationShapes.get(formationType) ?? { slotRequirements: [] };
}

const detachmentTypesForSlot = new Map<FormationSlot, LegionDetachmentType[]>([
    [ "Air Support", [
        "Legion Fire Raptor Squadron",
        "Legion Storm Eagle Squadron",
        "Legion Thunderhawk Gunship",
        "Legion Xiphon Interceptor Squadron",
    ] ],
    [ "Artillery", [] ], 
    [ "Bastion", [
        "Legion Deredeo Dreadnought Detachment",
        "Legion Tarantula Battery",
    ] ],
    [ "Battle Tank", [
        "Legion Predator Squadron",
        "Legion Sicaran Squadron",
    ] ],
    [ "Core", [ "Legion Tactical Detachment" ] ],  
    [ "Heavy Armour", [
        "Legion Kratos Squadron"
    ] ],
    [ "HQ", [ "Legion Command" ] ],
    [ "Light Armour", [] ],
    [ "Support", [ 
        "Legion Assault Detachment", 
        "Legion Dreadnought Talon",
        "Legion Missile Launcher Support Detachment", 
        "Legion Plasma Gun Support Detachment", 
        "Legion Rapier Battery Detachment",
        "Leviathan Siege Dreadnought Detachment",
        "Legion Terminator Detachment", 
    ] ],
    [ "Transport", [ 
        "Legion Rhino Detachment" 
    ] ], 
    [ "Vanguard", [] ]
]);

export function getLegionDetachmentTypesForSlot(slot: FormationSlot): LegionDetachmentType[] {
    return detachmentTypesForSlot.get(slot) ?? [];
}

const detachmentConfigurationForDetachmentType: Map<DetachmentType, DetachmentConfiguration> = new Map([
    ["Legion Command", {modelGroupShapes: [
        {modelType: "Command Squad", modelLoadoutSlots: [], possibleModelGroupQuantities: [{num: 1, points: 25}]},
        {modelType: "Rhino (dedicated transport)", dedicatedTransport: true, formationType: "Legion Demi-Company", modelLoadoutSlots: [
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "Twin-linked bolter", points: 0}, 
                {loadout: "Havoc launcher", points: 2},
                {loadout: "Multi-melta", points: 4},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 10}, 
        ]},
        {modelType: "Storm Eagle (dedicated transport)", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 100}, 
        ]},
        {modelType: "Thunderhawk Gunship (dedicated transport)", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150},
        ]}
    ]}],
    ["Legion Tactical Detachment", {maxModels: 12, modelGroupShapes: [
        {modelType: "Tactical Legionaries", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 35}, {num: 6, points: 35+12}, {num: 8, points: 35+12*2}, {num: 10, points: 35+12*3}, {num: 12, points: 35+12*4},
        ]},
        {modelType: "Assault Marines", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 2, points: 12}, {num: 4, points: 24}, {num: 6, points: 36}, {num: 8, points: 48},
        ]},
        {modelType: "Legion Terminators", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 2, points: 15}, {num: 4, points: 30}, {num: 6, points: 45}, {num: 8, points: 60},
        ]},
        {modelType: "Missile Launcher Legionaries", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 2, points: 15}, {num: 4, points: 30}, {num: 6, points: 45}, {num: 8, points: 60},
        ]},
        {modelType: "Plasma Support Legionaries", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 2, points: 15}, {num: 4, points: 30}, {num: 6, points: 45}, {num: 8, points: 60},
        ]},
        
        {modelType: "Rhino (dedicated transport)", dedicatedTransport: true, formationType: "Legion Demi-Company", modelLoadoutSlots: [
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "Twin-linked bolter", points: 0}, 
                {loadout: "Havoc launcher", points: 2},
                {loadout: "Multi-melta", points: 4},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 10}, {num: 2, points: 20}, {num: 3, points: 30}, 
            {num: 4, points: 40}, {num: 5, points: 50}, {num: 6, points: 60}
        ]},
        {modelType: "Storm Eagle (dedicated transport)", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 100}, {num: 2, points: 100+100}, {num: 3, points: 100+200}
        ]},
        {modelType: "Thunderhawk Gunship (dedicated transport)", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}, {num: 2, points: 150+150}
        ]}
    ]}],
    ["Legion Plasma Gun Support Detachment", {modelGroupShapes: [
        {modelType: "Plasma Support Legionaries", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 35}, {num: 4+2, points: 35+15}, {num: 4+4, points: 35+30},
        ]},
        {modelType: "Rhino (dedicated transport)", dedicatedTransport: true, formationType: "Legion Demi-Company", modelLoadoutSlots: [
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "Twin-linked bolter", points: 0}, 
                {loadout: "Havoc launcher", points: 2},
                {loadout: "Multi-melta", points: 4},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 10}, {num: 2, points: 20}, {num: 3, points: 30}, 
            {num: 4, points: 40},
        ]},
        {modelType: "Storm Eagle (dedicated transport)", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 100}, {num: 2, points: 100+100}
        ]},
        {modelType: "Thunderhawk Gunship (dedicated transport)", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}
        ]}
    ]}],
    ["Legion Missile Launcher Support Detachment", {modelGroupShapes: [
        {modelType: "Missile Launcher Legionaries", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 40}, {num: 4+2, points: 40+15}, {num: 4+4, points: 40+30},
        ]},
        {modelType: "Rhino (dedicated transport)", dedicatedTransport: true, formationType: "Legion Demi-Company", modelLoadoutSlots: [
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "Twin-linked bolter", points: 0}, 
                {loadout: "Havoc launcher", points: 2},
                {loadout: "Multi-melta", points: 4},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 10}, {num: 2, points: 20}, {num: 3, points: 30}, 
            {num: 4, points: 40},
        ]},
        {modelType: "Storm Eagle (dedicated transport)", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 100}, {num: 2, points: 100+100}
        ]},
        {modelType: "Thunderhawk Gunship (dedicated transport)", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}
        ]}
    ]}],
    ["Legion Assault Detachment", {modelGroupShapes: [
        {modelType: "Assault Marines", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 30}, {num: 4+2, points: 30+12}, {num: 4+4, points: 30+24},
        ]},
        {modelType: "Storm Eagle (dedicated transport)", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 100}, {num: 2, points: 100+100}, {num: 3, points: 300}, {num: 4, points: 400}
        ]},
        {modelType: "Thunderhawk Gunship (dedicated transport)", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}
        ]}
    ]}],
    ["Legion Terminator Detachment", {modelGroupShapes: [
        {modelType: "Legion Terminators", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 50}, {num: 4+2, points: 50+15}, {num: 4+4, points: 50+30},
        ]},
        {modelType: "Storm Eagle (dedicated transport)", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 100}, {num: 2, points: 100+100}, {num: 3, points: 300}, {num: 4, points: 400}
        ]},
        {modelType: "Thunderhawk Gunship (dedicated transport)", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}
        ]}
    ]}],
    ["Legion Rapier Battery Detachment", {minModels: 2, maxModels: 8, modelGroupShapes: [
        {modelType: "Legion Rapier", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts:[
                {loadout: "Laser destroyer array", points: 0},
                {loadout: "Quad launcher", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 2, points: 40}, {num: 2+2, points: 40+30}, {num: 2+4, points: 40+60}, {num: 2+6, points: 40+90},
        ]},
        {modelType: "Storm Eagle (dedicated transport)", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 100}, {num: 2, points: 100+100}, {num: 3, points: 300}, {num: 4, points: 400}
        ]},
        {modelType: "Thunderhawk Gunship (dedicated transport)", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}
        ]}
    ]}],
    ["Leviathan Siege Dreadnought Detachment", {minModels: 4, maxModels: 8, modelGroupShapes: [
        {modelType: "Leviathan Dreadnought", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts:[
                {loadout: "Leviathan storm cannon", points: 0},
                {loadout: "Cyclonic melta lance", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 4, points: 75}, {num: 4+2, points: 75+35}, {num: 4+4, points: 75+70},
        ]},
        {modelType: "Thunderhawk Gunship (dedicated transport)", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}, {num: 2, points: 300}
        ]}
    ]}],
    ["Legion Dreadnought Talon", {minModels: 4, maxModels: 4+3*2, modelGroupShapes: [
        {modelType: "Contemptor Dreadnought", minModels:4, maxModels: 10, modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts:[
                {loadout: "Kheres assault cannon", points: 0},
                {loadout: "Twin-linked lascannon", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 4, points: 70}, {num: 6, points: 70+30}, {num: 8, points: 70+30*2},
            {num: 10, points: 70+30*3}
        ]},
        {modelType: "Leviathan Dreadnought", minModels: 0, maxModels: 6, modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts:[
                {loadout: "Leviathan storm cannon", points: 0},
                {loadout: "Cyclonic melta lance", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 0, points: 0},
            {num: 2, points: 35}, {num: 4, points: 35*2},
            {num: 6, points: 35*3}
        ]},
        {modelType: "Thunderhawk Gunship (dedicated transport)", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}, {num: 2, points: 300}, {num: 3, points: 450}
        ]}
    ]}],
    ["Legion Tarantula Battery", {minModels: 4, maxModels: 8, modelGroupShapes: [
        {modelType: "Legion Tarantula", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts:[
                {loadout: "Tarantula lascannon array", points: 0},
                {loadout: "Hyperios air-defence missile launcher", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 4, points: 36}, {num: 4+2, points: 36+15}, {num: 4+4, points: 36+30}
        ]},
        {modelType: "Rhino (dedicated transport)", dedicatedTransport: true, formationType: "Legion Demi-Company", modelLoadoutSlots: [
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "Twin-linked bolter", points: 0}, 
                {loadout: "Havoc launcher", points: 2},
                {loadout: "Multi-melta", points: 4},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 10}, {num: 2, points: 20}, {num: 3, points: 30}, 
            {num: 4, points: 40},
        ]},
        {modelType: "Storm Eagle (dedicated transport)", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 100}, {num: 2, points: 100+100}
        ]},
        {modelType: "Thunderhawk Gunship (dedicated transport)", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}
        ]}
    ]}],
    ["Legion Deredeo Dreadnought Detachment", {minModels: 4, maxModels: 6, modelGroupShapes: [
        {modelType: "Deredeo Dreadnought", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts:[
                {loadout: "Hellfire plasma cannonade", points: 0},
                {loadout: "Anvilus autocannonbattery", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 4, points: 85}, {num: 4+2, points: 85+40}, {num: 4+4, points: 85+80}
        ]},
        {modelType: "Thunderhawk Gunship (dedicated transport)", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}
        ]}
    ]}],
    ["Legion Predator Squadron", {minModels: 3, maxModels: 9, modelGroupShapes: [
        {modelType: "Legion Predator", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Predator lascannon", points: 0}, 
                {loadout: "Predator cannon", points: 0}
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", points: 0}, {loadout: "Heavy bolters", points: 0}
            ]}
        ], possibleModelGroupQuantities: [
            {num: 3, points: 115}, {num: 4, points: 115+35}, {num: 5, points: 115+35+35},
            {num: 6, points: 115+95}, {num: 7, points: 115+95+35}, {num: 8, points: 115+95+35+35}, 
            {num: 9, points: 115+185}, 
        ]}
    ]}],
    ["Legion Sicaran Squadron", {minModels: 2, maxModels: 6, modelGroupShapes: [
        {modelType: "Legion Sicaran", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Twin-linked accelerator autocannon", points: 0}, 
                {loadout: "Omega plasma array", points: 0}
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", points: 0}, {loadout: "Heavy bolters", points: 0}
            ]}
        ], possibleModelGroupQuantities: [
            {num: 2, points: 105}, {num: 3, points: 105+40}, {num: 4, points: 105+70},
            {num: 5, points: 105+70+40}, {num: 6, points: 105+140} 
        ]}
    ]}],
    ["Legion Kratos Squadron", {minModels: 2, maxModels: 6, modelGroupShapes: [
        {modelType: "Legion Kratos", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Kratos battlecannon", points: 0}, 
                {loadout: "Melta blastgun", points: 0}
            ]},
            {name: "Secondary", possibleModelLoadouts: [
                {loadout: "Hull-mounted heavy bolters", points: 0}, 
                {loadout: "Kratos lascannon", points: 0},
                {loadout: "Kratos autocannon", points: 0}
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", points: 0}, {loadout: "Heavy bolters", points: 0}
            ]}
        ], possibleModelGroupQuantities: [
            {num: 2, points: 150}, {num: 3, points: 150+60}, {num: 4, points: 150+110},
            {num: 5, points: 150+60+110}, {num: 6, points: 150+200} 
        ]}
    ]}],
    ["Legion Rhino Detachment", {modelGroupShapes: [
        {modelType: "Rhino", modelLoadoutSlots: [
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "Twin-linked bolter", points: 0}, 
                {loadout: "Havoc launcher", points: 2},
                {loadout: "Multi-melta", points: 4},
            ]},
        ], possibleModelGroupQuantities: [
            //p128 - max transport size is 8
            {num: 1, points: 10}, {num: 2, points: 20}, {num: 3, points: 30}, {num: 4, points: 40}, 
            {num: 5, points: 50}, {num: 6, points: 60}, {num: 7, points: 70}, {num: 8, points: 80}, 
        ]}
    ]}],
    ["Legion Xiphon Interceptor Squadron", {modelGroupShapes: [
        {modelType: "Xiphon Interceptor", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 1, points: 95}, {num: 2, points: 95+85}, {num: 3, points: 95+160}, {num: 4, points: 95+215},
        ]}
    ]}],
    ["Legion Storm Eagle Squadron", {modelGroupShapes: [
        {modelType: "Storm Eagle", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 1, points: 100}, {num: 2, points: 100+100}, {num: 3, points: 100+190}
        ]}
    ]}],
    ["Legion Fire Raptor Squadron", {modelGroupShapes: [
        {modelType: "Fire Raptor", modelLoadoutSlots: [
            {name: "Turrets", possibleModelLoadouts: [
                {loadout: "Quad heavy bolter batteries", points: 0}, 
                {loadout: "Lascannon batteries", points: 0},
                {loadout: "Gravis autocannon batteries", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 1, points: 100}, {num: 2, points: 100+100}, {num: 3, points: 100+190}
        ]}
    ]}],
    ["Legion Thunderhawk Gunship", {modelGroupShapes: [
        {modelType: "Thunderhawk Gunship", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 1, points: 150}, {num: 2, points: 150+150}, {num: 3, points: 150+280}
        ]}
    ]}],
]);
    
export function getLegionDetachmentConfigurationForDetachmentType(detachmentType: DetachmentType): DetachmentConfiguration {
    return detachmentConfigurationForDetachmentType.get(detachmentType) ?? {modelGroupShapes: []}
}

const statsForModelType = new Map<LegionModelType, Stats>([
    ["Command Squad", {
        unitStats: {
            unitType: "Infantry", scale: 1, advance: 5, charge: 10, march: 15, saves: [
                {saveType: "Armour", save: 4}, {saveType: "Invulnerable", save: 6}
            ],
            caf: 4, morale: 2, wounds: 1, tacticalStrength: 5
        },
        weaponStats: [
            {name: "Combi bolters", arc: "All", weaponStatsAtRange: [
                {minRange: 0, maxRange: 4, dice: 2, hit: 5, armourSaveModifiers: [
                    {unitType: "Infantry", modifier: 0}, {unitType: "Cavalry", modifier: 0}, {unitType: "Walker", modifier: 0},
                ], extraTraits: []},
                {minRange: 4, maxRange: 8, dice: 1, hit: 5, armourSaveModifiers: [
                    {unitType: "Infantry", modifier: 0}, {unitType: "Cavalry", modifier: 0}, {unitType: "Walker", modifier: 0},
                ], extraTraits: []}
            ], traits: ["Light"]},
        ]
        
    }],
    ["Rhino", {
        unitStats: {
            unitType: "Vehicle", scale: 2, advance: 9, charge: 18, march: 18, saves: [
                {saveType: "Armour", save: 4}
            ],
            caf: 0, morale: 3, wounds: 1, tacticalStrength: 2
        },
        weaponStats: [
            {name: "Pintle Mounted twin bolter", arc: "Front", weaponStatsAtRange: [
                {minRange: 0, maxRange: 4, dice: 2, hit: 5, armourSaveModifiers: [
                    {unitType: "Infantry", modifier: 0}, {unitType: "Cavalry", modifier: 0}, {unitType: "Walker", modifier: 0},
                ], extraTraits: []},
                {minRange: 4, maxRange: 8, dice: 1, hit: 5, armourSaveModifiers: [
                    {unitType: "Infantry", modifier: 0}, {unitType: "Cavalry", modifier: 0}, {unitType: "Walker", modifier: 0},
                ], extraTraits: []}
            ], traits: ["Light", "Point Defence"]},
        ]
    }]
]);

export function getStatsForLegionModelType(modelType: LegionModelType): Stats | undefined {
    return statsForModelType.get(modelType)
}