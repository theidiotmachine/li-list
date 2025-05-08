export type WeaponType =
    "Acastus autocannon" |
    "Acastus lascannon" |
    "Acheron pattern flame cannon" |
    "Aiolus missile launcher" |
    "Annihiliator twin lascannon" |
    "Anvilus autocannon battery" |
    "Archeotech pistols" |
    "Arcus missile launcher" |
    "Ardex mega-bolters" |
    "Atrapos lascutter" |
    "Auxilia laspistols" |
    "Auxilia lasrifles" |
    "Avenger bolt cannon" |
    "Bolt pistols" |
    "Castigator pattern bolt cannon" |
    "Charonite claws" |
    "Co-axial autocannon" |
    "Combi bolters" |
    "Conversion beamers" |
    "Cyclonic melta lance" |
    "Cyclone missile launcher" |
    "Deathstorm missile launcher" |
    "Demolisher cannon" |
    "Demolition charge" |
    "Executioner plasma cannon" |
    "Exterminator autocannon" |
    "Flamers" |
    "Gravis autocannon batteries" |
    "Graviton gun" |
    "Graviton singularity cannon" |
    "Heavy bolter" |
    "Hekaton siege claw" |
    "Heavy stubber" |
    "Hellfire plasma cannonade" |
    "Hellstrike missiles" |
    "Hull Mounted Anvilus autocannon" |
    "Hull Mounted demolisher cannon" |
    "Hull Mounted heavy bolter" |
    "Hull Mounted heavy bolter turret" |
    "Hull Mounted heavy bolters" |
    "Hull Mounted lascannon" |
    "Hull mounted multi-melta" |
    "Hull Mounted neutron blaster" |
    "Hull Mounted twin lascannon" |
    "Hyperios air-defence missile launcher" |
    "Karacnos mortar battery" |
    "Kheres assault cannon" |
    "Kratos autocannon" |
    "Kratos battlecannon" |
    "Kratos lascannon" |
    "Leviathan storm cannon" |
    "In-built twin-linked bolter" |
    "In-built twin-linked heavy bolters" |
    "Incineration charge" |
    "Ion gauntlet shield" |
    "Las-locks" |
    "Lascannon batteries" |
    "Lascannon sponson turrets" |
    "Laser destroyer array" |
    "Legion bolters" |
    "Leviathan siege claw" |
    "Leviathan storm cannon" |
    "Lightning cannon" |
    "Lightning guns" |
    "Lightning locks" |
    "Malcador inferno gun" |
    "Malcador autocannon sponsons" |
    "Malcador lascannon sponsons" |
    "Maxima bolters" |
    "Missile launchers" |
    "Mole mortar" |
    "Multi-melta" |
    "Melta blastgun" |
    "Meltagun" |
    "Myrmidon volkites" |
    "Neutron beam laser" |
    "Nose Mounted heavy flamer" |
    "Omega plasma array" |
    "Phased plasma-fusil" |
    "Pintle Mounted havoc launcher" |
    "Pintle Mounted multi-melta" |
    "Pintle Mounted twin bolter" |
    "Plasma blastgun" |
    "Plasma cannon" |
    "Plasma guns" |
    "Power axes" |
    "Predator cannon" |
    "Predator lascannon" |
    "Punisher rotary cannon" |
    "Quad heavy bolter batteries" |
    "Quad launcher" |
    "Questoris-avenger gatling cannon" |
    "Rapid-fire battlecannon" |
    "Ripple fire" |
    "Rocket pods" |
    "Reaper chainfist" |
    "Reaper chainsword" |
    "Reaver turbo-laser destructor" |
    "Sabre missiles" |
    "Sarcophagus mounted weapon" |
    "Scimitar heavy bolter" |
    "Shadowsword heavy bolter sponsons" |
    "Shock lance" |
    "Shock ram" |
    "Sponson Mounted heavy bolters" |
    "Sponson Mounted lascannon" |
    "Sponson mounted laser destroyers" |
    "Sponson Mounted quad lascannon" |
    "Sponson Mounted twin-linked lascannon" |
    "Storm Eagle heavy bolter" |
    "Stormsword heavy bolter sponsons" |
    "Stormsword siege cannon" |
    "Tarantula lascannon battery" |
    "Tempest rockets" |
    "Tempest warblade" |
    "Termite twin-linked bolters" |
    "Thallax plasma-fusil" |
    "Thermal cannon" |
    "Thunderhawk heavy bolters" |
    "Thunderhawk lascannon" |
    "Thunderstrike gauntlet" |
    "Turbo-laser destructor" |
    "Turret Mounted twin bolter" |
    "Twin-linked accelerator autocannon" |
    "Twin magna lascannon" |
    "Twin-linked bolters" |
    "Twin-linked lascannon" |
    "Twin-linked volkite calvier" |
    "Twin plasma guns" |
    "Vengance launcher" |
    "Volcano cannon" |
    "Volkite chargers" |
    "Volkite chieorovile" |
    "Volkite serpenta" |
    "Wing Mounted lascannon" |
    "Xiphon lascannon array" |
    "Xiphon rotary missile launcher" 
;

export type WeaponTrait = 
    "Accurate" |
    "Armourbane" |
    "Assault" |
    "Anti-tank" |
    "Barrage" |
    "Blast (3\")" |
    "Bunker Buster" |
    "Burrowing" |
    "Co-axial" |
    "Collapsing Singularity" |
    "Deflagrate" |
    "Demolisher" |
    "Engine Killer (1)" |
    "Engine Killer (2)" |
    "Firestorm" |
    "Graviton Pulse" |
    "Ignores Cover" |
    "Light" |
    "Light AT" |
    "Limited" |
    "Point Defence" |
    "Rapid Fire" |
    "Reach" |
    "Rend" |
    "Ripple Fire" |
    "Saturation Fire" |
    "Shieldbane" |
    "Shock Pulse" |
    "Skyfire" | 
    "Tracking" |
    "Wrecker (1)" |
    "Wrecker (2)" |
    "Wrecker (3)"
;

export type SaveModifier = {
    modifier: number;
    wounds: number;
}

export type WeaponStatsAtRange = {
    minRange?: number;
    maxRange?: number;
    dice?: number | string;
    hit?: number;
    infAndCav?: SaveModifier;
    walker?: SaveModifier;
    vShvKT?: SaveModifier;
    ionShield?: SaveModifier;
    structure?: SaveModifier;
    voidShields?: number;
    traits: WeaponTrait[];
}

export type WeaponArc =
    "All" |
    "Front" |
    "Melee" |
    "Rear"
;

export const weaponHasTrait = (wsar: WeaponStatsAtRange, trait: WeaponTrait): boolean => 
    wsar.traits.findIndex((t)=>t==trait) != -1

export const weaponHasTraitLike = (wsar: WeaponStatsAtRange, traitString: string): boolean => 
    wsar.traits.findIndex((t)=>t.startsWith(traitString)) != -1

export type WeaponStats = {
    arc: WeaponArc;
    weaponStatsAtRange: WeaponStatsAtRange[];
};