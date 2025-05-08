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
    "Karacnos Assault Tank Squadron" |
    "Myrmidon Destructor Host" |
    "Myrmidon Secutor Host" |
    "Tech-Priest Auxilia" |
    "Thallax Cohort"
;

export const MechanicumModelNames = [
    "Archmagos on Abeyant",
    "Archmagos Prime",
    "Karacnos",
    "Myrmidon Destructor",
    "Myrmidon Secutor",
    "Tech-Priest",
    "Tech-thralls",
    "Thallax"
] as const;
export type MechanicumModelName = typeof MechanicumModelNames[number];

