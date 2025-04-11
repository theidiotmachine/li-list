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
    "Auxilia Cyclops Detachment" |
    "Auxilia Dracosan Detachment" |
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
    "Cyclops",
    "Dracosan",
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
