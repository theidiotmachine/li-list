export const AuxiliaFormationTypes = [
    "Solar Auxilia Armoured Company",
    "Solar Auxilia Artillery Company",
    "Solar Auxilia Leman Russ Spearhead",
    "Solar Auxilia Mechanised Infantry Sub-Cohort",
    "Solar Auxilia Pioneer Company",
    "Solar Auxilia Sub-Cohort",
    "Solar Auxilia Super-Heavy Company",
    "Solar Auxilia Titan Hunter Company",
] as const;
export type AuxiliaFormationType = (typeof AuxiliaFormationTypes)[number];

export type AuxiliaFormationSlot = 
    "Auxilia Lasrifle" |
    "Auxilia Shadowsword" |
    "Leman Russ" |
    "Solar Auxilia Armoured Company Compulsory Battle Tank" |
    "Solar Auxilia Armoured Company Compulsory Heavy Armour" |
    "Storm Section"
;

export type AuxiliaDetachmentName =
    "Auxilia Aethon Heavy Sentinel Patrol" |
    "Auxilia Arvus Lighter" |
    "Auxilia Avenger Strike Fighter Squadron" |
    "Auxilia Basilisk Battery" |
    "Auxilia Cyclops Detachment" |
    "Auxilia Dracosan Detachment" |
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
    "Auxilia Super-Heavy Tank Squadron" |
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
    "Malcador Tank Squadron"
;

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
    "Basilisk",
    "Charonite Ogryns",
    "Cyclops",
    "Dracosan",
    "Leman Russ Annihilator",
    "Leman Russ Demolisher",
    "Leman Russ Executioner",
    "Leman Russ Exterminator",
    "Leman Russ Tank",
    "Lightning Fighter",
    "Malcador Infernus",
    "Malcador Tank",
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
export type AuxiliaModelType = (typeof AllAuxiliaModelTypes)[number];


