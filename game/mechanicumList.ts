import { MechanicumDetachmentName, MechanicumFormationName, MechanicumModelName } from "./mechanicumTypes.ts";
import { getStatsForStrategicAssetModelType, getStrategicAssetDetachmentConfigurationForDetachmentName, getStrategicAssetDetachmentNamesForSlot } from "./strategicAssetList.ts";
import { StrategicAssetDetachmentName } from "./strategicAssetTypes.ts";
import { Allegiance, DetachmentConfiguration, DetachmentName, DetachmentValidationState, Formation, FormationShape, FormationSlot, Stats } from "./types.ts";

const cortexControllerValidation = (formation: Formation, detachmentIndex: number): DetachmentValidationState => {
    if(detachmentIndex > 2) {
        return { valid: true };
    }

    //we want exactly one cortex controller in the required slots
    let totalNumCortexControllers = 0;
    let numCortexControllersInThisDetachment = 0;
    for(let i = 0; i < 3; ++i) {
        const detachment = formation.detachments[i];
        let numCortexControllers = 0;

        for(let j = 0; j < detachment.modelGroups.length; ++j){
            const modelGroup = detachment.modelGroups[j];

            for(let k = 0; k < modelGroup.modelLoadoutGroups.length; ++k) {
                const modelLoadoutGroup = modelGroup.modelLoadoutGroups[k];

                const slot = modelLoadoutGroup.modelLoadoutSlots.find((t)=>t.name == "Cortex Controller");
                if(slot != undefined) {
                    if(slot.modelLoadout.loadout == "Cortex Controller") {
                        numCortexControllers += modelLoadoutGroup.number;
                        if(detachmentIndex == i)
                            numCortexControllersInThisDetachment += modelLoadoutGroup.number;
                    }
                }
            }
        }

        if(i == detachmentIndex && numCortexControllersInThisDetachment > 1)
            return { 
                valid: false, 
                error: "Cortex Controller rules broken", 
                data : "should have maximum one optional Cortex Controller, found " + numCortexControllersInThisDetachment.toString() + " in this detachment"
            };

        totalNumCortexControllers += numCortexControllers;
    }

    if(totalNumCortexControllers > 1 && numCortexControllersInThisDetachment > 0)
        return {valid: false, error: "Cortex Controller rules broken", data : "should have maximum one optional Cortex Controller"};

    return {valid: true};
}

const formationShapes = new Map<MechanicumFormationName, FormationShape>([
    ["Autokratorii Regiment", {
        customValidation: cortexControllerValidation,
        slotRequirements: [
            {slot: "Battle Tank",           slotRequirementType: "Required"},       //0
            {slot: "Battle Tank",           slotRequirementType: "Required"},       //1
            {slot: "Battle Tank",           slotRequirementType: "Required"},       //2
            {slot: "HQ",                    slotRequirementType: "Optional"},       //3
            {slot: "Tech-Priest Auxilia",   slotRequirementType: "Optional",        //4
                displayName: "Tech-Priest"
            },       
            {slot: "Transport",             slotRequirementType: "Optional"},       //5
            {slot: "Support",               slotRequirementType: "Optional"},       //6
            {slot: "Support",               slotRequirementType: "Optional"},       //7
            {slot: "Transport",             slotRequirementType: "Optional" },      //8
            {slot: "Titan",                 slotRequirementType: "One Of Group",    //9           
                oneOfGroup: 1, oneOfGroupGroup: 1
            },
            {slot: "Knight",                slotRequirementType: "One Of Group",    //10
                oneOfGroup: 1, oneOfGroupGroup: 2
            },
            {slot: "Knight",                slotRequirementType: "One Of Group",    //11
                oneOfGroup: 1, oneOfGroupGroup: 2
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //12
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 4,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //13
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 4,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //14
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 6,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //15
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 6,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //16
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 7,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //17
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 7,
                displayName: "Tech-Priest",
            }
    ]}],
    ["Legio Cybernetica Cohort", {
        slotRequirements: [
            {slot: "HQ",                    slotRequirementType: "Required" },
            {slot: "Core",                  slotRequirementType: "Required" },
            {slot: "Support Legio Cybernetica Cohort",               
                displayName: "Support",
                slotRequirementType: "Required" 
            },
            {slot: "Support Legio Cybernetica Cohort",               
                displayName: "Support",
                slotRequirementType: "Required" 
            },
            {slot: "HQ",                    slotRequirementType: "Optional" },
            {slot: "HQ",                    slotRequirementType: "Optional" },
            {slot: "Support Legio Cybernetica Cohort",
                displayName: "Support",
                slotRequirementType: "Optional" 
            },
            {slot: "Vanguard Legio Cybernetica Cohort",
                displayName: "Vanguard",
                slotRequirementType: "Optional" 
            },
            {slot: "Core",                  slotRequirementType: "Optional" },
            {slot: "Core",                  slotRequirementType: "Optional" },
            {slot: "Transport",             slotRequirementType: "Optional" },
            {slot: "Transport",             slotRequirementType: "Optional" },
            {slot: "Support Legio Cybernetica Cohort",
                displayName: "Support",
                slotRequirementType: "One Of Group", 
                oneOfGroup: 1, oneOfGroupGroup: 1
            },
            {slot: "Support Legio Cybernetica Cohort",
                displayName: "Support",
                slotRequirementType: "One Of Group", 
                oneOfGroup: 1, oneOfGroupGroup: 1
            },
            {slot: "Vanguard Legio Cybernetica Cohort",
                displayName: "Vanguard ",
                slotRequirementType: "One Of Group", 
                oneOfGroup: 1, oneOfGroupGroup: 2
            },
            {slot: "Vanguard Legio Cybernetica Cohort",
                displayName: "Vanguard ",
                slotRequirementType: "One Of Group", 
                oneOfGroup: 1, oneOfGroupGroup: 2
            },
            {slot: "Titan",                 slotRequirementType: "Optional" },
        ]
    }], 
]);

export function getShapeForMechanicumFormationName(formationName: MechanicumFormationName | ""): FormationShape {
    if(formationName == "") return { slotRequirements: [] };
    return formationShapes.get(formationName) ?? { slotRequirements: [] };
}

const detachmentNamesForSlot = new Map<FormationSlot, MechanicumDetachmentName[]>([
    ["Bastion", [
        "Thanatar Siege-automata Maniple"
    ]],
    ["Battle Tank", [
        "Karacnos Assault Tank Squadron",
        "Krios Battle Tank Squadron"
    ]],
    ["Core", [
        "Adsecularis Tech-Thrall Covenant",
        "Thallax Cohort"
    ]],
    ["Extra Tech-Priest Auxilia", ["Tech-Priest Auxilia"]],
    ["HQ", [
        "Archmagos Prime",
        "Archmagos Prime on Abeyant"
    ]],
    ["Support", [
        "Arlatax Battle-automata Maniple",
        "Castellax Battle-automata Maniple",
        "Domitar Battle-automata Maniple",
        "Myrmidon Destructor Host",
        "Myrmidon Secutor Host",
        "Tech-Priest Auxilia",
    ]],
    ["Support Legio Cybernetica Cohort", [
        "Arlatax Battle-automata Maniple",
        "Castellax Battle-automata Maniple",
        "Domitar Battle-automata Maniple",
    ]],
    ["Tech-Priest Auxilia", ["Tech-Priest Auxilia"]],
    ["Vanguard", [
        "Ursarax Cohort",
        "Vorax Battle-automata Maniple",
        "Vultarax Battle-automata Squadron"
    ]],
    ["Vanguard Legio Cybernetica Cohort", [
        "Vorax Battle-automata Maniple",
        "Vultarax Battle-automata Squadron"
    ]],
]);

//The mechanicum can also call on knights and titans
export function getMechanicumDetachmentNamesForSlot(slot: FormationSlot, allegiance: Allegiance | ""): (MechanicumDetachmentName|StrategicAssetDetachmentName)[] {
    return detachmentNamesForSlot.get(slot) 
        ?? getStrategicAssetDetachmentNamesForSlot(slot, allegiance) 
        ?? [];
}
const detachmentConfigurationForDetachmentName: Map<DetachmentName, DetachmentConfiguration> = new Map([
    ["Archmagos Prime", {modelGroupShapes: [
        {modelName: "Archmagos Prime", modelLoadoutSlots: [], possibleModelGroupQuantities: [{num: 1, points: 25}]}
    ]}],
    ["Archmagos Prime on Abeyant", {modelGroupShapes: [
        {modelName: "Archmagos on Abeyant", modelLoadoutSlots: [], possibleModelGroupQuantities: [{num: 1, points: 45}]}
    ]}],
    ["Adsecularis Tech-Thrall Covenant", {modelGroupShapes: [
        {modelName: "Tech-thrall", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 30}, {num: 6, points: 30+12}, {num: 8, points: 30+22}, {num: 10, points: 30+30}
        ]}
    ]}],
    ["Thallax Cohort", {modelGroupShapes: [
        {modelName: "Thallax", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 25}, {num: 4, points: 25+25}, {num: 6, points: 25+40}, {num: 8, points: 25+60}
        ]}
    ]}],
    ["Tech-Priest Auxilia", {modelGroupShapes: [
        {modelName: "Tech-Priest", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 1, points: 15}
        ]},
    ]}],
    ["Myrmidon Secutor Host", {modelGroupShapes: [
        {modelName: "Myrmidon Secutor", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 30}, {num: 2+2, points: 30+25}, {num: 2+4, points: 30+0}, {num: 8, points: 30+60}
        ]},
    ]}],
    ["Myrmidon Destructor Host", {modelGroupShapes: [
        {modelName: "Myrmidon Destructor", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Myrmidon volkites", points: 0}, 
                {loadout: "Conversion beamers", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 2, points: 30}, {num: 2+2, points: 30+25}, {num: 2+4, points: 30+0}, {num: 8, points: 30+60}
        ]},
    ]}],
    ["Arlatax Battle-automata Maniple", {modelGroupShapes: [
        {modelName: "Arlatax", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 1, points: 40}, {num: 1+1, points: 40+35}, {num: 1+2, points: 40+65}, {num: 1+1+2, points: 40+35+65},
            {num: 1+4, points: 40+110}, {num: 1+1+4, points: 40+35+110},
        ]},
    ]}],
    ["Domitar Battle-automata Maniple", {modelGroupShapes: [
        {modelName: "Domitar", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 1, points: 35}, {num: 1+1, points: 35+30}, {num: 1+2, points: 35+55}, {num: 1+1+2, points: 35+30+55},
            {num: 1+4, points: 35+105}, {num: 1+1+4, points: 35+30+105},
        ]},
    ]}],
    ["Castellax Battle-automata Maniple", {modelGroupShapes: [
        {modelName: "Castellax", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 70}, {num: 2+2, points: 70+70}, {num: 2+4, points: 70+130}, {num: 2+6, points: 70+180},
        ]},
    ]}],
    ["Ursarax Cohort", {modelGroupShapes: [
        {modelName: "Thallax", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 20}, {num: 4, points: 20+20}, {num: 6, points: 20+35}, {num: 8, points: 20+50}
        ]}
    ]}],
    ["Vorax Battle-automata Maniple", {modelGroupShapes: [
        {modelName: "Vorax", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 1, points: 40}, {num: 1+1, points: 40+40}, {num: 1+2, points: 40+70}, {num: 1+1+2, points: 40+40+70},
            {num: 1+4, points: 40+105}, {num: 1+1+4, points: 40+40+105},
        ]},
    ]}],
    ["Vultarax Battle-automata Squadron", {modelGroupShapes: [
        {modelName: "Vultarax", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 1, points: 35}, {num: 1+1, points: 35+35}, {num: 1+2, points: 35+60}, {num: 1+3, points: 35+85},
        ]},
    ]}],
    ["Thanatar Siege-automata Maniple", {minModels: 1, maxModels: 8, modelGroupShapes: [
        {modelName: "Thanatar", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Plasma mortar", points: 0},
                {loadout: "Heavy-las and Graviton ram", points: 5},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 2, points: 110}, {num: 2+1, points: 110+55}, {num: 2+2, points: 110+100}, {num: 2+1+2, points: 110+55+100},
            {num: 2+4, points: 110+185}, {num: 2+1+4, points: 110+55+185}, {num:2+2+4, points: 110+100+185}
        ]},
    ]}],
    ["Karacnos Assault Tank Squadron", {minModels: 1, modelGroupShapes: [
        {modelName: "Karacnos", modelLoadoutSlots: [
            {name: "Cortex Controller", formationNames: ["Autokratorii Regiment"], notAWeapon: true, possibleModelLoadouts: [
                {loadout: "", points: 0}, {loadout: "Cortex Controller", points: 10, unitTraits: ["Cortex Controller"]}, 
            ]}
        ], possibleModelGroupQuantities: [
            {num: 1, points: 40}, {num: 2, points: 40+40}, {num: 3, points: 40+70}, {num: 4, points: 40+100}
        ]}
    ]}],
    ["Krios Battle Tank Squadron", {minModels: 3, maxModels: 9, modelGroupShapes: [
        {modelName: "Krios", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Krios lightning cannon", points: 0}, 
                {loadout: "Irad-scourer", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 3, points: 100},
            {num: 6, points: 100+90},
            {num: 9, points: 100+170}, 
        ]}
    ]}],
]);

export function getMechanicumDetachmentConfigurationForDetachmentName(detachmentName: MechanicumDetachmentName|StrategicAssetDetachmentName): DetachmentConfiguration {
    return detachmentConfigurationForDetachmentName.get(detachmentName) 
        ?? getStrategicAssetDetachmentConfigurationForDetachmentName(detachmentName as StrategicAssetDetachmentName) 
        ?? {modelGroupShapes: []}
}

const statsForModelType = new Map<MechanicumModelName, Stats>([
    ["Archmagos on Abeyant", {
        detachmentType: "Infantry", scale: 1, move: 6, saves: [
            {saveType: "Armour", save: 4, arc: "All"},
            {saveType: "Invuln", save: 5, arc: "All"}
        ],
        caf: 4, morale: 2, wounds: 2, tacticalStrength: 5, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Volkite serpenta", "Meltagun"]}
            ]}
        ],
        unitTraits: ["Battlesmith", "Commander", "Cortex Controller"],
        commandAttachment: "MechanicumHQ"
    }],
    ["Archmagos Prime", {
        detachmentType: "Infantry", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 4, arc: "All"},
            {saveType: "Invuln", save: 5, arc: "All"}
        ],
        caf: 3, morale: 2, wounds: 1, tacticalStrength: 5, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Volkite serpenta"]}
            ]}
        ],
        unitTraits: ["Battlesmith", "Commander", "Cortex Controller"],
        commandAttachment: "MechanicumHQ"
    }],
    ["Arlatax", {
        detachmentType: "Walker", scale: 1, move: 7, saves: [
            {saveType: "Armour", save: 4, arc: "All"}, {saveType: "Invuln", save: 6, arc: "All"}
        ],
        caf: 6, wounds: 2, tacticalStrength: 3, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Autocannon", "Plasma cannon"]}
            ]},
        ],
        unitTraits: ["Armoured", "Cybernetica Cortex (Advance, Charge)", "Jump Packs"],
    }],
    ["Castellax", {
        detachmentType: "Walker", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 4, arc: "All"}, {saveType: "Invuln", save: 6, arc: "All"}
        ],
        caf: 4, wounds: 2, tacticalStrength: 3, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Mauler bolt cannon", "In-built bolters"]}
            ]},
        ],
        unitTraits: ["Armoured", "Cybernetica Cortex (Advance, March)"],
    }],
    ["Domitar", {
        detachmentType: "Walker", scale: 1, move: 7, saves: [
            {saveType: "Armour", save: 4, arc: "All"}, {saveType: "Invuln", save: 6, arc: "All"}
        ],
        caf: 4, wounds: 2, tacticalStrength: 3, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Missile launchers", "Graviton hammers"]}
            ]},
        ],
        unitTraits: ["Armoured", "Cybernetica Cortex (Advance, March)"],
    }],
    ["Karacnos", {
        detachmentType: "Vehicle", scale: 2, move: 8, saves: [
            {saveType: "Armour", save: 3, arc: "Front"},
            {saveType: "Armour", save: 4, arc: "Front"},
        ],
        caf: 0, morale: 3, wounds: 1, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Lightning locks", "Karacnos mortar battery", "Shock ram"]}, 
            ]},
        ],
        unitTraits: []
    }],
    ["Krios", {
        detachmentType: "Vehicle", scale: 2, move: 8, saves: [
            {saveType: "Armour", save: 3, arc: "Front"},
            {saveType: "Armour", save: 4, arc: "Front"},
        ],
        caf: 0, morale: 3, wounds: 1, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Volkite calvier sponsons"]}, 
            ]},
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Krios lightning cannon"}, 
                {loadout: "Irad-scourer"},
            ]},
        ],
        unitTraits: []
    }],
    ["Myrmidon Destructor", {
        detachmentType: "Infantry", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 4, arc: "All"}
        ],
        caf: 3, morale: 3, wounds: 1, tacticalStrength: 5, voidShields: 0,
        modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
               {loadout: "Myrmidon volkites"}, 
               {loadout: "Conversion beamers"},
            ]},
        ],
        unitTraits: ["Implacable"]
    }],
    ["Myrmidon Secutor", {
        detachmentType: "Infantry", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 4, arc: "All"}
        ],
        caf: 6, morale: 3, wounds: 1, tacticalStrength: 5, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Maxima bolters"]}
            ]},
        ],
        unitTraits: ["Implacable"]
    }],
    ["Tech-Priest", {
        detachmentType: "Infantry", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 5, arc: "All"},
            {saveType: "Invuln", save: 6, arc: "All"}
        ],
        caf: 2, morale: 3, wounds: 1, tacticalStrength: 5, voidShields: 0,
        modelLoadoutSlots: [], //literally no guns
        unitTraits: ["Attached Deployment", "Battlesmith", "Cortex Controller"],
        commandAttachment: "MechanicumHQ"
    }],
    ["Tech-thralls", {
        detachmentType: "Infantry", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 6, arc: "All"},
        ],
        caf: -1, wounds: 1, tacticalStrength: 5, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Las-locks"]}
            ]}
        ],
        unitTraits: [],
    }],
    ["Thallax", {
        detachmentType: "Infantry", scale: 1, move: 7, saves: [
            {saveType: "Armour", save: 5, arc: "All"},
        ],
        caf: 1, wounds: 1, tacticalStrength: 5, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Lightning guns", "Thallax plasma-fusil"]}
            ]}
        ],
        unitTraits: ["Jump Packs"],
    }],
    ["Thanatar", {
        detachmentType: "Walker", scale: 1, move: 4, saves: [
            {saveType: "Armour", save: 4, arc: "All"}, {saveType: "Invuln", save: 6, arc: "All"}
        ],
        caf: 4, wounds: 2, tacticalStrength: 3, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Mauler bolt cannon"]}
            ]},
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Plasma mortar"},
                {loadout: "Heavy-las and Graviton ram", weaponTypes: ["Sollex heavy-las", "Graviton ram"]},
            ]}
        ],
        unitTraits: ["Cybernetica Cortex (Charge, March)", "Forward Deployment"],
    }],
    ["Ursarax", {
        detachmentType: "Infantry", scale: 1, move: 7, saves: [
            {saveType: "Armour", save: 5, arc: "All"},
        ],
        caf: 3, wounds: 1, tacticalStrength: 5, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Volkite incinerators"]}
            ]}
        ],
        unitTraits: ["Jump Packs"],
    }],
    ["Vorax", {
        detachmentType: "Walker", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 4, arc: "All"}, {saveType: "Invuln", save: 6, arc: "All"}
        ],
        caf: 3, wounds: 2, tacticalStrength: 3, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Rotor cannon", "Lightning guns", "Power blade arrays"]}
            ]},
        ],
        unitTraits: ["Cybernetica Cortex (Charge, March)", "Forward Deployment"],
    }],
    ["Vultarax", {
        detachmentType: "Cavalry", scale: 1, move: 9, saves: [
            {saveType: "Armour", save: 4, arc: "All"}, {saveType: "Invuln", save: 6, arc: "All"}
        ],
        caf: 2, wounds: 2, tacticalStrength: 3, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Arc blasters", "Vultarax havoc launcher"]}
            ]},
        ],
        unitTraits: ["Armoured", "Cybernetica Cortex (Advance, March)", "Outflank", "Skimmer"],
    }],
]);

export function getStatsForMechanicumModelName(modelName: MechanicumModelName): Stats | undefined {
    return statsForModelType.get(modelName) ??
        getStatsForStrategicAssetModelType(modelName);
}