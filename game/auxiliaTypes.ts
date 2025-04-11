export const AuxiliaFormationTypes = [
    "Solar Auxilia Armoured Company",
    "Solar Auxilia Artillery Company",
    "Solar Auxilia Mechanised Infantry Sub-Cohort",
    "Solar Auxilia Pioneer Company",
    "Solar Auxilia Sub-Cohort",
    "Solar Auxilia Super-Heavy Company",
] as const;
export type AuxiliaFormationType = (typeof AuxiliaFormationTypes)[number];

export type AuxiliaDetachmentType =
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
    "Auxilia Stormhammer Squadron" |
    "Auxilia Super-Heavy Tank Squadron" |
    "Auxilia Tactical Command Detachment" | 
    "Auxilia Tarantula Battery" |
    "Auxilia Thunderbolt Squadron" |
    "Auxilia Valdor Squadron" |
    "Auxilia Veletaris Storm Section" |
    "Legate Commander Detachment" |
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
    "Leman Russ Tank",
    "Lightning Fighter",
    "Malcador Infernus",
    "Malcador Tank",
    "Marauder Bomber", 
    "Marauder Colossus", 
    "Marauder Destroyer", 
    "Marauder Pathfinder", 
    "Medusa",
    "Stormhammer",
    "Tactical Command",
    "Thunderbolt Fighter",
    "Valdor",
    "Veletarii"
] as const;
export type AuxiliaModelType = (typeof AllAuxiliaModelTypes)[number];
