import { AuxiliaDetachmentName, AuxiliaFormationSlot, AuxiliaFormationName, AuxiliaModelName, AllAuxiliaModelNames } from "./auxiliaTypes.ts";
import { LegionDetachmentName, LegionFormationSlot, LegionFormationName, LegionModelName, LegionName, AllLegionModelNames } from "./legionTypes.ts";
import { DarkMechanicumDetachmentName, DarkMechanicumFormationName, DarkMechanicumModelName, DarkMechanicumModelNames, DarkMechanicumSlot, MechanicumDetachmentName, MechanicumFormationName, MechanicumModelName, MechanicumModelNames, MechanicumSlot } from "./mechanicumTypes.ts";
import { CollegiaTitanicaFormationSlot, CollegiaTitanicaFormationName, StrategicAssetDetachmentName, StrategicAssetFormationName, StrategicAssetModelName, QuestorisFamiliaFormationName, QuestorisFamiliaFormationSlot, AllStrategicAssetModelNames } from "./strategicAssetTypes.ts";
import { CommandAttachment } from "./statsTypes.ts";
import { WeaponType } from "./weaponTypes.ts";

export type DetachmentValidationError = 
    "Attached Deployment not attached to detachment" |
    "Commander not attached to detachment" |
    "Cortex Controller rules broken" |
    "Invalid loadouts of models in group" |
    "Invalid number of models in group" |
    "Multiple Commanders in Formation" | 
    "Need more dedicated transports" |
    "Only one of these detachments should be present" | 
    "Required detachment missing" | 
    "Tank Commander rules broken" |
    "Too few models in detachment" | 
    "Too few models in group" | 
    "Too many dedicated transports" |
    "Too many models in detachment" | 
    "Too many models in group" 
;

export type DetachmentValidationState = {
    valid: boolean,
    error?: DetachmentValidationError,
    data?: string,
};

export type ArmyValidationError = 
    "Detachments invalid" |
    "Too many points" |
    "Too many points on allied detachments"|
    "Too many Support formations"
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
    "Dark Mechanicum",
    "Legiones Astartes",
    "Mechanicum Taghmata",
    "Questoris Familia",
    "Solar Auxilia",
    "Strategic Asset",
] as const;
export type ArmyListName = (typeof ArmyListNames)[number];    

export type FormationName = 
    AuxiliaFormationName | 
    DarkMechanicumFormationName |
    CollegiaTitanicaFormationName |
    LegionFormationName | 
    MechanicumFormationName |
    QuestorisFamiliaFormationName |
    StrategicAssetFormationName
;

export type FormationSlot = 
    AuxiliaFormationSlot |
    CollegiaTitanicaFormationSlot |
    DarkMechanicumSlot |
    LegionFormationSlot |
    MechanicumSlot |
    QuestorisFamiliaFormationSlot |
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

export type SlotRequirementType = 
    "Required" | 
    "Optional" | 
    "One Of" | 
    "One Of Group" | 
    "Required One Of Group" |
    "Extra Tech-Priest Auxilia"
;
export type SlotRequirements = {
    slot: FormationSlot;
    slotRequirementType: SlotRequirementType;
    oneOfGroup?: number;
    oneOfGroupGroup?: number;
    displayName?: string;
    //stupid tech priests get extra detachments. This means that they are linked to another slot, 
    //and when that slot is cleared down, this one needs to be, to.
    //Linked slot is from child to parent, so this is the slot of the parent 
    linkedSlotIndex?: number;
};

export type FormationType = "Normal" | "Support";

export type FormationShape = {
    formationType?: FormationType;
    slotRequirements: SlotRequirements[];
    customValidation?: (Formation: Formation, detachmentIndex: number) => DetachmentValidationState
}
        
export type DetachmentName = 
    AuxiliaDetachmentName | 
    DarkMechanicumDetachmentName | 
    LegionDetachmentName | 
    MechanicumDetachmentName | 
    StrategicAssetDetachmentName
;

export type ModelName = LegionModelName | AuxiliaModelName |
    MechanicumModelName | DarkMechanicumModelName | StrategicAssetModelName;

export const AllModelNames: readonly ModelName[] = [
    ...(AllLegionModelNames as readonly ModelName[]),
    ...(AllAuxiliaModelNames as readonly ModelName[]),
    ...(MechanicumModelNames as readonly ModelName[]),
    ...(DarkMechanicumModelNames as readonly ModelName[]),
    ...(AllStrategicAssetModelNames as readonly ModelName[])
];

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
    formationType?: FormationName;
}

export type ModelGroupShape = {
    modelName: ModelName;
    maxModels?: number,
    minModels?: number,
    possibleModelGroupQuantities: ModelGroupQuantity[];
    modelLoadoutSlots: ModelLoadoutSlotShape[];
    dedicatedTransport?: boolean;
    //this shape is only available in these formation names:
    formationNames?: FormationName[];
    //and in those formations, in this slot requirement type:
    formationSlotRequirement?: SlotRequirementType;
    //mostly for 'Independent' sub parts of a detachment
    unitTraits?: UnitTrait[];
    //Knights have a special rule where every model in the unit is independent
    //Then Tech-priests get a weird multi-slot thing which is to all intents and purposes the same
    independentModels?: true;
}

//A group of models with a particular loadout
export type ModelLoadoutGroup = {
    number: number;
    modelLoadoutSlots: ModelLoadoutSlot[];

    //calculated
    points: number;
};

//A group of models of the same name, e.g. five rhinos
export type ModelGroup = {
    modelName: ModelName;
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
    formationName: FormationName | "";
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

export type SaveArc =
    "All" |
    "Front" |
    "Rear"
;

export type Save = {
    saveType: SaveType;
    save: number;
    arc: SaveArc;
};


export type UnitTrait = 
    "Agile" |
    "Armoured" |
    "Assault Transport (2)" |
    "Assault Transport (5)" |
    "Attached Deployment" |
    "Auger Array" |
    "Automated Sentry" |
    "Battlesmith" |
    "Blessed Auto-simulacra" |
    "Bulky" |
    "Chain of Command" |
    "Commander" |
    "Compact" |
    "Cortex Controller" |
    "Cybernetica Cortex (Advance, Charge)" |
    "Cybernetica Cortex (Advance, March)" |
    "Cybernetica Cortex (Charge, March)" |
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
    "Large Assault Transport (5)" |
    "Large Transport (2)" |
    "Large Transport (4)" |
    "Line" |
    "Loyalist" |
    "Macro-extinction Targeting Protocols" |
    "Master Tactician" |
    "Medicae" |
    "Nechrotechnica" |
    "Networked Anima" |
    "Nimble" |
    "Noosphere Controller" |
    "Orbital Assault" |
    "Outflank" |
    "Remote Controlled Detonation" |
    "Shield Generator (5+)" |
    "Skimmer" |
    "Solar Auxilia HQ (6)" |
    "Solar Auxilia HQ (10)" |
    "Steadfast" |
    "Tracking Array" |
    "Traitor" |
    "Transport (2)" |
    "Transport (4)"
;

//note this isn't completely correct, as it doesn't take into account the unit traits from loadouts
export const statsHasTrait = (stats: Stats, trait: UnitTrait): boolean => 
    stats.unitTraits.findIndex((t)=>t==trait) != -1

//note this isn't completely correct, as it doesn't take into account the unit traits from loadouts
export const statsHasTraitLike = (stats: Stats, traitString: string): boolean => 
    stats.unitTraits.findIndex((t)=>t.startsWith(traitString)) != -1

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
    voidShields?: number;
    constructShields?: number;
    tacticalStrength: number;
    unitTraits: UnitTrait[];
    modelLoadoutSlots: StatsModelLoadoutSlot[];
    commandAttachment?: CommandAttachment;
}