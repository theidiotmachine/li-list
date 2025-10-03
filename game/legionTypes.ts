export const LegionFormationNames = [
    "Legion Aerial Assault",
    "Legion Armoured Company",
    "Legion Demi-Company",
    "Legion Drop Pod Assault",
    "Legion Garrison Force",
    "Legion Heavy Assault Spearhead",
    "Legion Sky-hunter Phalanx",
    "Legion Subterranean Assault",
    //support
    "Brethren of Iron",
    //iconic
    "Seeker-Killer Clave Ultor",
    "Proioxis Macro-Assault Wing",
    "Harrow Group Arcadus",
    "Legion Tactical Strike Force",
    "Legion Speartip Assault",
    "Legion Stonebreaker Siege Force",
    "Reaping Host",
    "Chogorian Warband",
] as const;
export type LegionFormationName = (typeof LegionFormationNames)[number];

export type LegionFormationSlot =
    "Brethren of Iron Bastion" |
    "Brethren of Iron Core" |
    "Brethren of Iron Support" |
    "Brethren of Iron Vanguard" |
    "Legion Aerial Assault HQ" |
    "Legion Armoured Company HQ" |
    "Legion Heavy Assault Spearhead Support Compulsory" |
    "Legion Terminators" |
    "Sky-hunter Phalanx Vanguard Compulsory" //This just makes it easier. It can't have bikes
;

export type LegionDetachmentName = 
    "Legion Assault Detachment" |
    "Legion Cerberus Squadron" |
    "Legion Command" | 
    "Legion Contemptor Dreadnought Talon" | 
    "Legion Deathstorm Drop Pod Battery" |
    "Legion Deredeo Dreadnought Detachment" |
    "Legion Dreadnought Drop Pod Detachment" |
    "Legion Drop Pod Detachment" |
    "Legion Fire Raptor Squadron" |
    "Legion Javelin Squadron" |
    "Legion Kratos Commander" | 
    "Legion Kratos Squadron" | 
    "Legion Land Raider Detachment" |
    "Legion Land Speeder Squadron" |
    "Legion Mastodon Squadron" |
    "Legion Missile Launcher Support Detachment" |
    "Legion Outrider Squadron" |
    "Legion Palisade Drop Pod" |
    "Legion Plasma Gun Support Detachment" |
    "Legion Predator Commander" |
    "Legion Predator Squadron" |
    "Legion Rapier Battery Detachment" |
    "Legion Rhino Detachment" |
    "Legion Sabre Squadron" |
    "Legion Scimitar Jetbike Squadron" |
    "Legion Scorpius Battery" |
    "Legion Sicaran Arcus Squadron" |
    "Legion Sicaran Commander" |
    "Legion Sicaran Omega Squadron" |
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
    "Legion Typhon Squadron" |
    "Legion Vindicator Squadron" |
    "Legion Whirlwind Battery" |
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
    "Cerberus",
    "Legion Kratos",
    "Legion Outrider", 
    "Legion Predator", 
    "Legion Rapier",
    "Legion Sicaran",
    "Legion Tarantula",
    "Legion Terminators",
    "Legion Termite",
    "Leviathan Dreadnought",
    "Mastodon",
    "Missile Launcher Legionaries", //renamed from "Missile Launcher Heavy Support Legionaries" because come on
    "Palisade Drop Pod",
    "Plasma Support Legionaries",
    "Predator Commander",
    "Rhino",
    "Sabre",
    "Scimitar Jetbike",
    "Scorpius",
    "Sicaran Arcus",
    "Sicaran Commander",
    "Sicaran Omega",
    "Sicaran Punisher",
    "Spartan",
    "Storm Eagle",
    "Tactical Legionaries",
    "Termite",
    "Thunderhawk Gunship",
    "Typhon",
    "Vindicator",
    "Whirlwind",
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