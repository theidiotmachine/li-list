export const ArmyListNames = [
    "Legions Astartes",
    "Solar Auxilia",
    "Strategic Asset",
] as const;
export type ArmyListName = (typeof ArmyListNames)[number];    

export const LegionFormationTypes = [
    "Legion Aerial Assault",
    "Legion Armoured Company",
    "Legion Demi-Company",
    "Legion Garrison Force",
] as const;
export type LegionFormationType = (typeof LegionFormationTypes)[number];

export const AuxiliaFormationTypes = [
    "Solar Auxilia Sub-Cohort",
    "Solar Auxilia Armoured Company",
    "Solar Auxilia Pioneer Company"
] as const;
export type AuxiliaFormationType = (typeof AuxiliaFormationTypes)[number];

export const StrategicAssetFormationTypes = [
    "Knight Household Lance",
    "Legion Support",
] as const;
export type StrategicAssetFormationType = (typeof StrategicAssetFormationTypes)[number];

export type FormationType = LegionFormationType | AuxiliaFormationType | StrategicAssetFormationType;

export type FormationSlot = 
    "Air Support" | 
    "Artillery" | 
    "Auxilia Lasrifle" |
    "Bastion" | 
    "Battle Tank" | 
    "Core" | 
    "Heavy Armour" | 
    "HQ" | 
    "Knight" |
    "Light Armour"| 
    "Support" | 
    "Storm Section" |
    "Titan" |
    "Transport" | 
    "Vanguard"  
; 

export type SlotRequirementType = "Required" | "Optional" | "One Of";
export type SlotRequirements = {
    slot: FormationSlot;
    slotRequirementType: SlotRequirementType;
    oneOfGroup?: number;
};

export type FormationShape = {
    slotRequirements: SlotRequirements[]
}

export type LegionDetachmentType = 
    "Legion Assault Detachment" | 
    "Legion Command" | 
    "Legion Kratos Squadron" | 
    "Legion Deredeo Dreadnought Detachment" |
    "Legion Dreadnought Talon" | 
    "Legion Fire Raptor Squadron" |
    "Legion Missile Launcher Support Detachment" |
    "Legion Plasma Gun Support Detachment" |
    "Legion Predator Squadron" |
    "Legion Rapier Battery Detachment" |
    "Legion Rhino Detachment" |
    "Legion Sicaran Squadron" |
    "Legion Siege Dreadnought Detachment" |
    "Legion Storm Eagle Squadron" |
    "Legion Tactical Detachment"| 
    "Legion Tarantula Battery" |
    "Legion Terminator Detachment" |
    "Legion Thunderhawk Gunship" |
    "Legion Xiphon Interceptor Squadron" |
    "Leviathan Siege Dreadnought Detachment"
;

export type AuxiliaDetachmentType =
    "Auxilia Aethon Heavy Sentinel Patrol" |
    "Auxilia Arvus Lighter" |
    "Auxilia Avenger Strike Fighter Squadron" |
    "Auxilia Lasrifle Tercio" |
    "Auxilia Lightning Fighter Squadron" |
    "Auxilia Marauder Bomber Squadron" |
    "Auxilia Ogryn Charonite Section" |
    "Auxilia Rapier Battery" |
    "Auxilia Super-Heavy Tank Squadron" |
    "Auxilia Tactical Command Detachment" | 
    "Auxilia Tarantula Battery" |
    "Auxilia Thunderbolt Squadron" |
    "Auxilia Veletaris Storm Section" |
    "Legate Commander Detachment" |
    "Leman Russ Strike Squadron" |
    "Malcador Tank Squadron"
;

export type StrategicAssetDetachmentType = 
    "Questoris Knight Banner" |
    "Warhound Hunting Pack"
;
        
export type DetachmentType = LegionDetachmentType | AuxiliaDetachmentType | StrategicAssetDetachmentType;

export const AllLegionModelTypes = [
    "Assault Marines", 
    "Command Squad",
    "Contemptor Dreadnought",
    "Deredeo Dreadnought",
    "Fire Raptor",
    "Legion Kratos",
    "Legion Predator", 
    "Legion Rapier",
    "Legion Sicaran",
    "Legion Tarantula",
    "Legion Terminators",
    "Leviathan Dreadnought",
    "Missile Launcher Legionaries", //renamed from "Missile Launcher Heavy Support Legionaries" because come on
    "Plasma Support Legionaries",
    "Rhino",
    "Storm Eagle",
    "Tactical Legionaries",
    "Thunderhawk Gunship",
    "Xiphon Interceptor"
] as const;
export type LegionModelType = (typeof AllLegionModelTypes)[number];

export const AllAuxiliaModelTypes = [
    "Aethon Heavy Sentinel",
    "Arvus Lighter",
    "Auxilia Commander",
    "Auxilia Rapier",
    "Auxilia Super-heavy",
    "Auxilia Tarantula",
    "Auxiliaries",
    "Auxiliaries with Flamers",
    "Avenger Strike Fighter",
    "Charonite Ogryns",
    "Leman Russ Tank",
    "Lightning Fighter",
    "Malcador Tank",
    "Marauder Bomber", 
    "Marauder Colossus", 
    "Marauder Destroyer", 
    "Marauder Pathfinder", 
    "Tactical Command",
    "Thunderbolt Fighter",
    "Veletarii"
] as const;
export type AuxiliaModelType = (typeof AllAuxiliaModelTypes)[number];

export const AllStrategicAssetModelTypes = [
    "Knight Armiger",
    "Knight Crusader",
    "Knight Errant",
    "Knight Gallant",
    "Knight Magaera",
    "Knight Moirax",
    "Knight Paladin",
    "Knight Styrix",
    "Knight Warden",
];
export type StrategicAssetModelType = (typeof AllStrategicAssetModelTypes)[number];

export type ModelType = LegionModelType | AuxiliaModelType | StrategicAssetModelType;

export type ModelLoadoutForSlot = {
    loadout: string;
    points: number;
}

export type ModelLoadoutSlot = {
    name: string;
    modelLoadout: ModelLoadoutForSlot;
}

export type ModelGroupQuantity = {
    num: number;
    points: number;
}

export type ModelLoadoutSlotShape = {
    name: string;
    possibleModelLoadouts: ModelLoadoutForSlot[] 
}

export type ModelGroupShape = {
    modelType: ModelType;
    maxModels?: number,
    minModels?: number,
    possibleModelGroupQuantities: ModelGroupQuantity[];
    modelLoadoutSlots: ModelLoadoutSlotShape[];
    dedicatedTransport?: boolean;
    formationType?: FormationType;
}

export type DetachmentValidationError = 
    "Required detachment missing" | 
    "Too many models in detachment" | 
    "Too few models in detachment" | 
    "Only one of these detachments should be present" | 
    "Too few models in group" | 
    "Too many models in group" |
    "Invalid number of models in group" 
;
export type DetachmentValidationState = {
    valid: boolean,
    error?: DetachmentValidationError,
    data?: string,
};

//A group of models with a particular loadout
export type ModelLoadout = {
    number: number;
    modelLoadoutSlots: ModelLoadoutSlot[];

    //calculated
    points: number;
};

//A group of models of the same type, e.g. five rhinos
export type ModelGroup = {
    modelType: ModelType;
    number: number;
    
    //groups of models with the same loadout, e.g. 1 group with havocs and 1 group with bolters
    modelLoadoutGroups: ModelLoadout[];

    //calculated
    points: number;
};

export type Detachment = {
    slot: FormationSlot;
    detachmentType: DetachmentType | "";
    modelGroups: ModelGroup[];
    points: number;
    validationState: DetachmentValidationState;
};

export type DetachmentConfiguration = {
    maxModels?: number,
    minModels?: number,
    modelGroupShapes: ModelGroupShape[],
    customValidation?: (detachment: Detachment) => DetachmentValidationState
}

export type UnitType = 
    "Cavalry" |
    "Infantry" |
    "Vehicle" |
    "Walker"
;

export type Scale = 1 | 2 | 3 | 4 | 5;

export type SaveType = 
    "Armour" |
    "Invulnerable"
;

export type Save = {
    saveType: SaveType;
    save: number;
};

export type UnitStats = {
    unitType: UnitType;
    scale: Scale;
    advance: number;
    charge: number;
    march: number;
    saves: Save[];
    caf: number;
    morale: number;
    wounds: number;
    tacticalStrength: number;
}

export type Arc =
    "All" |
    "Front"
;

export type ArmourSaveModifier = {
    unitType: UnitType;
    modifier: number;
}

export type Trait = 
    "Light" |
    "Point Defence"
;

export type WeaponStatsAtRange = {
    minRange: number;
    maxRange: number;
    dice: number;
    hit: number;
    armourSaveModifiers: ArmourSaveModifier[];
    extraTraits: Trait[];
}

export type WeaponStats = {
    name: string; //type?
    arc: Arc;
    weaponStatsAtRange: WeaponStatsAtRange[];
    traits: Trait[];
};

export type Stats = {
    unitStats: UnitStats;
    weaponStats: WeaponStats[];
}