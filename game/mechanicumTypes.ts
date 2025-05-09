export const MechanicumFormationNames = [
    "Autokratorii Regiment",
    "Legio Cybernetica Cohort"
] as const;
export type MechanicumFormationName = typeof MechanicumFormationNames[number];

export type MechanicumSlot = 
    "Extra Tech-Priest Auxilia" |
    "Support Legio Cybernetica Cohort" |
    "Tech-Priest Auxilia" |
    "Vanguard Legio Cybernetica Cohort"
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
    "Myrmidon Destructor Host" |
    "Myrmidon Secutor Host" |
    "Tech-Priest Auxilia" |
    "Thallax Cohort" |
    "Thanatar Siege-automata Maniple" |
    "Ursarax Cohort" |
    "Vorax Battle-automata Maniple" |
    "Vultarax Battle-automata Squadron"
;

export const MechanicumModelNames = [
    "Archmagos on Abeyant",
    "Archmagos Prime",
    "Arlatax",
    "Castellax",
    "Domitar",
    "Karacnos",
    "Krios",
    "Myrmidon Destructor",
    "Myrmidon Secutor",
    "Thanatar",
    "Tech-Priest",
    "Tech-thralls",
    "Thallax",
    "Ursarax",
    "Vorax",
    "Vultarax",
] as const;
export type MechanicumModelName = typeof MechanicumModelNames[number];

