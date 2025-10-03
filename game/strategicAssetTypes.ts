export const CollegiaTitanicaFormationNames = [
    "Axiom Battleline Maniple",
    "Corsair Battleline Maniple",
    "Ferox Light Maniple",
    "Lupercal Light Maniple",
    "Purgigatus Heavy Maniple",
    "Ruptura Battleline Maniple",
    //support
    "Collegia Titanica Support Cohorts",
    //iconic
    "Demi-Maniple Aeterna",
] as const;
export type CollegiaTitanicaFormationName = (typeof CollegiaTitanicaFormationNames)[number];

export const QuestorisFamiliaFormationNames = [
    "Barony Guard Lance",
    "Bastion Lance",
    "Bonded Household Lance",
    "Vanguard Lance",
    //support
    "Knight Household Aegis Cohorts",
    "Knight Household Retainer Cohorts",
] as const;
export type QuestorisFamiliaFormationName = (typeof QuestorisFamiliaFormationNames)[number];

export const StrategicAssetFormationNames = [
    "Knight Household Lance",
    "Legion Support",
] as const;
export type StrategicAssetFormationName = (typeof StrategicAssetFormationNames)[number];

export type CollegiaTitanicaFormationSlot = 
    "Collegia Titanica Support Cohorts Bastion" |
    "Collegia Titanica Support Cohorts Core" |
    "Collegia Titanica Support Cohorts Support" |
    "Dire Wolf" |
    "Reaver" |
    "Warbringer" |
    "Warhound" |
    "Warlord" |
    "Warmaster"
;

export type QuestorisFamiliaFormationSlot = 
    "Acastus" |
    "Armiger" |
    "Cerastus" |
    "Knight Household Aegis Cohorts Bastion" |
    "Knight Household Aegis Cohorts Support" |
    "Knight Household Retainer Cohorts Vanguard" |
    "Moirax" |
    "Mechanicum Questoris" |
    "Questoris"
;

export type StrategicAssetDetachmentName = 
    //knight detachments
    "Acastus Knight Asterius Banner" |
    "Acastus Knight Porphyrion Banner" |
    "Cerastus Knight Banner" |
    "Cerastus Knight Atrapos Banner" |
    "Questoris Knight Banner" |
    "Knight Armiger Banner" |
    "Mechanicum Moirax Knight Banner" |
    "Questoris Mechanicum Knight Banner" |

    //titans
    "Dire Wolf Heavy Scout Titan" |
    "Reaver Battle Titan" |
    "Warbringer Nemesis Titan" |
    "Warhound Hunting Pack" | 
    "Warlord Battle Titan" |
    "Warlord-Sinister Battle Titan" |
    "Warmaster Heavy Battle Titan" |
    "Warmaster Iconoclast Titan"
;

export const AllStrategicAssetModelNames = [
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
] as const;
export type StrategicAssetModelName = (typeof AllStrategicAssetModelNames)[number];