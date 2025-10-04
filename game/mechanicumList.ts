import { DarkMechanicumDetachmentName, DarkMechanicumFormationName, DarkMechanicumModelName, MechanicumDetachmentName, MechanicumFormationName, MechanicumModelName } from "./mechanicumTypes.ts";
import { getQuestorisFamiliaDetachmentNamesForSlot, getStatsForStrategicAssetModelType, getStrategicAssetDetachmentConfigurationForDetachmentName, getStrategicAssetDetachmentNamesForSlot } from "./strategicAssetList.ts";
import { StrategicAssetDetachmentName, StrategicAssetModelName } from "./strategicAssetTypes.ts";
import { Allegiance, DetachmentConfiguration, DetachmentName, DetachmentValidationState, EmptyNormalFormationShape, Formation, FormationShape, FormationSlot, Stats } from "./types.ts";

const cortexControllerValidation = (formation: Formation, detachmentIndex: number): DetachmentValidationState => {
    if(detachmentIndex > 2)
        return {valid: true};

    //we want exactly one cortex controller in the required slots
    let totalNumCortexControllers = 0;
    let thisHasTankCommander = false;

    for(let i = 0; i < 3; ++i) {
        const detachment = formation.detachments[i];
        const numCortexControllers = detachment.extras?.filter((e) => e.name == "Cortex Controller" && e.has)?.length ?? 0;
        if(numCortexControllers != 0 && i == detachmentIndex)
            thisHasTankCommander = true;
        totalNumCortexControllers += numCortexControllers;
    }

    if(totalNumCortexControllers > 1 && thisHasTankCommander)
        return {valid: false, error: "Cortex Controller rules broken", data : "should have maximum one optional Cortex Controller"};

    return {valid: true};
}

const mechFormationShapes = new Map<MechanicumFormationName, FormationShape>([
    ["Autokratorii Regiment", {
        customValidation: cortexControllerValidation, formationType: "Normal",
        slotRequirements: [
            {slot: "Battle Tank",           slotRequirementType: "Required"},       //0
            {slot: "Battle Tank",           slotRequirementType: "Required"},       //1
            {slot: "Battle Tank",           slotRequirementType: "Required"},       //2
            {slot: "HQ",                    slotRequirementType: "Optional"},       //3
            {slot: "Support",               slotRequirementType: "Optional"},       //4
            {slot: "Transport",             slotRequirementType: "Optional"},       //5
            {slot: "Support",               slotRequirementType: "Optional"},       //6
            {slot: "Support",               slotRequirementType: "Optional"},       //7
            {slot: "Transport",             slotRequirementType: "Optional" },      //8
            {slot: "Battle Tank",           slotRequirementType: "Optional"},       //9
            {slot: "Titan",                 slotRequirementType: "One Of Group",    //10           
                oneOfGroup: 1, oneOfGroupGroup: 1
            },
            {slot: "Knight",                slotRequirementType: "One Of Group",    //11
                oneOfGroup: 1, oneOfGroupGroup: 2
            },
            {slot: "Knight",                slotRequirementType: "One Of Group",    //12
                oneOfGroup: 1, oneOfGroupGroup: 2
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //13
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 4,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //14
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 4,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //15
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 6,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //16
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 6,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //17
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 7,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //18
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 7,
                displayName: "Tech-Priest",
            }
    ]}],
    ["Legio Cybernetica Cohort", {formationType: "Normal",
        slotRequirements: [
            {slot: "HQ",                    slotRequirementType: "Required"},
            {slot: "Core",                  slotRequirementType: "Required"},
            {slot: "Support Legio Cybernetica Cohort",               
                displayName: "Support",
                slotRequirementType: "Required" 
            },
            {slot: "Support Legio Cybernetica Cohort",               
                displayName: "Support",
                slotRequirementType: "Required" 
            },
            {slot: "HQ",                    slotRequirementType: "Optional"},
            {slot: "HQ",                    slotRequirementType: "Optional"},
            {slot: "Support Legio Cybernetica Cohort",
                displayName: "Support",
                slotRequirementType: "Optional" 
            },
            {slot: "Vanguard Legio Cybernetica Cohort",
                displayName: "Vanguard",
                slotRequirementType: "Optional" 
            },
            {slot: "Core",                  slotRequirementType: "Optional"},
            {slot: "Core",                  slotRequirementType: "Optional"},
            {slot: "Transport",             slotRequirementType: "Optional"},
            {slot: "Transport",             slotRequirementType: "Optional"},
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
            {slot: "Titan",                 slotRequirementType: "Optional"},
        ]
    }], 
    ["Myrmidax Conclave", {formationType: "Normal",
        slotRequirements: [
            {slot: "HQ",                    slotRequirementType: "Required"},
            {slot: "Support Myrmidax Conclave",
                displayName: "Support",
                slotRequirementType: "Required" 
            },
            {slot: "Support Myrmidax Conclave",
                displayName: "Support",
                slotRequirementType: "Required" 
            },
            {slot: "HQ",                    slotRequirementType: "Optional"},
            {slot: "Transport",             slotRequirementType: "Optional" },
            {slot: "Support Myrmidax Conclave",
                displayName: "Support",
                slotRequirementType: "Optional" 
            },
            {slot: "Support Myrmidax Conclave",
                displayName: "Support",
                slotRequirementType: "Optional" 
            },
        ]
    }],
    ["Ordo Reductor Subdivision", {formationType: "Normal",
        slotRequirements: [
            {slot: "HQ",                    slotRequirementType: "Required"},       //0
            {slot: "Support",               slotRequirementType: "Required"},       //1
            {slot: "Bastion",               slotRequirementType: "Required"},       //2
            {slot: "Bastion",               slotRequirementType: "Required"},       //3
            {slot: "HQ",                    slotRequirementType: "Optional"},       //4
            {slot: "Support",               slotRequirementType: "Optional"},       //5
            {slot: "Support",               slotRequirementType: "Optional"},       //6
            {slot: "Bastion",               slotRequirementType: "Optional"},       //7
            {slot: "Battle Tank",           slotRequirementType: "Optional"},       //8
            {slot: "Titan",                 slotRequirementType: "One Of",          //9          
                oneOfGroup: 1
            },
            {slot: "Acastus",               slotRequirementType: "One Of",          //10
                oneOfGroup: 1
            },

            {slot: "Extra Tech-Priest Auxilia",                                     //11
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 1,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //12
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 1,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //13
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 5,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //14
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 5,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //15
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 6,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //16
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 6,
                displayName: "Tech-Priest",
            },
        ]
    }],
    ["Taghma Sub-covenant", {formationType: "Normal",
        slotRequirements: [
            {slot: "HQ",                    slotRequirementType: "Required"},       //0
            {slot: "Adsecularis Tech-Thrall Covenant",                              //1
                displayName: "Tech-Thralls",
                slotRequirementType: "Required"
            },
            {slot: "Adsecularis Tech-Thrall Covenant",                              //2
                displayName: "Tech-Thralls",
                slotRequirementType: "Required"
            },
            {slot: "Support",               slotRequirementType: "Required"},       //3
            {slot: "Support",               slotRequirementType: "Required"},       //4
            {slot: "HQ",                    slotRequirementType: "Optional"},       //5
            {slot: "Core",                  slotRequirementType: "Optional"},       //6
            {slot: "Support",               slotRequirementType: "Optional"},       //7
            {slot: "Bastion",               slotRequirementType: "Optional"},       //8
            {slot: "Vanguard",              slotRequirementType: "Optional"},       //9
            {slot: "Battle Tank",           slotRequirementType: "Optional"},       //10
            {slot: "Transport",             slotRequirementType: "Optional"},       //11
            {slot: "Titan",                 slotRequirementType: "One Of Group",    //12          
                oneOfGroup: 1, oneOfGroupGroup: 1
            },
            {slot: "Knight",                slotRequirementType: "One Of Group",    //13
                oneOfGroup: 1, oneOfGroupGroup: 2
            },
            {slot: "Knight",                slotRequirementType: "One Of Group",    //14
                oneOfGroup: 1, oneOfGroupGroup: 2
            },

            {slot: "Extra Tech-Priest Auxilia",                                     //15
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 3,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //16
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 3,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //17
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 4,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //18
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 4,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //19
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 7,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //20
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 7,
                displayName: "Tech-Priest",
            },
        ]
    }],

    ["Itinerant Cybernetica Cohort", {
        formationType: "Support",
        slotRequirements: [
            {slot: "Support Legio Cybernetica Cohort",               
                displayName: "Support",
                slotRequirementType: "Required One Of Group",
                oneOfGroup: 1, oneOfGroupGroup: 1
            },
            {slot: "Support Legio Cybernetica Cohort",               
                displayName: "Support",
                slotRequirementType: "Required One Of Group",
                oneOfGroup: 1, oneOfGroupGroup: 1
            },
            {slot: "Support Legio Cybernetica Cohort",               
                displayName: "Support",
                slotRequirementType: "Required One Of Group",
                oneOfGroup: 1, oneOfGroupGroup: 1
            },
            {slot: "Vanguard Legio Cybernetica Cohort",
                displayName: "Vanguard ",
                slotRequirementType: "Required One Of Group", 
                oneOfGroup: 1, oneOfGroupGroup: 2
            },
            {slot: "Vanguard Legio Cybernetica Cohort",
                displayName: "Vanguard ",
                slotRequirementType: "Required One Of Group", 
                oneOfGroup: 1, oneOfGroupGroup: 2
            },
            {slot: "Vanguard Legio Cybernetica Cohort",
                displayName: "Vanguard ",
                slotRequirementType: "Required One Of Group", 
                oneOfGroup: 1, oneOfGroupGroup: 2
            },
            {slot: "Support Legio Cybernetica Cohort",               
                displayName: "Support",
                slotRequirementType: "Optional",
            },
            {slot: "Support Legio Cybernetica Cohort",               
                displayName: "Support",
                slotRequirementType: "Optional",
            },
            {slot: "Vanguard Legio Cybernetica Cohort",
                displayName: "Vanguard ",
                slotRequirementType: "Optional", 
            },
            {slot: "Vanguard Legio Cybernetica Cohort",
                displayName: "Vanguard ",
                slotRequirementType: "Optional", 
            },
        ]
    }],
    //iconic
    ["Exsomnis-Tertia Cybernetica Cohort", {
        points: 610, expandedPoints: 800, formationType: "Iconic", 
        iconicDetachments: [{
            iconicDetachmentRequirementType: "Standard", slot: "HQ", detachmentName: "Archmagos Prime on Abeyant",
            modelGroups: [{modelName: "Archmagos on Abeyant", modelLoadoutGroups: [{number: 1, modelLoadoutSlots: []}]}],
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Support", detachmentName: "Domitar Battle-automata Maniple",
            modelGroups: [{modelName: "Domitar", modelLoadoutGroups: [{number: 3, modelLoadoutSlots: []}]}],
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Support", detachmentName: "Castellax Battle-automata Maniple",
            modelGroups: [{modelName: "Castellax", modelLoadoutGroups: [{number: 6, modelLoadoutSlots: []}]}],
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Support", detachmentName: "Castellax Battle-automata Maniple",
            modelGroups: [{modelName: "Castellax", modelLoadoutGroups: [{number: 6, modelLoadoutSlots: []}]}],
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Vanguard", detachmentName: "Vorax Battle-automata Maniple",
            modelGroups: [{modelName: "Vorax", modelLoadoutGroups: [{number: 4, modelLoadoutSlots: []}]}],
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Support", detachmentName: "Tech-Priest Auxilia",
            modelGroups: [{modelName: "Tech-Priest", modelLoadoutGroups: [{number: 1, modelLoadoutSlots: []}]}],
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Support", detachmentName: "Tech-Priest Auxilia",
            modelGroups: [{modelName: "Tech-Priest", modelLoadoutGroups: [{number: 1, modelLoadoutSlots: []}]}],
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Support", detachmentName: "Tech-Priest Auxilia",
            modelGroups: [{modelName: "Tech-Priest", modelLoadoutGroups: [{number: 1, modelLoadoutSlots: []}]}],
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Support", detachmentName: "Castellax Battle-automata Maniple",
            modelGroups: [{modelName: "Castellax", modelLoadoutGroups: [{number: 6, modelLoadoutSlots: []}]}],
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Support", detachmentName: "Castellax Battle-automata Maniple",
            modelGroups: [{modelName: "Castellax", modelLoadoutGroups: [{number: 6, modelLoadoutSlots: []}]}],
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Support", detachmentName: "Domitar Battle-automata Maniple",
            modelGroups: [{modelName: "Domitar", modelLoadoutGroups: [{number: 3, modelLoadoutSlots: []}]}],
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Vanguard", detachmentName: "Vorax Battle-automata Maniple",
            modelGroups: [{modelName: "Vorax", modelLoadoutGroups: [{number: 4, modelLoadoutSlots: []}]}],
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Bastion", detachmentName: "Thanatar Siege-automata Maniple",
            modelGroups: [
                {modelName: "Thanatar", modelLoadoutGroups: [{number: 4, modelLoadoutSlots: [
                    {name: "Primary", loadout: "Plasma mortar"}
                ]}]}
            ],
        }]
    }],
]);

export function getShapeForMechanicumFormationName(formationName: MechanicumFormationName | ""): FormationShape {
    if(formationName == "") return EmptyNormalFormationShape;
    return mechFormationShapes.get(formationName) ?? EmptyNormalFormationShape;
}

const darkMechFormationShapes = new Map<DarkMechanicumFormationName, FormationShape>([
    ["Dark Taghma Sub-covenant", {formationType: "Normal",
        slotRequirements: [
            {slot: "HQ",                    slotRequirementType: "Required"},       //0
            {slot: "Support",               slotRequirementType: "Required"},       //1
            {slot: "Support",               slotRequirementType: "Required"},       //2
            {slot: "Adsecularis Tech-Thrall Covenant",                              //3
                displayName: "Tech-Thralls",
                slotRequirementType: "Required"
            },
            {slot: "Adsecularis Tech-Thrall Covenant",                              //4
                displayName: "Tech-Thralls",
                slotRequirementType: "Required"
            },
            {slot: "HQ",                    slotRequirementType: "Optional"},       //5
            {slot: "Core",                  slotRequirementType: "Optional"},       //6
            {slot: "Support",               slotRequirementType: "Optional"},       //7
            {slot: "Vanguard",              slotRequirementType: "Optional"},       //8
            {slot: "Battle Tank",           slotRequirementType: "Optional"},       //9
            {slot: "Light Armour",          slotRequirementType: "Optional"},       //10
            {slot: "Transport",             slotRequirementType: "Optional"},       //11
            {slot: "Battle Tank",                                                   //12
                slotRequirementType: "One Of", 
                oneOfGroup: 1
            },
            {slot: "Heavy Armour",                                                  //13
                slotRequirementType: "One Of", 
                oneOfGroup: 1
            },
            {slot: "Titan",                 slotRequirementType: "One Of Group",    //14
                oneOfGroup: 2, oneOfGroupGroup: 1
            },
            {slot: "Knight",                slotRequirementType: "One Of Group",    //15
                oneOfGroup: 2, oneOfGroupGroup: 2
            },
            {slot: "Knight",                slotRequirementType: "One Of Group",    //16
                oneOfGroup: 2, oneOfGroupGroup: 2
            },

            {slot: "Extra Tech-Priest Auxilia",                                     //
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 1,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 1,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 2,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 2,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 7,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 7,
                displayName: "Tech-Priest",
            },
        ]
    }],
    ["Purge Protocol Cohort", {formationType: "Normal",
        slotRequirements: [
            {slot: "Heavy Armour",          slotRequirementType: "Required"},
            {slot: "Light Armour",          slotRequirementType: "Required"},
            {slot: "Light Armour",          slotRequirementType: "Required"},
            {slot: "Battle Tank",           slotRequirementType: "Optional"},
            {slot: "Battle Tank",           slotRequirementType: "Optional"},
            {slot: "HQ",                    slotRequirementType: "Optional"},
            {slot: "Heavy Armour",
                slotRequirementType: "One Of Group", 
                oneOfGroup: 1, oneOfGroupGroup: 1
            },
            {slot: "Heavy Armour",
                slotRequirementType: "One Of Group", 
                oneOfGroup: 1, oneOfGroupGroup: 1
            },
            {slot: "Light Armour",
                slotRequirementType: "One Of Group", 
                oneOfGroup: 1, oneOfGroupGroup: 2
            },
            {slot: "Light Armour",
                slotRequirementType: "One Of Group", 
                oneOfGroup: 1, oneOfGroupGroup: 2
            },
            {slot: "Titan",                 slotRequirementType: "Optional"},
        ]
    }],
    ["Swarm Protocol Cohort", {formationType: "Normal",
        slotRequirements: [
            {slot: "Vanguard Swarm Protocol Cohort",              
                slotRequirementType: "Required"},
            {slot: "Vanguard Swarm Protocol Cohort",              
                slotRequirementType: "Required"},
            {slot: "Vanguard Swarm Protocol Cohort",              
                slotRequirementType: "Required"},
            {slot: "Vanguard",              slotRequirementType: "Optional"},
            {slot: "Vanguard",              slotRequirementType: "Optional"},
            {slot: "Vanguard",              slotRequirementType: "Optional"},
            {slot: "Light Armour",          slotRequirementType: "Optional"},
            {slot: "Light Armour",          slotRequirementType: "Optional"},
            {slot: "Knight",                slotRequirementType: "Optional"},
        ]
    }],
    ["Terror Protocol Cohort", {formationType: "Normal",
        slotRequirements: [
            {slot: "HQ",                    slotRequirementType: "Required"},       //0
            {slot: "Vanguard",              slotRequirementType: "Required"},       //1
            {slot: "Errax",                 slotRequirementType: "Required"},       //2
            {slot: "Errax",                 slotRequirementType: "Required"},       //3
            {slot: "Core",                  slotRequirementType: "Optional"},       //4
            {slot: "Core",                  slotRequirementType: "Optional"},       //5
            {slot: "Vanguard",              slotRequirementType: "Optional"},       //6
            {slot: "Vanguard",              slotRequirementType: "Optional"},       //7
            {slot: "Warhound",              slotRequirementType: "One Of",          //8      
                oneOfGroup: 1
            },
            {slot: "Knight",               slotRequirementType: "One Of",          //9
                oneOfGroup: 1
            },
        ]
    }],
    //support
    ["Ironbound Ruinhost", {
        formationType: "Support",
        slotRequirements: [
            {slot: "Ironbound Ruinhost HQ", displayName: "HQ",                      //0
                slotRequirementType: "Required"},
            {slot: "Ironbound Ruinhost Support",               
                displayName: "Support", slotRequirementType: "Required"             //1
            },
            {slot: "Ironbound Ruinhost Support",               
                displayName: "Support", slotRequirementType: "Required"             //2
            },
            {slot: "Ironbound Ruinhost Support",               
                displayName: "Support", slotRequirementType: "Optional"             //3
            },
            {slot: "Ironbound Ruinhost Support",               
                displayName: "Support", slotRequirementType: "Optional"             //4
            },
            {slot: "Ironbound Ruinhost Vanguard",                                   //5
                displayName: "Vanguard", slotRequirementType: "Optional"
            },          
            {slot: "Ironbound Ruinhost Bastion",                                    //6
                displayName: "Bastion", slotRequirementType: "Optional"
            },                     
            {slot: "Ironbound Ruinhost Support",               
                displayName: "Support", slotRequirementType: "One Of Group",        //7
                oneOfGroup: 1, oneOfGroupGroup: 1
            },
            {slot: "Ironbound Ruinhost Support",               
                displayName: "Support", slotRequirementType: "One Of Group",        //8
                oneOfGroup: 1, oneOfGroupGroup: 1
            },
            {slot: "Ironbound Ruinhost Vanguard", slotRequirementType: "One Of Group",//9
                displayName: "Vanguard", oneOfGroup: 1, oneOfGroupGroup: 2
            },
            {slot: "Ironbound Ruinhost Vanguard", slotRequirementType: "One Of Group",//10
                displayName: "Vanguard", oneOfGroup: 1, oneOfGroupGroup: 2
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 1,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 1,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 2,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 2,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 3,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 3,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 4,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 4,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 7,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 7,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 8,
                displayName: "Tech-Priest",
            },
            {slot: "Extra Tech-Priest Auxilia",                                     //
                slotRequirementType: "Extra Tech-Priest Auxilia", linkedSlotIndex: 8,
                displayName: "Tech-Priest",
            },
        ]
    }],
    ["Sibilans Taghma", {
        points: 900, expandedPoints: 700, formationType: "Iconic", 
        iconicDetachments: [{
            iconicDetachmentRequirementType: "Standard", slot: "HQ", detachmentName: "Scintillax 'Cyclops' Noospheric Stalker Network",
            modelGroups: [
                {modelName: "Scintillax", modelLoadoutGroups: [{number: 4, modelLoadoutSlots: [
                    {name: "Primary", loadout: "Storm laser"},
                ]}]}
            ],
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Core", detachmentName: "Adsecularis Tech-Thrall Covenant",
            modelGroups: [{modelName: "Tech-thralls", modelLoadoutGroups: [{number: 10, modelLoadoutSlots: []}]}],
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Core", detachmentName: "Adsecularis Tech-Thrall Covenant",
            modelGroups: [{modelName: "Tech-thralls", modelLoadoutGroups: [{number: 10, modelLoadoutSlots: []}]}],
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Heavy Armour", detachmentName: "Serperos 'Overlord' Heavy Stalker Maniple",
            modelGroups: [
                {modelName: "Serperos", modelLoadoutGroups: [{number: 6, modelLoadoutSlots: [
                    {name: "Carapace", loadout: "Exo-planar bombard"},
                    {name: "Underslung", loadout: "Irradiation engine"},
                ]}]}
            ],
        }, {
            iconicDetachmentRequirementType: "Standard", slot: "Support", detachmentName: "Myrmidon Secutor Host",
            modelGroups: [
                {modelName: "Myrmidon Secutor", modelLoadoutGroups: [{number: 6, modelLoadoutSlots: []}]},
                {modelName: "Triaros", modelLoadoutGroups: [{number: 2, modelLoadoutSlots: []}]}
            ],
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Core", detachmentName: "Adsecularis Tech-Thrall Covenant",
            modelGroups: [{modelName: "Tech-thralls", modelLoadoutGroups: [{number: 10, modelLoadoutSlots: []}]}],
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Support", detachmentName: "Myrmidon Secutor Host",
            modelGroups: [
                {modelName: "Myrmidon Secutor", modelLoadoutGroups: [{number: 6, modelLoadoutSlots: []}]},
                {modelName: "Triaros", modelLoadoutGroups: [{number: 2, modelLoadoutSlots: []}]}
            ],
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Support", detachmentName: "Myrmidon Secutor Host",
            modelGroups: [
                {modelName: "Myrmidon Secutor", modelLoadoutGroups: [{number: 6, modelLoadoutSlots: []}]},
                {modelName: "Triaros", modelLoadoutGroups: [{number: 2, modelLoadoutSlots: []}]}
            ],
        }, {
            iconicDetachmentRequirementType: "Expanded", slot: "Heavy Armour", detachmentName: "Serperos 'Overlord' Heavy Stalker Maniple",
            modelGroups: [
                {modelName: "Serperos", modelLoadoutGroups: [{number: 6, modelLoadoutSlots: [
                    {name: "Carapace", loadout: "Exo-planar bombard"},
                    {name: "Underslung", loadout: "Irradiation engine"},
                ]}]}
            ],
        }]
    }]
]);

export function getShapeForDarkMechanicumFormationName(formationName: DarkMechanicumFormationName | ""): FormationShape {
    if(formationName == "") return EmptyNormalFormationShape;
    return darkMechFormationShapes.get(formationName) ?? EmptyNormalFormationShape;
}

const mechDetachmentNamesForSlot = new Map<FormationSlot, MechanicumDetachmentName[]>([
    ["Adsecularis Tech-Thrall Covenant", ["Adsecularis Tech-Thrall Covenant"]],
    ["Bastion", [
        "Thanatar Siege-automata Maniple"
    ]],
    ["Battle Tank", [
        "Karacnos Assault Tank Squadron",
        "Krios Battle Tank Squadron",
        "Krios Venator Squadron"
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
    ["Support Myrmidax Conclave", [
        "Myrmidon Destructor Host",
        "Myrmidon Secutor Host",
    ]],
    ["Transport", ["Triaros Armoured Conveyor"]],
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
    return mechDetachmentNamesForSlot.get(slot) 
        ?? getStrategicAssetDetachmentNamesForSlot(slot, allegiance) 
        ?? getQuestorisFamiliaDetachmentNamesForSlot(slot, allegiance) 
        ?? [];
}

const darkMechDetachmentNamesForSlot = new Map<FormationSlot, (MechanicumDetachmentName | DarkMechanicumDetachmentName)[]>([
    ["Adsecularis Tech-Thrall Covenant", ["Adsecularis Tech-Thrall Covenant"]],
    ["Bastion", [
    ]],
    ["Battle Tank", [
        //no venators in dark mech
        "Karacnos Assault Tank Squadron",
        "Krios Battle Tank Squadron",
    ]],
    ["Core", [
        "Adsecularis Tech-Thrall Covenant",
        "Errax 'Butcher' Assault Stalker Cohort",
        "Thallax Cohort"
    ]],
    ["Errax", ["Errax 'Butcher' Assault Stalker Cohort"]],
    ["Extra Tech-Priest Auxilia", ["Tech-Priest Auxilia"]],
    ["Heavy Armour", ["Serperos 'Overlord' Heavy Stalker Maniple"]],
    ["HQ", [
        "Archmagos Prime", 
        "Archmagos Prime on Abeyant",
        "Scintillax 'Cyclops' Noospheric Stalker Network",
    ]],
    ["Ironbound Ruinhost Bastion", ["Thanatar Siege-automata Maniple"]],
    ["Ironbound Ruinhost HQ", [
        "Archmagos Prime", 
        "Archmagos Prime on Abeyant",
    ]],
    ["Ironbound Ruinhost Support", [
        "Arlatax Battle-automata Maniple",
        "Castellax Battle-automata Maniple",
        "Domitar Battle-automata Maniple",
        "Tech-Priest Auxilia",
    ]],
    ["Ironbound Ruinhost Vanguard", [
        "Vorax Battle-automata Maniple",
        "Vultarax Battle-automata Squadron"
    ]],
    ["Light Armour", ["Tenebrax 'Archer' Battle Stalker Cohort"]],
    ["Support", [
        "Myrmidon Destructor Host",
        "Myrmidon Secutor Host",
        "Tech-Priest Auxilia",
    ]],
    ["Tech-Priest Auxilia", ["Tech-Priest Auxilia"]],
    ["Transport", ["Triaros Armoured Conveyor"]],
    ["Vanguard", [
        "Harpax 'Swarmer' Scout Host",
        "Ursarax Cohort",
    ]],
    ["Vanguard Swarm Protocol Cohort", [
        "Harpax 'Swarmer' Scout Host",
    ]],
]);

//The dark mechanicum can also call on knights and titans, as well regular mech
export function getDarkMechanicumDetachmentNamesForSlot(slot: FormationSlot, allegiance: Allegiance | ""): (MechanicumDetachmentName|StrategicAssetDetachmentName|DarkMechanicumDetachmentName)[] {
    return darkMechDetachmentNamesForSlot.get(slot) 
        ?? getStrategicAssetDetachmentNamesForSlot(slot, allegiance) 
        ?? getQuestorisFamiliaDetachmentNamesForSlot(slot, allegiance) 
        ?? [];
}

const detachmentConfigurationForDetachmentName: Map<DetachmentName, DetachmentConfiguration> = new Map([
    //mech
    ["Archmagos Prime", {modelGroupShapes: [
        {modelName: "Archmagos Prime", modelLoadoutSlots: [], possibleModelGroupQuantities: [{num: 1, points: 25}]},
        {modelName: "Triaros", dedicatedTransport: true, formationNames: ["Dark Taghma Sub-covenant", "Taghma Sub-covenant"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 22}
        ]},
    ]}],
    ["Archmagos Prime on Abeyant", {modelGroupShapes: [
        {modelName: "Archmagos on Abeyant", modelLoadoutSlots: [], possibleModelGroupQuantities: [{num: 1, points: 45}]},
        {modelName: "Triaros", dedicatedTransport: true, formationNames: ["Dark Taghma Sub-covenant", "Taghma Sub-covenant"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 22}
        ]},
    ]}],
    ["Adsecularis Tech-Thrall Covenant", {modelGroupShapes: [
        {modelName: "Tech-thralls", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 5, points: 40}, {num: 5+5, points: 40+35}, {num: 5+10, points: 40+70}
        ]},
        {modelName: "Triaros", dedicatedTransport: true, formationNames: ["Dark Taghma Sub-covenant", "Taghma Sub-covenant"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 2, points: 22*2}, {num: 3, points: 22*3}, {num: 4, points: 22*4}
        ]},
    ]}],
    ["Thallax Cohort", {modelGroupShapes: [
        {modelName: "Thallax", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 25}, {num: 4, points: 25+20}, {num: 6, points: 25+40}, {num: 8, points: 25+60}
        ]},
        {modelName: "Triaros", dedicatedTransport: true, formationNames: ["Dark Taghma Sub-covenant", "Taghma Sub-covenant"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 22}, {num: 2, points: 22*2}
        ]},
    ]}],
    ["Tech-Priest Auxilia", {modelGroupShapes: [
        {modelName: "Tech-Priest", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 1, points: 15}
        ]},
        {modelName: "Triaros", dedicatedTransport: true, formationNames: ["Dark Taghma Sub-covenant", "Taghma Sub-covenant"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 22}
        ]},
    ]}],
    ["Myrmidon Secutor Host", {modelGroupShapes: [
        {modelName: "Myrmidon Secutor", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 30}, {num: 2+2, points: 30+25}, {num: 2+4, points: 30+50}, {num: 8, points: 30+75}
        ]},
        {modelName: "Triaros", dedicatedTransport: true, formationNames: ["Dark Taghma Sub-covenant", "Taghma Sub-covenant"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 22}, {num: 2, points: 22*2}
        ]},
    ]}],
    ["Myrmidon Destructor Host", {modelGroupShapes: [
        {modelName: "Myrmidon Destructor", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 30}, {num: 2+2, points: 30+25}, {num: 2+4, points: 30+50}, {num: 8, points: 30+75}
        ]},
        {modelName: "Triaros", dedicatedTransport: true, formationNames: ["Dark Taghma Sub-covenant", "Taghma Sub-covenant"], modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 0, points: 0}, {num: 1, points: 15}, {num: 2, points: 15*2}
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
            {num: 2, points: 70}, {num: 2+2, points: 70+65}, {num: 2+4, points: 70+130}, {num: 2+6, points: 70+180},
        ]},
    ]}],
    ["Ursarax Cohort", {modelGroupShapes: [
        {modelName: "Thallax", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 30}, {num: 4, points: 30+25}, {num: 6, points: 30+50}, {num: 8, points: 30+75}
        ]}
    ]}],
    ["Vorax Battle-automata Maniple", {modelGroupShapes: [
        {modelName: "Vorax", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 1, points: 40}, {num: 1+1, points: 40+35}, {num: 1+2, points: 40+70}, {num: 1+1+2, points: 40+35+70},
            {num: 1+4, points: 40+105}, {num: 1+1+4, points: 40+35+105},
        ]},
    ]}],
    ["Vultarax Battle-automata Squadron", {modelGroupShapes: [
        {modelName: "Vultarax", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 1, points: 35}, {num: 1+1, points: 35+30}, {num: 1+2, points: 35+60}, {num: 1+3, points: 35+85},
        ]},
    ]}],
    ["Thanatar Siege-automata Maniple", {minModels: 1, maxModels: 8, modelGroupShapes: [
        {modelName: "Thanatar", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Plasma mortar", points: 0},
                {loadout: "Heavy-las and Graviton ram", points: 5},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 2, points: 110}, {num: 2+1, points: 110+50}, {num: 2+2, points: 110+100}, {num: 2+1+2, points: 110+50+100},
            {num: 2+4, points: 110+185}, {num: 2+1+4, points: 110+50+185}, {num:2+2+4, points: 110+100+185}
        ]},
    ]}],
    ["Karacnos Assault Tank Squadron", {minModels: 1, modelGroupShapes: [
        {modelName: "Karacnos", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 1, points: 40}, {num: 2, points: 40+35}, {num: 3, points: 40+70}, {num: 4, points: 40+100}
        ]}
        ], extras: [{name: "Cortex Controller", slotRequirementType: "Required", points: 10, formationNames:["Autokratorii Regiment"]}] 
    }],
    ["Krios Battle Tank Squadron", {modelGroupShapes: [
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
        ], extras: [{name: "Cortex Controller", slotRequirementType: "Required", points: 10, formationNames:["Autokratorii Regiment"]}]
    }],
    ["Krios Venator Squadron", {modelGroupShapes: [
        {modelName: "Krios Venator", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            {num: 2, points: 60},
            {num: 2+2, points: 60+55},
            {num: 2+4, points: 60+110}, 
            {num: 2+6, points: 60+160}, 
        ]}
        ], extras: [{name: "Cortex Controller", slotRequirementType: "Required", points: 10, formationNames:["Autokratorii Regiment"]}]
    }],
    ["Triaros Armoured Conveyor", {minModels: 1, modelGroupShapes: [
        {modelName: "Triaros", modelLoadoutSlots: [], possibleModelGroupQuantities: [
            //p128 - max transport size is 8
            {num: 1, points: 22*1}, {num: 2, points: 22*2}, {num: 3, points: 22*3}, {num: 4, points: 22*4}, 
            {num: 5, points: 22*5}, {num: 6, points: 22*6}, {num: 7, points: 22*7}, {num: 8, points: 22*8}, 
        ]}
    ]}],
    //dark mech
    ["Scintillax 'Cyclops' Noospheric Stalker Network", {minModels: 1, maxModels: 6, modelGroupShapes:[
        {modelName: "Scintillax", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Scintillax lascutter", points: 0},
                {loadout: "Exo-planar cannon", points: 0},
                {loadout: "Storm laser", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 1, points: 75}, {num: 1+1, points: 75+70}, {num: 1+2, points: 75+130}, 
            {num: 1+3, points: 75+190}, {num: 1+2+2, points: 75+130+130}, {num: 1+2+3, points: 75+130+190}
        ]},
    ]}],
    ["Errax 'Butcher' Assault Stalker Cohort", {minModels: 1, maxModels: 9, modelGroupShapes:[
        {modelName: "Errax", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Errax meltagun", points: 0},
                {loadout: "Stalker maxima bolters", points: 0},
                {loadout: "Errax lascutters", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 1, points: 45}, {num: 1+1, points: 45+40}, {num: 1+2, points: 45+80}, 
            {num: 1+3, points: 45+115}, {num: 1+2+2, points: 45+80+80}, {num: 1+2+3, points: 45+80+115},
            {num: 1+3+3, points: 45+115+115}, {num: 1+1+3+3, points: 45+45+115+115}, 
            {num: 1+2+3+3, points: 45+80+115+115},
        ]},
    ]}],
    ["Harpax 'Swarmer' Scout Host", {modelGroupShapes: [
        {modelName: "Harpax", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Exo-planar repeaters", points: 0},
                {loadout: "Harpax lascutters", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 4, points: 30}, {num: 4+2, points: 30+15}, {num: 4+4, points: 30+25}, {num: 4+6, points: 30+35}
        ]}
        ], extras: [{name: "Controller Host", slotRequirementType: "Required", points: 15, formationNames:["Swarm Protocol Cohort"]}] 
    }],
    ["Tenebrax 'Archer' Battle Stalker Cohort", {minModels: 1, maxModels: 6, modelGroupShapes:[
        {modelName: "Tenebrax", modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Exo-planar cannon", points: 0},
                {loadout: "Stalker maxima bolters", points: 0},
                {loadout: "Volkite culverins", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 1, points: 35}, {num: 1+1, points: 35+35}, {num: 1+2, points: 35+65}, 
            {num: 1+3, points: 35+90}, {num: 1+2+2, points: 35+65+65}, {num: 1+2+3, points: 35+65+90},
        ]},
    ]}],
    ["Serperos 'Overlord' Heavy Stalker Maniple", {minModels: 2, maxModels: 6, modelGroupShapes: [
        {modelName: "Serperos", modelLoadoutSlots: [
            {name: "Carapace", possibleModelLoadouts: [
                {loadout: "Exo-planar bombard", points: 0},
                {loadout: "Storm laser array", points: 0},
            ]},
            {name: "Underslung", possibleModelLoadouts: [
                {loadout: "Serperos lascutters", points: 0},
                {loadout: "Irradiation engine", points: 0},
            ]},
        ], possibleModelGroupQuantities: [
            {num: 2, points: 175}, {num: 2+1, points: 175+85}, {num: 2+2, points: 175+150}, 
            {num: 2+3, points: 175+225}, {num: 2+1+3, points: 175+150+150}
        ]}
    ]}],
]);

export function getMechanicumDetachmentConfigurationForDetachmentName(detachmentName: DetachmentName): DetachmentConfiguration {
    return detachmentConfigurationForDetachmentName.get(detachmentName) 
        ?? getStrategicAssetDetachmentConfigurationForDetachmentName(detachmentName as StrategicAssetDetachmentName) 
        ?? {modelGroupShapes: []}
}

const statsForModelType = new Map<MechanicumModelName | DarkMechanicumModelName, Stats>([
    ["Archmagos on Abeyant", {
        detachmentType: "Infantry", scale: 1, move: 6, saves: [
            {saveType: "Armour", save: 4, arc: "All"},
            {saveType: "Invuln", save: 5, arc: "All"}
        ],
        caf: 4, morale: 2, wounds: 2, tacticalStrength: 5,
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
        caf: 3, morale: 2, wounds: 1, tacticalStrength: 5,
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
        caf: 6, wounds: 2, tacticalStrength: 3,
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
        caf: 4, wounds: 2, tacticalStrength: 3,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Mauler bolt cannon", "In-built bolters"]}
            ]},
        ],
        unitTraits: ["Armoured", "Cybernetica Cortex (Advance, March)"],
    }],
    ["Domitar", {
        detachmentType: "Walker", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 4, arc: "All"}, {saveType: "Invuln", save: 6, arc: "All"}
        ],
        caf: 4, wounds: 2, tacticalStrength: 3,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Domitar missile launcher", "Graviton hammers"]}
            ]},
        ],
        unitTraits: ["Armoured", "Cybernetica Cortex (Advance, March)"],
    }],
    ["Errax", {
        detachmentType: "Vehicle", scale: 2, move: 8, saves: [
            {saveType: "Armour", save: 4, arc: "Front"},
            {saveType: "Armour", save: 5, arc: "Rear"},
        ],
        caf: 6, wounds: 2, tacticalStrength: 2, constructShields: 1,
        modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Errax meltagun"},
                {loadout: "Stalker maxima bolters"},
                {loadout: "Errax lascutters"},
            ]},
        ],
        unitTraits: ["Networked Anima", "Nimble", "Traitor"]
    }],
    ["Harpax", {
        detachmentType: "Infantry", scale: 1, move: 7, saves: [
            {saveType: "Armour", save: 6, arc: "All"},
        ],
        caf: 1, wounds: 1, tacticalStrength: 5,
        modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Exo-planar repeaters"},
                {loadout: "Harpax lascutters"},
            ]},
        ],
        unitTraits: ["Jump Packs", "Networked Anima", "Traitor"],
    }],
    ["Karacnos", {
        detachmentType: "Vehicle", scale: 2, move: 8, saves: [
            {saveType: "Armour", save: 3, arc: "Front"},
            {saveType: "Armour", save: 4, arc: "Rear"},
        ],
        caf: 0, morale: 3, wounds: 1, tacticalStrength: 2,
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
            {saveType: "Armour", save: 4, arc: "Rear"},
        ],
        caf: 0, morale: 3, wounds: 1, tacticalStrength: 2,
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
    ["Krios Venator", {
        detachmentType: "Vehicle", scale: 2, move: 8, saves: [
            {saveType: "Armour", save: 3, arc: "Front"},
            {saveType: "Armour", save: 4, arc: "Rear"},
        ],
        caf: 0, morale: 3, wounds: 1, tacticalStrength: 2,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Pulsar-fusil", "Volkite calvier sponsons"]}, 
            ]},
        ],
        unitTraits: []
    }],
    ["Myrmidon Destructor", {
        detachmentType: "Infantry", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 4, arc: "All"}
        ],
        caf: 3, morale: 3, wounds: 1, tacticalStrength: 5,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
               {loadout: "", weaponTypes:["Myrmidon volkites", "Conversion beamers"]},
            ]},
        ],
        unitTraits: ["Implacable"]
    }],
    ["Myrmidon Secutor", {
        detachmentType: "Infantry", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 4, arc: "All"}
        ],
        caf: 6, morale: 3, wounds: 1, tacticalStrength: 5,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Maxima bolters", "Myrmidon plasma-fusil"]}
            ]},
        ],
        unitTraits: ["Implacable"]
    }],
    ["Serperos", {
        detachmentType: "Super-heavy vehicle", scale: 3, move: 7, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 3, wounds: 2, tacticalStrength: 2, constructShields: 2,
        modelLoadoutSlots: [
            {name: "Carapace", possibleModelLoadouts: [
                {loadout: "Exo-planar bombard"},
                {loadout: "Storm laser array"},
            ]},
            {name: "Underslung", possibleModelLoadouts: [
                {loadout: "Serperos lascutters"},
                {loadout: "Irradiation engine"},
            ]},
        ],
        unitTraits: ["Networked Anima", "Nimble", "Traitor"]
    }],
    ["Scintillax", {
        detachmentType: "Vehicle", scale: 2, move: 7, saves: [
            {saveType: "Armour", save: 3, arc: "Front"},
            {saveType: "Armour", save: 4, arc: "Rear"},
        ],
        caf: 3, wounds: 2, tacticalStrength: 2, constructShields: 1,
        modelLoadoutSlots: [
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Scintillax lascutter"},
                {loadout: "Exo-planar cannon"},
                {loadout: "Storm laser"},
            ]},
        ],
        unitTraits: ["Noosphere Controller", "Nimble", "Traitor"]
    }],
    ["Tech-Priest", {
        detachmentType: "Infantry", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 5, arc: "All"},
            {saveType: "Invuln", save: 6, arc: "All"}
        ],
        caf: 2, morale: 3, wounds: 1, tacticalStrength: 5,
        modelLoadoutSlots: [], //literally no guns
        unitTraits: ["Attached Deployment", "Battlesmith", "Cortex Controller"],
        commandAttachment: "MechanicumHQ"
    }],
    ["Tech-thralls", {
        detachmentType: "Infantry", scale: 1, move: 5, saves: [
            {saveType: "Armour", save: 6, arc: "All"},
        ],
        caf: -1, wounds: 1, tacticalStrength: 5,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Las-locks"]}
            ]}
        ],
        unitTraits: [],
    }],
    ["Tenebrax", {
        detachmentType: "Vehicle", scale: 2, move: 8, saves: [
            {saveType: "Armour", save: 4, arc: "Front"},
            {saveType: "Armour", save: 5, arc: "Rear"},
        ],
        caf: 1, wounds: 2, tacticalStrength: 2,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [{loadout: "", weaponTypes: ["Storm laser flenser"]}]},
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Exo-planar cannon"},
                {loadout: "Stalker maxima bolters"},
                {loadout: "Volkite culverins"},
            ]},
        ],
        unitTraits: ["Networked Anima", "Nimble", "Traitor"]
    }],
    ["Thallax", {
        detachmentType: "Infantry", scale: 1, move: 7, saves: [
            {saveType: "Armour", save: 5, arc: "All"},
        ],
        caf: 1, wounds: 1, tacticalStrength: 5, morale: 3,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Lightning guns", "Multi-melta"]}
            ]}
        ],
        unitTraits: ["Jump Packs"],
    }],
    ["Thanatar", {
        detachmentType: "Walker", scale: 1, move: 4, saves: [
            {saveType: "Armour", save: 4, arc: "All"}, {saveType: "Invuln", save: 6, arc: "All"}
        ],
        caf: 4, wounds: 2, tacticalStrength: 3,
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
    ["Triaros", {
        detachmentType: "Vehicle", scale: 2, move: 8, saves: [
            {saveType: "Armour", save: 3, arc: "Front"},
            {saveType: "Armour", save: 4, arc: "Rear"},
        ],
        caf: 0, morale: 3, wounds: 1, tacticalStrength: 2,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Twin-linked volkite calviers", "Twin-linked mauler bolt cannon"]}, 
            ]},
        ],
        unitTraits: ["Transport (4)"]
    }],
    ["Ursarax", {
        detachmentType: "Infantry", scale: 1, move: 7, saves: [
            {saveType: "Armour", save: 5, arc: "All"},
        ],
        caf: 3, wounds: 1, tacticalStrength: 5, morale: 3,
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
        caf: 3, wounds: 2, tacticalStrength: 3,
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
        caf: 2, wounds: 2, tacticalStrength: 3,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Arc blasters", "Vultarax havoc launcher"]}
            ]},
        ],
        unitTraits: ["Armoured", "Cybernetica Cortex (Advance, March)", "Outflank", "Skimmer"],
    }],
]);

export function getStatsForMechanicumModelName(modelName: MechanicumModelName | DarkMechanicumModelName | StrategicAssetModelName): Stats | undefined {
    return statsForModelType.get(modelName as MechanicumModelName | DarkMechanicumModelName) ??
        getStatsForStrategicAssetModelType(modelName as StrategicAssetModelName);
}