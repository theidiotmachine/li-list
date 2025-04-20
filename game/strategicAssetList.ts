import { CollegiaTitanicaFormationName, QuestorisFamiliaFormationName, StrategicAssetDetachmentName, StrategicAssetFormationName, StrategicAssetModelType } from "./strategicAssetTypes.ts";
import { Allegiance, Detachment, DetachmentConfiguration, DetachmentValidationState, FormationShape, FormationSlot, Stats } from "./types.ts";

const collegiaTitanicaFormationShapes = new Map<CollegiaTitanicaFormationName, FormationShape>([
    ["Axiom Battleline Maniple", {slotRequirements: [
        {slot: "Warlord", slotRequirementType: "Required"},
        {slot: "Reaver", slotRequirementType: "Required"},
        {slot: "Warhound", slotRequirementType: "Required"},
        {slot: "Reaver", slotRequirementType: "Optional"},
        {slot: "Knight", slotRequirementType: "Optional"},
        {slot: "Knight", slotRequirementType: "Optional"},
    ]}],
    ["Corsair Battleline Maniple", {slotRequirements: [
        {slot: "Reaver", slotRequirementType: "Required"},
        {slot: "Reaver", slotRequirementType: "Required"},
        {slot: "Reaver", slotRequirementType: "Optional"},
        {slot: "Reaver", slotRequirementType: "Optional"},
        {slot: "Reaver", slotRequirementType: "Optional"},
        {slot: "Knight", slotRequirementType: "Optional"},
    ]}],
    ["Ferox Light Maniple", {slotRequirements: [
        {slot: "Reaver", slotRequirementType: "Required"},
        {slot: "Warhound", slotRequirementType: "Required"},
        {slot: "Reaver", slotRequirementType: "Optional"},
        {slot: "Dire Wolf", slotRequirementType: "Optional"},
        {slot: "Knight", slotRequirementType: "Optional"},
    ]}],
    ["Lupercal Light Maniple", {slotRequirements: [
        {slot: "Warhound", slotRequirementType: "Required"},
        {slot: "Warhound", slotRequirementType: "Required"},
        {slot: "Dire Wolf", slotRequirementType: "Optional"},
        {slot: "Dire Wolf", slotRequirementType: "Optional"},
        {slot: "Knight", slotRequirementType: "Optional"},
    ]}],
    ["Purgigatus Heavy Maniple", {slotRequirements: [
        {slot: "Warmaster", slotRequirementType: "Required"},
        {slot: "Warmaster", slotRequirementType: "Optional"},
        {slot: "Warlord", slotRequirementType: "Optional"},
        {slot: "Warbringer", slotRequirementType: "Optional"},
        {slot: "Warbringer", slotRequirementType: "Optional"},
    ]}],
    ["Ruptura Battleline Maniple", {slotRequirements: [
        {slot: "Warbringer", slotRequirementType: "Required"},
        {slot: "Warbringer", slotRequirementType: "Required"},
        {slot: "Reaver", slotRequirementType: "Optional"},
        {slot: "Reaver", slotRequirementType: "Optional"},
        {slot: "Reaver", slotRequirementType: "Optional"},
        {slot: "Knight", slotRequirementType: "Optional"},
    ]}]
]);

const questorisFamiliaFormationShapes = new Map<QuestorisFamiliaFormationName, FormationShape>([
    ["Barony Guard Lance", {slotRequirements: [
        {   slot: "Questoris",     slotRequirementType: "Required" },
        {   slot: "Questoris",     slotRequirementType: "Required" },
        {   slot: "Cerastus",      slotRequirementType: "Required" },
        {   slot: "Cerastus",      slotRequirementType: "Optional" },
        {   slot: "Questoris",     slotRequirementType: "Optional" },
        {   slot: "Armiger",       slotRequirementType: "Optional" },
    ]}],
]);

const strategicAssetFormationShapes = new Map<StrategicAssetFormationName, FormationShape>([
    ["Knight Household Lance", {slotRequirements: [
        {   slot: "Knight",     slotRequirementType: "Required" },
    ]}],
    ["Legion Support", {slotRequirements: [
        {   slot: "Titan",      slotRequirementType: "Required" },
    ]}]
]);

export function getShapeForCollegiaTitanicaFormationName(formationType: CollegiaTitanicaFormationName | ""): FormationShape {
    if(formationType == "") return { slotRequirements: [] };
    return collegiaTitanicaFormationShapes.get(formationType) ?? { slotRequirements: [] };
}

export function getShapeForQuestorisFamiliaFormationName(formationType: QuestorisFamiliaFormationName | ""): FormationShape {
    if(formationType == "") return { slotRequirements: [] };
    return questorisFamiliaFormationShapes.get(formationType) ?? { slotRequirements: [] };
}

export function getShapeForStrategicAssetFormationName(formationType: StrategicAssetFormationName | ""): FormationShape {
    if(formationType == "") return { slotRequirements: [] };
    return strategicAssetFormationShapes.get(formationType) ?? { slotRequirements: [] };
}

type DetachmentNameData = {
    detachmentName: StrategicAssetDetachmentName;
    allegiance?: Allegiance;
}

const collegiaTitanicaDetachmentNamesForSlot = new Map<FormationSlot, DetachmentNameData[]>([
    ["Dire Wolf",[
        {detachmentName: "Dire Wolf Heavy Scout Titan"},
    ]],
    ["Knight", [ 
        {detachmentName: "Acastus Knight Banner"},
        {detachmentName: "Cerastus Knight Banner"},
        {detachmentName: "Questoris Knight Banner"},
    ]],
    ["Reaver", [
        {detachmentName: "Reaver Battle Titan"},
    ]],
    ["Warbringer", [
        {detachmentName: "Warbringer Nemesis Titan"},
    ]],
    ["Warhound", [
        {detachmentName: "Warhound Hunting Pack"},
    ]],
    ["Warlord", [
        {detachmentName: "Warlord Battle Titan"},
    ]],
    ["Warmaster", [
        {detachmentName: "Warmaster Heavy Battle Titan"},
        {detachmentName: "Warmaster Iconoclast Titan"},
    ]]
]);

const questorisFamiliaDetachmentNamesForSlot = new Map<FormationSlot, DetachmentNameData[]>([
    ["Armiger", [
        {detachmentName: "Armiger Knight Banner"},
    ]],
    ["Cerastus", [
        {detachmentName: "Cerastus Knight Banner"},
    ]],
    ["Questoris", [
        {detachmentName: "Questoris Knight Banner"},
    ]],
]);

const strategicAssetDetachmentNamesForSlot = new Map<FormationSlot, DetachmentNameData[]>([
    ["Knight", [ 
        {detachmentName: "Acastus Knight Banner"},
        {detachmentName: "Cerastus Knight Banner"},
        {detachmentName: "Questoris Knight Banner"},
    ]],
    ["Titan", [
        {detachmentName: "Dire Wolf Heavy Scout Titan"},
        {detachmentName: "Reaver Battle Titan"},
        {detachmentName: "Warhound Hunting Pack"},
        {detachmentName: "Warbringer Nemesis Titan"},
        {detachmentName: "Warlord Battle Titan"},
        {detachmentName: "Warlord-Sinister Battle Titan", allegiance: "Loyalist"},
        {detachmentName: "Warmaster Heavy Battle Titan"},
        {detachmentName: "Warmaster Iconoclast Titan"},
    ]]
]);

export function getCollegiaTitanicaDetachmentNamesForSlot(slot: FormationSlot, allegiance: Allegiance | ""): StrategicAssetDetachmentName[] {
    return (collegiaTitanicaDetachmentNamesForSlot.get(slot) ?? []).filter((t)=>t.allegiance == undefined || t.allegiance == allegiance).map((t)=>t.detachmentName);
}

export function getQuestorisFamiliaDetachmentNamesForSlot(slot: FormationSlot, allegiance: Allegiance | ""): StrategicAssetDetachmentName[] {
    return (questorisFamiliaDetachmentNamesForSlot.get(slot) ?? []).filter((t)=>t.allegiance == undefined || t.allegiance == allegiance).map((t)=>t.detachmentName);
}

export function getStrategicAssetDetachmentNamesForSlot(slot: FormationSlot, allegiance: Allegiance | ""): StrategicAssetDetachmentName[] {
    return (strategicAssetDetachmentNamesForSlot.get(slot) ?? []).filter((t)=>t.allegiance == undefined || t.allegiance == allegiance).map((t)=>t.detachmentName);
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

const detachmentConfigurationForDetachmentName: Map<StrategicAssetDetachmentName, DetachmentConfiguration> = new Map([
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
            ], independentModels: true},
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
            ], independentModels: true},
            {modelType: "Knight Armiger", modelLoadoutSlots: [
                {name: "Close combat", possibleModelLoadouts: [
                    {loadout: "Reaper chain-cleaver", points: 0}, 
                    {loadout: "Armiger autocannon", points: 0},
                ]},
            ], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 3, points: 180}
            ], formationNames: [
                "Axiom Battleline Maniple",
                "Corsair Battleline Maniple",
                "Ferox Light Maniple",
                "Knight Household Lance",
                "Lupercal Light Maniple",
                "Ruptura Battleline Maniple",
            ]},
            {modelType: "Knight Moirax", modelLoadoutSlots: [
                {name: "Close combat", possibleModelLoadouts: [
                    {loadout: "Armiger lightning locks", points: 0}, 
                    {loadout: "Volkite veuglaire", points: 0},
                ]},
            ], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 3, points: 200}
            ], formationNames: [
                "Axiom Battleline Maniple",
                "Corsair Battleline Maniple",
                "Ferox Light Maniple",
                "Knight Household Lance",
                "Lupercal Light Maniple",
                "Ruptura Battleline Maniple",
            ]},
        ]
    }],
    ["Armiger Knight Banner", {minModels: 3, maxModels: 9,
        modelGroupShapes: [
            {modelType: "Knight Armiger", modelLoadoutSlots: [
                {name: "Close combat", possibleModelLoadouts: [
                    {loadout: "Reaper chain-cleaver", points: 0}, 
                    {loadout: "Armiger autocannon", points: 0},
                ]},
            ], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 3, points: 180}, {num: 6, points: 180+160}, {num: 9, points: 180+160*2},
            ]},
            {modelType: "Knight Moirax", modelLoadoutSlots: [
                {name: "Close combat", possibleModelLoadouts: [
                    {loadout: "Armiger lightning locks", points: 0}, 
                    {loadout: "Volkite veuglaire", points: 0},
                ]},
            ], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 3, points: 200}, {num: 6, points: 200+180}, {num: 9, points: 200+180*2}
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
            ], independentModels: true},
            {modelType: "Knight Acheron", modelLoadoutSlots: [], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 1, points: 215}, {num: 2, points: 215+200}, {num: 3, points: 215+390}
            ], independentModels: true},
            {modelType: "Knight Castigator", modelLoadoutSlots: [], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 1, points: 215}, {num: 2, points: 215+200}, {num: 3, points: 215+390}
            ], independentModels: true},
            {modelType: "Knight Lancer", modelLoadoutSlots: [], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 1, points: 215}, {num: 2, points: 215+200}, {num: 3, points: 215+390}
            ], independentModels: true},
            {modelType: "Knight Armiger", modelLoadoutSlots: [
                {name: "Close combat", possibleModelLoadouts: [
                    {loadout: "Reaper chain-cleaver", points: 0}, 
                    {loadout: "Armiger autocannon", points: 0},
                ]},
            ], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 3, points: 180}
            ], formationNames: [
                "Axiom Battleline Maniple",
                "Corsair Battleline Maniple",
                "Ferox Light Maniple",
                "Knight Household Lance",
                "Lupercal Light Maniple",
                "Ruptura Battleline Maniple",
            ]},
            {modelType: "Knight Moirax", modelLoadoutSlots: [
                {name: "Close combat", possibleModelLoadouts: [
                    {loadout: "Armiger lightning locks", points: 0}, 
                    {loadout: "Volkite veuglaire", points: 0},
                ]},
            ], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 3, points: 200}
            ], formationNames: [
                "Axiom Battleline Maniple",
                "Corsair Battleline Maniple",
                "Ferox Light Maniple",
                "Knight Household Lance",
                "Lupercal Light Maniple",
                "Ruptura Battleline Maniple",
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
            ], independentModels: true},
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
            ], independentModels: true},
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
            ], independentModels: true},
            {modelType: "Knight Magaera", modelLoadoutSlots: [
            ], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 1, points: 180+15}, {num: 2, points: 180+180+15*2}, {num: 3, points: 180+340+15*3}
            ], independentModels: true},
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
            ], independentModels: true},
            {modelType: "Knight Styrix", modelLoadoutSlots: [
            ], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 1, points: 180+15}, {num: 2, points: 180+180+15*2}, {num: 3, points: 180+340+15*3}
            ], independentModels: true},
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
            ], independentModels: true},
            {modelType: "Knight Armiger", modelLoadoutSlots: [
                {name: "Close combat", possibleModelLoadouts: [
                    {loadout: "Reaper chain-cleaver", points: 0}, 
                    {loadout: "Armiger autocannon", points: 0},
                ]},
            ], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 3, points: 180}
            ], formationNames: [
                "Axiom Battleline Maniple",
                "Corsair Battleline Maniple",
                "Ferox Light Maniple",
                "Knight Household Lance",
                "Lupercal Light Maniple",
                "Ruptura Battleline Maniple",
            ]},
            {modelType: "Knight Moirax", modelLoadoutSlots: [
                {name: "Close combat", possibleModelLoadouts: [
                    {loadout: "Armiger lightning locks", points: 0}, 
                    {loadout: "Volkite veuglaire", points: 0},
                ]},
            ], possibleModelGroupQuantities: [
                {num: 0, points: 0}, {num: 3, points: 200}
            ], formationNames: [
                "Axiom Battleline Maniple",
                "Corsair Battleline Maniple",
                "Ferox Light Maniple",
                "Knight Household Lance",
                "Lupercal Light Maniple",
                "Ruptura Battleline Maniple",
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

export function getStrategicAssetDetachmentConfigurationForDetachmentName(detachmentName: StrategicAssetDetachmentName): DetachmentConfiguration {
    return detachmentConfigurationForDetachmentName.get(detachmentName) ?? {modelGroupShapes: []}
}
const statsForModelType = new Map<StrategicAssetModelType, Stats>([
    ["Acastus Knight Asterius", {
        detachmentType: "Knight", scale: 4, move: 6, saves: [
            {saveType: "Armour", save: 2, arc: "Front"}, {saveType: "Armour", save: 3, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 4, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 7, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        modelLoadoutSlots: [],//TODO
        unitTraits: ["Blessed Auto-simulacra", "Independent"],
    }],
    ["Acastus Knight Porphyrion", {
        detachmentType: "Knight", scale: 4, move: 6, saves: [
            {saveType: "Armour", save: 2, arc: "Front"}, {saveType: "Armour", save: 3, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 4, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 7, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        modelLoadoutSlots: [
            {name: "Body", possibleModelLoadouts: [
                {loadout: "Acastus lascannon"}, 
                {loadout: "Acastus autocannon"},
            ]},
            {name: "Carapace", possibleModelLoadouts: [
                {loadout: "Ironstorm missile pod"}, 
                {loadout: "Helios defence missiles"},
            ]},
            {name: "", possibleModelLoadouts: [
                {loadout: "Twin magna lascannon"}
            ]},
        ],
        unitTraits: ["Blessed Auto-simulacra", "Independent"],
    }],
    ["Cerastus Knight Atrapos", {
        detachmentType: "Knight", scale: 4, move: 9, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 3, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 11, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Atrapos lascutter", "Graviton singularity cannon"]}
            ]},
        ],
        unitTraits: ["Furious Charge", "Independent", "Macro-extinction Targeting Protocols", "Nimble"]
    }],
    ["Knight Acheron", {
        detachmentType: "Knight", scale: 4, move: 9, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 4, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 11, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Acheron pattern flame cannon", "Reaper chainfist", "In-built twin-linked heavy bolters"]}
            ]},
        ],
        unitTraits: ["Furious Charge", "Independent", "Nimble"]
    }],
    ["Knight Castigator", {
        detachmentType: "Knight", scale: 4, move: 9, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 4, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 11, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Castigator pattern bolt cannon", "Tempest warblade"]}
            ]},
        ],
        unitTraits: ["Furious Charge", "Independent", "Nimble"]
    }],
    ["Knight Crusader", {
        detachmentType: "Knight", scale: 4, move: 8, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 4, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 8, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Heavy stubber", "Thermal cannon"]}
            ]},
            {name: "Carapace", possibleModelLoadouts: [
                {loadout: "Nothing", weaponTypes: []}, 
                {loadout: "Rocket pods"},
            ]},
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Questoris-avenger gatling cannon"}, 
                {loadout: "Rapid-fire battlecannon"},
            ]}
        ],
        unitTraits: ["Independent", "Nimble"]
    }],
    ["Knight Errant", {
        detachmentType: "Knight", scale: 4, move: 8, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 4, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 8, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Heavy stubber", "Thermal cannon"]}
            ]},
            {name: "Carapace", possibleModelLoadouts: [
                {loadout: "Nothing", weaponTypes: []}, 
                {loadout: "Rocket pods"},
            ]},
            {name: "Close combat", possibleModelLoadouts: [
                {loadout: "Reaper chainsword"}, 
                {loadout: "Thunderstrike gauntlet"},
            ]},
        ],
        unitTraits: ["Independent", "Nimble"]
    }],
    ["Knight Gallant", {
        detachmentType: "Knight", scale: 4, move: 8, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 4, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 8, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Meltagun", "Thunderstrike gauntlet"]}
            ]},
            {name: "Carapace", possibleModelLoadouts: [
                {loadout: "Nothing", weaponTypes: []}, 
                {loadout: "Rocket pods"},
            ]},
            {name: "Close combat 2", possibleModelLoadouts: [
                {loadout: "Reaper chainsword"}, 
                {loadout: "Thunderstrike gauntlet"},
            ]},
        ],
        unitTraits: ["Independent", "Nimble"]
    }],
    ["Knight Lancer", {
        detachmentType: "Knight", scale: 4, move: 9, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 3, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 11, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Shock lance", "Ion gauntlet shield"],}
            ]},
        ],
        unitTraits: ["Furious Charge", "Independent", "Nimble"]
    }],
    ["Knight Magaera", {
        detachmentType: "Knight", scale: 4, move: 8, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 4, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 8, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Hekaton siege claw", "Lightning cannon", "Phased plasma-fusil"],}
            ]},
        ],
        unitTraits: ["Blessed Auto-simulacra", "Independent", "Ionic Flare Shield", "Nimble"]
    }],
    ["Knight Paladin", {
        detachmentType: "Knight", scale: 4, move: 8, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 4, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 8, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Heavy stubber", "Rapid-fire battlecannon"]}
            ]},
            {name: "Carapace", possibleModelLoadouts: [
                {loadout: "Nothing", weaponTypes: []}, 
                {loadout: "Rocket pods"},
            ]},
            {name: "Close combat", possibleModelLoadouts: [
                {loadout: "Reaper chainsword"}, 
                {loadout: "Thunderstrike gauntlet"},
            ]},
        ],
        unitTraits: ["Independent", "Nimble"]
    }],
    ["Knight Styrix", {
        detachmentType: "Knight", scale: 4, move: 8, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 4, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 8, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Graviton gun", "Hekaton siege claw", "Volkite chieorovile"]}
            ]}
        ],
        unitTraits: ["Blessed Auto-simulacra", "Independent", "Ionic Flare Shield", "Nimble"]
    }],
    ["Knight Warden", {
        detachmentType: "Knight", scale: 4, move: 8, saves: [
            {saveType: "Armour", save: 3, arc: "Front"}, {saveType: "Armour", save: 4, arc: "Rear"}, 
            {saveType: "Ion Shield", save: 4, arc: "Front"}, {saveType: "Invuln", save: 6, arc: "Front"}
        ],
        caf: 8, morale: 2, wounds: 3, tacticalStrength: 1, voidShields: 0,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Questoris-avenger gatling cannon", "Meltagun"]}
            ]},
            {name: "Carapace", possibleModelLoadouts: [
                {loadout: "Nothing", weaponTypes: []}, 
                {loadout: "Rocket pods"},
            ]},
            {name: "Close combat", possibleModelLoadouts: [
                {loadout: "Reaper chainsword"}, 
                {loadout: "Thunderstrike gauntlet"},
            ]},
        ],
        unitTraits: ["Independent", "Nimble"]
    }],

    //Titans
    ["Dire Wolf Titan", {
        detachmentType: "Titan", scale: 5, move: 7, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 10, wounds: 4, tacticalStrength: 0, voidShields: 2,
        modelLoadoutSlots: [
            {name: "", possibleModelLoadouts: [
                {loadout: "", weaponTypes: ["Ardex mega-bolters"]}
            ]},
            {name: "Primary", possibleModelLoadouts: [
                {loadout: "Conversion beam dissipator"}, //TODO
                {loadout: "Neutron laser"}, //TODO
                {loadout: "Volcanon cannon"},
            ]},
        ],
        unitTraits: ["Agile", "Infiltrate"],
    }],
    ["Reaver Battle Titan", {
        detachmentType: "Titan", scale: 5, move: 6, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 12, wounds: 5, tacticalStrength: 0, voidShields: 4,
        modelLoadoutSlots: [{name: "Left", possibleModelLoadouts: [
            {loadout: "Reaver chainfist"}, //TODO
            {loadout: "Reaver gatling blaster"}, //TODO
            {loadout: "Reaver laser blaster"}, //TODO
            {loadout: "Reaver melta cannon"}, //TODO
            {loadout: "Reaver power fist"}, //TODO
            {loadout: "Reaver volcano cannon"}, //TODO
        ]},
        {name: "Right", possibleModelLoadouts: [
            {loadout: "Reaver chainfist"}, //TODO
            {loadout: "Reaver gatling blaster"}, //TODO
            {loadout: "Reaver laser blaster"}, //TODO
            {loadout: "Reaver melta cannon"}, //TODO
            {loadout: "Reaver power fist"}, //TODO
            {loadout: "Reaver volcano cannon"}, //TODO
        ]},
        {name: "Carapace", possibleModelLoadouts: [
            {loadout: "Reaver apocalypse missile launcher"}, //TODO
            {loadout: "Reaver Vulcan mega-bolter"}, //TODO
            {loadout: "Reaver Titan warp missile"}, //TODO
            {loadout: "Reaver turbo-laser destructor"},
            {loadout: "Reaver volkite eradicator"}, //TODO
            {loadout: "Reaver graviton eradicator"}, //TODO
            {loadout: "Reaver conversion beam dissolutor"}, //TODO
        ]}],
        unitTraits: [],
    }],
    ["Warbringer Nemesis Titan", {
        detachmentType: "Titan", scale: 5, move: 5, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 12, wounds: 5, tacticalStrength: 0, voidShields: 6,
        modelLoadoutSlots: [], //TODO
        unitTraits: [],
    }],
    ["Warhound Titan", {
        detachmentType: "Titan", scale: 5, move: 7, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 10, wounds: 4, tacticalStrength: 0, voidShields: 2,
        modelLoadoutSlots: [{name: "Left", possibleModelLoadouts: [
            {loadout: "Conversion beam dissolutor"}, //TODO
            {loadout: "Graviton eradicator"}, //TODO
            {loadout: "Incisor pattern melta lance"}, //TODO
            {loadout: "Inferno gun"}, //TODO
            {loadout: "Natrix shock lance"}, //TODO
            {loadout: "Plasma blastgun"},
            {loadout: "Turbo-laser destructor"},
            {loadout: "Ursus claw"}, //TODO
            {loadout: "Volkite eradicator"}, //TODO
            {loadout: "Vulcan mega-bolter"}, //TODO
            {loadout: "Warhound shudder missiles"}, //TODO,
            {loadout: "Warhound swarmer missiles"}, //TODO
        ]},
        {name: "Right", possibleModelLoadouts: [
            {loadout: "Conversion beam dissolutor"}, //TODO
            {loadout: "Graviton eradicator"}, //TODO
            {loadout: "Incisor pattern melta lance"}, //TODO
            {loadout: "Inferno gun"}, //TODO
            {loadout: "Natrix shock lance"}, //TODO
            {loadout: "Plasma blastgun"},
            {loadout: "Turbo-laser destructor"},
            {loadout: "Ursus claw"}, //TODO
            {loadout: "Volkite eradicator"}, //TODO
            {loadout: "Vulcan mega-bolter"}, //TODO
            {loadout: "Warhound shudder missiles"}, //TODO,
            {loadout: "Warhound swarmer missiles"}, //TODO
        ]}],
        unitTraits: ["Agile"],
    }],
    ["Warlord Battle Titan", {
        detachmentType: "Titan", scale: 5, move: 10, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 14, wounds: 6, tacticalStrength: 0, voidShields: 6,
        modelLoadoutSlots: [], //TODO
        unitTraits: [],
    }],
    ["Warlord-Sinister", {
        detachmentType: "Titan", scale: 5, move: 10, saves: [
            {saveType: "Armour", save: 2, arc: "Front"},
            {saveType: "Armour", save: 3, arc: "Rear"},
        ],
        caf: 14, wounds: 6, tacticalStrength: 0, voidShields: 6,
        modelLoadoutSlots: [], //TODO
        unitTraits: ["Dread Aura (8)", "Loyalist", "Nechrotechnica"],
    }],
    ["Warmaster Titan", {
        detachmentType: "Titan", scale: 5, move: 5, saves: [
            {saveType: "Armour", save: 1, arc: "Front"},
            {saveType: "Armour", save: 2, arc: "Rear"},
        ],
        caf: 18, wounds: 7, tacticalStrength: 0, voidShields: 12,
        modelLoadoutSlots: [], //TODO
        unitTraits: [],
    }],
    ["Warmaster Iconoclast", {
        detachmentType: "Titan", scale: 5, move: 6, saves: [
            {saveType: "Armour", save: 1, arc: "Front"},
            {saveType: "Armour", save: 2, arc: "Rear"},
        ],
        caf: 18, wounds: 7, tacticalStrength: 0, voidShields: 12,
        modelLoadoutSlots: [], //TODO
        unitTraits: [],
    }],
]);

export function getStatsForStrategicAssetModelType(modelType: StrategicAssetModelType): Stats | undefined {
    return statsForModelType.get(modelType)
}