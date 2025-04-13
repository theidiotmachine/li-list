import { LegionDetachmentType, LegionFormationType, LegionModelType } from "./legionTypes.ts";
import { DetachmentType, FormationSlot, FormationShape, DetachmentConfiguration, Stats, DetachmentValidationState, Detachment } from "./types.ts";

const formationShapes = new Map<LegionFormationType, FormationShape>([
    //CRB
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
    ] } ],
    //TGS
    [ "Legion Sky-hunter Phalanx", { slotRequirements: [
        {   slot: "Sky-hunter Phalanx Vanguard Compulsory", displayName: "Vanguard",
                                    slotRequirementType: "Required"                 },
        {   slot: "Sky-hunter Phalanx Vanguard Compulsory", displayName: "Vanguard",
                                    slotRequirementType: "Required"                 },
        {   slot: "Sky-hunter Phalanx Vanguard Compulsory", displayName: "Vanguard",
                                    slotRequirementType: "Required"                 },
        {   slot: "Sky-hunter Phalanx Vanguard Compulsory", displayName: "Vanguard",
                                    slotRequirementType: "Required"                 },
        {   slot: "Light Armour",   slotRequirementType: "Optional"                 },
        {   slot: "Light Armour",   slotRequirementType: "Optional"                 },
        {   slot: "Air Support",    slotRequirementType: "Optional"                 },
        {   slot: "Vanguard",       slotRequirementType: "Optional"                 },
    ] } ],
    [ "Legion Drop Pod Assault", { slotRequirements: [
        {   slot: "HQ",             slotRequirementType: "Required"                 },
        {   slot: "Support",        slotRequirementType: "Required"                 },
        {   slot: "Core",           slotRequirementType: "Required"                 },
        {   slot: "Core",           slotRequirementType: "Required"                 },
        {   slot: "Core",           slotRequirementType: "Optional"                 },
        {   slot: "Core",           slotRequirementType: "Optional"                 },
        {   slot: "Air Support",    slotRequirementType: "Optional"                 },
        {   slot: "Support",        slotRequirementType: "Optional"                 },
        {   slot: "Support",        slotRequirementType: "Optional"                 },
    ] } ],
    //TDOT
    ["Legion Heavy Assault Spearhead", { slotRequirements: [
        {   slot: "Legion Terminators", slotRequirementType: "Required"             },
        {   slot: "Legion Terminators", slotRequirementType: "Required"             },
        {   slot: "Legion Heavy Assault Spearhead Support Compulsory", displayName: "Support",
            slotRequirementType: "Required"                 },
        {   slot: "Legion Heavy Assault Spearhead Support Compulsory", displayName: "Support",
            slotRequirementType: "Required"                 },
        {   slot: "Battle Tank",    slotRequirementType: "Optional"                 },
        {   slot: "Battle Tank",    slotRequirementType: "Optional"                 },
        {   slot: "Air Support",    slotRequirementType: "Optional"                 },
        {   slot: "Heavy Armour",   slotRequirementType: "Optional"                 },
        {   slot: "Heavy Armour",   slotRequirementType: "Optional"                 },
    ]}]
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
    ["Legion Heavy Assault Spearhead Support Compulsory", [
        "Legion Dreadnought Talon",
        "Legion Terminator Detachment", 
        "Leviathan Siege Dreadnought Detachment",
    ]],
    ["Legion Terminators", ["Legion Terminator Detachment"]],
    [ "Light Armour", [] ],
    [ "Sky-hunter Phalanx Vanguard Compulsory", [
        "Legion Javelin Squadron",
        "Legion Land Speeder Squadron",
        "Legion Scimitar Jetbike Squadron",
    ] ],
    [ "Support", [ 
        "Legion Assault Detachment", 
        "Legion Deathstorm Drop Pod Battery",
        "Legion Dreadnought Talon",
        "Legion Missile Launcher Support Detachment", 
        "Legion Plasma Gun Support Detachment", 
        "Legion Rapier Battery Detachment",
        "Legion Terminator Detachment", 
        "Leviathan Siege Dreadnought Detachment",
    ] ],
    [ "Transport", [ 
        "Legion Dreadnought Drop Pod Detachment",
        "Legion Drop Pod Detachment",
        "Legion Land Raider Detachment",
        "Legion Rhino Detachment",
        "Legion Spartan Detachment"
    ] ], 
    [ "Vanguard", [
        "Legion Javelin Squadron",
        "Legion Land Speeder Squadron",
        "Legion Outrider Squadron",
        "Legion Scimitar Jetbike Squadron"
    ] ]
]);

export function getLegionDetachmentTypesForSlot(slot: FormationSlot): LegionDetachmentType[] {
    return detachmentTypesForSlot.get(slot) ?? [];
}

const detachmentConfigurationForDetachmentType: Map<DetachmentType, DetachmentConfiguration> = new Map([
    //CRB
    ["Legion Command", {modelGroupShapes: [
        {modelType: "Command Squad", modelLoadoutSlots: [], possibleModelGroupQuantities: [{num: 1, points: 25}]},
        {modelType: "Rhino", dedicatedTransport: true, formationType: "Legion Demi-Company", modelLoadoutSlots: [
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "Twin-linked bolter", points: 0}, 
                {loadout: "Havoc launcher", points: 2},
                {loadout: "Multi-melta", points: 4},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 10}, 
        ]},
        {modelType: "Storm Eagle", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 100}, 
        ]},
        {modelType: "Thunderhawk Gunship", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150},
        ]},
        {modelType: "Drop Pod", dedicatedTransport: true, formationType: "Legion Drop Pod Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 1, points: 6}
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
        {modelType: "Rhino", dedicatedTransport: true, formationType: "Legion Demi-Company", modelLoadoutSlots: [
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "Twin-linked bolter", points: 0}, 
                {loadout: "Havoc launcher", points: 2},
                {loadout: "Multi-melta", points: 4},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 10}, {num: 2, points: 20}, {num: 3, points: 30}, 
            {num: 4, points: 40}, {num: 5, points: 50}, {num: 6, points: 60}
        ]},
        {modelType: "Storm Eagle", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 100}, {num: 2, points: 100+100}, {num: 3, points: 100+200}
        ]},
        {modelType: "Thunderhawk Gunship", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}, {num: 2, points: 150+150}
        ]},
        {modelType: "Drop Pod", dedicatedTransport: true, formationType: "Legion Drop Pod Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 6*2}, {num: 3, points: 6*3}, {num: 4, points: 6*4}, {num: 5, points: 6*5}, {num: 6, points: 6*6}
        ]}
    ]}],
    ["Legion Plasma Gun Support Detachment", {modelGroupShapes: [
        {modelType: "Plasma Support Legionaries", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 35}, {num: 4+2, points: 35+15}, {num: 4+4, points: 35+30},
        ]},
        {modelType: "Rhino", dedicatedTransport: true, formationType: "Legion Demi-Company", modelLoadoutSlots: [
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "Twin-linked bolter", points: 0}, 
                {loadout: "Havoc launcher", points: 2},
                {loadout: "Multi-melta", points: 4},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 10}, {num: 2, points: 20}, {num: 3, points: 30}, 
            {num: 4, points: 40},
        ]},
        {modelType: "Storm Eagle", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 100}, {num: 2, points: 100+100}
        ]},
        {modelType: "Thunderhawk Gunship", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}
        ]},
        {modelType: "Drop Pod", dedicatedTransport: true, formationType: "Legion Drop Pod Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 6*2}, {num: 3, points: 6*3}, {num: 4, points: 6*4}
        ]}
    ]}],
    ["Legion Missile Launcher Support Detachment", {modelGroupShapes: [
        {modelType: "Missile Launcher Legionaries", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 40}, {num: 4+2, points: 40+15}, {num: 4+4, points: 40+30},
        ]},
        {modelType: "Rhino", dedicatedTransport: true, formationType: "Legion Demi-Company", modelLoadoutSlots: [
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "Twin-linked bolter", points: 0}, 
                {loadout: "Havoc launcher", points: 2},
                {loadout: "Multi-melta", points: 4},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 10}, {num: 2, points: 20}, {num: 3, points: 30}, 
            {num: 4, points: 40},
        ]},
        {modelType: "Storm Eagle", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 100}, {num: 2, points: 100+100}
        ]},
        {modelType: "Thunderhawk Gunship", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}
        ]},
        {modelType: "Drop Pod", dedicatedTransport: true, formationType: "Legion Drop Pod Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 6*2}, {num: 3, points: 6*3}, {num: 4, points: 6*4}
        ]}
    ]}],
    ["Legion Assault Detachment", {modelGroupShapes: [
        {modelType: "Assault Marines", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 30}, {num: 4+2, points: 30+12}, {num: 4+4, points: 30+24},
        ]},
        {modelType: "Storm Eagle", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 100}, {num: 2, points: 100+100}, {num: 3, points: 300}, {num: 4, points: 400}
        ]},
        {modelType: "Thunderhawk Gunship", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}
        ]}
    ]}],
    ["Legion Terminator Detachment", { customValidation: (detachment: Detachment): DetachmentValidationState => {
        if(detachment.slot == "Legion Heavy Assault Spearhead Support Compulsory" 
            || detachment.slot == "Legion Terminators") {
                const landRaiders = detachment.modelGroups.find((s)=>s.modelType == "Land Raider");
                const numLandRaiders = landRaiders?.modelLoadoutGroups.reduce((p, s)=>p + s.number, 0)??0;
                const spartans = detachment.modelGroups.find((s)=>s.modelType == "Spartan");
                const numSpartans = spartans?.modelLoadoutGroups.reduce((p, s)=>p + s.number, 0)??0;
                if(numLandRaiders + numSpartans == 0) {
                    return {valid: false, error: "Need more dedicated transports", data: "must be in a dedicated transport"}
                }
            }
            return {valid: true}
        },
        modelGroupShapes: [
        {modelType: "Legion Terminators", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 50}, {num: 4+2, points: 50+15}, {num: 4+4, points: 50+30},
        ]},
        {modelType: "Storm Eagle", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 100}, {num: 2, points: 100+100}, {num: 3, points: 300}, {num: 4, points: 400}
        ]},
        {modelType: "Thunderhawk Gunship", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}
        ]},
        {modelType: "Land Raider", dedicatedTransport: true, formationType: "Legion Heavy Assault Spearhead", modelLoadoutSlots: [
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, 
                {loadout: "Multi-melta", points: 5},
            ]},
        ], possibleModelGroupQuantities: [ 
            {num: 0, points: 0}, {num: 4, points: 4*40}, {num: 6, points: 6*40}, {num: 8, points: 8*40}, 
        ]},
        {modelType: "Spartan", dedicatedTransport: true, formationType: "Legion Heavy Assault Spearhead", modelLoadoutSlots: [
            {name: "Sponson mounted", possibleModelLoadouts: [
                {loadout: "Quad lascannon", points: 0}, 
                {loadout: "Laser destroyers", points: 0},
            ]},
            {name: "Hull mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolters", points: 0}, 
                {loadout: "Lascannon", points: 2},
            ]},
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, 
                {loadout: "Multi-melta", points: 5},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 2, points: 2*80}, {num: 3, points: 4*80}, {num: 4, points: 4*80}, 
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
        {modelType: "Storm Eagle", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 100}, {num: 2, points: 100+100}, {num: 3, points: 300}, {num: 4, points: 400}
        ]},
        {modelType: "Thunderhawk Gunship", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
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
        {modelType: "Thunderhawk Gunship", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}, {num: 2, points: 300}
        ]},
        {modelType: "Dreadnought Drop Pod", dedicatedTransport: true, formationType: "Legion Drop Pod Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 1, points: 7}, {num: 2, points: 7*2}, {num: 3, points: 7*3}, {num: 4, points: 7*4},
            {num: 5, points: 7*5}, {num: 6, points: 7*6}, {num: 7, points: 7*7}, {num: 8, points: 7*8}
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
        {modelType: "Thunderhawk Gunship", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}, {num: 2, points: 300}, {num: 3, points: 450}
        ]},
        {modelType: "Dreadnought Drop Pod", dedicatedTransport: true, formationType: "Legion Drop Pod Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 7*4},
            {num: 5, points: 7*5}, {num: 6, points: 7*6}, {num: 7, points: 7*7}, {num: 8, points: 7*8}, 
            {num: 9, points: 7*9}, {num: 10, points: 7*10}
        ]}
    ]}],
    ["Legion Tarantula Battery", {minModels: 4, maxModels: 8, modelGroupShapes: [
        {modelType: "Legion Tarantula", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts:[
                {loadout: "Tarantula lascannon battery", points: 0},
                {loadout: "Hyperios air-defence missile launcher", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 4, points: 36}, {num: 4+2, points: 36+15}, {num: 4+4, points: 36+30}
        ]},
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
        {modelType: "Thunderhawk Gunship", dedicatedTransport: true, formationType: "Legion Aerial Assault", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}
        ]}
    ]}],
    ["Legion Predator Squadron", {minModels: 3, maxModels: 9, modelGroupShapes: [
        {modelType: "Legion Predator", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Predator lascannon", points: 0}, 
                {loadout: "Predator cannon", points: 0},
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", points: 0}, 
                {loadout: "Heavy bolters", points: 0},
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
                {loadout: "Lascannon", points: 0}, 
                {loadout: "Heavy bolters", points: 0}
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
                {loadout: "Lascannon", points: 0}, 
                {loadout: "Heavy bolters", points: 0}
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
    //TGS
    ["Legion Outrider Squadron", {minModels: 2, maxModels: 6, modelGroupShapes: [
        {modelType: "Legion Outrider", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 30}, {num: 4, points: 30+30}, {num: 6, points: 30+60}
        ]}
    ]}],
    ["Legion Scimitar Jetbike Squadron", {minModels: 3, maxModels: 9, modelGroupShapes: [
        {modelType: "Scimitar Jetbike", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 3, points: 35}, {num: 6, points: 35+35}, {num: 9, points: 35+70}
        ]}
    ]}],
    ["Legion Land Speeder Squadron", {minModels: 2, maxModels: 6, 
        customValidation: (detachment: Detachment): DetachmentValidationState => {
            const data = detachment.modelGroups[0].modelLoadoutGroups.reduce((acc: number[], modelLoadout) => {
                if (modelLoadout.modelLoadoutSlots[0].modelLoadout.loadout === "Plasma cannon and heavy bolter") {
                    acc[0] += modelLoadout.number;
                } else {
                    acc[1] += modelLoadout.number;
                }
                return acc;
            }, [0, 0]);
            //This is my least favourite rule in the whole book
            if(data[1] > data[0]) {
                return {valid: false, error: "Invalid loadouts of models in group", 
                    data: "Land Speeders can't have more than half armed with flamers/multi meltas"};
            }
            return {valid: true};
        },
        modelGroupShapes: [
            {modelType: "Land Speeder", modelLoadoutSlots: [
                {name: "Guns", possibleModelLoadouts: [
                    {loadout: "Plasma cannon and heavy bolter", points: 0}, 
                    {loadout: "Nose mounted heavy flamer and multi-melta", points: 0},
                ]},
            ], possibleModelGroupQuantities: [
                {num: 2, points: 30}, {num: 4, points: 30+30}, {num: 6, points: 30+60}
            ]}
    ]}],
    ["Legion Javelin Squadron", {minModels: 2, maxModels: 6, modelGroupShapes: [
        {modelType: "Javelin", modelLoadoutSlots: [
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", points: 0}, {loadout: "Cyclone missile launcher", points: 2}
            ]}
        ], possibleModelGroupQuantities: [
            {num: 2, points: 33}, {num: 4, points: 33+33}, {num: 6, points: 33+66}
        ]}
    ]}],
    ["Legion Spartan Detachment", {modelGroupShapes: [
        {modelType: "Spartan", modelLoadoutSlots: [
            {name: "Sponson mounted", possibleModelLoadouts: [
                {loadout: "Quad lascannon", points: 0}, 
                {loadout: "Laser destroyers", points: 0},
            ]},
            {name: "Hull mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolters", points: 0}, 
                {loadout: "Lascannon", points: 2},
            ]},
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, 
                {loadout: "Multi-melta", points: 5},
            ]},
        ], possibleModelGroupQuantities: [
            //p128 - max transport size is 8
            {num: 1, points: 80}, {num: 2, points: 2*80}, {num: 3, points: 4*80}, {num: 4, points: 4*80}, 
            {num: 5, points: 5*80}, {num: 6, points: 6*80}, {num: 7, points: 7*80}, {num: 8, points: 8*80}, 
        ]}
    ]}],
    ["Legion Land Raider Detachment", {
        customValidation: (detachment: Detachment): DetachmentValidationState => {
            const data = detachment.modelGroups[0].modelLoadoutGroups.reduce((acc: number[], modelLoadout) => {
                if (modelLoadout.modelLoadoutSlots[0].modelLoadout.loadout === "None") {
                    acc[0] += modelLoadout.number;
                } else {
                    acc[1] += modelLoadout.number;
                }
                return acc;
            }, [0, 0]);

            //another stupid rule
            if(data[1]*2 > data[0])
                return {valid: false, error: "Invalid loadouts of models in group", 
                    data: "No more than one in three Land Raiders can have multi-meltas"};

            return {valid: true};
        },
        modelGroupShapes: [
            {modelType: "Land Raider", modelLoadoutSlots: [
                {name: "Pintle mounted", possibleModelLoadouts: [
                    {loadout: "None", points: 0}, 
                    {loadout: "Multi-melta", points: 5},
                ]},
            ], possibleModelGroupQuantities: [
                //p128 - max transport size is 8
                {num: 1, points: 40}, {num: 2, points: 2*40}, {num: 3, points: 4*40}, {num: 4, points: 4*40}, 
                {num: 5, points: 5*40}, {num: 6, points: 6*40}, {num: 7, points: 7*40}, {num: 8, points: 8*40}, 
            ]}
    ]}],
    ["Legion Drop Pod Detachment", {
        //why does TGS have lots of stupid list restrictions
        customValidation: (detachment: Detachment): DetachmentValidationState => {
            const dropPods = detachment.modelGroups.find((a)=>a.modelType == "Drop Pod");
            const palisadeDropPods = detachment.modelGroups.find((a)=>a.modelType == "Palisade Drop Pod");

            if(palisadeDropPods == undefined)
                return {valid: true};

            if(dropPods == undefined || palisadeDropPods.number > dropPods.number)
                return {valid: false, error: "Invalid loadouts of models in group", 
                    data: "Can't have more Drop pods than Palisade Drop pod"};

            return {valid: true};
        },
        modelGroupShapes:[
        {modelType: "Drop Pod", modelLoadoutSlots: [], possibleModelGroupQuantities:[
            //p128 - max transport size is 8
            {num: 1, points: 6}, {num: 2, points: 2*6}, {num: 3, points: 4*6}, {num: 4, points: 4*6}, 
            {num: 5, points: 5*6}, {num: 6, points: 6*6}, {num: 7, points: 7*6}, {num: 8, points: 8*6}, 
        ]},
        {modelType: "Palisade Drop Pod", modelLoadoutSlots: [], possibleModelGroupQuantities:[
            //p128 - max transport size is 8
            {num: 0, points: 0}, {num: 1, points: 32}, {num: 2, points: 2*32}, {num: 3, points: 4*32}, {num: 4, points: 4*32}, 
            {num: 5, points: 5*32}, {num: 6, points: 6*32}, {num: 7, points: 7*32}, {num: 8, points: 8*32}, 
        ]},
    ]}],
    ["Legion Dreadnought Drop Pod Detachment", {
        customValidation: (detachment: Detachment): DetachmentValidationState => {
            const dropPods = detachment.modelGroups.find((a)=>a.modelType == "Dreadnought Drop Pod");
            const palisadeDropPods = detachment.modelGroups.find((a)=>a.modelType == "Palisade Drop Pod");

            if(palisadeDropPods == undefined)
                return {valid: true};

            if(dropPods == undefined || palisadeDropPods.number > dropPods.number)
                return {valid: false, error: "Invalid loadouts of models in group", 
                    data: "Can't have more Dreadnought Drop pods than Palisade Drop pods"};

            return {valid: true};
        },
        modelGroupShapes:[
        {modelType: "Dreadnought Drop Pod", modelLoadoutSlots: [], possibleModelGroupQuantities:[
            //p128 - max transport size is 8
            {num: 1, points: 7}, {num: 2, points: 2*7}, {num: 3, points: 4*7}, {num: 4, points: 4*7}, 
            {num: 5, points: 5*7}, {num: 6, points: 6*7}, {num: 7, points: 7*7}, {num: 8, points: 8*7}, 
        ]},
        {modelType: "Palisade Drop Pod", modelLoadoutSlots: [], possibleModelGroupQuantities:[
            //p128 - max transport size is 8
            {num: 0, points: 0}, {num: 1, points: 32}, {num: 2, points: 2*32}, {num: 3, points: 4*32}, {num: 4, points: 4*32}, 
            {num: 5, points: 5*32}, {num: 6, points: 6*32}, {num: 7, points: 7*32}, {num: 8, points: 8*32}, 
        ]},
    ]}],
    ["Legion Deathstorm Drop Pod Battery", {modelGroupShapes:[
        {modelType: "Deathstorm Drop Pod", modelLoadoutSlots: [], possibleModelGroupQuantities:[
            {num: 2, points: 32}, {num: 2+2, points: 32+32}, {num: 2+4, points: 32+64}
        ]},
    ]}],
]);
    
export function getLegionDetachmentConfigurationForDetachmentType(detachmentType: DetachmentType): DetachmentConfiguration {
    return detachmentConfigurationForDetachmentType.get(detachmentType) ?? {modelGroupShapes: []}
}

const statsForModelType = new Map<LegionModelType, Stats>([
    ["Assault Marines", {
        unitType: "Infantry", scale: 1, move: 7, saves: [
            {saveType: "Armour", save: 5, arc: "All"}
        ],
        caf: 3, morale: 3, wounds: 1, tacticalStrength: 5, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Bolt pistols"]}
            ]},
        ],
        unitTraits: ["Jump Packs"] //counts as Bulky
    }],
    ["Contemptor Dreadnought", {
        unitType: "Walker", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 4, arc: "All"}, {saveType: "Invuln", save: 6, arc: "All"}
        ],
        caf: 5, morale: 3, wounds: 1, tacticalStrength: 3, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["In-built twin-linked bolter"]}
            ]},
            {name: "Primary", possibleModelLoadouts:[
                {loadout: "Kheres assault cannon"},
                {loadout: "Twin-linked lascannon"},
            ]},
        ],
        unitTraits: ["Armoured"],
    }],
    ["Command Squad", {
        unitType: "Infantry", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 4, arc: "All"}, {saveType: "Invuln", save: 6, arc: "All"}
        ],
        caf: 4, morale: 2, wounds: 1, tacticalStrength: 5, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Combi bolters"]}
            ]},
        ],
        unitTraits: ["Commander", "Inspire (8)", "Master Tactician", "Medicae"] //and whatever gives them invuln
    }],
    ["Deathstorm Drop Pod", {
        unitType: "Vehicle", scale: 2, saves: [
            {saveType: "Armour", save: 4, arc: "All"}
        ],
        caf: -8, wounds: 1, tacticalStrength: 0, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Deathstorm missile launcher"]}
            ]},
        ],
        unitTraits: ["Drop Pod", "Orbital Assault"]
    }],
    ["Deredeo Dreadnought", {
        unitType: "Walker", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 4, arc: "All"}, {saveType: "Invuln", save: 5, arc: "All"}
        ],
        caf: 2, morale: 3, wounds: 1, tacticalStrength: 3, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Sarcophagus mounted weapon", "Aiolus missile launcher"]}
            ]},
            {name: "Primary", possibleModelLoadouts:[
                {loadout: "Hellfire plasma cannonade"},
                {loadout: "Anvilus autocannonbattery"},
            ]}
        ],
        unitTraits: ["Armoured", "Tracking Array"],
    }],
    ["Dreadnought Drop Pod", {
        unitType: "Vehicle", scale: 2, saves: [
            {saveType: "Armour", save: 4, arc: "All"}
        ],
        caf: -8, wounds: 1, tacticalStrength: 0, voidShields: 0,
        modelLoadoutSlots: [],
        unitTraits: ["Drop Pod", "Large Transport (2)"]
    }],
    ["Drop Pod", {
        unitType: "Vehicle", scale: 2, saves: [
            {saveType: "Armour", save: 4, arc: "All"}
        ],
        caf: -3, wounds: 1, tacticalStrength: 0, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Turret Mounted twin bolter"]}
            ]},
        ],
        unitTraits: ["Drop Pod", "Transport (2)"]
    }],
    ["Javelin", {
        unitType: "Cavalry", scale: 1, move: 10, saves: [
            {saveType: "Armour", save: 4, arc: "All"}, {saveType: "Jink", save: 6, arc: "All"}
        ],
        caf: 1, morale: 3, wounds: 1, tacticalStrength: 3, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Nose Mounted heavy flamer"]}
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", weaponTypes: ["Sponson Mounted lascannon"]}, 
                {loadout: "Cyclone missile launcher"}
            ]}
        ],
        unitTraits: ["Skimmer"]
    }],
    ["Land Speeder", {
        unitType: "Cavalry", scale: 1, move: 10, saves: [
            {saveType: "Armour", save: 4, arc: "All"}, {saveType: "Jink", save: 6, arc: "All"}
        ],
        caf: 1, morale: 3, wounds: 1, tacticalStrength: 3, voidShields: 0,
        modelLoadoutSlots: [
            {name: "Guns", possibleModelLoadouts: [
                {loadout: "Plasma cannon and heavy bolter", weaponTypes: ["Plasma cannon", "Heavy bolter"]}, 
                {loadout: "Nose mounted heavy flamer and multi-melta", weaponTypes: ["Multi-melta", "Nose Mounted heavy flamer"]},
            ]},
        ],
        unitTraits: ["Skimmer"]
    }],
    ["Land Raider", {
        unitType: "Vehicle", scale: 2, move: 9, saves: [
            {saveType: "Armour", save: 2, arc: "Front"}, {saveType: "Armour", save: 3, arc: "Rear"}
        ],
        caf: 2, morale: 3, wounds: 1, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Sponson Mounted twin-linked lascannon"]}
            ]},
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "None", weaponTypes: []}, 
                {loadout: "Multi-melta", weaponTypes: ["Pintle Mounted multi-melta"]},
            ]},
        ],
        unitTraits: ["Assault Transport (2)", "Forward Deployment"]
    }],
    ["Legion Kratos", {
        unitType: "Vehicle", scale: 2, move: 8, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Front"},
        ],
        caf: 3, morale: 3, wounds: 1, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "Co-axial autocannon"}, 
            ]},
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Kratos battlecannon"}, 
                {loadout: "Melta blastgun"},
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", weaponTypes: ["Sponson Mounted lascannon"]}, 
                {loadout: "Heavy bolters", weaponTypes: ["Sponson Mounted heavy bolters"]},
            ]},
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", weaponTypes: ["Hull Mounted heavy bolters"]},
                {loadout: "Kratos lascannon"}, 
                {loadout: "Kratos autocannon"}, 
            ]}
        ],
        unitTraits: []
    }],
    ["Legion Outrider", {
        unitType: "Cavalry", scale: 1, move: 10, saves: [
            {saveType: "Armour", save: 5, arc: "All"}, {saveType: "Jink", save: 6, arc: "All"}
        ],
        caf: 2, morale: 3, wounds: 1, tacticalStrength: 3, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes:  ["Twin-linked bolters", "Twin plasma guns"],}
            ]}
        ],
        unitTraits: []
    }],
    ["Legion Predator", {
        unitType: "Vehicle", scale: 2, move: 9, saves: [
            {saveType: "Armour", save: 3, arc: "Front"},
            {saveType: "Armour", save: 4, arc: "Front"},
        ],
        caf: 2, morale: 3, wounds: 1, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Predator lascannon"}, 
                {loadout: "Predator cannon"},
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", weaponTypes: ["Sponson Mounted lascannon"]}, 
                {loadout: "Heavy bolters", weaponTypes: ["Sponson Mounted heavy bolters"]},
            ]}
        ],
        unitTraits: []
    }],
    ["Legion Rapier", {
        unitType: "Infantry", scale: 1, move: 4, saves: [
            {saveType: "Armour", save: 5, arc: "All"},
        ],
        caf: 1, morale: 3, wounds: 1, tacticalStrength: 5, voidShields: 0,
        modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts:[
                {loadout: "Laser destroyer array"},
                {loadout: "Quad launcher"},
            ]},
        ],
        unitTraits: ["Bulky"]
    }],
    ["Legion Sicaran", {
        unitType: "Vehicle", scale: 2, move: 10, saves: [
            {saveType: "Armour", save: 3, arc: "Front"},
            {saveType: "Armour", save: 4, arc: "Front"},
        ],
        caf: 2, morale: 3, wounds: 1, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes:  ["Hull Mounted heavy bolter"],}
            ]},
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Twin-linked accelerator autocannon"}, 
                {loadout: "Omega plasma array"}
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", weaponTypes: ["Sponson Mounted lascannon"]}, 
                {loadout: "Heavy bolters", weaponTypes: ["Sponson Mounted heavy bolters"]}
            ]}
        ],
        unitTraits: [],
    }],
    ["Legion Tarantula", {
        unitType: "Infantry", scale: 1, move: 0, saves: [
            {saveType: "Armour", save: 5, arc: "All"},
        ],
        caf: -3, wounds: 1, tacticalStrength: 0, voidShields: 0,
        modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts:[
                {loadout: "Hyperios air-defence missile launcher"},
                {loadout: "Tarantula lascannon battery"},
            ]},
        ],
        unitTraits: ["Automated Sentry"]
    }],
    ["Legion Terminators", {
        unitType: "Infantry", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 4, arc: "All"}, {saveType: "Invuln", save: 6, arc: "All"}
        ],
        caf: 4, morale: 3, wounds: 1, tacticalStrength: 6, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Combi bolters"]}
            ]},
        ],
        unitTraits: ["Bulky", "Deep Strike", "Implacable", "Steadfast"] //and whatever gives invuln
    }],
    ["Leviathan Dreadnought", {
        unitType: "Walker", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 4, arc: "All"}, {saveType: "Invuln", save: 5, arc: "All"}
        ],
        caf: 5, morale: 3, wounds: 1, tacticalStrength: 3, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Leviathan siege claw", "Twin-linked volkite calvier"]}
            ]},
            {name: "Primary", possibleModelLoadouts:[
                {loadout: "Cyclonic melta lance"},
                {loadout: "Leviathan storm cannon"},
            ]},
        ],
        unitTraits: ["Armoured"],
    }],
    ["Missile Launcher Legionaries",{
        unitType: "Infantry", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 5, arc: "All"}
        ],
        caf: 2, morale: 3, wounds: 1, tacticalStrength: 5, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Missile launchers"]}
            ]},
        ],
        unitTraits: []
    }],
    ["Palisade Drop Pod" , {
        unitType: "Vehicle", scale: 2, saves: [
            {saveType: "Armour", save: 4, arc: "All"}
        ],
        caf: -8, wounds: 1, tacticalStrength: 0, voidShields: 0,
        modelLoadoutSlots: [],
        unitTraits: ["Drop Pod", "Shield Generator (5+)"]
    }],
    ["Plasma Support Legionaries", {
        unitType: "Infantry", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 5, arc: "All"}
        ],
        caf: 2, morale: 3, wounds: 1, tacticalStrength: 5, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Plasma guns"]}
            ]},
        ],
        unitTraits: []
    }],
    ["Rhino", {
        unitType: "Vehicle", scale: 2, move: 9, saves: [
            {saveType: "Armour", save: 4, arc: "Front"}, {saveType: "Armour", save: 5, arc: "Rear"}
        ],
        caf: 0, morale: 3, wounds: 1, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "Twin-linked bolter", weaponTypes: ["Pintle Mounted twin bolter"]}, 
                {loadout: "Havoc launcher", weaponTypes: ["Pintle Mounted havoc launcher"]},
                {loadout: "Multi-melta", weaponTypes: ["Pintle Mounted multi-melta"]},
            ]},
        ],
        unitTraits: ["Transport (2)"]
    }],
    ["Scimitar Jetbike", {
        unitType: "Cavalry", scale: 1, move: 10, saves: [
            {saveType: "Armour", save: 5, arc: "All"}, {saveType: "Jink", save: 6, arc: "All"}
        ],
        caf: 2, morale: 3, wounds: 1, tacticalStrength: 3, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Scimitar heavy bolter"]}
            ]},
        ],
        unitTraits: ["Skimmer"]
    }],
    ["Spartan", {
        unitType: "Vehicle", scale: 2, move: 8, saves: [
            {saveType: "Armour", save: 2, arc: "Front"}, {saveType: "Armour", save: 3, arc: "Rear"}
        ],
        caf: 2, morale: 3, wounds: 2, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "Sponson mounted", possibleModelLoadouts: [
                {loadout: "Quad lascannon"}, 
                {loadout: "Laser destroyers"},
            ]},
            {name: "Hull mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolters"}, 
                {loadout: "Lascannon"},
            ]},
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "None", weaponTypes: []}, 
                {loadout: "Multi-melta"},
            ]},
        ],
        unitTraits: ["Assault Transport (5)"]
    }],
    ["Tactical Legionaries", {
        unitType: "Infantry", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 5, arc: "All"},
        ],
        caf: 2, morale: 3, wounds: 1, tacticalStrength: 5, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Legion bolters"]}
            ]},
        ],
        unitTraits: []
    }],
]);

export function getStatsForLegionModelType(modelType: LegionModelType): Stats | undefined {
    return statsForModelType.get(modelType)
}