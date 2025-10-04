import { AuxiliaDetachmentName, AuxiliaFormationName, AuxiliaModelName } from "./auxiliaTypes.ts";
import { getMechanicumDetachmentConfigurationForDetachmentName } from "./mechanicumList.ts";
import { MechanicumDetachmentName } from "./mechanicumTypes.ts";
import { Detachment, DetachmentConfiguration, DetachmentValidationState, EmptyNormalFormationShape, Formation, FormationShape, FormationSlot, Stats } from "./types.ts";

const tankCommanderValidation = (formation: Formation, detachmentIndex: number): DetachmentValidationState => {
    if(detachmentIndex > 2) {
        return { valid: true };
    }

    //we want exactly one tank commander in the required slots
    let totalNumTankCommanders = 0;
    let thisHasTankCommander = false;
    for(let i = 0; i < 3; ++i) {
        const detachment = formation.detachments[i];
        let numTankCommanders = 0;

        numTankCommanders = detachment.extras?.filter((e) => e.name == "Tank Commander" && e.has)?.length ?? 0;
        if(i == detachmentIndex && numTankCommanders != 0)
            thisHasTankCommander = true;
        totalNumTankCommanders += numTankCommanders;
    }

    if(totalNumTankCommanders != 1 && thisHasTankCommander)
        return {valid: false, error: "Tank Commander rules broken", data : "must have one Tank Commander in this Formation"};
    
    return {valid: true};
}

const formationShapes = new Map<AuxiliaFormationName, FormationShape>([
    [ "Solar Auxilia Armoured Company", { 
        customValidation: tankCommanderValidation, formationType: "Normal",
        slotRequirements: [
        {slot: "Battle Tank",       
            slotRequirementType: "Required"                 
        },
        {slot: "Battle Tank",
            slotRequirementType: "Required"                 
        },
        {slot: "Heavy Armour",        
            slotRequirementType: "Required"                 
        },
        {   slot: "Battle Tank",        slotRequirementType: "Optional"                 },
        {   slot: "Battle Tank",        slotRequirementType: "Optional"                 },
        {   slot: "Heavy Armour",       slotRequirementType: "Optional"                 },
        {   slot: "Battle Tank",        slotRequirementType: "One Of",  oneOfGroup: 1   },
        {   slot: "Artillery",          slotRequirementType: "One Of",  oneOfGroup: 1   },
        {   slot: "Air Support",        slotRequirementType: "One Of",  oneOfGroup: 1   },
    ]}],
    ["Solar Auxilia Artillery Company", {formationType: "Normal", slotRequirements: [
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
        customValidation: tankCommanderValidation, formationType: "Normal",
        slotRequirements: [
            {   slot: "Leman Russ",     slotRequirementType: "Required"                 },
            {   slot: "Leman Russ",     slotRequirementType: "Required"                 },
            {   slot: "Leman Russ",     slotRequirementType: "Required"                 },
            {   slot: "Light Armour",   slotRequirementType: "Optional"                 },
            {   slot: "Battle Tank",    slotRequirementType: "Optional"                 },
            {   slot: "Heavy Armour",   slotRequirementType: "Optional"                 },
            {   slot: "Air Support",    slotRequirementType: "Optional"                 },
    ]}],
    ["Solar Auxilia Mechanised Infantry Sub-Cohort", {formationType: "Normal", slotRequirements: [
        {   slot: "HQ",                 slotRequirementType: "Required"                 },
        {   slot: "Support",            slotRequirementType: "Required"                 },
        {   slot: "Core",               slotRequirementType: "Required"                 },
        {   slot: "Core",               slotRequirementType: "Required"                 },
        {   slot: "Vanguard",           slotRequirementType: "Optional"                 },
        {   slot: "Vanguard",           slotRequirementType: "Optional"                 },
        {   slot: "Air Support",        slotRequirementType: "Optional"                 },
        {   slot: "Support",            slotRequirementType: "Optional"                 },
    ]}],
    [ "Solar Auxilia Pioneer Company", {formationType: "Normal", slotRequirements: [
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
    [ "Solar Auxilia Sub-Cohort", {formationType: "Normal", slotRequirements: [
        {   slot: "HQ",                 slotRequirementType: "Required"                 },
        {   slot: "Support",            slotRequirementType: "Required"                 },
        {   slot: "Auxilia Lasrifle",   slotRequirementType: "Required"                 },
        {   slot: "Auxilia Lasrifle",   slotRequirementType: "Required"                 },
        {   slot: "Transport",          slotRequirementType: "Optional"                 },
        {   slot: "Transport",          slotRequirementType: "Optional"                 },
        {   slot: "Transport",          slotRequirementType: "Optional"                 },
        {   slot: "Support",            slotRequirementType: "Optional"                 },
        {   slot: "Support",            slotRequirementType: "Optional"                 },
        {   slot: "Battle Tank",        slotRequirementType: "Optional"                 },
        {   slot: "Core",               slotRequirementType: "Optional"                 },
        {   slot: "Light Armour",       slotRequirementType: "One Of",  oneOfGroup: 1   },
        {   slot: "Vanguard",           slotRequirementType: "One Of",  oneOfGroup: 1   },
        {   slot: "Artillery",          slotRequirementType: "One Of",  oneOfGroup: 2   },
        {   slot: "Battle Tank",        slotRequirementType: "One Of",  oneOfGroup: 2   },
        {   slot: "Air Support",        slotRequirementType: "One Of",  oneOfGroup: 2   },
    ]}],    
    [ "Solar Auxilia Super-Heavy Company", {
        customValidation: tankCommanderValidation, formationType: "Normal",
        slotRequirements: [
        {slot: "Heavy Armour",        
            slotRequirementType: "Required"                 
        },
        {slot: "Heavy Armour",        
            slotRequirementType: "Required"                 
        },
        {slot: "Heavy Armour",        
            slotRequirementType: "Required"                 
        },
        {slot: "Heavy Armour",       
            slotRequirementType: "Optional"                 
        },
        {slot: "Heavy Armour",       
            slotRequirementType: "Optional"                 
        },
    ]}],
    [ "Solar Auxilia Titan Hunter Company", {
        customValidation: tankCommanderValidation, formationType: "Normal",
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
                displayName: "Support"
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
    }],
    //iconic
    ["Tallarn Reborn Carmine Ambush Tercio", {
        allegiance: "Loyalist", points: 465, expandedPoints: 110, formationType: "Iconic", 
        iconicDetachments: [{
            iconicDetachmentRequirementType: "Standard", slot: "Battle Tank", detachmentName: "Leman Russ Annihilator Squadron",
            modelGroups: [
                {modelName: "Leman Russ Annihilator", modelLoadoutGroups: [{number: 4, modelLoadoutSlots: [
                    {name: "Hull Mounted", loadout: "Lascannon"},
                    {name: "Pintle Mounted", loadout: "None"},
                ]}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Battle Tank", detachmentName: "Leman Russ Executioner Squadron",
            modelGroups: [
                {modelName: "Leman Russ Executioner", modelLoadoutGroups: [{number: 4, modelLoadoutSlots: [
                    {name: "Hull Mounted", loadout: "Lascannon"},
                    {name: "Pintle Mounted", loadout: "None"},
                ]}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Battle Tank", detachmentName: "Leman Russ Vanquisher Squadron",
            extras: ["Tank Commander"],
            modelGroups: [
                {modelName: "Leman Russ Vanquisher", modelLoadoutGroups: [{number: 4, modelLoadoutSlots: [
                    {name: "Hull Mounted", loadout: "Lascannon"},
                    {name: "Pintle Mounted", loadout: "None"},
                ]}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Vanguard", detachmentName: "Auxilia Aethon Heavy Sentinel Patrol",
            modelGroups: [
                {modelName: "Aethon Heavy Sentinel", modelLoadoutGroups: [{number: 4, modelLoadoutSlots: []}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Vanguard", detachmentName: "Auxilia Aethon Heavy Sentinel Patrol",
            modelGroups: [
                {modelName: "Aethon Heavy Sentinel", modelLoadoutGroups: [{number: 4, modelLoadoutSlots: []}]}
            ]
        }]
    }], 
    ["Galibed Oathsworn Thyreos Siege Breaker Company", {
        allegiance: "Traitor", points: 480, expandedPoints: 370, formationType: "Iconic",
        iconicDetachments: [{
            iconicDetachmentRequirementType: "Standard", slot: "Heavy Armour", detachmentName: "Auxilia Stormsword Squadron",
            modelGroups: [
                {modelName: "Stormsword", modelLoadoutGroups: [{number: 3, modelLoadoutSlots: [
                    {name: "Pintle Mounted", loadout: "None"}
                ]}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Bastion", detachmentName: "Auxilia Basilisk Battery",
            modelGroups: [
                {modelName: "Basilisk", modelLoadoutGroups: [{number: 4, modelLoadoutSlots: []}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Bastion", detachmentName: "Auxilia Medusa Battery",
            modelGroups: [
                {modelName: "Medusa", modelLoadoutGroups: [{number: 4, modelLoadoutSlots: []}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Heavy Armour", detachmentName: "Auxilia Stormsword Squadron",
            modelGroups: [
                {modelName: "Stormsword", modelLoadoutGroups: [{number: 3, modelLoadoutSlots: [
                    {name: "Pintle Mounted", loadout: "None"}
                ]}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Bastion", detachmentName: "Auxilia Basilisk Battery",
            modelGroups: [
                {modelName: "Basilisk", modelLoadoutGroups: [{number: 4, modelLoadoutSlots: []}]}
            ]
        }] 
    }], 
    ["Solar Pattern Sub-Cohort", {
        formationType: "Iconic", points: 335, expandedPoints: 385,
        iconicDetachments: [{
            iconicDetachmentRequirementType: "Standard", slot: "HQ", detachmentName: "Legate Commander Detachment",
            modelGroups: [
                {modelName: "Auxilia Commander", modelLoadoutGroups: [{number: 1, modelLoadoutSlots: []}]},
                {modelName: "Dracosan", modelLoadoutGroups: [{number: 1, modelLoadoutSlots: [
                    {name: "Primary", loadout: "Hull Mounted demolisher cannon"},
                    {name: "Pintle", loadout: "None"},
                ]}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Support", detachmentName: "Auxilia Veletaris Storm Section",
            modelGroups: [
                {modelName: "Veletarii", modelLoadoutGroups: [{number: 8, modelLoadoutSlots: []}]},
                {modelName: "Dracosan", modelLoadoutGroups: [{number: 2, modelLoadoutSlots: [
                    {name: "Primary", loadout: "Hull Mounted twin lascannon"},
                    {name: "Pintle", loadout: "Multi-laser"},
                ]}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Support", detachmentName: "Auxilia Veletaris Storm Section",
            modelGroups: [
                {modelName: "Veletarii", modelLoadoutGroups: [{number: 8, modelLoadoutSlots: []}]},
                {modelName: "Dracosan", modelLoadoutGroups: [{number: 2, modelLoadoutSlots: [
                    {name: "Primary", loadout: "Hull Mounted twin lascannon"},
                    {name: "Pintle", loadout: "Multi-laser"},
                ]}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "HQ", detachmentName: "Legate Commander Detachment",
            modelGroups: [
                {modelName: "Auxilia Commander", modelLoadoutGroups: [{number: 1, modelLoadoutSlots: []}]},
                {modelName: "Dracosan", modelLoadoutGroups: [{number: 1, modelLoadoutSlots: [
                    {name: "Primary", loadout: "Hull Mounted demolisher cannon"},
                    {name: "Pintle", loadout: "None"},
                ]}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Support", detachmentName: "Auxilia Ogryn Charonite Section",
            modelGroups: [
                {modelName: "Charonite Ogryns", modelLoadoutGroups: [{number: 8, modelLoadoutSlots: []}]},
                {modelName: "Dracosan", modelLoadoutGroups: [{number: 2, modelLoadoutSlots: [
                    {name: "Primary", loadout: "Hull Mounted twin lascannon"},
                    {name: "Pintle", loadout: "Multi-laser"},
                ]}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Support", detachmentName: "Auxilia Veletaris Storm Section",
            modelGroups: [
                {modelName: "Veletarii", modelLoadoutGroups: [{number: 8, modelLoadoutSlots: []}]},
                {modelName: "Dracosan", modelLoadoutGroups: [{number: 2, modelLoadoutSlots: [
                    {name: "Primary", loadout: "Hull Mounted twin lascannon"},
                    {name: "Pintle", loadout: "Multi-laser"},
                ]}]}
            ]
        }]
    }], 
    ["Ultima Pattern Sub-Cohort", {
        formationType: "Iconic", points: 300, expandedPoints: 300,
        iconicDetachments: [{
            iconicDetachmentRequirementType: "Standard", slot: "HQ", detachmentName: "Legate Commander Detachment",
            modelGroups: [{modelName: "Auxilia Commander", modelLoadoutGroups: [{number: 1, modelLoadoutSlots: []}]}],
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "HQ", detachmentName: "Auxilia Tactical Command Detachment",
            modelGroups: [{modelName: "Tactical Command", modelLoadoutGroups: [{number: 1, modelLoadoutSlots: []}]}],
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Core", detachmentName: "Auxilia Lasrifle Tercio",
            modelGroups: [
                {modelName: "Auxiliaries", modelLoadoutGroups: [{number: 12, modelLoadoutSlots: []}]},
                {modelName: "Auxiliaries with Flamers", modelLoadoutGroups: [{number: 4, modelLoadoutSlots: []}]},
            ]
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Core", detachmentName: "Auxilia Lasrifle Tercio",
            modelGroups: [
                {modelName: "Auxiliaries", modelLoadoutGroups: [{number: 12, modelLoadoutSlots: []}]},
                {modelName: "Auxiliaries with Flamers", modelLoadoutGroups: [{number: 4, modelLoadoutSlots: []}]},
            ]
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Core", detachmentName: "Auxilia Lasrifle Tercio",
            modelGroups: [
                {modelName: "Auxiliaries", modelLoadoutGroups: [{number: 12, modelLoadoutSlots: []}]},
                {modelName: "Auxiliaries with Flamers", modelLoadoutGroups: [{number: 4, modelLoadoutSlots: []}]},
            ]
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "HQ", detachmentName: "Auxilia Tactical Command Detachment",
            modelGroups: [{modelName: "Tactical Command", modelLoadoutGroups: [{number: 1, modelLoadoutSlots: []}]}],
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Bastion", detachmentName: "Auxilia Rapier Battery",
            modelGroups: [
                {modelName: "Auxilia Rapier", modelLoadoutGroups: [{number: 8, modelLoadoutSlots: [
                    {name: "Primary", loadout: "Laser destroyer array"}
                ]}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Bastion", detachmentName: "Auxilia Rapier Battery",
            modelGroups: [
                {modelName: "Auxilia Rapier", modelLoadoutGroups: [{number: 8, modelLoadoutSlots: [
                    {name: "Primary", loadout: "Laser destroyer array"}
                ]}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Bastion", detachmentName: "Auxilia Rapier Battery",
            modelGroups: [
                {modelName: "Auxilia Rapier", modelLoadoutGroups: [{number: 8, modelLoadoutSlots: [
                    {name: "Primary", loadout: "Laser destroyer array"}
                ]}]}
            ]
        }]
    }],
    ["Mechanised Pattern Sub-Cohort", {
        formationType: "Iconic", points: 410, expandedPoints: 410,
        iconicDetachments: [{
            iconicDetachmentRequirementType: "Standard", slot: "Heavy Armour", detachmentName: "Auxilia Stormblade Squadron",
            extras: ["Tank Commander"],
            modelGroups: [
                {modelName: "Stormblade", modelLoadoutGroups: [{number: 1, modelLoadoutSlots: [
                    {name: "Pintle Mounted", loadout: "None"}, 
                ]}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Battle Tank", detachmentName: "Leman Russ Strike Squadron",
            extras: ["Tank Commander"],
            modelGroups: [
                {modelName: "Leman Russ Tank", modelLoadoutGroups: [{number: 4, modelLoadoutSlots: [
                    {name: "Hull Mounted", loadout: "Heavy bolter"},
                    {name: "Pintle Mounted", loadout: "Heavy stubber"},
                ]}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Battle Tank", detachmentName: "Leman Russ Demolisher Squadron",
            extras: ["Tank Commander"],
            modelGroups: [
                {modelName: "Leman Russ Demolisher", modelLoadoutGroups: [{number: 4, modelLoadoutSlots: [
                    {name: "Hull Mounted", loadout: "Lascannon"},
                    {name: "Pintle Mounted", loadout: "None"},
                ]}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Battle Tank", detachmentName: "Leman Russ Executioner Squadron",
            extras: ["Tank Commander"],
            modelGroups: [
                {modelName: "Leman Russ Executioner", modelLoadoutGroups: [{number: 4, modelLoadoutSlots: [
                    {name: "Hull Mounted", loadout: "Lascannon"},
                    {name: "Pintle Mounted", loadout: "None"},
                ]}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Battle Tank", detachmentName: "Leman Russ Exterminator Squadron",
            extras: ["Tank Commander"],
            modelGroups: [
                {modelName: "Leman Russ Exterminator", modelLoadoutGroups: [{number: 4, modelLoadoutSlots: [
                    {name: "Hull Mounted", loadout: "Heavy bolter"},
                    {name: "Pintle Mounted", loadout: "Heavy stubber"},
                ]}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Battle Tank", detachmentName: "Auxilia Valdor Squadron",
            modelGroups: [
                {modelName: "Valdor", modelLoadoutGroups: [{number: 2, modelLoadoutSlots: [
                    {name: "Sponson Mounted", loadout: "Malcador lascannon sponson"},
                    {name: "Pintle Mounted", loadout: "None"},
                ]}]}
            ]
        }]
    }],
    ["Cthonian Headhunters Sub-Cohort", {
        formationType: "Iconic", points: 270, expandedPoints: 330, allegiance: "Traitor",
        iconicDetachments: [{
            iconicDetachmentRequirementType: "Standard", slot: "HQ", detachmentName: "Auxilia Tactical Command Detachment",
            modelGroups: [{modelName: "Tactical Command", modelLoadoutGroups: [{number: 1, modelLoadoutSlots: []}]}],
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Core", detachmentName: "Auxilia Lasrifle Tercio",
            modelGroups: [
                {modelName: "Auxiliaries", modelLoadoutGroups: [{number: 8, modelLoadoutSlots: []}]},
                {modelName: "Auxiliaries with Flamers", modelLoadoutGroups: [{number: 2, modelLoadoutSlots: []}]},
            ]
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Support", detachmentName: "Auxilia Veletaris Storm Section",
            modelGroups: [
                {modelName: "Veletarii", modelLoadoutGroups: [{number: 8, modelLoadoutSlots: []}]},
                {modelName: "Dracosan", modelLoadoutGroups: [{number: 2, modelLoadoutSlots: [
                    {name: "Primary", loadout: "Hull Mounted twin lascannon"},
                    {name: "Pintle", loadout: "Multi-laser"},
                ]}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Vanguard", detachmentName: "Auxilia Aethon Heavy Sentinel Patrol",
            modelGroups: [
                {modelName: "Aethon Heavy Sentinel", modelLoadoutGroups: [{number: 4, modelLoadoutSlots: []}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "HQ", detachmentName: "Auxilia Tactical Command Detachment",
            modelGroups: [{modelName: "Tactical Command", modelLoadoutGroups: [{number: 1, modelLoadoutSlots: []}]}],
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Core", detachmentName: "Auxilia Lasrifle Tercio",
            modelGroups: [
                {modelName: "Auxiliaries", modelLoadoutGroups: [{number: 8, modelLoadoutSlots: []}]},
                {modelName: "Auxiliaries with Flamers", modelLoadoutGroups: [{number: 2, modelLoadoutSlots: []}]},
            ]
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Support", detachmentName: "Auxilia Veletaris Storm Section",
            modelGroups: [
                {modelName: "Veletarii", modelLoadoutGroups: [{number: 8, modelLoadoutSlots: []}]},
                {modelName: "Dracosan", modelLoadoutGroups: [{number: 2, modelLoadoutSlots: [
                    {name: "Primary", loadout: "Hull Mounted twin lascannon"},
                    {name: "Pintle", loadout: "Multi-laser"},
                ]}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Battle Tank", detachmentName: "Auxilia Malcador Infernus Squadron",
            modelGroups: [
                {modelName: "Malcador Infernus", modelLoadoutGroups: [{number: 2, modelLoadoutSlots: [
                    {name: "Sponson Mounted", loadout: "Malcador autocannon sponsons"},
                    {name: "Pintle Mounted", loadout: "None"},
                ]}]}
            ]
        }]
    }],
    ["Theta-Garmon Deathless Sub-Cohort", {
        formationType: "Iconic", points: 385, expandedPoints: 360, allegiance: "Loyalist",
        iconicDetachments: [{
            iconicDetachmentRequirementType: "Standard", slot: "HQ", detachmentName: "Auxilia Tactical Command Detachment",
            modelGroups: [{modelName: "Tactical Command", modelLoadoutGroups: [{number: 1, modelLoadoutSlots: []}]}],
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Core", detachmentName: "Auxilia Lasrifle Tercio",
            modelGroups: [
                {modelName: "Auxiliaries", modelLoadoutGroups: [{number: 12, modelLoadoutSlots: []}]},
                {modelName: "Auxiliaries with Flamers", modelLoadoutGroups: [{number: 4, modelLoadoutSlots: []}]},
            ]
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Core", detachmentName: "Auxilia Lasrifle Tercio",
            modelGroups: [
                {modelName: "Auxiliaries", modelLoadoutGroups: [{number: 12, modelLoadoutSlots: []}]},
                {modelName: "Auxiliaries with Flamers", modelLoadoutGroups: [{number: 4, modelLoadoutSlots: []}]},
            ]
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Core", detachmentName: "Auxilia Lasrifle Tercio",
            modelGroups: [
                {modelName: "Auxiliaries", modelLoadoutGroups: [{number: 12, modelLoadoutSlots: []}]},
                {modelName: "Auxiliaries with Flamers", modelLoadoutGroups: [{number: 4, modelLoadoutSlots: []}]},
            ]
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Bastion", detachmentName: "Auxilia Rapier Battery",
            modelGroups: [
                {modelName: "Auxilia Rapier", modelLoadoutGroups: [{number: 8, modelLoadoutSlots: [
                    {name: "Primary", loadout: "Laser destroyer array"}
                ]}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "HQ", detachmentName: "Legate Commander Detachment",
            modelGroups: [{modelName: "Auxilia Commander", modelLoadoutGroups: [{number: 1, modelLoadoutSlots: []}]}],
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Bastion", detachmentName: "Auxilia Rapier Battery",
            modelGroups: [
                {modelName: "Auxilia Rapier", modelLoadoutGroups: [{number: 8, modelLoadoutSlots: [
                    {name: "Primary", loadout: "Laser destroyer array"}
                ]}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Artillery", detachmentName: "Auxilia Basilisk Battery",
            modelGroups: [
                {modelName: "Basilisk", modelLoadoutGroups: [{number: 4, modelLoadoutSlots: []}]}
            ]
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Artillery", detachmentName: "Auxilia Basilisk Battery",
            modelGroups: [
                {modelName: "Basilisk", modelLoadoutGroups: [{number: 4, modelLoadoutSlots: []}]}
            ]
        }]
    }],
])

export function getShapeForAuxiliaFormationName(formationName: AuxiliaFormationName | ""): FormationShape {
    if(formationName == "") return EmptyNormalFormationShape;
    return formationShapes.get(formationName) ?? EmptyNormalFormationShape;
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
        "Leman Russ Vanquisher Squadron",
        "Malcador Tank Squadron",
        "Malcador Vanquisher Squadron",
        "Malcador Annihilator Squadron"
    ]],
    ["Core", [ 
        "Auxilia Lasrifle Tercio"
    ]],  
    ["Extra Tech-Priest Auxilia", ["Tech-Priest Auxilia"]],
    ["Heavy Armour", [
        "Auxilia Baneblade Squadron",
        "Auxilia Hellhammer Squadron",
        "Auxilia Shadowsword Squadron",
        "Auxilia Stormblade Squadron",
        "Auxilia Stormhammer Squadron",
        "Auxilia Stormsword Squadron",
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
        "Leman Russ Vanquisher Squadron",
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

const dracosanModelLoadoutSlots = [
    {name: "Primary", possibleModelLoadouts: [
        {loadout: "Hull Mounted twin lascannon", points: 0},
        {loadout: "Hull Mounted demolisher cannon", points: 5},
    ]},
    {name: "Pintle", possibleModelLoadouts: [
        {loadout: "None", points: 0},
        {loadout: "Multi-laser", points: 5},
    ]},
];

const detachmentConfigurationForDetachmentName: Map<MechanicumDetachmentName|AuxiliaDetachmentName, DetachmentConfiguration> = new Map([
    ["Legate Commander Detachment", {modelGroupShapes: [
        {modelName: "Auxilia Commander", modelLoadoutSlots: [], possibleModelGroupQuantities: [{num: 1, points: 16}]},
        {modelName: "Dracosan", dedicatedTransport: true, formationNames: ["Solar Auxilia Mechanised Infantry Sub-Cohort"],
            modelLoadoutSlots: dracosanModelLoadoutSlots, possibleModelGroupQuantities: [
            {num: 1, points: 42},
        ]}
    ]}],
    ["Auxilia Tactical Command Detachment", {modelGroupShapes: [
        {modelName: "Tactical Command", modelLoadoutSlots: [], possibleModelGroupQuantities: [{num: 1, points: 10}]},
        {modelName: "Dracosan", dedicatedTransport: true, formationNames: ["Solar Auxilia Mechanised Infantry Sub-Cohort"],
            modelLoadoutSlots: dracosanModelLoadoutSlots, possibleModelGroupQuantities: [
            {num: 1, points: 42},
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
            {num: 0, points: 0}, {num: 2, points: 30}, {num: 4, points: 30*2}, {num: 6, points: 30*3},
            {num: 8, points: 30*4}, {num: 10, points: 30*5}, {num: 12, points: 30*6}
        ]},
        {modelName: "Dracosan", dedicatedTransport: true, formationNames: ["Solar Auxilia Mechanised Infantry Sub-Cohort"],
            modelLoadoutSlots: dracosanModelLoadoutSlots, possibleModelGroupQuantities: [
            {num: 1, points: 42}, {num: 2, points: 42*2}, {num: 3, points: 42*3}, {num: 4, points: 42*4}, 
            {num: 5, points: 42*5}, {num: 6, points: 42*6}, {num: 7, points: 42*7}, {num: 8, points: 42*8}, 
        ]}
    ]}],
    ["Auxilia Ogryn Charonite Section", {maxModels: 8, modelGroupShapes: [
        {modelName: "Charonite Ogryns", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 70}, {num: 4+2, points: 70+30}, {num: 4+4, points: 70+60}
        ]},
        {modelName: "Dracosan", dedicatedTransport: true, formationNames: ["Solar Auxilia Mechanised Infantry Sub-Cohort"],
            modelLoadoutSlots: dracosanModelLoadoutSlots, possibleModelGroupQuantities: [
            {num: 1, points: 42}, {num: 2, points: 42*2}, {num: 3, points: 42*3}, {num: 4, points: 42*4}, 
        ]}
    ]}],
    ["Auxilia Veletaris Storm Section", {maxModels: 8, modelGroupShapes: [
        {modelName: "Veletarii", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 4, points: 40}, {num: 4+2, points: 40+10}, {num: 4+4, points: 40+20}
        ]},
        {modelName: "Dracosan", dedicatedTransport: true, formationNames: ["Solar Auxilia Mechanised Infantry Sub-Cohort"],
            modelLoadoutSlots: dracosanModelLoadoutSlots, possibleModelGroupQuantities: [
            {num: 1, points: 42}, {num: 2, points: 42*2}, {num: 3, points: 42*3}, {num: 4, points: 42*4}, 
        ]}
    ]}],
    ["Auxilia Rapier Battery", {minModels: 4, maxModels: 12, modelGroupShapes: [
        {modelName: "Auxilia Rapier", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts:[
                {loadout: "Laser destroyer array", points: 0},
                {loadout: "Quad launcher", points: 0},
                {loadout: "Mole mortar", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 4, points: 60}, {num: 4+4, points: 60+50}, {num: 4+8, points: 60+100}
        ]},
    ]}],
    ["Auxilia Tarantula Battery", {minModels: 3, maxModels: 9, modelGroupShapes: [
        {modelName: "Auxilia Tarantula", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts:[
                {loadout: "Tarantula lascannon battery", points: 0},
                {loadout: "Hyperios air-defence missile launcher", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 3, points: 30}, {num: 3+3, points: 30+25}, {num: 3+6, points: 30+50}
        ]},
    ]}],
    ["Auxilia Aethon Heavy Sentinel Patrol", {modelGroupShapes: [
        {modelName: "Aethon Heavy Sentinel", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 35}, {num: 2+2, points: 35+25}, {num: 2+4, points: 35+45}, {num: 2+6, points: 35+65}
        ]},
    ]}],
    ["Leman Russ Strike Squadron", {minModels: 4, maxModels: 10, modelGroupShapes: [
        {modelName: "Leman Russ Tank", modelLoadoutSlots: [
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", points: 0}, {loadout: "Lascannon", points: 0}, 
            ]},
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, {loadout: "Heavy stubber", points: 5}, 
            ]},
        ], possibleModelGroupQuantities: [
            {num: 4, points: 160}, {num: 4+2, points: 160+70}, {num: 4+4, points: 160+140},
            {num: 4+6, points: 160+210}, 
        ]}
        ], extras: [{name: "Tank Commander", points: 10, slotRequirementType: "Required", formationNames: [
            "Solar Auxilia Armoured Company",
            "Solar Auxilia Leman Russ Spearhead"
        ]}]
    }],
    ["Leman Russ Vanquisher Squadron", {minModels: 4, maxModels: 10, modelGroupShapes: [
        {modelName: "Leman Russ Vanquisher", modelLoadoutSlots: [
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", points: 0}, {loadout: "Lascannon", points: 0}, 
            ]},
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, {loadout: "Heavy stubber", points: 5}, 
            ]},
        ], possibleModelGroupQuantities: [
            {num: 4, points: 175}, {num: 4+2, points: 175+85}, {num: 4+4, points: 175+170},
            {num: 4+6, points: 175+230}, 
        ]}
        ], extras: [{name: "Tank Commander", points: 10, slotRequirementType: "Required", formationNames: [
            "Solar Auxilia Armoured Company",
            "Solar Auxilia Leman Russ Spearhead"
        ]}]
    }],
    ["Malcador Tank Squadron", {minModels: 2, maxModels: 6, modelGroupShapes: [
        {modelName: "Malcador Tank", modelLoadoutSlots: [
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", points: 0}, {loadout: "Lascannon", points: 0}, 
                {loadout: "Autocannon", points: 0}, {loadout: "Demolisher cannon", points: 0}, 
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Malcador heavy bolters", points: 0}, {loadout: "Malcador lascannon", points: 0}, {loadout: "Malcador autocannon", points: 0}, 
            ]},
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, {loadout: "Heavy stubber", points: 5}, 
            ]},
        ], possibleModelGroupQuantities: [
            {num: 2, points: 150}, {num: 2+1, points: 150+70}, {num: 2+2, points: 150+140},
            {num: 2+1+2, points: 150+70+140}, {num: 2+4, points: 150+260}, 
        ]}
        ], extras: [{name: "Tank Commander", points: 10, slotRequirementType: "Required", formationNames: [
            "Solar Auxilia Armoured Company",
        ]}]
    }],
    ["Malcador Vanquisher Squadron", {minModels: 2, maxModels: 6, modelGroupShapes: [
        {modelName: "Malcador Vanquisher", modelLoadoutSlots: [
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", points: 0}, {loadout: "Lascannon", points: 0}, 
                {loadout: "Autocannon", points: 0}, {loadout: "Demolisher cannon", points: 0}, 
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Malcador heavy bolters", points: 0}, {loadout: "Malcador lascannon", points: 0}, {loadout: "Malcador autocannon", points: 0}, 
            ]},
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, {loadout: "Heavy stubber", points: 5}, 
            ]},
        ], possibleModelGroupQuantities: [
            {num: 2, points: 160}, {num: 2+1, points: 160+75}, {num: 2+2, points: 160+150},
            {num: 2+1+2, points: 160+75+150}, {num: 2+4, points: 160+280}, 
        ]}
        ], extras: [{name: "Tank Commander", points: 10, slotRequirementType: "Required", formationNames: [
            "Solar Auxilia Armoured Company",
        ]}]
    }],
    ["Malcador Annihilator Squadron", {minModels: 2, maxModels: 6, modelGroupShapes: [
        {modelName: "Malcador Annihilator", modelLoadoutSlots: [
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", points: 0}, {loadout: "Lascannon", points: 0}, 
                {loadout: "Autocannon", points: 0}, {loadout: "Demolisher cannon", points: 0}, 
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Malcador heavy bolters", points: 0}, {loadout: "Malcador lascannon", points: 0}, {loadout: "Malcador autocannon", points: 0}, 
            ]},
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, {loadout: "Heavy stubber", points: 5}, 
            ]},
        ], possibleModelGroupQuantities: [
            {num: 2, points: 150}, {num: 2+1, points: 150+70}, {num: 2+2, points: 150+140},
            {num: 2+1+2, points: 150+70+140}, {num: 2+4, points: 150+260}, 
        ]}
        ], extras: [{name: "Tank Commander", points: 10, slotRequirementType: "Required", formationNames: [
            "Solar Auxilia Armoured Company",
        ]}]
    }],
    ["Auxilia Baneblade Squadron", {minModels: 1, maxModels: 3, modelGroupShapes: [
        {modelName: "Auxilia Baneblade", modelLoadoutSlots: [
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Super-heavy heavy bolters", points: 0}, {loadout: "Super-heavy heavy flamer", points: 0}, {loadout: "Super-heavy autocannon", points: 0}, 
            ]},
        ], possibleModelGroupQuantities: [
            {num: 1, points: 100}, {num: 2, points: 100+90}, {num: 3, points: 100+180},
        ]}
        ], extras: [{name: "Tank Commander", points: 10, slotRequirementType: "Required", formationNames: [
            "Solar Auxilia Armoured Company",
        ]}]
    }],
    ["Auxilia Hellhammer Squadron", {minModels: 1, maxModels: 3, modelGroupShapes: [
        {modelName: "Auxilia Hellhammer", modelLoadoutSlots: [
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Super-heavy heavy bolters", points: 0}, {loadout: "Super-heavy heavy flamer", points: 0}, {loadout: "Super-heavy autocannon", points: 0}, 
            ]},
        ], possibleModelGroupQuantities: [
            {num: 1, points: 100}, {num: 2, points: 100+90}, {num: 3, points: 100+180},
        ]}
        ], extras: [{name: "Tank Commander", points: 10, slotRequirementType: "Required", formationNames: [
            "Solar Auxilia Armoured Company",
        ]}]
    }],
    ["Auxilia Thunderbolt Squadron", {minModels: 1, maxModels: 4, modelGroupShapes: [
        {modelName: "Thunderbolt Fighter", modelLoadoutSlots: [
            {name: "Cannon", possibleModelLoadouts: [
                {loadout: "Quad autocannon", points: 0}, 
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
                {loadout: "Avenger autocannon", points: 0},
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
            {num: 0, points: 0}, {num: 1, points: 85}, {num: 2, points: 85+85}, {num: 1+2, points: 85+160},
            {num: 1+3, points: 85+220},
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
        {modelName: "Dracosan", modelLoadoutSlots: dracosanModelLoadoutSlots, possibleModelGroupQuantities: [
            //p128 - max transport size is 8
            {num: 1, points: 42}, {num: 2, points: 42*2}, {num: 3, points: 42*3}, {num: 4, points: 42*4}, 
            {num: 5, points: 42*5}, {num: 6, points: 42*6}, {num: 7, points: 42*7}, {num: 8, points: 42*8}, 
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
            {num: 2, points: 40}, {num: 4, points: 40+35}, {num: 6, points: 40+70}
        ]},
    ]}],
    ["Auxilia Malcador Infernus Squadron", {modelGroupShapes: [
        {modelName: "Malcador Infernus", modelLoadoutSlots: [
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Malcador lascannon sponsons", points: 0}, {loadout: "Malcador autocannon sponsons", points: 0}, 
            ]},
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, {loadout: "Heavy stubber", points: 5}, 
            ]},
        ], possibleModelGroupQuantities: [
            {num: 1, points: 60}, {num: 2, points: 60+55}, {num: 3, points: 60+110},
        ]}
        ], extras: [{name: "Tank Commander", points: 10, slotRequirementType: "Required", formationNames: [
            "Solar Auxilia Armoured Company",
        ]}]
    }],
    ["Auxilia Valdor Squadron", {modelGroupShapes: [
        {modelName: "Valdor", modelLoadoutSlots: [
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Malcador lascannon sponson", points: 0}, {loadout: "Malcador autocannon sponson", points: 0}, 
            ]},
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, {loadout: "Heavy stubber", points: 5}, 
            ]},
        ], possibleModelGroupQuantities: [
            {num: 1, points: 60}, {num: 2, points: 60+55}, {num: 3, points: 60+110},
        ]}
        ], extras: [{name: "Tank Commander", points: 10, slotRequirementType: "Required", formationNames: [
            "Solar Auxilia Armoured Company",
        ]}]
    }],
    ["Auxilia Stormhammer Squadron", {modelGroupShapes: [
        {modelName: "Stormhammer", modelLoadoutSlots: [
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Stormhammer multi-laser sponsons", points: 0}, {loadout: "Stormhammer lascannon sponsons", points: 5}, 
            ]},
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, {loadout: "Multi-laser", points: 5}, 
            ]},
        ], possibleModelGroupQuantities: [
            {num: 1, points: 100}, {num: 2, points: 100+90}, {num: 3, points: 100+180},
        ]}
        ], extras: [{name: "Tank Commander", points: 10, slotRequirementType: "Required", formationNames: [
            "Solar Auxilia Armoured Company",
        ]}]
    }],
    ["Auxilia Medusa Battery", {modelGroupShapes: [
        {modelName: "Medusa", modelLoadoutSlots: [],
            possibleModelGroupQuantities: [
                {num: 4, points: 120}, {num: 8, points: 120+110}, {num: 12, points: 120+220},
            ]
        }
    ]}],
    ["Auxilia Basilisk Battery", {modelGroupShapes: [
        {modelName: "Basilisk", modelLoadoutSlots: [],
            possibleModelGroupQuantities: [
                {num: 4, points: 130}, {num: 8, points: 130+120}, {num: 12, points: 130+240},
            ]
        }
    ]}],
    //TDOT
    ["Auxilia Shadowsword Squadron", {minModels: 1, maxModels: 4, modelGroupShapes: [
        {modelName: "Shadowsword", modelLoadoutSlots: [
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, {loadout: "Heavy stubber", points: 5}, 
            ]},
        ], possibleModelGroupQuantities: [
            {num: 1, points: 120}, {num: 2, points: 120+110}, {num: 3, points: 120+220},
        ]}
        ], extras: [{name: "Tank Commander", points: 10, slotRequirementType: "Required", formationNames: [
            "Solar Auxilia Armoured Company",
            "Solar Auxilia Titan Hunter Company"
        ]}]
    }],
    ["Auxilia Stormsword Squadron", {minModels: 1, maxModels: 6, modelGroupShapes: [
        {modelName: "Stormsword", modelLoadoutSlots: [
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, {loadout: "Heavy stubber", points: 5}, 
            ]},
        ], possibleModelGroupQuantities: [
            {num: 1, points: 100}, {num: 2, points: 100+90}, {num: 3, points: 100+180},
        ]}
        ], extras: [{name: "Tank Commander", points: 10, slotRequirementType: "Required", formationNames: [
            "Solar Auxilia Armoured Company",
        ]}]
    }],
    ["Auxilia Stormblade Squadron", {minModels: 1, maxModels: 6, modelGroupShapes: [
        {modelName: "Stormblade", modelLoadoutSlots: [
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, {loadout: "Heavy stubber", points: 5}, 
            ]},
        ], possibleModelGroupQuantities: [
            {num: 1, points: 110}, {num: 2, points: 110+100}, {num: 3, points: 110+200},
        ]}
        ], extras: [{name: "Tank Commander", points: 10, slotRequirementType: "Required", formationNames: [
            "Solar Auxilia Armoured Company",
        ]}]
    }],
    ["Leman Russ Executioner Squadron", {minModels: 4, maxModels: 10, modelGroupShapes: [
        {modelName: "Leman Russ Executioner", modelLoadoutSlots: [
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", points: 0}, {loadout: "Lascannon", points: 0}, 
            ]},
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, {loadout: "Heavy stubber", points: 5}, 
            ]},
        ], possibleModelGroupQuantities: [
            {num: 4, points: 160}, {num: 4+2, points: 160+70}, {num: 4+4, points: 160+140},
            {num: 4+6, points: 160+210}, 
        ]}
        ], extras: [{name: "Tank Commander", points: 10, slotRequirementType: "Required", formationNames: [
            "Solar Auxilia Armoured Company",
            "Solar Auxilia Leman Russ Spearhead"
        ]}]
    }],
    ["Leman Russ Demolisher Squadron", {minModels: 4, maxModels: 10, modelGroupShapes: [
        {modelName: "Leman Russ Demolisher", modelLoadoutSlots: [
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", points: 0}, {loadout: "Lascannon", points: 0}, 
            ]},
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, {loadout: "Heavy stubber", points: 5}, 
            ]},
        ], possibleModelGroupQuantities: [
            {num: 4, points: 165}, {num: 4+2, points: 165+75}, {num: 4+4, points: 165+150},
            {num: 4+6, points: 165+225}, 
        ]}
        ], extras: [{name: "Tank Commander", points: 10, slotRequirementType: "Required", formationNames: [
            "Solar Auxilia Armoured Company",
            "Solar Auxilia Leman Russ Spearhead"
        ]}]
    }],
    ["Leman Russ Annihilator Squadron", {minModels: 4, maxModels: 10, modelGroupShapes: [
        {modelName: "Leman Russ Annihilator", modelLoadoutSlots: [
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", points: 0}, {loadout: "Lascannon", points: 0}, 
            ]},
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, {loadout: "Heavy stubber", points: 5}, 
            ]},
        ], possibleModelGroupQuantities: [
            {num: 4, points: 170}, {num: 4+2, points: 170+75}, {num: 4+4, points: 170+150},
            {num: 4+6, points: 170+225}, 
        ]}
        ], extras: [{name: "Tank Commander", points: 10, slotRequirementType: "Required", formationNames: [
            "Solar Auxilia Armoured Company",
            "Solar Auxilia Leman Russ Spearhead"
        ]}]
    }],
    ["Leman Russ Exterminator Squadron", {minModels: 4, maxModels: 10, modelGroupShapes: [
        {modelName: "Leman Russ Exterminator", modelLoadoutSlots: [
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", points: 0}, {loadout: "Lascannon", points: 0}, 
            ]},
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", points: 0}, {loadout: "Heavy stubber", points: 5}, 
            ]},
        ], possibleModelGroupQuantities: [
            {num: 4, points: 160}, {num: 4+2, points: 160+70}, {num: 4+4, points: 160+140},
            {num: 4+6, points: 160+210}, 
        ]}
        ], extras: [{name: "Tank Commander", points: 10, slotRequirementType: "Required", formationNames: [
            "Solar Auxilia Armoured Company",
            "Solar Auxilia Leman Russ Spearhead"
        ]}]
    }],
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
    ["Auxilia Baneblade", {
        detachmentType: "Super-heavy vehicle", scale: 3, move: 7, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 4, morale: 4, wounds: 3, tacticalStrength: 2,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: [
                    "Hull Mounted demolisher cannon",
                    "Hull Mounted heavy bolter turret",
                    "Lascannon sponson turrets",
                    "Baneblade cannon", 
                    "Co-axial autocannon"
                ]},
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Super-heavy heavy bolters", weaponTypes: ["Super-heavy heavy bolter sponsons"]},
                {loadout: "Super-heavy heavy flamer", weaponTypes: ["Super-heavy heavy flamer sponsons"]},
                {loadout: "Super-heavy autocannon", weaponTypes: ["Super-heavy autocannon sponsons"]},
            ]},
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", weaponTypes: []}, 
                {loadout: "Heavy stubber", weaponTypes: ["Pintle Mounted heavy stubber"]}, 
            ]},
        ],
        unitTraits: ["Chain of Command", "Explorer Adaptation"]
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
    ["Auxilia Hellhammer", {
        detachmentType: "Super-heavy vehicle", scale: 3, move: 7, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 4, morale: 4, wounds: 3, tacticalStrength: 2,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: [
                    "Hull Mounted demolisher cannon",
                    "Hull Mounted heavy bolter turret",
                    "Lascannon sponson turrets",
                    "Hellhammer cannon", "Co-axial autocannon"
                ]},
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Super-heavy heavy bolters", weaponTypes: ["Super-heavy heavy bolter sponsons"]},
                {loadout: "Super-heavy heavy flamer", weaponTypes: ["Super-heavy heavy flamer sponsons"]},
                {loadout: "Super-heavy autocannon", weaponTypes: ["Super-heavy autocannon sponsons"]},
            ]},
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", weaponTypes: []}, 
                {loadout: "Heavy stubber", weaponTypes: ["Pintle Mounted heavy stubber"]}, 
            ]},
        ],
        unitTraits: ["Chain of Command", "Explorer Adaptation"]
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
            {saveType: "Armour", save: 5, arc: "Front"},
            {saveType: "Armour", save: 6, arc: "Rear"},
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
                {loadout: "Hull Mounted twin lascannon", unitTraits: ["Large Transport (4)"]},
                {loadout: "Hull Mounted demolisher cannon", unitTraits: ["Large Transport (2)"]},
            ]},
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", weaponTypes: []}, 
                {loadout: "Multi-laser", weaponTypes: ["Pintle Mounted multi-laser"]}, 
            ]},
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
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", weaponTypes: []}, 
                {loadout: "Heavy stubber", weaponTypes: ["Pintle Mounted heavy stubber"]}, 
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
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", weaponTypes: []}, 
                {loadout: "Heavy stubber", weaponTypes: ["Pintle Mounted heavy stubber"]}, 
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
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", weaponTypes: []}, 
                {loadout: "Heavy stubber", weaponTypes: ["Pintle Mounted heavy stubber"]}, 
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
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", weaponTypes: []}, 
                {loadout: "Heavy stubber", weaponTypes: ["Pintle Mounted heavy stubber"]}, 
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
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Leman Russ battlecannon"]},
            ]},
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", weaponTypes: ["Hull Mounted heavy bolter"]}, 
                {loadout: "Lacannon", weaponTypes: ["Hull Mounted lascannon"]}, 
            ]},
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", weaponTypes: []}, 
                {loadout: "Heavy stubber", weaponTypes: ["Pintle Mounted heavy stubber"]}, 
            ]},
        ],
        unitTraits: ["Chain of Command", "Explorer Adaptation"]
    }],
    ["Leman Russ Vanquisher", {
        detachmentType: "Vehicle", scale: 2, move: 8, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 2, morale: 4, wounds: 1, tacticalStrength: 2,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Vanquisher battlecannon"]},
            ]},
            {name: "Hull Mounted", possibleModelLoadouts: [
                {loadout: "Heavy bolter", weaponTypes: ["Hull Mounted heavy bolter"]}, 
                {loadout: "Lacannon", weaponTypes: ["Hull Mounted lascannon"]}, 
            ]},
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", weaponTypes: []}, 
                {loadout: "Heavy stubber", weaponTypes: ["Pintle Mounted heavy stubber"]}, 
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
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 1, morale: 4, wounds: 2, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Malcador inferno gun"]},
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Malcador lascannon sponsons"}, {loadout: "Malcador autocannon sponsons"}, 
            ]},
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", weaponTypes: []}, 
                {loadout: "Heavy stubber", weaponTypes: ["Pintle Mounted heavy stubber"]}, 
            ]},
        ],
        unitTraits: ["Chain of Command", "Explorer Adaptation"]
    }],
    ["Malcador Annihilator", {
        detachmentType: "Vehicle", scale: 2, move: 9, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 2, morale: 4, wounds: 2, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Malcador Vanquisher battlecannon"]},
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
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", weaponTypes: []}, 
                {loadout: "Heavy stubber", weaponTypes: ["Pintle Mounted heavy stubber"]}, 
            ]},
        ],
        unitTraits: ["Chain of Command", "Explorer Adaptation"]
    }],
    ["Malcador Tank", {
        detachmentType: "Vehicle", scale: 2, move: 9, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 2, morale: 4, wounds: 2, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Malcador battlecannon"]},
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
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", weaponTypes: []}, 
                {loadout: "Heavy stubber", weaponTypes: ["Pintle Mounted heavy stubber"]}, 
            ]},
        ],
        unitTraits: ["Chain of Command", "Explorer Adaptation"]
    }],
    ["Malcador Vanquisher", {
        detachmentType: "Vehicle", scale: 2, move: 9, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 2, morale: 4, wounds: 2, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Malcador Vanquisher battlecannon"]},
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
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", weaponTypes: []}, 
                {loadout: "Heavy stubber", weaponTypes: ["Pintle Mounted heavy stubber"]}, 
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
        caf: 2, morale: 4, wounds: 3, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: [
                    "Hull Mounted heavy bolter turret",
                    "Lascannon sponson turrets",
                    "Shadowsword heavy bolter sponsons",
                    "Volcano cannon"
                ]},
            ]},
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", weaponTypes: []}, 
                {loadout: "Heavy stubber", weaponTypes: ["Pintle Mounted heavy stubber"]}, 
            ]},
        ],
        unitTraits: ["Chain of Command", "Explorer Adaptation"]
    }],
    ["Stormblade", {
        detachmentType: "Super-heavy vehicle", scale: 3, move: 6, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 2, morale: 4, wounds: 3, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: [
                    "Hull Mounted heavy bolter turret",
                    "Lascannon sponson turrets",
                    "Plasma blastgun",
                    "Super-heavy heavy bolter sponsons",
                ]},
            ]},
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", weaponTypes: []}, 
                {loadout: "Heavy stubber", weaponTypes: ["Pintle Mounted heavy stubber"]}, 
            ]},
        ],
        unitTraits: ["Chain of Command", "Explorer Adaptation"]
    }],
    ["Stormhammer", {
        detachmentType: "Super-heavy vehicle", scale: 3, move: 6, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 2, morale: 4, wounds: 3, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: [
                    "Stormhammer cannon",
                    "Co-axial multi-laser",
                    "Hull Mounted lascannon",
                ]},
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Stormhammer multi-laser sponsons"}, {loadout: "Stormhammer lascannon sponsons"}, 
            ]},
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", weaponTypes: []}, 
                {loadout: "Multi-laser", weaponTypes: ["Pintle Mounted multi-laser"]}, 
            ]},
        ],
        unitTraits: ["Chain of Command", "Explorer Adaptation"]
    }],
    ["Stormsword", {
        detachmentType: "Super-heavy vehicle", scale: 3, move: 6, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 2, morale: 4, wounds: 3, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: [
                    "Hull Mounted heavy bolter turret",
                    "Lascannon sponson turrets",
                    "Super-heavy heavy bolter sponsons",
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
            {saveType: "Armour", save: 4, arc: "Rear"},
        ],
        caf: 1, morale: 4, wounds: 2, tacticalStrength: 2, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Neutron beam laser"]},
            ]},
            {name: "Sponson Mounted", possibleModelLoadouts: [
                {loadout: "Malcador lascannon sponsons"}, {loadout: "Malcador autocannon sponsons"}, 
            ]},
            {name: "Pintle Mounted", possibleModelLoadouts: [
                {loadout: "None", weaponTypes: []}, 
                {loadout: "Heavy stubber", weaponTypes: ["Pintle Mounted heavy stubber"]}, 
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