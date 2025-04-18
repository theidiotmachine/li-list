export const LegionFormationTypes = [
    "Legion Aerial Assault",
    "Legion Armoured Company",
    "Legion Demi-Company",
    "Legion Drop Pod Assault",
    "Legion Garrison Force",
    "Legion Heavy Assault Spearhead",
    "Legion Sky-hunter Phalanx",
] as const;
export type LegionFormationType = (typeof LegionFormationTypes)[number];

export type LegionDetachmentType = 
    "Legion Assault Detachment" | 
    "Legion Command" | 
    "Legion Kratos Squadron" | 
    "Legion Deathstorm Drop Pod Battery" |
    "Legion Deredeo Dreadnought Detachment" |
    "Legion Dreadnought Talon" | 
    "Legion Dreadnought Drop Pod Detachment" |
    "Legion Drop Pod Detachment" |
    "Legion Fire Raptor Squadron" |
    "Legion Javelin Squadron" |
    "Legion Land Raider Detachment" |
    "Legion Land Speeder Squadron" |
    "Legion Missile Launcher Support Detachment" |
    "Legion Outrider Squadron" |
    "Legion Plasma Gun Support Detachment" |
    "Legion Predator Squadron" |
    "Legion Rapier Battery Detachment" |
    "Legion Rhino Detachment" |
    "Legion Scimitar Jetbike Squadron" |
    "Legion Sicaran Squadron" |
    "Legion Siege Dreadnought Detachment" |
    "Legion Spartan Detachment" |
    "Legion Storm Eagle Squadron" |
    "Legion Tactical Detachment"| 
    "Legion Tarantula Battery" |
    "Legion Terminator Detachment" |
    "Legion Thunderhawk Gunship" |
    "Legion Xiphon Interceptor Squadron" |
    "Leviathan Siege Dreadnought Detachment"
;

export const AllLegionModelTypes = [
    "Assault Marines", 
    "Command Squad",
    "Contemptor Dreadnought",
    "Deathstorm Drop Pod",
    "Deredeo Dreadnought",
    "Dreadnought Drop Pod",
    "Drop Pod",
    "Fire Raptor",
    "Javelin",
    "Land Raider",
    "Land Speeder",
    "Legion Kratos",
    "Legion Outrider", 
    "Legion Predator", 
    "Legion Rapier",
    "Legion Sicaran",
    "Legion Tarantula",
    "Legion Terminators",
    "Leviathan Dreadnought",
    "Missile Launcher Legionaries", //renamed from "Missile Launcher Heavy Support Legionaries" because come on
    "Outrider",
    "Palisade Drop Pod",
    "Plasma Support Legionaries",
    "Rhino",
    "Scimitar Jetbike",
    "Spartan",
    "Storm Eagle",
    "Tactical Legionaries",
    "Thunderhawk Gunship",
    "Xiphon Interceptor"
] as const;
export type LegionModelType = (typeof AllLegionModelTypes)[number];

export const AllLegionNames = [
    "Dark Angels",
    "Emperor's Children",
    "Iron Warriors",
    "White Scars",
    "Space Wolves",
    "Imperial Fists",
    "Night Lords",
    "Blood Angels",
    "Iron Hands",
    "World Eaters",
    "Ultramarines",
    "Death Guard",
    "Thousand Sons",
    "Sons of Horus",
    "Word Bearers",
    "Salamanders",
    "Raven Guard",
    "Alpha Legion"
] as const;
export type LegionName = (typeof AllLegionNames)[number];