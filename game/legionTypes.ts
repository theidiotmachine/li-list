export const LegionFormationNames = [
    "Legion Aerial Assault",
    "Legion Armoured Company",
    "Legion Demi-Company",
    "Legion Drop Pod Assault",
    "Legion Garrison Force",
    "Legion Heavy Assault Spearhead",
    "Legion Sky-hunter Phalanx",
    "Legion Subterranean Assault",
    "Brethren of Iron",
] as const;
export type LegionFormationName = (typeof LegionFormationNames)[number];

export type LegionFormationSlot =
    "Brethren of Iron Bastion" |
    "Brethren of Iron Core" |
    "Brethren of Iron Support" |
    "Brethren of Iron Vanguard" |
    "Legion Heavy Assault Spearhead Support Compulsory" |
    "Legion Terminators" |
    "Sky-hunter Phalanx Vanguard Compulsory" //This just makes it easier. It can't have bikes
;

export type LegionDetachmentName = 
    "Legion Assault Detachment" | 
    "Legion Command" | 
    "Legion Kratos Commander" | 
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
    "Legion Predator Commander" |
    "Legion Predator Squadron" |
    "Legion Rapier Battery Detachment" |
    "Legion Rhino Detachment" |
    "Legion Sabre Squadron" |
    "Legion Scimitar Jetbike Squadron" |
    "Legion Sicaran Arcus Squadron" |
    "Legion Sicaran Commander" |
    "Legion Sicaran Punisher Squadron" |
    "Legion Sicaran Squadron" |
    "Legion Siege Dreadnought Detachment" |
    "Legion Spartan Detachment" |
    "Legion Storm Eagle Squadron" |
    "Legion Tactical Detachment"| 
    "Legion Tarantula Battery" |
    "Legion Termite Detachment" |
    "Legion Terminator Detachment" |
    "Legion Thunderhawk Gunship" |
    "Legion Xiphon Interceptor Squadron" |
    "Leviathan Siege Dreadnought Detachment"
;

export const AllLegionModelNames = [
    "Assault Marines", 
    "Command Squad",
    "Contemptor Dreadnought",
    "Deathstorm Drop Pod",
    "Deredeo Dreadnought",
    "Dreadnought Drop Pod",
    "Drop Pod",
    "Fire Raptor",
    "Javelin",
    "Kratos Commander",
    "Land Raider",
    "Land Speeder",
    "Legion Kratos",
    "Legion Outrider", 
    "Legion Predator", 
    "Legion Rapier",
    "Legion Sicaran",
    "Legion Tarantula",
    "Legion Terminators",
    "Legion Termite",
    "Leviathan Dreadnought",
    "Missile Launcher Legionaries", //renamed from "Missile Launcher Heavy Support Legionaries" because come on
    "Outrider",
    "Palisade Drop Pod",
    "Plasma Support Legionaries",
    "Predator Commander",
    "Rhino",
    "Sabre",
    "Scimitar Jetbike",
    "Sicaran Arcus",
    "Sicaran Commander",
    "Sicaran Punisher",
    "Spartan",
    "Storm Eagle",
    "Tactical Legionaries",
    "Termite",
    "Thunderhawk Gunship",
    "Xiphon Interceptor"
] as const;
export type LegionModelName = (typeof AllLegionModelNames)[number];

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