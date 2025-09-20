export const AuxiliaFormationNames = [
    "Solar Auxilia Armoured Company",
    "Solar Auxilia Artillery Company",
    "Solar Auxilia Leman Russ Spearhead",
    "Solar Auxilia Mechanised Infantry Sub-Cohort",
    "Solar Auxilia Pioneer Company",
    "Solar Auxilia Sub-Cohort",
    "Solar Auxilia Super-Heavy Company",
    "Solar Auxilia Titan Hunter Company",
    //support
    "Iron Cohort",
] as const;
export type AuxiliaFormationName = (typeof AuxiliaFormationNames)[number];

export type AuxiliaFormationSlot = 
    "Auxilia Lasrifle" |
    "Auxilia Shadowsword" |
    "Iron Cohort Bastion" |
    "Iron Cohort Core" |
    "Iron Cohort Support" |
    "Leman Russ" |
    "Solar Auxilia Armoured Company Compulsory Battle Tank" |
    "Solar Auxilia Armoured Company Compulsory Heavy Armour" |
    "Storm Section"
;

export type AuxiliaDetachmentName =
    "Auxilia Aethon Heavy Sentinel Patrol" |
    "Auxilia Arvus Lighter" |
    "Auxilia Avenger Strike Fighter Squadron" |
    "Auxilia Baneblade Squadron" |
    "Auxilia Basilisk Battery" |
    "Auxilia Cyclops Detachment" |
    "Auxilia Dracosan Detachment" |
    "Auxilia Hellhammer Squadron" |
    "Auxilia Lasrifle Tercio" |
    "Auxilia Lightning Fighter Squadron" |
    "Auxilia Malcador Infernus Squadron" |
    "Auxilia Marauder Bomber Squadron" |
    "Auxilia Medusa Battery" |
    "Auxilia Ogryn Charonite Section" |
    "Auxilia Rapier Battery" |
    "Auxilia Shadowsword Squadron" |
    "Auxilia Stormblade Squadron" |
    "Auxilia Stormhammer Squadron" |
    "Auxilia Stormsword Squadron" |
    "Auxilia Tactical Command Detachment" | 
    "Auxilia Tarantula Battery" |
    "Auxilia Thunderbolt Squadron" |
    "Auxilia Valdor Squadron" |
    "Auxilia Veletaris Storm Section" |
    "Legate Commander Detachment" |
    "Leman Russ Annihilator Squadron" |
    "Leman Russ Demolisher Squadron" |
    "Leman Russ Executioner Squadron" |
    "Leman Russ Exterminator Squadron" |
    "Leman Russ Strike Squadron" |
    "Leman Russ Vanquisher Squadron" |
    "Malcador Annihilator Squadron" |
    "Malcador Tank Squadron" |
    "Malcador Vanquisher Squadron"
;

export const AllAuxiliaModelNames = [
    "Aethon Heavy Sentinel",
    "Arvus Lighter",
    "Auxilia Baneblade",
    "Auxilia Commander",
    "Auxilia Hellhammer",
    "Auxilia Rapier",
    "Auxilia Tarantula",
    "Auxiliaries",
    "Auxiliaries with Flamers",
    "Avenger Strike Fighter",
    "Basilisk",
    "Charonite Ogryns",
    "Cyclops",
    "Dracosan",
    "Leman Russ Annihilator",
    "Leman Russ Demolisher",
    "Leman Russ Executioner",
    "Leman Russ Exterminator",
    "Leman Russ Tank",
    "Leman Russ Vanquisher",
    "Lightning Fighter",
    "Malcador Annihilator",
    "Malcador Infernus",
    "Malcador Tank",
    "Malcador Vanquisher",
    "Marauder Bomber", 
    "Marauder Colossus", 
    "Marauder Destroyer", 
    "Marauder Pathfinder", 
    "Medusa",
    "Shadowsword",
    "Stormblade",
    "Stormhammer",
    "Stormsword",
    "Tactical Command",
    "Thunderbolt Fighter",
    "Valdor",
    "Veletarii"
] as const;
export type AuxiliaModelName = (typeof AllAuxiliaModelNames)[number];


