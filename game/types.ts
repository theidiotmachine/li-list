import { AuxiliaDetachmentType, AuxiliaFormationType, AuxiliaModelType } from "./auxiliaTypes.ts";
import { LegionDetachmentType, LegionFormationType, LegionModelType } from "./legionTypes.ts";
import { WeaponType } from "./weaponTypes.ts";

export const Allegiances = [
    "Loyalist",
    "Traitor"
] as const;
export type Allegiance = (typeof Allegiances)[number];

export const ArmyListNames = [
    "Legions Astartes",
    "Solar Auxilia",
    "Strategic Asset",
] as const;
export type ArmyListName = (typeof ArmyListNames)[number];    

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
    "Light Armour" |
    "Sky-hunter Phalanx Vanguard Compulsory" | //This just makes it easier. It can't have bikes
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
    displayName?: string;
};

export type FormationShape = {
    slotRequirements: SlotRequirements[]
}

export type StrategicAssetDetachmentType = 
    "Acastus Knight Banner" |
    "Cerastus Knight Banner" |
    "Questoris Knight Banner" |
    "Warhound Hunting Pack"
;
        
export type DetachmentType = LegionDetachmentType | AuxiliaDetachmentType | StrategicAssetDetachmentType;

export const AllStrategicAssetModelTypes = [
    "Acastus Knight Asterius",
    "Acastus Knight Porphyrion",
    "Cerastus Knight Atrapos",
    "Knight Acheron",
    "Knight Armiger",
    "Knight Castigator",
    "Knight Crusader",
    "Knight Errant",
    "Knight Gallant",
    "Knight Lancer",
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
    //use this if the loadout is not an actual weaponType
    weaponTypes?: WeaponType[]; 
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
    "Invalid number of models in group" |
    "Invalid loadouts of models in group" |
    "Need more dedicated transports" |
    "Too many dedicated transports"
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

export type Formation = {
    armyListName: ArmyListName | "";
    formationType: FormationType | "";
    points: number;
    detachments: Detachment[];
    uuid: string;
    breakPoint: number;
};

export type Army = {
    allegiance: Allegiance | "";
    primaryArmyListName: ArmyListName | "";
    formations: Formation[];
    maxPoints: number;
    points: number;
    uuid: string;
    name: string;
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
    "Armoured" |
    "Assault Transport (2)" |
    "Assault Transport (5)" |
    "Automated Sentry" |
    "Blessed Auto-simulacra" |
    "Bulky" |
    "Commander" |
    "Deep Strike" |
    "Drop Pod" |
    "Forward Deployment" |
    "Furious Charge" |
    "Implacable" |
    "Independent" |
    "Inspire (8)" |
    "Ionic Flare Shield" |
    "Jump Packs" |
    "Large Transport (2)" |
    "Macro-extinction Targeting Protocols" |
    "Master Tactician" |
    "Medicae" |
    "Nimble" |
    "Shield Generator (5+)" |
    "Skimmer" |
    "Steadfast" |
    "Tracking Array" |
    "Transport (2)"
;

export type WeaponTrait = 
    "Accurate" |
    "Armourbane" |
    "Assault" |
    "Anti-tank" |
    "Barrage" |
    "Blast (3\")" |
    "Collapsing Singularity" |
    "Deflagrate" |
    "Demolisher" |
    "Engine Killer (1)" |
    "Graviton Pulse" |
    "Ignores Cover" |
    "Light" |
    "Light AT" |
    "Limited" |
    "Point Defence" |
    "Rapid Fire" |
    "Rend" |
    "Saturation Fire" |
    "Shieldbane" |
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

export type WeaponStats = {
    arc: Arc;
    weaponStatsAtRange: WeaponStatsAtRange[];
};

export type Stats = {
    unitType: UnitType;
    scale: Scale;
    advance?: number;
    charge?: number;
    march?: number;
    saves: Save[];
    caf: number;
    morale?: number;
    wounds: number;
    voidShields: number;
    tacticalStrength: number;
    unitTraits: UnitTrait[];

    weaponTypes: WeaponType[];

    requiredWeaponTypes?: WeaponType[];
}