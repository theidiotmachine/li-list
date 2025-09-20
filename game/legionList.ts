import { LegionDetachmentName, LegionFormationName, LegionModelName } from "./legionTypes.ts";
import { getMechanicumDetachmentConfigurationForDetachmentName } from "./mechanicumList.ts";
import { MechanicumDetachmentName } from "./mechanicumTypes.ts";
import { DetachmentName, FormationSlot, FormationShape, DetachmentConfiguration, Stats, DetachmentValidationState, Detachment, ModelLoadoutSlotShape } from "./types.ts";

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
    ["Legion Armoured Company", {slotRequirements: [
        {slot: "Legion Armoured Company HQ",             
            slotRequirementType: "Required" , displayName: "HQ"},
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
    ["Legion Aerial Assault", {slotRequirements: [
        {slot: "Legion Aerial Assault HQ",             
            slotRequirementType: "Required", displayName: "HQ"},
        {slot: "Support",        slotRequirementType: "Required"                 },
        {slot: "Core",           slotRequirementType: "Required"                 },
        {slot: "Core",           slotRequirementType: "Required"                 },
        {slot: "Support",        slotRequirementType: "Optional"                 },
        {slot: "Core",           slotRequirementType: "Optional"                 },
        {slot: "Air Support",    slotRequirementType: "Optional"                 },
        {slot: "Support",        slotRequirementType: "Optional"                 },
        {slot: "Vanguard",       slotRequirementType: "Optional"                 },
        {slot: "Air Support",    slotRequirementType: "Optional"                 },
    ]}],
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
    ]}],
    //supplement
    ["Brethren of Iron", {
        formationType: "Support",
        slotRequirements: [
            {slot: "HQ",            slotRequirementType: "Required"                 },
            {slot: "Brethren of Iron Core", displayName: "Core",
                slotRequirementType: "Required"
            },
            {slot: "Brethren of Iron Core", displayName: "Core",
                slotRequirementType: "Required"
            },
            {slot: "Brethren of Iron Core", displayName: "Core",
                slotRequirementType: "Optional"
            },
            {slot: "Brethren of Iron Bastion", displayName: "Core",
                slotRequirementType: "Optional"
            },
            {slot: "Brethren of Iron Support", displayName: "Support",
                slotRequirementType: "Optional"
            },
            {slot: "Brethren of Iron Support", displayName: "Support",
                slotRequirementType: "Optional"
            },
            {slot: "Brethren of Iron Support",  displayName: "Support",
                slotRequirementType: "One Of Group", 
                oneOfGroup: 1, oneOfGroupGroup: 1
            },
            {slot: "Brethren of Iron Vanguard", displayName: "Vanguard",
                slotRequirementType: "One Of Group", 
                oneOfGroup: 1, oneOfGroupGroup: 2
            },
            {slot: "Brethren of Iron Vanguard", displayName: "Vanguard",
                slotRequirementType: "One Of Group", 
                oneOfGroup: 1, oneOfGroupGroup: 2
            },
        ]
    }],
])

export function getShapeForLegionFormationName(formationName: LegionFormationName | ""): FormationShape {
    if(formationName == "") return { slotRequirements: [] };
    return formationShapes.get(formationName) ?? { slotRequirements: [] };
}

const detachmentNamesForSlot = new Map<FormationSlot, (LegionDetachmentName|MechanicumDetachmentName)[]>([
    ["Air Support", [
        "Legion Fire Raptor Squadron",
        "Legion Storm Eagle Squadron",
        "Legion Thunderhawk Gunship",
        "Legion Xiphon Interceptor Squadron",
    ]],
    ["Artillery", [
        "Legion Scorpius Battery",
        "Legion Whirlwind Battery",
    ]], 
    ["Bastion", [
        "Legion Deredeo Dreadnought Detachment",
        "Legion Tarantula Battery",
    ]],
    ["Battle Tank", [
        "Legion Predator Squadron",
        "Legion Sicaran Arcus Squadron",
        "Legion Sicaran Omega Squadron",
        "Legion Sicaran Punisher Squadron",
        "Legion Sicaran Squadron",
        "Legion Vindicator Squadron",
    ]],
    ["Brethren of Iron Bastion", ["Thanatar Siege-automata Maniple"]],
    ["Brethren of Iron Core", ["Legion Tactical Detachment", "Thallax Cohort"]],
    ["Brethren of Iron Support", [
        "Arlatax Battle-automata Maniple",
        "Castellax Battle-automata Maniple",
        "Domitar Battle-automata Maniple",
    ]],
    ["Brethren of Iron Vanguard", [
        "Vorax Battle-automata Maniple",
        "Vultarax Battle-automata Squadron"
    ]],
    ["Core", ["Legion Tactical Detachment"]],  
    ["Heavy Armour", [
        "Legion Cerberus Squadron",
        "Legion Kratos Squadron",
        "Legion Mastadon Squadron",
        "Legion Typhon Squadron"
    ]],
    ["HQ", [ 
        "Legion Command",
        "Legion Kratos Commander",
        "Legion Predator Commander",
        "Legion Sicaran Commander"
    ]],
    ["Legion Aerial Assault HQ", ["Legion Command",]],
    ["Legion Armoured Company HQ", [
        "Legion Kratos Commander",
        "Legion Predator Commander",
        "Legion Sicaran Commander"
    ]],
    ["Legion Heavy Assault Spearhead Support Compulsory", [
        "Legion Contemptor Dreadnought Talon",
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
        "Legion Contemptor Dreadnought Talon",
        "Legion Deathstorm Drop Pod Battery",
        "Legion Missile Launcher Support Detachment", 
        "Legion Palisade Drop Pod",
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

export function getLegionDetachmentNamesForSlot(slot: FormationSlot): (LegionDetachmentName|MechanicumDetachmentName)[] {
    return detachmentNamesForSlot.get(slot) ?? [];
}

const rhinoModelLoadoutSlots: ModelLoadoutSlotShape[] = [
    {name: "Extra pintle mounted", possibleModelLoadouts: [
        {loadout: "None", points: 0},
        {loadout: "Havoc launcher", points: 5},
        {loadout: "Multi-melta", points: 5},
    ]}, 
    {name: "Missile", possibleModelLoadouts: [
        {loadout: "None", points: 0}, 
        {loadout: "Hunter-killer missile", points: 5}, 
    ]}
];

const detachmentConfigurationForDetachmentName: Map<DetachmentName, DetachmentConfiguration> = new Map([
    //CRB
    ["Legion Command", {modelGroupShapes: [
        {modelName: "Command Squad", modelLoadoutSlots: [], possibleModelGroupQuantities: [{num: 1, points: 25}]},
        {modelName: "Rhino", dedicatedTransport: true, formationNames: ["Legion Demi-Company"], modelLoadoutSlots: rhinoModelLoadoutSlots,
            possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 1, points: 10}, 
            ]},
        {modelName: "Storm Eagle", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 85}, 
        ]},
        {modelName: "Thunderhawk Gunship", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150},
        ]},
        {modelName: "Drop Pod", dedicatedTransport: true, formationNames: ["Legion Drop Pod Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 1, points: 10}
        ]},
        {modelName: "Legion Termite", dedicatedTransport: true, formationNames: ["Legion Subterranean Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 1, points: 14}
        ]}
    ]}],
    ["Legion Tactical Detachment", {maxModels: 12, 
        modelGroupShapes: [
            {modelName: "Tactical Legionaries", modelLoadoutSlots: [], possibleModelGroupQuantities: [
                {num: 4, points: 35}, {num: 6, points: 35+12}, {num: 8, points: 35+12*2}, {num: 10, points: 35+12*3}, {num: 12, points: 35+12*4},
            ]},
            {modelName: "Assault Marines", modelLoadoutSlots: [], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 2, points: 12}, {num: 4, points: 24}, {num: 6, points: 36}, {num: 8, points: 48},
            ], unitTraits: ["Independent"]},
            {modelName: "Legion Terminators", modelLoadoutSlots: [], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 2, points: 20}, {num: 4, points: 40}, {num: 6, points: 60}, {num: 8, points: 80},
            ]},
            {modelName: "Missile Launcher Legionaries", modelLoadoutSlots: [], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 2, points: 20}, {num: 4, points: 40}, {num: 6, points: 60}, {num: 8, points: 80},
            ]},
            {modelName: "Plasma Support Legionaries", modelLoadoutSlots: [], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 2, points: 15}, {num: 4, points: 30}, {num: 6, points: 45}, {num: 8, points: 60},
            ]},
            {modelName: "Rhino", dedicatedTransport: true, formationNames: ["Legion Demi-Company"], modelLoadoutSlots: rhinoModelLoadoutSlots, 
                possibleModelGroupQuantities: [
                    {num: 0, points: 0}, {num: 1, points: 10}, {num: 2, points: 20}, {num: 3, points: 30}, 
                    {num: 4, points: 40}, {num: 5, points: 50}, {num: 6, points: 60}
            ]},
            {modelName: "Storm Eagle", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 1, points: 85}, {num: 2, points: 85+85}, {num: 3, points: 85*3}
            ]},
            {modelName: "Thunderhawk Gunship", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 1, points: 150}, {num: 2, points: 150+140}
            ]},
            {modelName: "Drop Pod", dedicatedTransport: true, formationNames: ["Legion Drop Pod Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
                {num: 2, points: 10*2}, {num: 3, points: 10*3}, {num: 4, points: 10*4}, {num: 5, points: 10*5}, {num: 6, points: 10*6}
            ]},
            {modelName: "Legion Termite", dedicatedTransport: true, formationNames: ["Legion Subterranean Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
                {num: 2, points: 14*2}, {num: 3, points: 14*3}, {num: 4, points: 14*4}, {num: 5, points: 14*5}, {num: 6, points: 14*6}
            ]}
        ], extras: [{name: "Apothecary", points: 10}]
    }],
    ["Legion Plasma Gun Support Detachment", {modelGroupShapes: [
        {modelName: "Plasma Support Legionaries", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 35}, {num: 4+2, points: 35+15}, {num: 4+4, points: 35+30},
        ]},
        {modelName: "Rhino", dedicatedTransport: true, formationNames: ["Legion Demi-Company"], modelLoadoutSlots: rhinoModelLoadoutSlots, 
            possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 1, points: 10}, {num: 2, points: 20}, {num: 3, points: 30}, 
                {num: 4, points: 40},
        ]},
        {modelName: "Storm Eagle", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 85}, {num: 2, points: 85+85}
        ]},
        {modelName: "Thunderhawk Gunship", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}
        ]},
        {modelName: "Drop Pod", dedicatedTransport: true, formationNames: ["Legion Drop Pod Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 10*2}, {num: 3, points: 10*3}, {num: 4, points: 10*4}
        ]},
        {modelName: "Legion Termite", dedicatedTransport: true, formationNames: ["Legion Subterranean Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 14*2}, {num: 3, points: 14*3}, {num: 4, points: 14*4}
        ]}
    ]}],
    ["Legion Missile Launcher Support Detachment", {modelGroupShapes: [
        {modelName: "Missile Launcher Legionaries", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 50}, {num: 4+2, points: 50+20}, {num: 4+4, points: 40+40},
        ]},
        {modelName: "Rhino", dedicatedTransport: true, formationNames: ["Legion Demi-Company"], modelLoadoutSlots: rhinoModelLoadoutSlots, 
            possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 1, points: 10}, {num: 2, points: 20}, {num: 3, points: 30}, 
                {num: 4, points: 40},
        ]},
        {modelName: "Storm Eagle", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 85}, {num: 2, points: 85+85}
        ]},
        {modelName: "Thunderhawk Gunship", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}
        ]},
        {modelName: "Drop Pod", dedicatedTransport: true, formationNames: ["Legion Drop Pod Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 10*2}, {num: 3, points: 10*3}, {num: 4, points: 10*4}
        ]},
        {modelName: "Legion Termite", dedicatedTransport: true, formationNames: ["Legion Subterranean Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 14*2}, {num: 3, points: 14*3}, {num: 4, points: 14*4}
        ]}
    ]}],
    ["Legion Assault Detachment", {modelGroupShapes: [
        {modelName: "Assault Marines", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 30}, {num: 4+2, points: 30+12}, {num: 4+4, points: 30+24},
        ]},
        {modelName: "Storm Eagle", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 85}, {num: 2, points: 85+85}, {num: 3, points: 3*85}, {num: 4, points: 4*85}
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
            {num: 4, points: 50}, {num: 4+2, points: 50+20}, {num: 4+4, points: 50+40},
        ]},
        {modelName: "Storm Eagle", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 85}, {num: 2, points: 85+85}, {num: 3, points: 85*3}, {num: 4, points: 85*4}
        ]},
        {modelName: "Thunderhawk Gunship", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}
        ]},
        {modelName: "Land Raider", dedicatedTransport: true, formationNames: ["Legion Heavy Assault Spearhead"], modelLoadoutSlots: [
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, 
                {loadout: "Heavy bolter", points: 5},
                {loadout: "Multi-melta", points: 5},
            ]},
        ], possibleModelGroupQuantities: [ 
            {num: 0, points: 0}, {num: 4, points: 4*35}, {num: 6, points: 6*35}, {num: 8, points: 8*35}, 
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
                {loadout: "Heavy bolter", points: 5},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 2, points: 2*70}, {num: 3, points: 3*70}, {num: 4, points: 4*70}, 
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
            {num: 0, points: 0}, {num: 1, points: 85}, {num: 2, points: 85+85}, {num: 3, points: 3*85}, {num: 4, points: 4*85}
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
            {num: 0, points: 0}, {num: 1, points: 150}, {num: 2, points: 150+140}
        ]},
        {modelName: "Dreadnought Drop Pod", dedicatedTransport: true, formationNames: ["Legion Drop Pod Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 12*4},
            {num: 6, points: 12*6}, 
            {num: 8, points: 12*8}
        ]}
    ]}],
    ["Legion Contemptor Dreadnought Talon", {minModels: 4, maxModels: 4+3*2, modelGroupShapes: [
        {modelName: "Contemptor Dreadnought", minModels:4, maxModels: 10, modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts:[
                {loadout: "Kheres assault cannon", points: 0},
                {loadout: "Twin-linked lascannon", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 4, points: 70}, {num: 6, points: 70+30}, {num: 8, points: 70+30*2},
            {num: 10, points: 70+30*3}
        ]},
        {modelName: "Thunderhawk Gunship", dedicatedTransport: true, formationNames: ["Legion Aerial Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 150}, {num: 2, points: 150+140}, {num: 3, points: 150+280}
        ]},
        {modelName: "Dreadnought Drop Pod", dedicatedTransport: true, formationNames: ["Legion Drop Pod Assault"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 12*4},
            {num: 6, points: 12*6}, 
            {num: 8, points: 12*8}, 
            {num: 10, points: 12*10}
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
            ]},
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, 
                {loadout: "Heavy bolter", points: 5},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 3, points: 115}, {num: 4, points: 115+35}, {num: 5, points: 115+35+35},
            {num: 6, points: 115+95}, {num: 7, points: 115+95+35}, {num: 8, points: 115+95+35+35}, 
            {num: 9, points: 115+185}, 
        ]}
    ]}],
    ["Legion Sicaran Squadron", {minModels: 2, maxModels: 6, modelGroupShapes: [
        {modelName: "Legion Sicaran", modelLoadoutSlots: [
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", points: 0}, 
                {loadout: "Heavy bolters", points: 0}
            ]},
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, 
                {loadout: "Heavy bolter", points: 5},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 2, points: 90}, {num: 3, points: 90+40}, {num: 4, points: 90+80},
            {num: 5, points: 90+80+40}, {num: 6, points: 90+150} 
        ]}
    ]}],
    ["Legion Sicaran Omega Squadron", {minModels: 2, maxModels: 6, modelGroupShapes: [
        {modelName: "Sicaran Omega", modelLoadoutSlots: [
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", points: 0}, 
                {loadout: "Heavy bolters", points: 0}
            ]},
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, 
                {loadout: "Heavy bolter", points: 5},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 2, points: 90}, {num: 3, points: 90+40}, {num: 4, points: 90+80},
            {num: 5, points: 90+80+40}, {num: 6, points: 90+150} 
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
            ]},
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, 
                {loadout: "Heavy bolter", points: 5},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 2, points: 140}, {num: 3, points: 140+65}, {num: 4, points: 140+130},
            {num: 5, points: 140+65+130}, {num: 6, points: 140+250} 
        ]}
    ]}],
    ["Legion Rhino Detachment", {modelGroupShapes: [
        {modelName: "Rhino", modelLoadoutSlots: rhinoModelLoadoutSlots,
            possibleModelGroupQuantities: [
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
            {num: 1, points: 85}, {num: 2, points: 85+75}, {num: 3, points: 85+150}
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
            {num: 1, points: 100}, {num: 2, points: 100+90}, {num: 3, points: 100+180}
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
            {num: 2, points: 25}, {num: 4, points: 25+20}, {num: 6, points: 25+40}
        ]}
    ]}],
    ["Legion Scimitar Jetbike Squadron", {minModels: 3, maxModels: 9, modelGroupShapes: [
        {modelName: "Scimitar Jetbike", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 3, points: 35}, {num: 6, points: 35+30}, {num: 9, points: 35+60}
        ]}
    ]}],
    ["Legion Land Speeder Squadron", {minModels: 2, maxModels: 6, 
        modelGroupShapes: [
            {modelName: "Land Speeder", modelLoadoutSlots: [
                {name: "Guns", possibleModelLoadouts: [
                    {loadout: "Plasma cannon and heavy bolter", points: 0}, 
                    {loadout: "Nose mounted heavy flamer and multi-melta", points: 0},
                ]},
            ], possibleModelGroupQuantities: [
                {num: 2, points: 30}, {num: 4, points: 30+25}, {num: 6, points: 30+50}
            ]}
    ]}],
    ["Legion Javelin Squadron", {minModels: 2, maxModels: 6, modelGroupShapes: [
        {modelName: "Javelin", modelLoadoutSlots: [
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", points: 0}, {loadout: "Cyclone missile launcher", points: 2}
            ]}
        ], possibleModelGroupQuantities: [
            {num: 2, points: 35}, {num: 4, points: 35+30}, {num: 6, points: 35+60}
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
                {loadout: "Heavy bolter", points: 5},
            ]},
        ], possibleModelGroupQuantities: [
            //p128 - max transport size is 8
            {num: 1, points: 70}, {num: 2, points: 2*70}, {num: 3, points: 3*70}, {num: 4, points: 4*70}, 
            {num: 5, points: 5*70}, {num: 6, points: 6*70}, {num: 7, points: 7*70}, {num: 8, points: 8*70}, 
        ]}
    ]}],
    ["Legion Land Raider Detachment", {
        modelGroupShapes: [
            {modelName: "Land Raider", modelLoadoutSlots: [
                {name: "Pintle mounted", possibleModelLoadouts: [
                    {loadout: "None", points: 0}, 
                    {loadout: "Multi-melta", points: 5},
                    {loadout: "Heavy bolter", points: 5},
                ]},
            ], possibleModelGroupQuantities: [
                //p128 - max transport size is 8
                {num: 1, points: 35}, {num: 2, points: 2*35}, {num: 3, points: 3*35}, {num: 4, points: 4*35}, 
                {num: 5, points: 5*35}, {num: 6, points: 6*35}, {num: 7, points: 7*35}, {num: 8, points: 8*35}, 
            ]}
    ]}],
    ["Legion Palisade Drop Pod", {
        modelGroupShapes:[
        {modelName: "Palisade Drop Pod", modelLoadoutSlots: [], possibleModelGroupQuantities:[
            {num: 1, points: 25}
        ]},
    ]}],
    ["Legion Drop Pod Detachment", {
        modelGroupShapes:[
        {modelName: "Drop Pod", modelLoadoutSlots: [], possibleModelGroupQuantities:[
            //p128 - max transport size is 8
            {num: 1, points: 10}, {num: 2, points: 2*10}, {num: 3, points: 3*10}, {num: 4, points: 4*10}, 
            {num: 5, points: 5*10}, {num: 6, points: 6*10}, {num: 7, points: 7*10}, {num: 8, points: 8*10}, 
        ]},
    ]}],
    ["Legion Dreadnought Drop Pod Detachment", {
        modelGroupShapes:[
        {modelName: "Dreadnought Drop Pod", modelLoadoutSlots: [], possibleModelGroupQuantities:[
            //p128 - max transport size is 8
            {num: 1, points: 12}, {num: 2, points: 2*12}, {num: 3, points: 3*12}, {num: 4, points: 4*12}, 
            {num: 5, points: 5*12}, {num: 6, points: 6*12}, {num: 7, points: 7*12}, {num: 8, points: 8*12}, 
        ]},
    ]}],
    ["Legion Deathstorm Drop Pod Battery", {modelGroupShapes:[
        {modelName: "Deathstorm Drop Pod", modelLoadoutSlots: [], possibleModelGroupQuantities:[
            {num: 2, points: 40}, {num: 2+2, points: 40+35}, {num: 2+4, points: 40+70}
        ]},
    ]}],
    //TDOT
    ["Legion Sicaran Punisher Squadron", {minModels: 2, maxModels: 6, modelGroupShapes: [
        {modelName: "Sicaran Punisher", modelLoadoutSlots: [
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", points: 0}, 
                {loadout: "Heavy bolters", points: 0}
            ]},
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, 
                {loadout: "Heavy bolter", points: 5},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 2, points: 90}, {num: 3, points: 90+40}, {num: 4, points: 90+80},
            {num: 5, points: 90+40+80}, {num: 6, points: 90+150} 
        ]}
    ]}],
    ["Legion Sicaran Arcus Squadron", {minModels: 2, maxModels: 6, modelGroupShapes: [
        {modelName: "Sicaran Arcus", modelLoadoutSlots: [
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", points: 0}, 
                {loadout: "Heavy bolters", points: 0}
            ]}
        ], possibleModelGroupQuantities: [
            {num: 2, points: 95}, {num: 3, points: 95+45}, {num: 4, points: 95+90},
            {num: 5, points: 95+90+45}, {num: 6, points: 95+170} 
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
            {num: 1, points: 14}, {num: 2, points: 2*14}, {num: 3, points: 3*14}, {num: 4, points: 4*14}, 
            {num: 5, points: 5*14}, {num: 6, points: 6*14}, {num: 7, points: 7*14}, {num: 8, points: 8*14}, 
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
            ]},
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, 
                {loadout: "Heavy bolter", points: 5, weaponTypes: ["Pintle Mounted heavy bolters"]},
            ]}
        ], possibleModelGroupQuantities: [
            {num: 1, points: 60}
        ]}
    ]}],
    ["Legion Sicaran Commander", {minModels: 1, maxModels: 1, modelGroupShapes: [
        {modelName: "Sicaran Commander", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Twin-linked accelerator autocannon", points: 0}, 
                {loadout: "Omega plasma array", points: 0},
                {loadout: "Punisher rotary cannon", points: 0}
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", points: 0}, 
                {loadout: "Heavy bolters", points: 0}
            ]},
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, 
                {loadout: "Heavy bolter", points: 5, weaponTypes: ["Pintle Mounted heavy bolters"]},
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
            ]},
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, 
                {loadout: "Heavy bolter", points: 5, weaponTypes: ["Pintle Mounted heavy bolters"]},
            ]}
        ], possibleModelGroupQuantities: [
            {num: 1, points: 100}
        ]}
    ]}],
    //Libre
    ["Legion Vindicator Squadron", {minModels: 4, maxModels: 8, modelGroupShapes: [
        {modelName: "Vindicator", modelLoadoutSlots: [], 
            possibleModelGroupQuantities: [
                {num: 4, points: 140}, {num: 6, points: 140+65}, {num: 4+4, points: 140+130},
                {num: 4+6, points: 140+180}
        ]}
    ]}],
    ["Legion Cerberus Squadron", {minModels: 1, maxModels: 4, modelGroupShapes: [
        {modelName: "Cerberus", modelLoadoutSlots: [
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, 
                {loadout: "Heavy bolter", points: 5},
                {loadout: "Multi-melta", points: 5},
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", points: 0}, 
                {loadout: "Heavy bolters", points: 0}
            ]},
        ], 
            possibleModelGroupQuantities: [
                {num: 1, points: 85}, {num: 2, points: 85+80}, {num: 3, points: 85+150},
                {num: 4, points: 85+210}
        ]}
    ]}],
    ["Legion Typhon Squadron", {minModels: 1, maxModels: 4, modelGroupShapes: [
        {modelName: "Typhon", modelLoadoutSlots: [
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, 
                {loadout: "Heavy bolter", points: 5},
                {loadout: "Multi-melta", points: 5},
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", points: 0}, 
                {loadout: "Heavy bolters", points: 0}
            ]},
        ], 
            possibleModelGroupQuantities: [
                {num: 1, points: 80}, {num: 2, points: 80+75}, {num: 3, points: 80+140},
                {num: 4, points: 80+200}
        ]}
    ]}],
    ["Legion Mastadon Squadron", {minModels: 1, maxModels: 4, modelGroupShapes: [
        {modelName: "Mastadon", modelLoadoutSlots: [
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", points: 0}, 
                {loadout: "Heavy bolters", points: 0}
            ]},
        ], 
            possibleModelGroupQuantities: [
                {num: 1, points: 130}, {num: 2, points: 130+120}, {num: 3, points: 130+240},
                {num: 4, points: 130+350}
        ]}
    ]}],
    ["Legion Scorpius Battery", {minModels: 1, maxModels: 4, modelGroupShapes: [
        {modelName: "Scorpius", modelLoadoutSlots: [], 
            possibleModelGroupQuantities: [
                {num: 2, points: 100}, {num: 2+2, points: 100+90}, {num: 2+4, points: 100+180},
                {num: 2+6, points: 100+270}
            ]}
    ]}],
    ["Legion Whirlwind Battery", {minModels: 2, maxModels: 8, modelGroupShapes: [
        {modelName: "Whirlwind", modelLoadoutSlots: [], 
            possibleModelGroupQuantities: [
                {num: 2, points: 90}, {num: 2+2, points: 90+80}, {num: 2+4, points: 90+160},
                {num: 2+6, points: 90+240}
        ]}
    ]}],
]);

export function getLegionDetachmentConfigurationForDetachmentName(detachmentName: DetachmentName): DetachmentConfiguration {
    return detachmentConfigurationForDetachmentName.get(detachmentName) 
        ?? getMechanicumDetachmentConfigurationForDetachmentName(detachmentName)
        ?? {modelGroupShapes: []}
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
    ["Cerberus", {
        detachmentType: "Super-heavy vehicle", scale: 3, move: 8, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Front"},
        ],
        caf: 3, morale: 3, wounds: 2, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "Hull Mounted neutron laser battery"}, 
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", weaponTypes: ["Sponson Mounted lascannon"]}, 
                {loadout: "Heavy bolters", weaponTypes: ["Sponson Mounted heavy bolters"]},
            ]},
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", weaponTypes: ["Pintle Mounted heavy bolter"]},
                {loadout: "Multi-melta", weaponTypes: ["Pintle Mounted multi-melta"]},
            ]}
        ],
        unitTraits: []
    }],
    ["Contemptor Dreadnought", {
        detachmentType: "Walker", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 4, arc: "All"}, {saveType: "Invuln", save: 5, arc: "All"}
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
                {loadout: "", weaponTypes: ["Legion bolters"]}
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
        detachmentType: "Cavalry", scale: 1, move: 11, saves: [
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
        caf: 3, morale: 3, wounds: 2, tacticalStrength: 2, voidShields: 0,
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
            ]},
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", weaponTypes: ["Pintle Mounted heavy bolter"]},
            ]}
        ],
        unitTraits: ["Commander", "Inspire (8)", "Master Tactician"]
    }],
    ["Land Speeder", {
        detachmentType: "Cavalry", scale: 1, move: 11, saves: [
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
                {loadout: "Heavy bolter", weaponTypes: ["Pintle Mounted heavy bolter"]},
            ]},
        ],
        unitTraits: ["Assault Transport (2)", "Forward Deployment"]
    }],
    ["Legion Kratos", {
        detachmentType: "Vehicle", scale: 2, move: 8, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Front"},
        ],
        caf: 3, morale: 3, wounds: 2, tacticalStrength: 2, voidShields: 0,
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
            ]},
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", weaponTypes: ["Pintle Mounted heavy bolter"]},
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
            ]},
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", weaponTypes: ["Pintle Mounted heavy bolter"]},
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
                {loadout: "", weaponTypes:  ["Hull Mounted heavy bolter", "Twin-linked accelerator autocannon"]}
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", weaponTypes: ["Sponson Mounted lascannon"]}, 
                {loadout: "Heavy bolters", weaponTypes: ["Sponson Mounted heavy bolters"]}
            ]},
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", weaponTypes: ["Pintle Mounted heavy bolter"]},
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
        unitTraits: ["Armoured", "Bulky", "Deep Strike", "Implacable", "Steadfast"] //and whatever gives invuln
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
    ["Mastadon", {
        detachmentType: "Super-heavy vehicle", scale: 3, move: 8, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Front"},
        ],
        caf: 4, morale: 3, wounds: 3, tacticalStrength: 2, voidShields: 2,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: [
                    "Siege melta array", "Skyreaper battery", "Sponson Mounted heavy flamers"
                ]}, 
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", weaponTypes: ["Sponson Mounted lascannon"]}, 
                {loadout: "Heavy bolters", weaponTypes: ["Sponson Mounted heavy bolters"]},
            ]},
        ],
        unitTraits: ["Large Assault Transport (8)"]
    }],
    ["Missile Launcher Legionaries",{
        detachmentType: "Infantry", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 5, arc: "All"}
        ],
        caf: 1, morale: 3, wounds: 1, tacticalStrength: 5, voidShields: 0,
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
            ]},
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", weaponTypes: ["Pintle Mounted heavy bolter"]},
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
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Pintle Mounted twin bolter"]}
            ]},
            {name: "Extra pintle mounted", possibleModelLoadouts: [
                {loadout: "None", weaponTypes: []},
                {loadout: "Havoc launcher", weaponTypes: ["Pintle Mounted havoc launcher"]},
                {loadout: "Multi-melta", weaponTypes: ["Pintle Mounted multi-melta"]},
            ]},
            {name: "Missile", possibleModelLoadouts: [
                {loadout: "None", weaponTypes: []}, 
                {loadout: "Hunter-killer missile", weaponTypes: ["Hunter-killer missile"]},
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
        detachmentType: "Cavalry", scale: 1, move: 12, saves: [
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
    ["Scorpius", {
        detachmentType: "Vehicle", scale: 2, move: 8, saves: [
            {saveType: "Armour", save: 3, arc: "Front"},
            {saveType: "Armour", save: 4, arc: "Front"},
        ],
        caf: 0, morale: 3, wounds: 1, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes:  ["Scorpius missile launcher", "Pintle Mounted twin-linked bolter"],}, 
            ]},
        ],
        unitTraits: []
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
                {loadout: "Omega plasma array"},
                {loadout: "Punisher rotary cannon"},
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", weaponTypes: ["Sponson Mounted lascannon"]}, 
                {loadout: "Heavy bolters", weaponTypes: ["Sponson Mounted heavy bolters"]}
            ]},
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", weaponTypes: ["Pintle Mounted heavy bolter"]},
            ]}
        ],
        unitTraits: ["Commander", "Inspire (8)", "Master Tactician"],
    }],
    ["Sicaran Omega", {
        detachmentType: "Vehicle", scale: 2, move: 10, saves: [
            {saveType: "Armour", save: 3, arc: "Front"},
            {saveType: "Armour", save: 4, arc: "Front"},
        ],
        caf: 2, morale: 3, wounds: 1, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes:  ["Hull Mounted heavy bolter", "Omega plasma array"]},
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", weaponTypes: ["Sponson Mounted lascannon"]}, 
                {loadout: "Heavy bolters", weaponTypes: ["Sponson Mounted heavy bolters"]}
            ]},
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", weaponTypes: ["Pintle Mounted heavy bolter"]},
            ]}
        ],
        unitTraits: [],
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
            ]},
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", weaponTypes: ["Pintle Mounted heavy bolter"]},
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
                {loadout: "Multi-melta", weaponTypes: ["Pintle Mounted multi-melta"]},
                {loadout: "Heavy bolter", weaponTypes: ["Pintle Mounted heavy bolter"]},
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
        detachmentType: "Vehicle", scale: 2, move: 20, saves: [
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
    ["Typhon", {
        detachmentType: "Super-heavy vehicle", scale: 3, move: 8, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Front"},
        ],
        caf: 3, morale: 3, wounds: 2, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "Hull Mounted dreadhammer siege cannon"}, 
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Lascannon", weaponTypes: ["Sponson Mounted lascannon"]}, 
                {loadout: "Heavy bolters", weaponTypes: ["Sponson Mounted heavy bolters"]},
            ]},
            {name: "Pintle mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", weaponTypes: ["Pintle Mounted heavy bolter"]},
                {loadout: "Multi-melta", weaponTypes: ["Pintle Mounted multi-melta"]},
            ]}
        ],
        unitTraits: []
    }],
    ["Vindicator", {
        detachmentType: "Vehicle", scale: 2, move: 8, saves: [
            {saveType: "Armour", save: 3, arc: "Front"},
            {saveType: "Armour", save: 4, arc: "Front"},
        ],
        caf: 0, morale: 3, wounds: 1, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes:  ["Hull Mounted demolisher cannon", "Pintle Mounted twin-linked bolter"],}
            ]},
        ],
        unitTraits: [],
    }],
    ["Whirlwind", {
        detachmentType: "Vehicle", scale: 2, move: 8, saves: [
            {saveType: "Armour", save: 3, arc: "Front"},
            {saveType: "Armour", save: 4, arc: "Front"},
        ],
        caf: 0, morale: 3, wounds: 1, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes:  ["Whirlwind missile launcher", "Pintle Mounted twin-linked bolter"],}, 
            ]},
        ],
        unitTraits: []
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