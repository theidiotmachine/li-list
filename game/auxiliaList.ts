import { AuxiliaDetachmentName, AuxiliaFormationName, AuxiliaModelName } from "./auxiliaTypes.ts";
import { getMechanicumDetachmentConfigurationForDetachmentName } from "./mechanicumList.ts";
import { MechanicumDetachmentName } from "./mechanicumTypes.ts";
import { Detachment, DetachmentConfiguration, DetachmentValidationState, Formation, FormationShape, FormationSlot, Stats } from "./types.ts";

const tankCommanderValidation = (formation: Formation, detachmentIndex: number): DetachmentValidationState => {
    if(detachmentIndex > 2) {
        return { valid: true };
    }

    //we want exactly one tank commander in the required slots
    let totalNumTankCommanders = 0;
    let numTankCommandersInThisDetachment = 0;
    for(let i = 0; i < 3; ++i) {
        const detachment = formation.detachments[i];
        let numTankCommanders = 0;

        for(let j = 0; j < detachment.modelGroups.length; ++j){
            const modelGroup = detachment.modelGroups[j];

            for(let k = 0; k < modelGroup.modelLoadoutGroups.length; ++k) {
                const modelLoadoutGroup = modelGroup.modelLoadoutGroups[k];

                const slot = modelLoadoutGroup.modelLoadoutSlots.find((t)=>t.name == "Tank Commander");
                if(slot != undefined) {
                    if(slot.modelLoadout.loadout == "Tank Commander") {
                        numTankCommanders += modelLoadoutGroup.number;
                        if(detachmentIndex == i)
                            numTankCommandersInThisDetachment += modelLoadoutGroup.number;
                    }
                }
            }
        }

        if(i == detachmentIndex && numTankCommandersInThisDetachment > 1)
            return { 
                valid: false, 
                error: "Tank Commander rules broken", 
                data : "should have maximum one Tank Commander, found " + numTankCommandersInThisDetachment.toString() + " in this detachment"
            };

        totalNumTankCommanders += numTankCommanders;
    }

    if(totalNumTankCommanders == 0)
        return {valid: false, error: "Tank Commander rules broken", data : "must have one Tank Commander"};
    if(totalNumTankCommanders > 1 && numTankCommandersInThisDetachment > 0)
        return {valid: false, error: "Tank Commander rules broken", data : "should have maximum one Tank Commander"};

    return {valid: true};
}

const formationShapes = new Map<AuxiliaFormationName, FormationShape>([
    [ "Solar Auxilia Armoured Company", { 
        customValidation: tankCommanderValidation,
        slotRequirements: [
        {   slot: "Solar Auxilia Armoured Company Compulsory Battle Tank",
            displayName: "Battle Tank",        
            slotRequirementType: "Required"                 
        },
        {   slot: "Solar Auxilia Armoured Company Compulsory Battle Tank",
            displayName: "Battle Tank",        
            slotRequirementType: "Required"                 
        },
        {   slot: "Solar Auxilia Armoured Company Compulsory Heavy Armour",
            displayName: "Heavy Armour",        
            slotRequirementType: "Required"                 
        },
        {   slot: "Battle Tank",        slotRequirementType: "Optional"                 },
        {   slot: "Battle Tank",        slotRequirementType: "Optional"                 },
        {   slot: "Heavy Armour",       slotRequirementType: "Optional"                 },
        {   slot: "Battle Tank",        slotRequirementType: "One Of",  oneOfGroup: 1   },
        {   slot: "Artillery",          slotRequirementType: "One Of",  oneOfGroup: 1   },
        {   slot: "Air Support",        slotRequirementType: "One Of",  oneOfGroup: 1   },
    ]}],
    ["Solar Auxilia Artillery Company", { slotRequirements: [
        {   slot: "HQ",                 slotRequirementType: "Required"                 },
        {   slot: "Artillery",          slotRequirementType: "Required"                 },
        {   slot: "Artillery",          slotRequirementType: "Required"                 },
        {   slot: "Artillery",          slotRequirementType: "Required"                 },
        {   slot: "Support",            slotRequirementType: "Optional"                 },
        {   slot: "Support",            slotRequirementType: "Optional"                 },
        {   slot: "Bastion",            slotRequirementType: "Optional"                 },
        {   slot: "Bastion",            slotRequirementType: "Optional"                 },
    ]}],
    ["Solar Auxilia Leman Russ Spearhead", {
        customValidation: tankCommanderValidation,
        slotRequirements: [
            {   slot: "Leman Russ",     slotRequirementType: "Required"                 },
            {   slot: "Leman Russ",     slotRequirementType: "Required"                 },
            {   slot: "Leman Russ",     slotRequirementType: "Required"                 },
            {   slot: "Light Armour",   slotRequirementType: "Optional"                 },
            {   slot: "Battle Tank",    slotRequirementType: "Optional"                 },
            {   slot: "Heavy Armour",   slotRequirementType: "Optional"                 },
            {   slot: "Air Support",    slotRequirementType: "Optional"                 },
    ]}],
    ["Solar Auxilia Mechanised Infantry Sub-Cohort", {slotRequirements: [
        {   slot: "HQ",                 slotRequirementType: "Required"                 },
        {   slot: "Support",            slotRequirementType: "Required"                 },
        {   slot: "Core",               slotRequirementType: "Required"                 },
        {   slot: "Core",               slotRequirementType: "Required"                 },
        {   slot: "Vanguard",           slotRequirementType: "Optional"                 },
        {   slot: "Vanguard",           slotRequirementType: "Optional"                 },
        {   slot: "Air Support",        slotRequirementType: "Optional"                 },
        {   slot: "Support",            slotRequirementType: "Optional"                 },
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
    ]}],
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
    [ "Solar Auxilia Super-Heavy Company", {
        customValidation: tankCommanderValidation,
        slotRequirements: [
        {   slot: "Solar Auxilia Armoured Company Compulsory Heavy Armour",
            displayName: "Heavy Armour",        
            slotRequirementType: "Required"                 
        },
        {   slot: "Solar Auxilia Armoured Company Compulsory Heavy Armour",
            displayName: "Heavy Armour",        
            slotRequirementType: "Required"                 
        },
        {   slot: "Solar Auxilia Armoured Company Compulsory Heavy Armour",
            displayName: "Heavy Armour",        
            slotRequirementType: "Required"                 
        },
        {   slot: "Heavy Armour",       slotRequirementType: "Optional"                 },
        {   slot: "Heavy Armour",       slotRequirementType: "Optional"                 },
    ]}],
    [ "Solar Auxilia Titan Hunter Company", {
        customValidation: tankCommanderValidation,
        slotRequirements: [
        {   slot: "Auxilia Shadowsword", 
            slotRequirementType: "Required"
        },
        {   slot: "Auxilia Shadowsword", 
            slotRequirementType: "Required"
        },
        {   slot: "Auxilia Shadowsword", 
            slotRequirementType: "Required"
        },
        {   slot: "Heavy Armour",       slotRequirementType: "Optional"                 },
        {   slot: "Heavy Armour",       slotRequirementType: "Optional"                 },
    ]}],
    //suport
    ["Iron Cohort", {
        formationType: "Support",
        slotRequirements: [
            {slot: "HQ", slotRequirementType: "Required"},                      //0
            {slot: "Tech-Priest Auxilia", slotRequirementType: "Required",      //1
                displayName: "Tech-Priest"
            },
            {slot: "Iron Cohort Core", slotRequirementType: "Required",         //2
                displayName: "Core"
            },
            {slot: "Iron Cohort Core", slotRequirementType: "Required",         //3
                displayName: "Core"
            },
            {slot: "HQ", slotRequirementType: "Optional"},                      //4
            {slot: "Iron Cohort Core", slotRequirementType: "Optional",         //5
                displayName: "Core"
            },
            {slot: "Iron Cohort Support", slotRequirementType: "Optional",      //6
                displayName: "Support"
            },
            {slot: "Iron Cohort Bastion", slotRequirementType: "Optional",      //7
                displayName: "Bastion"
            },
            {slot: "Iron Cohort Support", slotRequirementType: "One Of Group",  //8
                displayName: "Support", oneOfGroup: 1, oneOfGroupGroup: 1
            },
            {slot: "Iron Cohort Support", slotRequirementType: "One Of Group",  //9
                displayName: "Support", oneOfGroup: 1, oneOfGroupGroup: 1
            },
            {slot: "Iron Cohort Bastion", slotRequirementType: "One Of Group",  //10
                displayName: "Bastion", oneOfGroup: 1, oneOfGroupGroup: 2
            },
            {slot: "Iron Cohort Bastion", slotRequirementType: "One Of Group",  //11
                displayName: "Bastion", oneOfGroup: 1, oneOfGroupGroup: 2
            },
            {slot: "Extra Tech-Priest Auxilia",                                 //
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 1,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                 //
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 1,
                displayName: "Tech-Priest",
            }
        ]
    }]
])

export function getShapeForAuxiliaFormationName(formationName: AuxiliaFormationName | ""): FormationShape {
    if(formationName == "") return { slotRequirements: [] };
    return formationShapes.get(formationName) ?? { slotRequirements: [] };
}

const detachmentNamesForSlot = new Map<FormationSlot, (MechanicumDetachmentName|AuxiliaDetachmentName)[]>([
    [ "Air Support", [
        "Auxilia Avenger Strike Fighter Squadron",
        "Auxilia Lightning Fighter Squadron",
        "Auxilia Marauder Bomber Squadron",
        "Auxilia Thunderbolt Squadron",
    ] ],
    ["Artillery", [
        "Auxilia Basilisk Battery",
        "Auxilia Medusa Battery"
    ]], 
    ["Auxilia Lasrifle", ["Auxilia Lasrifle Tercio"]],
    ["Auxilia Shadowsword", ["Auxilia Shadowsword Squadron"]],
    ["Bastion", [
        "Auxilia Rapier Battery",
        "Auxilia Tarantula Battery",
    ]],
    ["Battle Tank",[
        "Auxilia Malcador Infernus Squadron",
        "Auxilia Valdor Squadron",
        "Leman Russ Annihilator Squadron",
        "Leman Russ Demolisher Squadron",
        "Leman Russ Executioner Squadron",
        "Leman Russ Exterminator Squadron",
        "Leman Russ Strike Squadron",
        "Malcador Tank Squadron",
    ]],
    ["Core", [ 
        "Auxilia Lasrifle Tercio"
    ]],  
    ["Extra Tech-Priest Auxilia", ["Tech-Priest Auxilia"]],
    ["Heavy Armour", [
        "Auxilia Shadowsword Squadron",
        "Auxilia Stormblade Squadron",
        "Auxilia Stormhammer Squadron",
        "Auxilia Stormsword Squadron",
        "Auxilia Super-Heavy Tank Squadron"
    ]],
    ["HQ", [ 
        "Auxilia Tactical Command Detachment",
        "Legate Commander Detachment",
    ]],
    ["Iron Cohort Bastion", ["Thanatar Siege-automata Maniple"]],
    ["Iron Cohort Core", [
        "Auxilia Lasrifle Tercio",
        "Thallax Cohort"
    ]],
    ["Iron Cohort Support", [
        "Arlatax Battle-automata Maniple",
        "Castellax Battle-automata Maniple",
        "Domitar Battle-automata Maniple",
    ]],
    ["Light Armour", []],
    ["Leman Russ", [
        "Leman Russ Annihilator Squadron",
        "Leman Russ Demolisher Squadron",
        "Leman Russ Executioner Squadron",
        "Leman Russ Exterminator Squadron",
        "Leman Russ Strike Squadron",
    ]],
    ["Solar Auxilia Armoured Company Compulsory Battle Tank", [
        "Auxilia Malcador Infernus Squadron",
        "Auxilia Valdor Squadron",
        "Leman Russ Strike Squadron",
        "Malcador Tank Squadron",
    ]],
    ["Solar Auxilia Armoured Company Compulsory Heavy Armour", [ 
        "Auxilia Stormhammer Squadron",
        "Auxilia Super-Heavy Tank Squadron"
    ]],
    ["Storm Section", ["Auxilia Veletaris Storm Section"]],
    ["Support", [ 
        "Auxilia Ogryn Charonite Section", 
        "Auxilia Veletaris Storm Section",
    ]],
    ["Tech-Priest Auxilia", ["Tech-Priest Auxilia"]],
    ["Transport", [ 
        "Auxilia Arvus Lighter",
        "Auxilia Dracosan Detachment",
    ]], 
    ["Vanguard", [
        "Auxilia Aethon Heavy Sentinel Patrol",
    ]]
]);

export function getAuxiliaDetachmentNamesForSlot(slot: FormationSlot): (MechanicumDetachmentName|AuxiliaDetachmentName)[] {
    return detachmentNamesForSlot.get(slot) ?? [];
}

const detachmentConfigurationForDetachmentName: Map<MechanicumDetachmentName|AuxiliaDetachmentName, DetachmentConfiguration> = new Map([
    ["Legate Commander Detachment", {modelGroupShapes: [
        {modelName: "Auxilia Commander", modelLoadoutSlots: [], possibleModelGroupQuantities: [{num: 1, points: 16}]},
        {modelName: "Dracosan", dedicatedTransport: true, formationNames: ["Solar Auxilia Mechanised Infantry Sub-Cohort"],
            modelLoadoutSlots: [{
                name: "Primary", possibleModelLoadouts: [
                    {loadout: "Hull Mounted twin lascannon", points: 0},
                    {loadout: "Hull Mounted demolisher cannon", points: 5},
            ]}
        ], possibleModelGroupQuantities: [
            //p128 - max transport size is 8
            {num: 1, points: 37},
        ]}
    ]}],
    ["Auxilia Tactical Command Detachment", {modelGroupShapes: [
        {modelName: "Tactical Command", modelLoadoutSlots: [], possibleModelGroupQuantities: [{num: 1, points: 10}]},
        {modelName: "Dracosan", dedicatedTransport: true, formationNames: ["Solar Auxilia Mechanised Infantry Sub-Cohort"],
            modelLoadoutSlots: [{
                name: "Primary", possibleModelLoadouts: [
                    {loadout: "Hull Mounted twin lascannon", points: 0},
                    {loadout: "Hull Mounted demolisher cannon", points: 5},
            ]}
        ], possibleModelGroupQuantities: [
            //p128 - max transport size is 8
            {num: 1, points: 37},
        ]}
    ]}],
    ["Auxilia Lasrifle Tercio", {maxModels: 16, modelGroupShapes: [
        {modelName: "Auxiliaries", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 30}, {num: 6, points: 30+12}, {num: 8, points: 30+12*2}, {num: 10, points: 30+12*3},
            {num: 12, points: 30+12*4}, {num: 14, points: 30+12*5}, {num: 16, points: 30+12*6}
        ]},
        {modelName: "Auxiliaries with Flamers", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 2, points: 12}, {num: 4, points: 12*2}, {num: 6, points: 12*3},
            {num: 8, points: 12*4}, {num: 10, points: 12*5}, {num: 12, points: 12*6}
        ]},
        {modelName: "Veletarii", modelLoadoutSlots: [], unitTraits: ["Independent"], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 2, points: 12}, {num: 4, points: 12*2}, {num: 6, points: 12*3},
            {num: 8, points: 12*4}, {num: 10, points: 12*5}, {num: 12, points: 12*6}
        ]},
        {modelName: "Charonite Ogryns", modelLoadoutSlots: [], unitTraits: ["Independent"], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 2, points: 15}, {num: 4, points: 15*2}, {num: 6, points: 15*3},
            {num: 8, points: 15*4}, {num: 10, points: 15*5}, {num: 12, points: 15*6}
        ]},
        {modelName: "Dracosan", dedicatedTransport: true, formationNames: ["Solar Auxilia Mechanised Infantry Sub-Cohort"],
            modelLoadoutSlots: [{
                name: "Primary", possibleModelLoadouts: [
                    {loadout: "Hull Mounted twin lascannon", points: 0},
                    {loadout: "Hull Mounted demolisher cannon", points: 5},
            ]}
        ], possibleModelGroupQuantities: [
            {num: 1, points: 37}, {num: 2, points: 37*2}, {num: 3, points: 37*3}, {num: 4, points: 37*4}, 
            {num: 5, points: 37*5}, {num: 6, points: 37*6}, {num: 7, points: 37*7}, {num: 8, points: 37*8}, 
        ]}
    ]}],
    ["Auxilia Ogryn Charonite Section", {maxModels: 8, modelGroupShapes: [
        {modelName: "Charonite Ogryns", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 50}, {num: 4+2, points: 50+15}, {num: 4+4, points: 50+30}
        ]},
        {modelName: "Dracosan", dedicatedTransport: true, formationNames: ["Solar Auxilia Mechanised Infantry Sub-Cohort"],
            modelLoadoutSlots: [{
                name: "Primary", possibleModelLoadouts: [
                    {loadout: "Hull Mounted twin lascannon", points: 0},
                    {loadout: "Hull Mounted demolisher cannon", points: 5},
            ]}
        ], possibleModelGroupQuantities: [
            {num: 1, points: 37}, {num: 2, points: 37*2}, {num: 3, points: 37*3}, {num: 4, points: 37*4}, 
        ]}
    ]}],
    ["Auxilia Veletaris Storm Section", {maxModels: 8, modelGroupShapes: [
        {modelName: "Veletarii", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 40}, {num: 4+2, points: 40+10}, {num: 4+4, points: 40+20}
        ]},
        {modelName: "Dracosan", dedicatedTransport: true, formationNames: ["Solar Auxilia Mechanised Infantry Sub-Cohort"],
            modelLoadoutSlots: [{
                name: "Primary", possibleModelLoadouts: [
                    {loadout: "Hull Mounted twin lascannon", points: 0},
                    {loadout: "Hull Mounted demolisher cannon", points: 5},
            ]}
        ], possibleModelGroupQuantities: [
            {num: 1, points: 37}, {num: 2, points: 37*2}, {num: 3, points: 37*3}, {num: 4, points: 37*4}, 
        ]}
    ]}],
    ["Auxilia Rapier Battery", {minModels: 3, maxModels: 9, modelGroupShapes: [
        {modelName: "Auxilia Rapier", modelLoadoutSlots: [
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
        {modelName: "Auxilia Tarantula", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts:[
                {loadout: "Tarantula lascannon battery", points: 0},
                {loadout: "Hyperios air-defence missile launcher", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 4, points: 36}, {num: 4+2, points: 36+15}, {num: 4+4, points: 36+30}
        ]},
    ]}],
    ["Auxilia Aethon Heavy Sentinel Patrol", {modelGroupShapes: [
        {modelName: "Aethon Heavy Sentinel", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 35}, {num: 2+2, points: 35+25}, {num: 2+4, points: 35+45}, {num: 2+6, points: 35+65}
        ]},
    ]}],
    ["Leman Russ Strike Squadron", {minModels: 4, maxModels: 10, modelGroupShapes: [
        {modelName: "Leman Russ Tank", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Leman Russ battlecannon", points: 0}, 
                {loadout: "Vanquisher battlecannon", points: 0}
            ]},
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", points: 0}, {loadout: "Lascannon", points: 0}, 
            ]},
            {name: "Tank Commander", formationNames: [
                "Solar Auxilia Armoured Company",
                "Solar Auxilia Leman Russ Spearhead"
            ], notAWeapon: true, possibleModelLoadouts: [
                {loadout: "", points: 0}, {loadout: "Tank Commander", points: 10, unitTraits: ["Solar Auxilia HQ (6)"]}, 
            ]},
        ], possibleModelGroupQuantities: [
            {num: 4, points: 175}, {num: 4+2, points: 175+85}, {num: 4+4, points: 175+160},
            {num: 4+6, points: 175+220}, 
        ]}
    ]}],
    ["Malcador Tank Squadron", {minModels: 2, maxModels: 6, modelGroupShapes: [
        {modelName: "Malcador Tank", modelLoadoutSlots: [
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
            ]},
            {name: "Tank Commander", formationNames: ["Solar Auxilia Armoured Company"], notAWeapon: true, possibleModelLoadouts: [
                {loadout: "", points: 0}, {loadout: "Tank Commander", points: 10, unitTraits: ["Solar Auxilia HQ (6)"]}, 
            ]}
        ], possibleModelGroupQuantities: [
            {num: 2, points: 165}, {num: 2+1, points: 165+70}, {num: 2+2, points: 165+130},
            {num: 2+1+2, points: 165+70+130}, {num: 2+4, points: 165+240}, 
        ]}
    ]}],
    ["Auxilia Super-Heavy Tank Squadron", {minModels: 1, maxModels: 6, modelGroupShapes: [
        {modelName: "Auxilia Super-heavy", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Baneblade cannon", points: 0}, 
                {loadout: "Hellhammer cannon", points: 0},
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Baneblade heavy bolters", points: 0}, {loadout: "Baneblade heavy flamer", points: 0}, {loadout: "Baneblade autocannon", points: 0}, 
            ]},
            {name: "Tank Commander", formationNames: ["Solar Auxilia Armoured Company"], notAWeapon: true, possibleModelLoadouts: [
                {loadout: "", points: 0}, {loadout: "Tank Commander", points: 10, unitTraits: ["Solar Auxilia HQ (6)"]}, 
            ]}
        ], possibleModelGroupQuantities: [
            {num: 1, points: 100}, {num: 2, points: 100+90}, {num: 3, points: 100+90+90},
            {num: 1+3, points: 100+255}, {num: 1+1+3, points: 100+90+255}, {num: 1+5, points: 100+390}, 
        ]}
    ]}],
    ["Auxilia Thunderbolt Squadron", {minModels: 1, maxModels: 4, modelGroupShapes: [
        {modelName: "Thunderbolt Fighter", modelLoadoutSlots: [
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
        {modelName: "Avenger Strike Fighter", modelLoadoutSlots: [
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
        {modelName: "Lightning Fighter", modelLoadoutSlots: [
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
        {modelName: "Marauder Bomber", modelLoadoutSlots: [
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
        {modelName: "Marauder Pathfinder", modelLoadoutSlots: [
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
        {modelName: "Marauder Colossus", modelLoadoutSlots: [
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
        {modelName: "Marauder Destroyer", modelLoadoutSlots: [
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
        {modelName: "Arvus Lighter", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            //p128 - max transport size is 8
            {num: 1, points: 12}, {num: 2, points: 24}, {num: 3, points: 36}, {num: 4, points: 48}, 
            {num: 5, points: 60}, {num: 6, points: 72}, {num: 7, points: 84}, {num: 8, points: 96}, 
        ]}
    ]}],
    //TGS
    ["Auxilia Dracosan Detachment", {modelGroupShapes: [
        {modelName: "Dracosan", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Hull Mounted twin lascannon", points: 0, unitTraits: ["Transport (4)"]},
                {loadout: "Hull Mounted demolisher cannon", points: 5, unitTraits: ["Transport (2)"]},
            ]}
        ], possibleModelGroupQuantities: [
            //p128 - max transport size is 8
            {num: 1, points: 37}, {num: 2, points: 37*2}, {num: 3, points: 37*3}, {num: 4, points: 37*4}, 
            {num: 5, points: 37*5}, {num: 6, points: 37*6}, {num: 7, points: 37*7}, {num: 8, points: 37*8}, 
        ]}
    ]}],
    ["Auxilia Cyclops Detachment", {
        customValidation: (detachment: Detachment): DetachmentValidationState => {
            const cyclopses = detachment.modelGroups.find((a)=>a.modelName == "Cyclops");
            if(!cyclopses) return {valid: true};
            if(cyclopses?.modelLoadoutGroups.length > 1)
                return {valid: false, error: "Invalid loadouts of models in group", data: "All models must be equipped with the same weapon"}
            return {valid: true};
        },
        modelGroupShapes: [
            {modelName: "Cyclops", modelLoadoutSlots: [
                {name: "Charge", possibleModelLoadouts: [
                    {loadout: "Demolition charge", points: 0},
                    {loadout: "Incineration charge", points: 0},
                ]}
            ], 
        possibleModelGroupQuantities: [
            {num: 2, points: 40}, {num: 4, points: 80}, {num: 6, points: 40+80}
        ]},
    ]}],
    ["Auxilia Malcador Infernus Squadron", {modelGroupShapes: [
        {modelName: "Malcador Inferus", modelLoadoutSlots: [
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Malcador lascannon sponsons", points: 0}, {loadout: "Malcador autocannon sponsons", points: 0}, 
            ]},
            {name: "Tank Commander", formationNames: ["Solar Auxilia Armoured Company"], notAWeapon: true, possibleModelLoadouts: [
                {loadout: "", points: 0}, {loadout: "Tank Commander", points: 10, unitTraits: ["Solar Auxilia HQ (6)"]}, 
            ]}
        ], possibleModelGroupQuantities: [
            {num: 1, points: 70}, {num: 2, points: 140}, {num: 3, points: 70+140},
        ]}
    ]}],
    ["Auxilia Valdor Squadron", {modelGroupShapes: [
        {modelName: "Valdor", modelLoadoutSlots: [
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Malcador lascannon sponson", points: 0}, {loadout: "Malcador autocannon sponson", points: 0}, 
            ]},
            {name: "Tank Commander", formationNames: ["Solar Auxilia Armoured Company"], notAWeapon: true, possibleModelLoadouts: [
                {loadout: "", points: 0}, {loadout: "Tank Commander", points: 10, unitTraits: ["Solar Auxilia HQ (6)"]}, 
            ]}
        ], possibleModelGroupQuantities: [
            {num: 1, points: 70}, {num: 2, points: 140}, {num: 3, points: 70+140},
        ]}
    ]}],
    ["Auxilia Stormhammer Squadron", {modelGroupShapes: [
        {modelName: "Stormhammer", modelLoadoutSlots: [
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Stormhammer multi-laser sponsons", points: 0}, {loadout: "Stormhammer lascannon sponsons", points: 4}, 
            ]},
            {name: "Tank Commander", formationNames: ["Solar Auxilia Armoured Company"], notAWeapon: true, possibleModelLoadouts: [
                {loadout: "", points: 0}, {loadout: "Tank Commander", points: 10, unitTraits: ["Solar Auxilia HQ (6)"]}, 
            ]}
        ], possibleModelGroupQuantities: [
            {num: 1, points: 100}, {num: 2, points: 200}, {num: 3, points: 300},
        ]}
    ]}],
    ["Auxilia Medusa Battery", {modelGroupShapes: [
        {modelName: "Medusa", modelLoadoutSlots: [],
            possibleModelGroupQuantities: [
                {num: 4, points: 130}, {num: 8, points: 260}, {num: 12, points: 390},
            ]
        }
    ]}],
    ["Auxilia Basilisk Battery", {modelGroupShapes: [
        {modelName: "Basilisk", modelLoadoutSlots: [],
            possibleModelGroupQuantities: [
                {num: 4, points: 140}, {num: 8, points: 280}, {num: 12, points: 420},
            ]
        }
    ]}],
    //TDOT
    ["Auxilia Shadowsword Squadron", {minModels: 1, maxModels: 6, modelGroupShapes: [
        {modelName: "Shadowsword", modelLoadoutSlots: [
            {name: "Tank Commander", formationNames: [
                "Solar Auxilia Armoured Company",
                "Solar Auxilia Titan Hunter Company"
            ], notAWeapon: true, possibleModelLoadouts: [
                {loadout: "", points: 0}, {loadout: "Tank Commander", points: 10, unitTraits: ["Solar Auxilia HQ (6)"]}, 
            ]},
        ], possibleModelGroupQuantities: [
            {num: 1, points: 140}, {num: 2, points: 140+130}, {num: 3, points: 140+260},
        ]}
    ]}],
    ["Auxilia Stormsword Squadron", {minModels: 1, maxModels: 6, modelGroupShapes: [
        {modelName: "Stormsword", modelLoadoutSlots: [
            {name: "Tank Commander", formationNames: ["Solar Auxilia Armoured Company"], notAWeapon: true, possibleModelLoadouts: [
                {loadout: "", points: 0}, {loadout: "Tank Commander", points: 10, unitTraits: ["Solar Auxilia HQ (6)"]}, 
            ]},
        ], possibleModelGroupQuantities: [
            {num: 1, points: 100}, {num: 2, points: 100+90}, {num: 3, points: 100+180},
        ]}
    ]}],
    ["Auxilia Stormblade Squadron", {minModels: 1, maxModels: 6, modelGroupShapes: [
        {modelName: "Stormsword", modelLoadoutSlots: [
            {name: "Tank Commander", formationNames: ["Solar Auxilia Armoured Company"], notAWeapon: true, possibleModelLoadouts: [
                {loadout: "", points: 0}, {loadout: "Tank Commander", points: 10, unitTraits: ["Solar Auxilia HQ (6)"]}, 
            ]},
        ], possibleModelGroupQuantities: [
            {num: 1, points: 120}, {num: 2, points: 120+110}, {num: 3, points: 120+220},
        ]}
    ]}],
    ["Leman Russ Executioner Squadron", {minModels: 4, maxModels: 10, modelGroupShapes: [
        {modelName: "Leman Russ Executioner", modelLoadoutSlots: [
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", points: 0}, {loadout: "Lascannon", points: 0}, 
            ]},
            {name: "Tank Commander", formationNames: [
                "Solar Auxilia Armoured Company",
                "Solar Auxilia Leman Russ Spearhead"
            ], notAWeapon: true, possibleModelLoadouts: [
                {loadout: "", points: 0}, {loadout: "Tank Commander", points: 10, unitTraits: ["Solar Auxilia HQ (6)"]}, 
            ]}
        ], possibleModelGroupQuantities: [
            {num: 4, points: 175}, {num: 4+2, points: 175+85}, {num: 4+4, points: 175+160},
            {num: 4+6, points: 175+220}, 
        ]}
    ]}],
    ["Leman Russ Demolisher Squadron", {minModels: 4, maxModels: 10, modelGroupShapes: [
        {modelName: "Leman Russ Demolisher", modelLoadoutSlots: [
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", points: 0}, {loadout: "Lascannon", points: 0}, 
            ]},
            {name: "Tank Commander", formationNames: [
                "Solar Auxilia Armoured Company",
                "Solar Auxilia Leman Russ Spearhead"
            ], notAWeapon: true, possibleModelLoadouts: [
                {loadout: "", points: 0}, {loadout: "Tank Commander", points: 10, unitTraits: ["Solar Auxilia HQ (6)"]}, 
            ]},
        ], possibleModelGroupQuantities: [
            {num: 4, points: 175}, {num: 4+2, points: 175+85}, {num: 4+4, points: 175+160},
            {num: 4+6, points: 175+220}, 
        ]}
    ]}],
    ["Leman Russ Annihilator Squadron", {minModels: 4, maxModels: 10, modelGroupShapes: [
        {modelName: "Leman Russ Annihilator", modelLoadoutSlots: [
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", points: 0}, {loadout: "Lascannon", points: 0}, 
            ]},
            {name: "Tank Commander", formationNames: [
                "Solar Auxilia Armoured Company",
                "Solar Auxilia Leman Russ Spearhead"
            ], notAWeapon: true, possibleModelLoadouts: [
                {loadout: "", points: 0}, {loadout: "Tank Commander", points: 10, unitTraits: ["Solar Auxilia HQ (6)"]}, 
            ]},
        ], possibleModelGroupQuantities: [
            {num: 4, points: 175}, {num: 4+2, points: 175+85}, {num: 4+4, points: 175+160},
            {num: 4+6, points: 175+220}, 
        ]}
    ]}],
    ["Leman Russ Exterminator Squadron", {minModels: 4, maxModels: 10, modelGroupShapes: [
        {modelName: "Leman Russ Exterminator", modelLoadoutSlots: [
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", points: 0}, {loadout: "Lascannon", points: 0}, 
            ]},
            {name: "Tank Commander", formationNames: [
                "Solar Auxilia Armoured Company",
                "Solar Auxilia Leman Russ Spearhead"
            ], notAWeapon: true, possibleModelLoadouts: [
                {loadout: "", points: 0}, {loadout: "Tank Commander", points: 10, unitTraits: ["Solar Auxilia HQ (6)"]}, 
            ]},
        ], possibleModelGroupQuantities: [
            {num: 4, points: 175}, {num: 4+2, points: 175+85}, {num: 4+4, points: 175+160},
            {num: 4+6, points: 175+220}, 
        ]}
    ]}],
]);

export function getAuxiliaDetachmentConfigurationForDetachmentName(detachmentName: (AuxiliaDetachmentName|MechanicumDetachmentName)): DetachmentConfiguration {
    return detachmentConfigurationForDetachmentName.get(detachmentName) 
        ?? getMechanicumDetachmentConfigurationForDetachmentName(detachmentName)
        ?? {modelGroupShapes: []}
}

const statsForModelType = new Map<AuxiliaModelName, Stats>([
    ["Aethon Heavy Sentinel", {
        detachmentType: "Walker", scale: 2, move: 7, saves: [
            {saveType: "Armour", save: 4, arc: "All"},
        ],
        caf: 0, morale: 4, wounds: 1, tacticalStrength: 3, voidShields: 0,
        modelLoadoutSlots: [{name:"", possibleModelLoadouts: [
            {loadout: "", weaponTypes: ["Multi-laser", "Sentinel missile launcher"]}
        ]}],
        unitTraits: ["Forward Deployment"]
    }],
    ["Auxilia Commander", {
        detachmentType: "Infantry", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 6, arc: "All"},
            {saveType: "Invuln", save: 6, arc: "All"},
        ],
        caf: 3, morale: 2, wounds: 1, tacticalStrength: 5, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Archeotech pistols", "Volkite chargers"]}
            ]}
        ],
        unitTraits: ["Commander", "Inspire (8)", "Master Tactician", "Solar Auxilia HQ (10)"]
    }],
    ["Auxilia Rapier", {
        detachmentType: "Infantry", scale: 1, move: 4, saves:[
            {saveType: "Armour", save: 6, arc: "All"},
        ],
        caf: 0, morale: 4, wounds: 1, tacticalStrength: 5, voidShields: 0,
        modelLoadoutSlots: [{name: "Primary", possibleModelLoadouts:[
            {loadout: "Laser destroyer array"},
            {loadout: "Quad launcher"},
            {loadout: "Mole mortar"},
        ]}],
        unitTraits: ["Bulky", "Chain of Command"],
    }],
    ["Auxilia Super-heavy", {
        detachmentType: "Super-heavy vehicle", scale: 3, move: 7, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 4, morale: 4, wounds: 2, tacticalStrength: 2,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: [
                    "Hull Mounted demolisher cannon",
                    "Hull Mounted heavy bolter turret",
                    "Lascannon sponson turrets",
                ]},
            ]},
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Baneblade cannon", weaponTypes: ["Baneblade cannon", "Co-axial autocannon"]},
                {loadout: "Hellhammer cannon", weaponTypes: ["Hellhammer cannon", "Co-axial autocannon"]},
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Baneblade heavy bolters", weaponTypes: ["Baneblade heavy bolter sponsons"]},
                {loadout: "Baneblade heavy flamer", weaponTypes: ["Baneblade heavy flamer sponsons"]},
                {loadout: "Baneblade autocannon", weaponTypes: ["Baneblade autocannon sponsons"]},
            ]},
        ],
        unitTraits: ["Chain of Command", "Explorer Adaptation"]
    }],
    ["Auxilia Tarantula", {
        detachmentType: "Infantry", scale: 1, move: 0, saves:[
            {saveType: "Armour", save: 5, arc: "All"},
        ],
        caf: -3, wounds: 1, tacticalStrength: 0, voidShields: 0,
        modelLoadoutSlots: [{name: "Primary", possibleModelLoadouts:[
            {loadout: "Tarantula lascannon battery"},
            {loadout: "Hyperios air-defence missile launcher"},
        ]}],
        unitTraits: ["Automated Sentry"],
    }],
    ["Auxiliaries", {
        detachmentType: "Infantry", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 6, arc: "All"},
        ],
        caf: 0, morale: 4, wounds: 1, tacticalStrength: 7, voidShields: 0,
        modelLoadoutSlots: [{name: "", possibleModelLoadouts: [{
            loadout: "", weaponTypes: ["Auxilia lasrifles"]
        }]}],
        unitTraits: ["Chain of Command", "Line"]
    }],
    ["Auxiliaries with Flamers", {
        detachmentType: "Infantry", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 6, arc: "All"},
        ],
        caf: 0, morale: 4, wounds: 1, tacticalStrength: 7, voidShields: 0,
        modelLoadoutSlots: [{name: "", possibleModelLoadouts: [{
            loadout: "", weaponTypes: ["Flamers"]
        }]}],
        unitTraits: ["Chain of Command", "Line"]
    }],
    ["Avenger Strike Fighter", {
        detachmentType: "Vehicle", scale: 2, move: 28, saves: [
            {saveType: "Armour", save: 4, arc: "Front"}, {saveType: "Armour", save: 5, arc: "Rear"},
            {saveType: "Jink", save: 5, arc: "All"}
        ],
        caf: 0, wounds: 1, tacticalStrength: 2,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Avenger bolt cannon", "Heavy stubber tail gun"]}, 
            ]},
            {name: "Cannon", possibleModelLoadouts: [
                {loadout: "Avenger lascannon"}, 
                {loadout: "Avenger autocannon"},
            ]},
            {name: "Missiles", possibleModelLoadouts: [
                {loadout: "Hellstrike missiles"}, {loadout: "Skystrike missiles"}, {loadout: "Wing bombs"}, 
            ]}
        ],
        unitTraits: ["Flyer", "Interceptor"]
    }],
    ["Arvus Lighter", {
        detachmentType: "Vehicle", scale: 2, move: 25, saves: [
            {saveType: "Armour", save: 4, arc: "Front"}, {saveType: "Armour", save: 5, arc: "Rear"},
            {saveType: "Jink", save: 6, arc: "All"}
        ],
        caf: 0, wounds: 1, tacticalStrength: 2,
        modelLoadoutSlots: [],
        unitTraits: ["Flyer", "Hover", "Transport (2)"]
    }],
    ["Charonite Ogryns", {
        detachmentType: "Infantry", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 6, arc: "All"},
        ],
        caf: 3, morale: 4, wounds: 1, tacticalStrength: 5, voidShields: 0,
        modelLoadoutSlots: [{name: "", possibleModelLoadouts: [{
            loadout: "", weaponTypes: ["Charonite claws"]
        }]}],
        unitTraits: ["Furious Charge"]
    }],
    ["Cyclops", {
        detachmentType: "Vehicle", scale: 2, move: 9, saves: [
            {saveType: "Armour", save: 5, arc: "All"},
        ],
        caf: -8, wounds: 1, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "Charge", possibleModelLoadouts: [
                {loadout: "Demolition charge"},
                {loadout: "Incineration charge"},
            ]}
        ], 
        unitTraits: ["Compact", "Remote Controlled Detonation"]
    }],
    ["Dracosan", {
        detachmentType: "Vehicle", scale: 2, move: 8, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 2, morale: 4, wounds: 1, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Hull Mounted twin lascannon", unitTraits: ["Transport (4)"]},
                {loadout: "Hull Mounted demolisher cannon", unitTraits: ["Transport (2)"]},
            ]}
        ], 
        unitTraits: ["Explorer Adaptation"]
    }],
    ["Leman Russ Annihilator", {
        detachmentType: "Vehicle", scale: 2, move: 8, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 2, morale: 4, wounds: 1, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Annihiliator twin lascannon"]},
            ]},
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", weaponTypes: ["Hull Mounted heavy bolter"]}, 
                {loadout: "Lacannon", weaponTypes: ["Hull Mounted lascannon"]}, 
            ]},
        ],
        unitTraits: ["Chain of Command", "Explorer Adaptation"]
    }],
    ["Leman Russ Executioner", {
        detachmentType: "Vehicle", scale: 2, move: 8, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 2, morale: 4, wounds: 1, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Executioner plasma cannon"]},
            ]},
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", weaponTypes: ["Hull Mounted heavy bolter"]}, 
                {loadout: "Lacannon", weaponTypes: ["Hull Mounted lascannon"]}, 
            ]},
        ],
        unitTraits: ["Chain of Command", "Explorer Adaptation"]
    }],
    ["Leman Russ Exterminator", {
        detachmentType: "Vehicle", scale: 2, move: 8, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 2, morale: 4, wounds: 1, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Exterminator autocannon"]},
            ]},
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", weaponTypes: ["Hull Mounted heavy bolter"]}, 
                {loadout: "Lacannon", weaponTypes: ["Hull Mounted lascannon"]}, 
            ]},
        ],
        unitTraits: ["Chain of Command", "Explorer Adaptation"]
    }],
    ["Leman Russ Demolisher", {
        detachmentType: "Vehicle", scale: 2, move: 8, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 2, morale: 4, wounds: 1, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Demolisher cannon"]},
            ]},
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", weaponTypes: ["Hull Mounted heavy bolter"]}, 
                {loadout: "Lacannon", weaponTypes: ["Hull Mounted lascannon"]}, 
            ]},
        ],
        unitTraits: ["Chain of Command", "Explorer Adaptation"]
    }],
    ["Leman Russ Tank", {
        detachmentType: "Vehicle", scale: 2, move: 8, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 2, morale: 4, wounds: 1, tacticalStrength: 2,
        modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Leman Russ battlecannon"},
                {loadout: "Vanquisher battlecannon"},
            ]},
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", weaponTypes: ["Hull Mounted heavy bolter"]}, 
                {loadout: "Lacannon", weaponTypes: ["Hull Mounted lascannon"]}, 
            ]},
        ],
        unitTraits: ["Chain of Command", "Explorer Adaptation"]
    }],
    ["Lightning Fighter", {
        detachmentType: "Vehicle", scale: 2, move: 30, saves: [
            {saveType: "Armour", save: 4, arc: "Front"}, {saveType: "Armour", save: 5, arc: "Rear"},
            {saveType: "Jink", save: 5, arc: "All"}
        ],
        caf: 0, wounds: 1, tacticalStrength: 2,
        modelLoadoutSlots: [
            {name: "Cannon", possibleModelLoadouts: [
                {loadout: "Lightning twin lascannon",}, 
                {loadout: "Lightning twin multi-laser"},
            ]},
            {name: "Missiles 1", possibleModelLoadouts: [
                {loadout: "Hellstrike missiles"}, {loadout: "Skystrike missiles"}, {loadout: "Phosphex bomb clusters"}, 
            ]},
            {name: "Missiles 2", possibleModelLoadouts: [
                {loadout: "Hellstrike missiles"}, {loadout: "Skystrike missiles"}, {loadout: "Phosphex bomb clusters"}, 
            ]}
        ],
        unitTraits: ["Flyer", "Interceptor"]
    }],
    ["Malcador Infernus", {
        detachmentType: "Vehicle", scale: 2, move: 8, saves: [
            {saveType: "Armour", save: 3, arc: "Front"},
            {saveType: "Armour", save: 4, arc: "Rear"},
        ],
        caf: 1, morale: 4, wounds: 2, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Malcador inferno gun"]},
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Malcador lascannon sponsons"}, {loadout: "Malcador autocannon sponsons"}, 
            ]},
        ],
        unitTraits: ["Chain of Command", "Explorer Adaptation"]
    }],
    ["Malcador Tank", {
        detachmentType: "Vehicle", scale: 2, move: 9, saves: [
            {saveType: "Armour", save: 3, arc: "Front"},
            {saveType: "Armour", save: 4, arc: "Rear"},
        ],
        caf: 2, morale: 4, wounds: 2, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Malcador battlecannon"},
                {loadout: "Malcador Vanquisher battlecannon"},
                {loadout: "Malcador lascannon turret"},
            ]},
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", weaponTypes: ["Hull Mounted heavy bolter"]},
                {loadout: "Lascannon", weaponTypes: ["Hull Mounted lascannon"]},
                {loadout: "Autocannon", weaponTypes: ["Hull Mounted autocannon"]},
                {loadout: "Demolisher cannon", weaponTypes: ["Hull Mounted demolisher cannon"]},
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Malcador lascannon sponsons"}, {loadout: "Malcador autocannon sponsons"}, 
            ]},
        ],
        unitTraits: ["Chain of Command", "Explorer Adaptation"]
    }],
    ["Marauder Bomber", {
        detachmentType: "Vehicle", scale: 2, move: 24, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"},
            {saveType: "Jink", save: 5, arc: "All"}
        ],
        caf: 0, wounds: 1, tacticalStrength: 2,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Nose Mounted lascannon", "Marauder heavy bolter turrets", "Marauder bomb bay"]}, 
            ]},
            {name: "Missiles 1", possibleModelLoadouts: [
                {loadout: "Hellstrike missiles"}, {loadout: "Skystrike missiles"}, {loadout: "Wing bombs"}, 
            ]},
            {name: "Missiles 2", possibleModelLoadouts: [
                {loadout: "Hellstrike missiles"}, {loadout: "Skystrike missiles"}, {loadout: "Wing bombs"}, 
            ]}
        ],
        unitTraits: ["Auger Array", "Flyer", "Interceptor"]
    }],
    ["Marauder Colossus", {
        detachmentType: "Vehicle", scale: 2, move: 22, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"},
            {saveType: "Jink", save: 5, arc: "All"}
        ],
        caf: 0, wounds: 1, tacticalStrength: 2,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Colossus Bomb", "Nose Mounted heavy bolter", "Rear Mounted heavy bolter"]}, 
            ]},
            {name: "Missiles 1", possibleModelLoadouts: [
                {loadout: "Hellstrike missiles"}, {loadout: "Skystrike missiles"}, {loadout: "Wing bombs"}, 
            ]},
            {name: "Missiles 2", possibleModelLoadouts: [
                {loadout: "Hellstrike missiles"}, {loadout: "Skystrike missiles"}, {loadout: "Wing bombs"}, 
            ]}
        ],
        unitTraits: ["Flyer", "Interceptor"]
    }],
    ["Marauder Destroyer", {
        detachmentType: "Vehicle", scale: 2, move: 24, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"},
            {saveType: "Jink", save: 5, arc: "All"}
        ],
        caf: 0, wounds: 1, tacticalStrength: 2,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Nose Mounted autocannon array", "Marauder heavy bolter turrets", "Destroyer bomb bay"]}, 
            ]},
            {name: "Missiles 1", possibleModelLoadouts: [
                {loadout: "Hellstrike missiles"}, {loadout: "Skystrike missiles"}, {loadout: "Wing bombs"}, 
            ]},
            {name: "Missiles 2", possibleModelLoadouts: [
                {loadout: "Hellstrike missiles"}, {loadout: "Skystrike missiles"}, {loadout: "Wing bombs"}, 
            ]}
        ],
        unitTraits: ["Auger Array", "Flyer", "Interceptor"]
    }],
    ["Marauder Pathfinder", {
        detachmentType: "Vehicle", scale: 2, move: 22, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"},
            {saveType: "Jink", save: 5, arc: "All"}
        ],
        caf: 0, wounds: 1, tacticalStrength: 2,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Nose Mounted heavy bolter", "Rear Mounted heavy bolter"]}, 
            ]},
            {name: "Missiles 1", possibleModelLoadouts: [
                {loadout: "Hellstrike missiles"}, {loadout: "Skystrike missiles"}, {loadout: "Wing bombs"}, 
            ]},
            {name: "Missiles 2", possibleModelLoadouts: [
                {loadout: "Hellstrike missiles"}, {loadout: "Skystrike missiles"}, {loadout: "Wing bombs"}, 
            ]}
        ],
        unitTraits: ["Flyer", "Interceptor"]
    }],
    ["Shadowsword", {
        detachmentType: "Super-heavy vehicle", scale: 3, move: 6, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 2, morale: 4, wounds: 2, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: [
                    "Hull Mounted heavy bolter turret",
                    "Lascannon sponson turrets",
                    "Shadowsword heavy bolter sponsons",
                    "Volcano cannon"
                ]},
            ]},
        ],
        unitTraits: ["Chain of Command", "Explorer Adaptation"]
    }],
    ["Stormblade", {
        detachmentType: "Super-heavy vehicle", scale: 3, move: 6, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 2, morale: 4, wounds: 2, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: [
                    "Hull Mounted heavy bolter turret",
                    "Lascannon sponson turrets",
                    "Plasma blastgun",
                    "Stormsword heavy bolter sponsons",
                ]},
            ]},
        ],
        unitTraits: ["Chain of Command", "Explorer Adaptation"]
    }],
    ["Stormsword", {
        detachmentType: "Super-heavy vehicle", scale: 3, move: 6, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 2, morale: 4, wounds: 2, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: [
                    "Hull Mounted heavy bolter turret",
                    "Lascannon sponson turrets",
                    "Stormsword heavy bolter sponsons",
                    "Stormsword siege cannon",
                ]},
            ]},
        ],
        unitTraits: ["Chain of Command", "Explorer Adaptation"]
    }],
    ["Tactical Command", {
        detachmentType: "Infantry", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 6, arc: "All"},
        ],
        caf: 1, morale: 3, wounds: 1, tacticalStrength: 5, voidShields: 0,
        modelLoadoutSlots: [{name: "", possibleModelLoadouts: [{
            loadout: "", weaponTypes: ["Auxilia lasrifles"]
        }]}],
        unitTraits: ["Commander", "Inspire (8)", "Solar Auxilia HQ (6)"]
    }],
    ["Thunderbolt Fighter", {
        detachmentType: "Vehicle", scale: 2, move: 25, saves: [
            {saveType: "Armour", save: 4, arc: "Front"}, {saveType: "Armour", save: 5, arc: "Rear"},
            {saveType: "Jink", save: 5, arc: "All"}
        ],
        caf: 0, wounds: 1, tacticalStrength: 2,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Thunderbolt twin-linked lascannon"]}, 
            ]},
            {name: "Cannon", possibleModelLoadouts: [
                {loadout: "Quad autocannon"}, 
                {loadout: "Avenger bolt cannon"},
            ]},
            {name: "Missiles", possibleModelLoadouts: [
                {loadout: "Hellstrike missiles"}, {loadout: "Skystrike missiles"}, {loadout: "Wing bombs"}, 
            ]}
            
        ],
        unitTraits: ["Flyer", "Interceptor"]
    }],
    ["Valdor", {
        detachmentType: "Vehicle", scale: 2, move: 8, saves: [
            {saveType: "Armour", save: 3, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 1, morale: 4, wounds: 2, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Neutron beam laser"]},
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Malcador lascannon sponsons"}, {loadout: "Malcador autocannon sponsons"}, 
            ]},
        ],
        unitTraits: ["Chain of Command", "Explorer Adaptation"]
    }],
    ["Veletarii", {
        detachmentType: "Infantry", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 6, arc: "All"},
        ],
        caf: 1, morale: 4, wounds: 1, tacticalStrength: 6, voidShields: 0,
        modelLoadoutSlots: [{name: "", possibleModelLoadouts: [
            {loadout: "", weaponTypes: ["Auxilia laspistols", "Power axes"]}
        ]}],
        unitTraits: ["Steadfast"]
    }],
]);

export function getStatsForAuxiliaModelType(modelName: AuxiliaModelName): Stats | undefined {
    return statsForModelType.get(modelName)
}