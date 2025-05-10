import { LegionDetachmentName, LegionFormationName, LegionModelName } from "./legionTypes.ts";
import { DetachmentName, FormationSlot, FormationShape, DetachmentConfiguration, Stats, DetachmentValidationState, Detachment } from "./types.ts";

const formationShapes = new Map<LegionFormationName, FormationShape>([
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
    ]}],
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
    ]}],
    ["Legion Subterranean Assault", { slotRequirements: [
        {   slot: "HQ",             slotRequirementType: "Required"                 },
        {   slot: "Support",        slotRequirementType: "Required"                 },
        {   slot: "Core",           slotRequirementType: "Required"                 },
        {   slot: "Core",           slotRequirementType: "Required"                 },
        {   slot: "Support",        slotRequirementType: "Optional"                 },
        {   slot: "Support",        slotRequirementType: "Optional"                 },
        {   slot: "Core",           slotRequirementType: "Optional"                 },
        {   slot: "Core",           slotRequirementType: "Optional"                 },
    ]}]
])

export function getShapeForLegionFormationName(formationName: LegionFormationName | ""): FormationShape {
    if(formationName == "") return { slotRequirements: [] };
    return formationShapes.get(formationName) ?? { slotRequirements: [] };
}

const detachmentNamesForSlot = new Map<FormationSlot, LegionDetachmentName[]>([
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
    ["Battle Tank", [
        "Legion Predator Commander",
        "Legion Predator Squadron",
        "Legion Sicaran Arcus Squadron",
        "Legion Sicaran Commander",
        "Legion Sicaran Punisher Squadron",
        "Legion Sicaran Squadron",
    ]],
    ["Core", ["Legion Tactical Detachment"]],  
    ["Heavy Armour", [
        "Legion Kratos Commander",
        "Legion Kratos Squadron"
    ]],
    ["HQ", [ 
        "Legion Command",
        "Legion Kratos Commander",
        "Legion Predator Commander",
        "Legion Sicaran Commander"
    ]],
    ["Legion Heavy Assault Spearhead Support Compulsory", [
        "Legion Dreadnought Talon",
        "Legion Terminator Detachment", 
        "Leviathan Siege Dreadnought Detachment",
    ]],
    ["Legion Terminators", ["Legion Terminator Detachment"]],
    [ "Light Armour", [ "Legion Sabre Squadron" ] ],
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
        "Legion Spartan Detachment",
        "Legion Termite Detachment",
    ] ], 
    [ "Vanguard", [
        "Legion Javelin Squadron",
        "Legion Land Speeder Squadron",
        "Legion Outrider Squadron",
        "Legion Scimitar Jetbike Squadron"
    ] ]
]);

export function getLegionDetachmentNamesForSlot(slot: FormationSlot): LegionDetachmentName[] {
    return detachmentNamesForSlot.get(slot) ?? [];
}

const detachmentConfigurationForDetachmentName: Map<DetachmentName, DetachmentConfiguration> = new Map([
    //CRB
    ["Legion Command", {modelGroupShapes: [
        {modelName: "Command Squad", modelLoadoutSlots: [], possibleModelGroupQuantities: [{num: 1, points: 25}]},
        {modelName: "Rhino", dedicatedTransport: true, formationNames: ["Legion Demi-Company"], modelLoadoutSlots: [
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "Twin-linked bolter", points: 0}, 
                {loadout: "Havoc launcher", points: 2},
                {loadout: "Multi-melta", points: 4},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 10}, 
        ]},
        {modelName: "Storm Eagle", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 100}, 
        ]},
        {modelName: "Thunderhawk Gunship", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150},
        ]},
        {modelName: "Drop Pod", dedicatedTransport: true, formationNames: ["Legion Drop Pod Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 1, points: 6}
        ]},
        {modelName: "Legion Termite", dedicatedTransport: true, formationNames: ["Legion Subterranean Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 1, points: 18}
        ]}
    ]}],
    ["Legion Tactical Detachment", {maxModels: 12, modelGroupShapes: [
        {modelName: "Tactical Legionaries", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 35}, {num: 6, points: 35+12}, {num: 8, points: 35+12*2}, {num: 10, points: 35+12*3}, {num: 12, points: 35+12*4},
        ], unitTraits: ["Independent"]},
        {modelName: "Assault Marines", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 2, points: 12}, {num: 4, points: 24}, {num: 6, points: 36}, {num: 8, points: 48},
        ]},
        {modelName: "Legion Terminators", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 2, points: 15}, {num: 4, points: 30}, {num: 6, points: 45}, {num: 8, points: 60},
        ]},
        {modelName: "Missile Launcher Legionaries", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 2, points: 15}, {num: 4, points: 30}, {num: 6, points: 45}, {num: 8, points: 60},
        ]},
        {modelName: "Plasma Support Legionaries", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 2, points: 15}, {num: 4, points: 30}, {num: 6, points: 45}, {num: 8, points: 60},
        ]},
        {modelName: "Rhino", dedicatedTransport: true, formationNames: ["Legion Demi-Company"], modelLoadoutSlots: [
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "Twin-linked bolter", points: 0}, 
                {loadout: "Havoc launcher", points: 2},
                {loadout: "Multi-melta", points: 4},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 10}, {num: 2, points: 20}, {num: 3, points: 30}, 
            {num: 4, points: 40}, {num: 5, points: 50}, {num: 6, points: 60}
        ]},
        {modelName: "Storm Eagle", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 100}, {num: 2, points: 100+100}, {num: 3, points: 100+200}
        ]},
        {modelName: "Thunderhawk Gunship", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}, {num: 2, points: 150+150}
        ]},
        {modelName: "Drop Pod", dedicatedTransport: true, formationNames: ["Legion Drop Pod Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 6*2}, {num: 3, points: 6*3}, {num: 4, points: 6*4}, {num: 5, points: 6*5}, {num: 6, points: 6*6}
        ]},
        {modelName: "Legion Termite", dedicatedTransport: true, formationNames: ["Legion Subterranean Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 18*2}, {num: 3, points: 18*3}, {num: 4, points: 18*4}, {num: 5, points: 18*5}, {num: 6, points: 18*6}
        ]}
    ]}],
    ["Legion Plasma Gun Support Detachment", {modelGroupShapes: [
        {modelName: "Plasma Support Legionaries", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 35}, {num: 4+2, points: 35+15}, {num: 4+4, points: 35+30},
        ]},
        {modelName: "Rhino", dedicatedTransport: true, formationNames: ["Legion Demi-Company"], modelLoadoutSlots: [
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "Twin-linked bolter", points: 0}, 
                {loadout: "Havoc launcher", points: 2},
                {loadout: "Multi-melta", points: 4},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 10}, {num: 2, points: 20}, {num: 3, points: 30}, 
            {num: 4, points: 40},
        ]},
        {modelName: "Storm Eagle", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 100}, {num: 2, points: 100+100}
        ]},
        {modelName: "Thunderhawk Gunship", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}
        ]},
        {modelName: "Drop Pod", dedicatedTransport: true, formationNames: ["Legion Drop Pod Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 6*2}, {num: 3, points: 6*3}, {num: 4, points: 6*4}
        ]},
        {modelName: "Legion Termite", dedicatedTransport: true, formationNames: ["Legion Subterranean Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 18*2}, {num: 3, points: 18*3}, {num: 4, points: 18*4}
        ]}
    ]}],
    ["Legion Missile Launcher Support Detachment", {modelGroupShapes: [
        {modelName: "Missile Launcher Legionaries", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 40}, {num: 4+2, points: 40+15}, {num: 4+4, points: 40+30},
        ]},
        {modelName: "Rhino", dedicatedTransport: true, formationNames: ["Legion Demi-Company"], modelLoadoutSlots: [
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "Twin-linked bolter", points: 0}, 
                {loadout: "Havoc launcher", points: 2},
                {loadout: "Multi-melta", points: 4},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 10}, {num: 2, points: 20}, {num: 3, points: 30}, 
            {num: 4, points: 40},
        ]},
        {modelName: "Storm Eagle", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 100}, {num: 2, points: 100+100}
        ]},
        {modelName: "Thunderhawk Gunship", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}
        ]},
        {modelName: "Drop Pod", dedicatedTransport: true, formationNames: ["Legion Drop Pod Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 6*2}, {num: 3, points: 6*3}, {num: 4, points: 6*4}
        ]},
        {modelName: "Legion Termite", dedicatedTransport: true, formationNames: ["Legion Subterranean Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 18*2}, {num: 3, points: 18*3}, {num: 4, points: 18*4}
        ]}
    ]}],
    ["Legion Assault Detachment", {modelGroupShapes: [
        {modelName: "Assault Marines", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 30}, {num: 4+2, points: 30+12}, {num: 4+4, points: 30+24},
        ]},
        {modelName: "Storm Eagle", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 100}, {num: 2, points: 100+100}, {num: 3, points: 300}, {num: 4, points: 400}
        ]},
        {modelName: "Thunderhawk Gunship", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}
        ]}
    ]}],
    ["Legion Terminator Detachment", { customValidation: (detachment: Detachment): DetachmentValidationState => {
        if(detachment.slot == "Legion Heavy Assault Spearhead Support Compulsory" 
            || detachment.slot == "Legion Terminators") {
                const landRaiders = detachment.modelGroups.find((s)=>s.modelName == "Land Raider");
                const numLandRaiders = landRaiders?.modelLoadoutGroups.reduce((p, s)=>p + s.number, 0)??0;
                const spartans = detachment.modelGroups.find((s)=>s.modelName == "Spartan");
                const numSpartans = spartans?.modelLoadoutGroups.reduce((p, s)=>p + s.number, 0)??0;
                if(numLandRaiders + numSpartans == 0) {
                    return {valid: false, error: "Need more dedicated transports", data: "must be in a dedicated transport"}
                }
            }
            return {valid: true}
        },
        modelGroupShapes: [
        {modelName: "Legion Terminators", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 50}, {num: 4+2, points: 50+15}, {num: 4+4, points: 50+30},
        ]},
        {modelName: "Storm Eagle", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 100}, {num: 2, points: 100+100}, {num: 3, points: 300}, {num: 4, points: 400}
        ]},
        {modelName: "Thunderhawk Gunship", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}
        ]},
        {modelName: "Land Raider", dedicatedTransport: true, formationNames: ["Legion Heavy Assault Spearhead"], modelLoadoutSlots: [
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, 
                {loadout: "Multi-melta", points: 5},
            ]},
        ], possibleModelGroupQuantities: [ 
            {num: 0, points: 0}, {num: 4, points: 4*40}, {num: 6, points: 6*40}, {num: 8, points: 8*40}, 
        ]},
        {modelName: "Spartan", dedicatedTransport: true, formationNames: ["Legion Heavy Assault Spearhead"], modelLoadoutSlots: [
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
            {num: 0, points: 0}, {num: 2, points: 2*80}, {num: 3, points: 3*80}, {num: 4, points: 4*80}, 
        ]}
    ]}],
    ["Legion Rapier Battery Detachment", {minModels: 2, maxModels: 8, modelGroupShapes: [
        {modelName: "Legion Rapier", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts:[
                {loadout: "Laser destroyer array", points: 0},
                {loadout: "Quad launcher", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 2, points: 40}, {num: 2+2, points: 40+30}, {num: 2+4, points: 40+60}, {num: 2+6, points: 40+90},
        ]},
        {modelName: "Storm Eagle", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 100}, {num: 2, points: 100+100}, {num: 3, points: 300}, {num: 4, points: 400}
        ]},
        {modelName: "Thunderhawk Gunship", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}
        ]}
    ]}],
    ["Leviathan Siege Dreadnought Detachment", {minModels: 4, maxModels: 8, modelGroupShapes: [
        {modelName: "Leviathan Dreadnought", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts:[
                {loadout: "Leviathan storm cannon", points: 0},    
                {loadout: "Cyclonic melta lance", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 4, points: 75}, {num: 4+2, points: 75+35}, {num: 4+4, points: 75+70},
        ]},
        {modelName: "Thunderhawk Gunship", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}, {num: 2, points: 300}
        ]},
        {modelName: "Dreadnought Drop Pod", dedicatedTransport: true, formationNames: ["Legion Drop Pod Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 1, points: 7}, {num: 2, points: 7*2}, {num: 3, points: 7*3}, {num: 4, points: 7*4},
            {num: 5, points: 7*5}, {num: 6, points: 7*6}, {num: 7, points: 7*7}, {num: 8, points: 7*8}
        ]}
    ]}],
    ["Legion Dreadnought Talon", {minModels: 4, maxModels: 4+3*2, modelGroupShapes: [
        {modelName: "Contemptor Dreadnought", minModels:4, maxModels: 10, modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts:[
                {loadout: "Kheres assault cannon", points: 0},
                {loadout: "Twin-linked lascannon", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 4, points: 70}, {num: 6, points: 70+30}, {num: 8, points: 70+30*2},
            {num: 10, points: 70+30*3}
        ]},
        {modelName: "Leviathan Dreadnought", minModels: 0, maxModels: 6, modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts:[
                {loadout: "Leviathan storm cannon", points: 0},
                {loadout: "Cyclonic melta lance", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 0, points: 0},
            {num: 2, points: 35}, {num: 4, points: 35*2},
            {num: 6, points: 35*3}
        ]},
        {modelName: "Thunderhawk Gunship", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}, {num: 2, points: 300}, {num: 3, points: 450}
        ]},
        {modelName: "Dreadnought Drop Pod", dedicatedTransport: true, formationNames: ["Legion Drop Pod Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 7*4},
            {num: 5, points: 7*5}, {num: 6, points: 7*6}, {num: 7, points: 7*7}, {num: 8, points: 7*8}, 
            {num: 9, points: 7*9}, {num: 10, points: 7*10}
        ]}
    ]}],
    ["Legion Tarantula Battery", {minModels: 4, maxModels: 8, modelGroupShapes: [
        {modelName: "Legion Tarantula", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts:[
                {loadout: "Tarantula lascannon battery", points: 0},
                {loadout: "Hyperios air-defence missile launcher", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 4, points: 36}, {num: 4+2, points: 36+15}, {num: 4+4, points: 36+30}
        ]},
    ]}],
    ["Legion Deredeo Dreadnought Detachment", {minModels: 4, modelGroupShapes: [
        {modelName: "Deredeo Dreadnought", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts:[
                {loadout: "Hellfire plasma cannonade", points: 0},
                {loadout: "Anvilus autocannon battery", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 4, points: 85}, {num: 4+2, points: 85+40}, {num: 4+4, points: 85+80}
        ]},
        {modelName: "Thunderhawk Gunship", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}
        ]}
    ]}],
    ["Legion Predator Squadron", {minModels: 3, maxModels: 9, modelGroupShapes: [
        {modelName: "Legion Predator", modelLoadoutSlots: [
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
        {modelName: "Legion Sicaran", modelLoadoutSlots: [
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
        {modelName: "Legion Kratos", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Kratos battlecannon", points: 0}, 
                {loadout: "Melta blastgun", points: 0}
            ]},
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", weaponTypes: ["Hull Mounted heavy bolters"], points: 0},
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
        {modelName: "Rhino", modelLoadoutSlots: [
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
        {modelName: "Xiphon Interceptor", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 1, points: 95}, {num: 2, points: 95+85}, {num: 3, points: 95+160}, {num: 4, points: 95+215},
        ]}
    ]}],
    ["Legion Storm Eagle Squadron", {modelGroupShapes: [
        {modelName: "Storm Eagle", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 1, points: 100}, {num: 2, points: 100+100}, {num: 3, points: 100+190}
        ]}
    ]}],
    ["Legion Fire Raptor Squadron", {modelGroupShapes: [
        {modelName: "Fire Raptor", modelLoadoutSlots: [
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
        {modelName: "Thunderhawk Gunship", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 1, points: 150}, {num: 2, points: 150+150}, {num: 3, points: 150+280}
        ]}
    ]}],
    //TGS
    ["Legion Outrider Squadron", {minModels: 2, maxModels: 6, modelGroupShapes: [
        {modelName: "Legion Outrider", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 30}, {num: 4, points: 30+30}, {num: 6, points: 30+60}
        ]}
    ]}],
    ["Legion Scimitar Jetbike Squadron", {minModels: 3, maxModels: 9, modelGroupShapes: [
        {modelName: "Scimitar Jetbike", modelLoadoutSlots: [], possibleModelGroupQuantities: [
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
            {modelName: "Land Speeder", modelLoadoutSlots: [
                {name: "Guns", possibleModelLoadouts: [
                    {loadout: "Plasma cannon and heavy bolter", points: 0}, 
                    {loadout: "Nose mounted heavy flamer and multi-melta", points: 0},
                ]},
            ], possibleModelGroupQuantities: [
                {num: 2, points: 30}, {num: 4, points: 30+30}, {num: 6, points: 30+60}
            ]}
    ]}],
    ["Legion Javelin Squadron", {minModels: 2, maxModels: 6, modelGroupShapes: [
        {modelName: "Javelin", modelLoadoutSlots: [
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", points: 0}, {loadout: "Cyclone missile launcher", points: 2}
            ]}
        ], possibleModelGroupQuantities: [
            {num: 2, points: 33}, {num: 4, points: 33+33}, {num: 6, points: 33+66}
        ]}
    ]}],
    ["Legion Spartan Detachment", {modelGroupShapes: [
        {modelName: "Spartan", modelLoadoutSlots: [
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
            {num: 1, points: 80}, {num: 2, points: 2*80}, {num: 3, points: 3*80}, {num: 4, points: 4*80}, 
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
            {modelName: "Land Raider", modelLoadoutSlots: [
                {name: "Pintle mounted", possibleModelLoadouts: [
                    {loadout: "None", points: 0}, 
                    {loadout: "Multi-melta", points: 5},
                ]},
            ], possibleModelGroupQuantities: [
                //p128 - max transport size is 8
                {num: 1, points: 40}, {num: 2, points: 2*40}, {num: 3, points: 3*40}, {num: 4, points: 4*40}, 
                {num: 5, points: 5*40}, {num: 6, points: 6*40}, {num: 7, points: 7*40}, {num: 8, points: 8*40}, 
            ]}
    ]}],
    ["Legion Drop Pod Detachment", {
        //why does TGS have lots of stupid list restrictions
        customValidation: (detachment: Detachment): DetachmentValidationState => {
            const dropPods = detachment.modelGroups.find((a)=>a.modelName == "Drop Pod");
            const palisadeDropPods = detachment.modelGroups.find((a)=>a.modelName == "Palisade Drop Pod");

            if(palisadeDropPods == undefined)
                return {valid: true};

            if(dropPods == undefined || palisadeDropPods.number > dropPods.number)
                return {valid: false, error: "Invalid loadouts of models in group", 
                    data: "Can't have more Drop pods than Palisade Drop pod"};

            return {valid: true};
        },
        modelGroupShapes:[
        {modelName: "Drop Pod", modelLoadoutSlots: [], possibleModelGroupQuantities:[
            //p128 - max transport size is 8
            {num: 1, points: 6}, {num: 2, points: 2*6}, {num: 3, points: 3*6}, {num: 4, points: 4*6}, 
            {num: 5, points: 5*6}, {num: 6, points: 6*6}, {num: 7, points: 7*6}, {num: 8, points: 8*6}, 
        ]},
        {modelName: "Palisade Drop Pod", modelLoadoutSlots: [], possibleModelGroupQuantities:[
            //p128 - max transport size is 8
            {num: 0, points: 0}, {num: 1, points: 32}, {num: 2, points: 2*32}, {num: 3, points: 3*32}, {num: 4, points: 4*32}, 
            {num: 5, points: 5*32}, {num: 6, points: 6*32}, {num: 7, points: 7*32}, {num: 8, points: 8*32}, 
        ]},
    ]}],
    ["Legion Dreadnought Drop Pod Detachment", {
        customValidation: (detachment: Detachment): DetachmentValidationState => {
            const dropPods = detachment.modelGroups.find((a)=>a.modelName == "Dreadnought Drop Pod");
            const palisadeDropPods = detachment.modelGroups.find((a)=>a.modelName == "Palisade Drop Pod");

            if(palisadeDropPods == undefined)
                return {valid: true};

            if(dropPods == undefined || palisadeDropPods.number > dropPods.number)
                return {valid: false, error: "Invalid loadouts of models in group", 
                    data: "Can't have more Dreadnought Drop pods than Palisade Drop pods"};

            return {valid: true};
        },
        modelGroupShapes:[
        {modelName: "Dreadnought Drop Pod", modelLoadoutSlots: [], possibleModelGroupQuantities:[
            //p128 - max transport size is 8
            {num: 1, points: 7}, {num: 2, points: 2*7}, {num: 3, points: 3*7}, {num: 4, points: 4*7}, 
            {num: 5, points: 5*7}, {num: 6, points: 6*7}, {num: 7, points: 7*7}, {num: 8, points: 8*7}, 
        ]},
        {modelName: "Palisade Drop Pod", modelLoadoutSlots: [], possibleModelGroupQuantities:[
            //p128 - max transport size is 8
            {num: 0, points: 0}, {num: 1, points: 32}, {num: 2, points: 2*32}, {num: 3, points: 3*32}, {num: 4, points: 4*32}, 
            {num: 5, points: 5*32}, {num: 6, points: 6*32}, {num: 7, points: 7*32}, {num: 8, points: 8*32}, 
        ]},
    ]}],
    ["Legion Deathstorm Drop Pod Battery", {modelGroupShapes:[
        {modelName: "Deathstorm Drop Pod", modelLoadoutSlots: [], possibleModelGroupQuantities:[
            {num: 2, points: 32}, {num: 2+2, points: 32+32}, {num: 2+4, points: 32+64}
        ]},
    ]}],
    //TDOT
    ["Legion Sicaran Punisher Squadron", {minModels: 2, maxModels: 6, modelGroupShapes: [
        {modelName: "Sicaran Punisher", modelLoadoutSlots: [
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", points: 0}, 
                {loadout: "Heavy bolters", points: 0}
            ]}
        ], possibleModelGroupQuantities: [
            {num: 2, points: 110}, {num: 3, points: 110+50}, {num: 4, points: 110+100},
            {num: 5, points: 110+100+50}, {num: 6, points: 110+200} 
        ]}
    ]}],
    ["Legion Sicaran Arcus Squadron", {minModels: 2, maxModels: 6, modelGroupShapes: [
        {modelName: "Sicaran Arcus", modelLoadoutSlots: [
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", points: 0}, 
                {loadout: "Heavy bolters", points: 0}
            ]}
        ], possibleModelGroupQuantities: [
            {num: 2, points: 115}, {num: 3, points: 115+60}, {num: 4, points: 115+110},
            {num: 5, points: 115+110+60}, {num: 6, points: 115+220} 
        ]}
    ]}],
    ["Legion Sabre Squadron", {minModels: 4, maxModels: 8, modelGroupShapes: [
        {modelName: "Sabre", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Hull Mounted neutron blaster", points: 0}, 
                {loadout: "Hull Mounted Anvilus autocannon", points: 0}
            ]},
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", points: 0}, 
                {loadout: "Multi-melta", points: 0}
            ]},
        ], possibleModelGroupQuantities: [
            {num: 4, points: 120}, {num: 6, points: 120+55}, {num: 8, points: 120+110},
        ]}
    ]}],
    ["Legion Termite Detachment", {modelGroupShapes: [
        {modelName: "Termite", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            //p128 - max transport size is 8
            {num: 1, points: 18}, {num: 2, points: 2*18}, {num: 3, points: 3*18}, {num: 4, points: 4*18}, 
            {num: 5, points: 5*18}, {num: 6, points: 6*18}, {num: 7, points: 7*18}, {num: 8, points: 8*18}, 
        ]}
    ]}],
    ["Legion Predator Commander", {minModels: 1, maxModels: 1, modelGroupShapes: [
        {modelName: "Predator Commander", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Predator lascannon", points: 0}, 
                {loadout: "Predator cannon", points: 0},
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", points: 0}, 
                {loadout: "Heavy bolters", points: 0},
            ]}
        ], possibleModelGroupQuantities: [
            {num: 1, points: 60}
        ]}
    ]}],
    ["Legion Sicaran Commander", {minModels: 1, maxModels: 1, modelGroupShapes: [
        {modelName: "Sicaran Commander", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Twin-linked accelerator autocannon", points: 0}, 
                {loadout: "Omega plasma array", points: 0}
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", points: 0}, 
                {loadout: "Heavy bolters", points: 0}
            ]}
        ], possibleModelGroupQuantities: [
            {num: 1, points: 70}
        ]}
    ]}],
    ["Legion Kratos Commander", {minModels: 1, maxModels: 1, modelGroupShapes: [
        {modelName: "Kratos Commander", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Kratos battlecannon", points: 0}, 
                {loadout: "Melta blastgun", points: 0}
            ]},
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", weaponTypes: ["Hull Mounted heavy bolters"], points: 0},
                {loadout: "Kratos lascannon", points: 0},
                {loadout: "Kratos autocannon", points: 0}
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", points: 0}, 
                {loadout: "Heavy bolters", points: 0}
            ]}
        ], possibleModelGroupQuantities: [
            {num: 1, points: 100}
        ]}
    ]}],
]);

export function getLegionDetachmentConfigurationForDetachmentName(detachmentName: DetachmentName): DetachmentConfiguration {
    return detachmentConfigurationForDetachmentName.get(detachmentName) ?? {modelGroupShapes: []}
}

const statsForModelType = new Map<LegionModelName, Stats>([
    ["Assault Marines", {
        detachmentType: "Infantry", scale: 1, move: 7, saves: [
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
        detachmentType: "Walker", scale: 1, move: 5, saves: [
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
        detachmentType: "Infantry", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 4, arc: "All"}, {saveType: "Invuln", save: 6, arc: "All"}
        ],
        caf: 4, morale: 2, wounds: 1, tacticalStrength: 5, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Combi bolters"]}
            ]},
        ],
        unitTraits: ["Commander", "Inspire (8)", "Master Tactician", "Medicae"], //and whatever gives them invuln
        commandAttachment: "SameType"
    }],
    ["Deathstorm Drop Pod", {
        detachmentType: "Vehicle", scale: 2, saves: [
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
        detachmentType: "Walker", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 4, arc: "All"}, {saveType: "Invuln", save: 5, arc: "All"}
        ],
        caf: 2, morale: 3, wounds: 1, tacticalStrength: 3, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Sarcophagus mounted weapon", "Aiolus missile launcher"]}
            ]},
            {name: "Primary", possibleModelLoadouts:[
                {loadout: "Hellfire plasma cannonade"},
                {loadout: "Anvilus autocannon battery"},
            ]}
        ],
        unitTraits: ["Armoured", "Tracking Array"],
    }],
    ["Dreadnought Drop Pod", {
        detachmentType: "Vehicle", scale: 2, saves: [
            {saveType: "Armour", save: 4, arc: "All"}
        ],
        caf: -8, wounds: 1, tacticalStrength: 0, voidShields: 0,
        modelLoadoutSlots: [],
        unitTraits: ["Drop Pod", "Large Transport (2)"]
    }],
    ["Drop Pod", {
        detachmentType: "Vehicle", scale: 2, saves: [
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
    ["Fire Raptor", {
        detachmentType: "Vehicle", scale: 2, move: 25, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"},
            {saveType: "Jink", save: 5, arc: "All"}
        ],
        caf: 0, wounds: 1, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Avenger bolt cannon", "Tempest rockets"]}
            ]},
            {name: "Turrets", possibleModelLoadouts: [
                {loadout: "Quad heavy bolter batteries"}, 
                {loadout: "Lascannon batteries"},
                {loadout: "Gravis autocannon batteries"},
            ]},
        ],
        unitTraits: ["Flyer", "Hover"]
    }],
    ["Javelin", {
        detachmentType: "Cavalry", scale: 1, move: 10, saves: [
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
    ["Kratos Commander", {
        detachmentType: "Vehicle", scale: 2, move: 8, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Front"},
            {saveType: "Invuln", save: 6, arc: "All"}
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
        unitTraits: ["Commander", "Inspire (8)", "Master Tactician"]
    }],
    ["Land Speeder", {
        detachmentType: "Cavalry", scale: 1, move: 10, saves: [
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
        detachmentType: "Vehicle", scale: 2, move: 9, saves: [
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
        detachmentType: "Vehicle", scale: 2, move: 8, saves: [
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
        detachmentType: "Cavalry", scale: 1, move: 10, saves: [
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
        detachmentType: "Vehicle", scale: 2, move: 9, saves: [
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
        detachmentType: "Infantry", scale: 1, move: 4, saves: [
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
        detachmentType: "Vehicle", scale: 2, move: 10, saves: [
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
        detachmentType: "Infantry", scale: 1, move: 0, saves: [
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
        detachmentType: "Infantry", scale: 1, move: 5, saves: [
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
        detachmentType: "Walker", scale: 1, move: 5, saves: [
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
        detachmentType: "Infantry", scale: 1, move: 5, saves: [
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
        detachmentType: "Vehicle", scale: 2, saves: [
            {saveType: "Armour", save: 4, arc: "All"}
        ],
        caf: -8, wounds: 1, tacticalStrength: 0, voidShields: 0,
        modelLoadoutSlots: [],
        unitTraits: ["Drop Pod", "Shield Generator (5+)"]
    }],
    ["Plasma Support Legionaries", {
        detachmentType: "Infantry", scale: 1, move: 5, saves: [
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
    ["Predator Commander", {
        detachmentType: "Vehicle", scale: 2, move: 9, saves: [
            {saveType: "Armour", save: 3, arc: "Front"},
            {saveType: "Armour", save: 4, arc: "Front"},
            {saveType: "Invuln", save: 6, arc: "All"}
        ],
        caf: 3, morale: 2, wounds: 1, tacticalStrength: 2, voidShields: 0,
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
        unitTraits: ["Commander", "Inspire (8)", "Master Tactician"]
    }],
    ["Rhino", {
        detachmentType: "Vehicle", scale: 2, move: 9, saves: [
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
    ["Sabre", {
        detachmentType: "Vehicle", scale: 2, move: 11, saves: [
            {saveType: "Armour", save: 4, arc: "Front"},
            {saveType: "Armour", save: 5, arc: "Front"},
        ],
        caf: 2, morale: 3, wounds: 1, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [{
                loadout: "", weaponTypes: ["Sabre missiles"]
            }]},
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Hull Mounted neutron blaster"}, 
                {loadout: "Hull Mounted Anvilus autocannon"}
            ]},
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", weaponTypes: ["Hull Mounted heavy bolter"]}, 
                {loadout: "Multi-melta", weaponTypes: ["Hull mounted multi-melta"]}
            ]},
        ],
        unitTraits: ["Nimble"]
    }],
    ["Scimitar Jetbike", {
        detachmentType: "Cavalry", scale: 1, move: 10, saves: [
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
    ["Sicaran Arcus", {
        detachmentType: "Vehicle", scale: 2, move: 10, saves: [
            {saveType: "Armour", save: 3, arc: "Front"},
            {saveType: "Armour", save: 4, arc: "Front"},
        ],
        caf: 2, morale: 3, wounds: 1, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Arcus missile launcher", "Hull Mounted heavy bolter"],}
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", weaponTypes: ["Sponson Mounted lascannon"]}, 
                {loadout: "Heavy bolters", weaponTypes: ["Sponson Mounted heavy bolters"]}
            ]}
        ],
        unitTraits: [],
    }],
    ["Sicaran Commander", {
        detachmentType: "Vehicle", scale: 2, move: 10, saves: [
            {saveType: "Armour", save: 3, arc: "Front"},
            {saveType: "Armour", save: 4, arc: "Front"},
            {saveType: "Invuln", save: 6, arc: "Front"},
        ],
        caf: 3, morale: 2, wounds: 1, tacticalStrength: 2, voidShields: 0,
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
        unitTraits: ["Commander", "Inspire (8)", "Master Tactician"],
    }],
    ["Sicaran Punisher", {
        detachmentType: "Vehicle", scale: 2, move: 10, saves: [
            {saveType: "Armour", save: 3, arc: "Front"},
            {saveType: "Armour", save: 4, arc: "Front"},
        ],
        caf: 2, morale: 3, wounds: 1, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes:  ["Hull Mounted heavy bolter", "Punisher rotary cannon"],}
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", weaponTypes: ["Sponson Mounted lascannon"]}, 
                {loadout: "Heavy bolters", weaponTypes: ["Sponson Mounted heavy bolters"]}
            ]}
        ],
        unitTraits: [],
    }],
    ["Spartan", {
        detachmentType: "Vehicle", scale: 2, move: 8, saves: [
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
    ["Storm Eagle", {
        detachmentType: "Vehicle", scale: 2, move: 25, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"},
            {saveType: "Jink", save: 5, arc: "All"}
        ],
        caf: 0, wounds: 1, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: [
                    "Storm Eagle heavy bolter",
                    "Wing Mounted lascannon",
                    "Vengance launcher"
                ]}, 
            ]},
        ],
        unitTraits: ["Assault Transport (5)", "Flyer", "Hover"]
    }],
    ["Tactical Legionaries", {
        detachmentType: "Infantry", scale: 1, move: 5, saves: [
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
    ["Termite", {
        detachmentType: "Vehicle", scale: 2, move: 5, saves: [
            {saveType: "Armour", save: 4, arc: "Front"}, {saveType: "Armour", save: 5, arc: "Rear"}
        ],
        caf: 1, morale: 3, wounds: 1, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Termite twin-linked bolters"]}, 
            ]},
        ],
        unitTraits: ["Deep Strike", "Transport (2)"]
    }],
    ["Thunderhawk Gunship", {
        detachmentType: "Vehicle", scale: 2, move: 25, saves: [
            {saveType: "Armour", save: 2, arc: "Front"}, {saveType: "Armour", save: 3, arc: "Rear"},
            {saveType: "Jink", save: 5, arc: "All"}
        ],
        caf: 0, wounds: 2, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: [
                    "Hellstrike missiles",
                    "Thunderhawk heavy bolters",
                    "Thunderhawk lascannon",
                    "Turbo-laser destructor"
                ]}, 
            ]},
        ],
        unitTraits: ["Large Assault Transport (5)", "Flyer", "Hover"]
    }],
    ["Xiphon Interceptor", {
        detachmentType: "Vehicle", scale: 2, move: 30, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"},
            {saveType: "Jink", save: 5, arc: "All"}
        ],
        caf: 0, wounds: 1, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Xiphon lascannon array", "Xiphon rotary missile launcher"]}, 
            ]},
        ],
        unitTraits: ["Flyer", "Interceptor"]
    }],
]);

export function getStatsForLegionModelType(modelName: LegionModelName): Stats {
    const out = statsForModelType.get(modelName)
    //I can do this because I've done all the legion stats
    if(out === undefined) 
        throw "Can't find stats";
    return out;
}