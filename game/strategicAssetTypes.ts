export const StrategicAssetFormationTypes = [
    "Knight Household Lance",
    "Legion Support",
] as const;
export type StrategicAssetFormationType = (typeof StrategicAssetFormationTypes)[number];

export const CollegiaTitanicaFormationTypes = [
    "Axiom Battleline Maniple",
    "Corsair Battleline Maniple",
    "Ferox Light Maniple",
    "Lupercal Light Maniple",
    "Purgigatus Heavy Maniple",
    "Ruptura Battleline Maniple",
] as const;
export type CollegiaTitanicaFormationType = (typeof CollegiaTitanicaFormationTypes)[number];

export type CollegiaTitanicaFormationSlot = 
    "Dire Wolf" |
    "Reaver" |
    "Warbringer" |
    "Warhound" |
    "Warlord" |
    "Warmaster"
;

export type StrategicAssetDetachmentName = 
    "Acastus Knight Banner" |
    "Cerastus Knight Banner" |
    "Questoris Knight Banner" |

    "Dire Wolf Heavy Scout Titan" |
    "Reaver Battle Titan" |
    "Warbringer Nemesis Titan" |
    "Warhound Hunting Pack" | 
    "Warlord Battle Titan" |
    "Warlord-Sinister Battle Titan" |
    "Warmaster Heavy Battle Titan" |
    "Warmaster Iconoclast Titan"
;

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

    "Dire Wolf Titan",
    "Reaver Battle Titan",
    "Warbringer Nemesis Titan",
    "Warhound Titan",
    "Warlord Battle Titan",
    "Warlord-Sinister",
    "Warmaster Titan",
    "Warmaster Iconoclast"
];
export type StrategicAssetModelType = (typeof AllStrategicAssetModelTypes)[number];