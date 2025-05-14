export const MechanicumFormationNames = [
    "Autokratorii Regiment",
    "Ordo Reductor Subdivision",
    "Legio Cybernetica Cohort",
    "Taghma Sub-covenant",

    //support formations
    "Itinerant Cybernetica Cohort",
] as const;
export type MechanicumFormationName = typeof MechanicumFormationNames[number];

export const DarkMechanicumFormationNames = [
    "Dark Taghma Sub-covenant",
    "Purge Protocol Cohort",
    "Swarm Protocol Cohort",
    "Terror Protocol Cohort",
    //support
    "Ironbound Ruinhost",
] as const;
export type DarkMechanicumFormationName = typeof DarkMechanicumFormationNames[number];

export type MechanicumSlot = 
    "Adsecularis Tech-Thrall Covenant" |
    "Extra Tech-Priest Auxilia" |
    "Support Legio Cybernetica Cohort" |
    "Tech-Priest Auxilia" |
    "Vanguard Legio Cybernetica Cohort"
;

export type DarkMechanicumSlot = 
    "Errax" |
    "Ironbound Ruinhost Bastion" |
    "Ironbound Ruinhost HQ" |
    "Ironbound Ruinhost Support" |
    "Ironbound Ruinhost Vanguard"
;

export type MechanicumDetachmentName = 
    "Adsecularis Tech-Thrall Covenant" |
    "Archmagos Prime" |
    "Archmagos Prime on Abeyant" |
    "Arlatax Battle-automata Maniple" |
    "Castellax Battle-automata Maniple" |
    "Domitar Battle-automata Maniple" |
    "Karacnos Assault Tank Squadron" |
    "Krios Battle Tank Squadron" |
    "Krios Venator Squadron" |
    "Myrmidon Destructor Host" |
    "Myrmidon Secutor Host" |
    "Tech-Priest Auxilia" |
    "Thallax Cohort" |
    "Thanatar Siege-automata Maniple" |
    "Triaros Armoured Conveyor" |
    "Ursarax Cohort" |
    "Vorax Battle-automata Maniple" |
    "Vultarax Battle-automata Squadron"
;

export type DarkMechanicumDetachmentName = 
    "Errax 'Butcher' Assault Stalker Cohort" |
    "Harpax 'Swarmer' Scout Host" |
    "Scintillax 'Cyclops' Noospheric Stalker Network" |
    "Serperos 'Overlord' Heavy Stalker Maniple" |
    "Tenebrax 'Archer' Battle Stalker Cohort"
;

export const MechanicumModelNames = [
    "Archmagos on Abeyant",
    "Archmagos Prime",
    "Arlatax",
    "Castellax",
    "Domitar",
    "Karacnos",
    "Krios",
    "Krios Venator",
    "Myrmidon Destructor",
    "Myrmidon Secutor",
    "Thanatar",
    "Tech-Priest",
    "Tech-thralls",
    "Thallax",
    "Triaros",
    "Ursarax",
    "Vorax",
    "Vultarax",
] as const;
export type MechanicumModelName = typeof MechanicumModelNames[number];

export const DarkMechanicumModelNames = [
    "Errax",
    "Harpax",
    "Scintillax",
    "Serperos",
    "Tenebrax",
] as const;
export type DarkMechanicumModelName = typeof DarkMechanicumModelNames[number];
