import { AuxiliaDetachmentName, AuxiliaFormationSlot, AuxiliaFormationType, AuxiliaModelType } from "./auxiliaTypes.ts";
import { LegionDetachmentName, LegionFormationSlot, LegionFormationType, LegionModelType, LegionName } from "./legionTypes.ts";
import { CollegiaTitanicaFormationSlot, CollegiaTitanicaFormationType, StrategicAssetDetachmentName, StrategicAssetFormationType, StrategicAssetModelType } from "./strategicAssetTypes.ts";
import { WeaponType } from "./weaponTypes.ts";

export type DetachmentValidationError = 
    "Required detachment missing" | 
    "Too many models in detachment" | 
    "Too few models in detachment" | 
    "Only one of these detachments should be present" | 
    "Too few models in group" | 
    "Too many models in group" |
    "Invalid number of models in group" |
    "Invalid loadouts of models in group" |
    "Need more dedicated transports" |
    "Too many dedicated transports" |
    "Tank Commander rules broken" |
    "Commander not attached to detachment" |
    "Multiple Commanders in Formation"
;
export type DetachmentValidationState = {
    valid: boolean,
    error?: DetachmentValidationError,
    data?: string,
};

export type ArmyValidationError = 
    "Detachments invalid" |
    "Too many points" |
    "Too many points on allied detachments"
;
export type ArmyValidationState = {
    valid: boolean,
    error?: ArmyValidationError,
    data?: string,
};

export const Allegiances = [
    "Loyalist",
    "Traitor"
] as const;
export type Allegiance = (typeof Allegiances)[number];

export const ArmyListNames = [
    "Collegia Titanica",
    "Legions Astartes",
    "Solar Auxilia",
    "Strategic Asset",
] as const;
export type ArmyListName = (typeof ArmyListNames)[number];    

export type FormationType = 
    AuxiliaFormationType | 
    CollegiaTitanicaFormationType |
    LegionFormationType | 
    StrategicAssetFormationType
;

export type FormationSlot = 
    AuxiliaFormationSlot |
    CollegiaTitanicaFormationSlot |
    LegionFormationSlot |
    "Air Support" | 
    "Artillery" | 
    "Bastion" | 
    "Battle Tank" | 
    "Core" | 
    "Heavy Armour" | 
    "HQ" | 
    "Knight" |
    "Light Armour" |
    "Support" | 
    "Titan" |
    "Transport" | 
    "Vanguard" 
; 

export type SlotRequirementType = "Required" | "Optional" | "One Of";
export type SlotRequirements = {
    slot: FormationSlot;
    slotRequirementType: SlotRequirementType;
    oneOfGroup?: number;
    displayName?: string;
};

export type FormationShape = {
    slotRequirements: SlotRequirements[];
    customValidation?: (Formation: Formation, detachmentIndex: number) => DetachmentValidationState
}
        
export type DetachmentName = LegionDetachmentName | AuxiliaDetachmentName | StrategicAssetDetachmentName;

//actually called 'Model Name'
export type ModelType = LegionModelType | AuxiliaModelType | StrategicAssetModelType;

//a set of weapons which can be put in a slot
export type ModelLoadoutForSlot = {
    //abstract name for the loadout
    loadout: string;
    points: number;
}

//a part of the model which can have a different weapon slotted in
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
    possibleModelLoadouts: ModelLoadoutForSlot[];
    formationType?: FormationType;
}

export type ModelGroupShape = {
    modelType: ModelType;
    maxModels?: number,
    minModels?: number,
    possibleModelGroupQuantities: ModelGroupQuantity[];
    modelLoadoutSlots: ModelLoadoutSlotShape[];
    dedicatedTransport?: boolean;
    formationType?: FormationType;
    //mostly for 'Independent' sub parts of a detachment
    unitTraits?: UnitTrait[];
    //Knights have a special rule where every model in the unit is independent
    independentModels?: true;
}

//A group of models with a particular loadout
export type ModelLoadoutGroup = {
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
    modelLoadoutGroups: ModelLoadoutGroup[];

    //calculated
    points: number;

    unitTraits: UnitTrait[];
};

export type Detachment = {
    slot: FormationSlot;
    detachmentName: DetachmentName | "";
    modelGroups: ModelGroup[];
    points: number;
    validationState: DetachmentValidationState;
    attachedDetachmentIndex?: number;
};

export type Formation = {
    armyListName: ArmyListName | "";
    formationType: FormationType | "";
    points: number;
    detachments: Detachment[];
    uuid: string;
    breakPoint: number;
    activations: number;
    legionName?: LegionName | "";
};

export type Army = {
    allegiance: Allegiance | "";
    primaryArmyListName: ArmyListName | "";
    formations: Formation[];
    maxPoints: number;
    points: number;
    alliedPoints: number;
    primaryPoints: number;
    uuid: string;
    name: string;
    validationState: ArmyValidationState;
    activations: number;
};

//this is a top level box in the lists
export type DetachmentConfiguration = {
    maxModels?: number,
    minModels?: number,
    modelGroupShapes: ModelGroupShape[],
    customValidation?: (detachment: Detachment) => DetachmentValidationState
}

export type DetachmentType = 
    "Cavalry" |
    "Infantry" |
    "Vehicle" |
    "Walker" |
    "Knight" |
    "Structure" |
    "Super-heavy vehicle" |
    "Titan"
;

export type Scale = 1 | 2 | 3 | 4 | 5;

export type SaveType = 
    "Armour" |
    "Invuln" |
    "Ion Shield" |
    "Jink"
;

export type Save = {
    saveType: SaveType;
    save: number;
    arc: Arc;
};

export type Arc =
    "All" |
    "Front" |
    "Melee" |
    "Rear"
;

export type SaveModifier = {
    modifier: number;
    wounds: number;
}

export type UnitTrait = 
    "Agile" |
    "Armoured" |
    "Assault Transport (2)" |
    "Assault Transport (5)" |
    "Automated Sentry" |
    "Blessed Auto-simulacra" |
    "Bulky" |
    "Chain of Command" |
    "Commander" |
    "Compact" |
    "Deep Strike" |
    "Dread Aura (8)" |
    "Drop Pod" |
    "Explorer Adaptation" |
    "Flyer" |
    "Forward Deployment" |
    "Furious Charge" |
    "Hover" |
    "Implacable" |
    "Independent" |
    "Infiltrate" |
    "Inspire (8)" |
    "Interceptor" |
    "Ionic Flare Shield" |
    "Jump Packs" |
    "Large Transport (2)" |
    "Line" |
    "Loyalist" |
    "Macro-extinction Targeting Protocols" |
    "Master Tactician" |
    "Medicae" |
    "Nechrotechnica" |
    "Nimble" |
    "Orbital Assault" |
    "Remote Controlled Detonation" |
    "Shield Generator (5+)" |
    "Skimmer" |
    "Solar Auxilia HQ (6)" |
    "Solar Auxilia HQ (10)" |
    "Steadfast" |
    "Tracking Array" |
    "Transport (2)" |
    "Transport (4)"
;

export type WeaponTrait = 
    "Accurate" |
    "Armourbane" |
    "Assault" |
    "Anti-tank" |
    "Barrage" |
    "Blast (3\")" |
    "Bunker Buster" |
    "Burrowing" |
    "Co-axial" |
    "Collapsing Singularity" |
    "Deflagrate" |
    "Demolisher" |
    "Engine Killer (1)" |
    "Engine Killer (2)" |
    "Firestorm" |
    "Graviton Pulse" |
    "Ignores Cover" |
    "Light" |
    "Light AT" |
    "Limited" |
    "Point Defence" |
    "Rapid Fire" |
    "Reach" |
    "Rend" |
    "Ripple Fire" |
    "Saturation Fire" |
    "Shieldbane" |
    "Shock Pulse" |
    "Skyfire" | 
    "Tracking" |
    "Wrecker (1)" |
    "Wrecker (2)" |
    "Wrecker (3)"
;

export type WeaponStatsAtRange = {
    minRange?: number;
    maxRange?: number;
    dice?: number | string;
    hit?: number;
    infAndCav?: SaveModifier;
    walker?: SaveModifier;
    vShvKT?: SaveModifier;
    ionShield?: SaveModifier;
    structure?: SaveModifier;
    voidShields?: number;
    traits: WeaponTrait[];
}

export const weaponHasTrait = (wsar: WeaponStatsAtRange, trait: WeaponTrait): boolean => 
    wsar.traits.findIndex((t)=>t==trait) != -1

export const weaponHasTraitLike = (wsar: WeaponStatsAtRange, traitString: string): boolean => 
    wsar.traits.findIndex((t)=>t.startsWith(traitString)) != -1

//note this isn't completely correct, as it doesn't take into account the unit traits from loadouts
export const statsHasTrait = (stats: Stats, trait: UnitTrait): boolean => 
    stats.unitTraits.findIndex((t)=>t==trait) != -1

export type WeaponStats = {
    arc: Arc;
    weaponStatsAtRange: WeaponStatsAtRange[];
};

//a set of weapons which can be put in a slot
export type StatsModelLoadoutForSlot = {
    //abstract name for the loadout
    loadout: string;
    //use this if the loadout is not an actual weaponType
    weaponTypes?: WeaponType[];
    //some loadouts change the traits for the unit
    unitTraits?: UnitTrait[];
}

//a part of the model which can have a different weapon slotted in
export type StatsModelLoadoutSlot = {
    name: string;
    possibleModelLoadouts: StatsModelLoadoutForSlot[];
    //yes I know this breaks a load of rules. Used for Tank Commanders
    notAWeapon?: boolean;
}

export type Stats = {
    detachmentType: DetachmentType;
    scale: Scale;
    move?: number;
    saves: Save[];
    caf: number;
    morale?: number;
    wounds: number;
    voidShields: number;
    tacticalStrength: number;
    unitTraits: UnitTrait[];
    modelLoadoutSlots: StatsModelLoadoutSlot[];
    /*
    weaponTypes: WeaponType[];

    requiredWeaponTypes?: WeaponType[];
    */
}