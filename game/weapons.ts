import { WeaponStats, WeaponType } from "./weaponTypes.ts";

const weapons = new Map<WeaponType, WeaponStats>([
    ["Acastus autocannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 3, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
        },
    ]}],
    ["Acastus lascannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 1, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Anti-tank"], voidShields: 1
        },
    ]}],
    ["Acheron pattern flame cannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 8, dice: 3, hit: 4, 
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Ignores Cover"]
        }
    ]}],
    ["Aiolus missile launcher", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 25, dice: 1, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            traits: ["Anti-tank", "Skyfire"], voidShields: 1
        }
    ]}],
    ["Annihiliator twin lascannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 1, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Accurate", "Anti-tank"], voidShields: 1
        },
    ]}],
    ["Anvilus autocannon battery", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 2, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Accurate", "Light AT"]
        },
    ]}],
    ["Arc blasters", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 10, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Neutron-flux"]
        },
    ]}],
    ["Archeotech pistols", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 1, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            traits: ["Accurate", "Light"]
        }
    ]}],
    ["Arcus missile launcher", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1,
            traits: ["Anti-tank", "Ripple Fire"],
        },
        {minRange: 0, maxRange: 20, dice: 1, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1,
            traits: ["Anti-tank", "Skyfire", "Tracking"],
        }
    ]}],
    ["Ardex mega-bolters", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 9, hit: 5,
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            voidShields: 1,
            traits: ["Light AT", "Point Defence", "Rapid Fire", "Shieldbane"]
        }
    ]}],
    ["Atrapos lascutter", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 1, hit: 2,
            infAndCav: {modifier: -4, wounds: 1},
            walker: {modifier: -4, wounds: 1},
            vShvKT: {modifier: -4, wounds: 2},
            ionShield: {modifier: -2, wounds: 2},
            voidShields: 1,
            structure: {modifier: -4, wounds: 1},
            traits: ["Engine Killer (1)", "Rend", "Wrecker (3)"]
        }
    ]}],
    ["Autocannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 2, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
        },
    ]}],
    ["Auxilia laspistols", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 1, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light"]
        }
    ]}],
    ["Auxilia lasrifles", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 10, dice: 1, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light", "Ripple Fire"]
        }
    ]}],
    ["Avenger autocannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 4, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Rapid Fire", "Skyfire"]
        },
    ]}],
    ["Avenger bolt cannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 5, hit: 5,
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Rapid Fire", "Skyfire"]
        }
    ]}],
    ["Avenger lascannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Anti-tank", "Skyfire"], voidShields: 1
        },
    ]}],
    
    ["Baneblade cannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 25, dice: 1, hit: 4, 
            infAndCav: {modifier: -3, wounds: 1},
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1,
            traits: []
        }
    ]}],
    
    ["Bolt pistols", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 1, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light"]
        }
    ]}],
    ["Castigator pattern bolt cannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 14, dice: 4, hit: 5, 
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            voidShields: 1,
            traits: ["Light AT", "Rapid Fire", "Shieldbane"]
        }
    ]}],
    ["Charonite claws", {arc: "Melee", weaponStatsAtRange: [
        {traits: ["Rend"]},
    ]}],
    ["Co-axial autocannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 2, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Co-axial", "Light AT"]
        },
    ]}],
    ["Co-axial multi-laser", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Co-axial", "Light AT"]
        }
    ]}],
    ["Colossus Bomb", {arc: "Rear", weaponStatsAtRange: [
        {dice: 6, hit: 3, 
            infAndCav: {modifier: -4, wounds: 1},
            walker: {modifier: -4, wounds: 1},
            vShvKT: {modifier: -4, wounds: 1},
            ionShield: {modifier: -2, wounds: 1},
            voidShields: 1,
            structure: {modifier: -4, wounds: 1},
            traits: ["Bombing Run", "Bunker Buster", "Limited (1)"]
        }
    ]}],
    ["Combi bolters", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 4, dice: 2, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Accurate", "Assault", "Light"]
        },
        {minRange: 4, maxRange: 8, dice: 1, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Accurate", "Assault", "Light"]
        }
    ]}],
    ["Conversion beamers", {arc: "All", weaponStatsAtRange: [
        {minRange: 4, maxRange: 22, dice: 1, hit: 4, 
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1, 
            traits: []
        }
    ]}],
    ["Conversion beam dissipator", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 2, hit: 4,
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1, 
            traits: ["Accurate"]
        },
        {minRange: 6, maxRange: 18, dice: 3, hit: 3,
            infAndCav: {modifier: -3, wounds: 1},
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1, 
            structure: {modifier: -3, wounds: 1},
            traits: ["Accurate", "Demolisher"]
        },
        {minRange: 18, maxRange: 35, dice: 3, hit: 3,
            infAndCav: {modifier: -4, wounds: 1},
            walker: {modifier: -4, wounds: 1},
            vShvKT: {modifier: -4, wounds: 1},
            ionShield: {modifier: -2, wounds: 1},
            voidShields: 1, 
            structure: {modifier: -4, wounds: 1},
            traits: ["Accurate", "Demolisher"]
        },
    ]}],
    ["Conversion beam dissolutor", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 2, hit: 4,
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1, 
            traits: []
        },
        {minRange: 6, maxRange: 18, dice: 2, hit: 3,
            infAndCav: {modifier: -3, wounds: 1},
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1, 
            structure: {modifier: -3, wounds: 1},
            traits: ["Demolisher"]
        },
        {minRange: 18, maxRange: 35, dice: 2, hit: 2,
            infAndCav: {modifier: -4, wounds: 1},
            walker: {modifier: -4, wounds: 1},
            vShvKT: {modifier: -4, wounds: 1},
            ionShield: {modifier: -2, wounds: 1},
            voidShields: 1, 
            structure: {modifier: -4, wounds: 1},
            traits: ["Demolisher"]
        },
    ]}],
    ["Conversion beam extripator", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 2, hit: 3,
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1, 
            traits: ["Accurate"]
        },
        {minRange: 6, maxRange: 18, dice: 3, hit: 3,
            infAndCav: {modifier: -3, wounds: 1},
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1, 
            structure: {modifier: -3, wounds: 1},
            traits: ["Accurate", "Demolisher"]
        },
        {minRange: 18, maxRange: 35, dice: 3, hit: 2,
            infAndCav: {modifier: -4, wounds: 1},
            walker: {modifier: -4, wounds: 1},
            vShvKT: {modifier: -4, wounds: 1},
            ionShield: {modifier: -2, wounds: 1},
            voidShields: 1, 
            structure: {modifier: -4, wounds: 1},
            traits: ["Accurate", "Demolisher"]
        },
    ]}],
    ["Cyclone missile launcher", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 20, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Ignores Cover", "Light"]
        }
    ]}],
    ["Cyclonic melta lance", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 1, hit: 4, 
            infAndCav:{modifier: 0, wounds: 1}, 
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            traits: ["Anti-tank", "Demolisher"], voidShields: 1
        }
    ]}],
    ["Deathstorm missile launcher", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 10, dice: 2, hit: 5, 
            infAndCav:{modifier: -1, wounds: 1}, 
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Limited (1)", "Saturation Fire"]
        }
    ]}],
    ["Demolisher cannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 1, hit: 4, 
            infAndCav: {modifier: -3, wounds: 1},
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1, 
            structure: {modifier: -3, wounds: 1},
            traits: ["Demolisher", "Ignores Cover"]
        }
    ]}],
    ["Demolition charge", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 1, dice: 1, hit: 3, 
            infAndCav:{modifier: -1, wounds: 1}, 
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            structure: {modifier: -1, wounds: 1},
            voidShields: 1,
            traits: ["Blast (3\")", "Demolisher"]
        }
    ]}],
    ["Destroyer bomb bay", {arc: "Rear", weaponStatsAtRange: [
        {dice: 2, hit: 4, 
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1,
            traits: ["Bombing Run"]
        }
    ]}],
    ["Errax lascutters", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 4, dice: 1, hit: 4, 
            infAndCav:{modifier: 0, wounds: 1}, 
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            structure: {modifier: -4, wounds: 1},
            voidShields: 1,
            traits: ["Anti-tank", "Bunker Buster"],
        }
    ]}],
    ["Errax meltagun", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 1, hit: 4, 
            infAndCav:{modifier: 0, wounds: 1}, 
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1,
            traits: ["Anti-tank"], 
        }
    ]}],
    ["Executioner plasma cannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 2, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
        }
    ]}],
    ["Exo-planar bombard", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 15, dice: 3, hit: 4, 
            infAndCav:{modifier: -1, wounds: 1}, 
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Bypass", "Ignores Cover", "Shred"]
        }
    ]}],
    ["Exo-planar cannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 10, dice: 2, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1}, 
            traits: ["Ignores Cover", "Light", "Shred"]
        }
    ]}],
    ["Exo-planar repeaters", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 10, dice: 1, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1}, 
            traits: ["Light", "Shred"]
        }
    ]}],
    ["Exterminator autocannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 3, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
        }
    ]}],
    ["Flamers", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 1, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, 
            traits: ["Ignores Cover", "Light"]
        }
    ]}], 
    ["Gravis autocannon batteries", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 3, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Skyfire"]
        },
    ]}],
    ["Graviton eradicator", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 30, dice: 2, hit: 0,
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1,
            structure: {modifier: -2, wounds: 1},
            traits: ["Graviton Pulse", "Demolisher"]
        },
    ]}],
    ["Graviton hammers", {arc: "Melee", weaponStatsAtRange: [
        {structure: {modifier: -2, wounds: 1},
            traits: ["Wrecker (1)"]
        }
    ]}],
    ["Graviton gun", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 1, 
            infAndCav:{modifier: -1, wounds: 1}, 
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            voidShields: 1,
            traits: ["Graviton Pulse"]
        }
    ]}],
    ["Graviton ram", {arc: "Melee", weaponStatsAtRange: [
        {structure: {modifier: -2, wounds: 2},
            traits: ["Wrecker (2)"]
        }
    ]}],
    ["Graviton singularity cannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 2, 
            infAndCav:{modifier: -3, wounds: 1}, 
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1,
            traits: ["Armourbane", "Collapsing Singularity"]
        }
    ]}],
    ["Harpax lascutters", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 4, dice: 1, hit: 5, 
            infAndCav:{modifier: 0, wounds: 1}, 
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            structure: {modifier: -2, wounds: 1},
            voidShields: 1,
            traits: ["Anti-tank", "Bunker Buster"],
        }
    ]}],
    ["Heavy bolter", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 2, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light", "Point Defence"]
        }
    ]}],
    ["Heavy stubber", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 14, dice: 1, hit: 5,
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light", "Point Defence"]
        }
    ]}],
    ["Heavy stubber tail gun", {arc: "Rear", weaponStatsAtRange: [
        {minRange: 0, maxRange: 14, dice: 2, hit: 6, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Point Defence", "Skyfire"]
        },
    ]}],
    ["Hekaton siege claw", {arc: "Melee", weaponStatsAtRange: [
        {traits: ["Rend", "Wrecker (3)"],
            structure: {modifier: -3, wounds: 1}
        }
    ]}],
    ["Hellfire plasma cannonade", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 14, dice: 2, hit: 4, 
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
        }
    ]}],
    ["Hellhammer cannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 14, dice: 1, hit: 4, 
            infAndCav: {modifier: -3, wounds: 1},
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1, 
            structure: {modifier: -3, wounds: 1},
            traits: ["Demolisher", "Ignores Cover"]
        }
    ]}],
    ["Hellstrike missiles", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 30, dice: 2, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Armourbane"], voidShields: 1
        },
    ]}],
    ["Hull Mounted autocannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 2, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
        },
    ]}],
    ["Hull Mounted Anvilus autocannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 3, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
        },
    ]}],
    ["Hull Mounted demolisher cannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 1, hit: 4, 
            infAndCav: {modifier: -3, wounds: 1},
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1, 
            structure: {modifier: -3, wounds: 1},
            traits: ["Demolisher", "Ignores Cover"]
        }
    ]}],
    ["Hull Mounted dreadhammer siege cannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 2, hit: 3, 
            infAndCav: {modifier: -4, wounds: 1},
            walker: {modifier: -4, wounds: 1},
            vShvKT: {modifier: -4, wounds: 1},
            ionShield: {modifier: -2, wounds: 1},
            voidShields: 1, 
            structure: {modifier: -4, wounds: 1},
            traits: ["Demolisher", "Ignores Cover"]
        }
    ]}],
    ["Hull Mounted heavy bolter", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 2, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light", "Point Defence"]
        }
    ]}],
    ["Hull Mounted heavy bolter turret", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 2, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light", "Point Defence"]
        }
    ]}],
    ["Hull Mounted heavy bolters", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 2, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light", "Point Defence"]
        }
    ]}],
    ["Hull Mounted lascannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 1, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Anti-tank"], voidShields: 1
        },
    ]}],
    ["Hull mounted multi-melta", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 1, hit: 5, 
            infAndCav:{modifier: 0, wounds: 1}, 
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            traits: ["Anti-tank"], voidShields: 1
        }
    ]}],
    ["Hull Mounted neutron blaster", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 1, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            traits: ["Anti-tank", "Shock Pulse"], voidShields: 2
        },
    ]}],
    ["Hull Mounted neutron laser battery", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 24, dice: 3, hit: 4, 
            infAndCav: {modifier: -3, wounds: 1},
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            traits: ["Shock Pulse"], voidShields: 2
        },
    ]}],
    ["Hull Mounted twin lascannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 1, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Accurate", "Anti-tank"], voidShields: 1
        },
    ]}],
    ["Hunter-killer missile", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 1, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            traits: ["Anti-tank", "Limited (1)"], voidShields: 1
        },
    ]}],
    ["Hyperios air-defence missile launcher", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 25, dice: 1, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Skyfire", "Tracking"], voidShields: 1
        },
    ]}],
    ["In-built bolters", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 4, dice: 2, hit: 5, infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, traits: ["Assault", "Light"]},
        {minRange: 4, maxRange: 8, dice: 1, hit: 5, infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, traits: ["Assault", "Light"]}
    ]}],
    ["In-built twin-linked bolter", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 4, dice: 2, hit: 5, infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, traits: ["Assault", "Light", "Point Defence"]},
        {minRange: 4, maxRange: 8, dice: 1, hit: 5, infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, traits: ["Assault", "Light", "Point Defence"]}
    ]}],
    ["In-built twin-linked heavy bolters", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 2, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light", "Point Defence"]
        }
    ]}],
    ["Incineration charge", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 1, dice: 1, hit: 3, 
            infAndCav:{modifier: -1, wounds: 1}, 
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Blast (3\")", "Ignores Cover", "Light AT"]
        }
    ]}], 
    ["Incisor pattern melta lance", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 1, hit: 3, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -4, wounds: 1},
            vShvKT: {modifier: -4, wounds: 3},
            ionShield: {modifier: -2, wounds: 3},
            voidShields: 1,
            structure: {modifier: -4, wounds: 1},
            traits: ["Accurate", "Anti-tank", "Demolisher", "Engine Killer (2)"], 
        },
        {minRange: 0, maxRange: 14, dice: 1, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            structure: {modifier: -3, wounds: 1},
            traits: ["Anti-tank", "Demolisher"], voidShields: 1
        }
    ]}],
    ["Inferno gun", {arc: "Front", weaponStatsAtRange: [
        {hit: 4, 
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1,
            traits: ["Firestorm", "Light AT", "Shieldbane"],
        }
    ]}],
    ["Ion gauntlet shield", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 2, hit: 5,
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            traits: [], voidShields: 1
        }
    ]}],
    ["Irad-scourer", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 2, hit: 4, 
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Ignores Cover"]
        }
    ]}],
    ["Irradiation engine", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 10, dice: 3, hit: 4, 
            infAndCav: {modifier: -3, wounds: 1},
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Ignores Cover"]
        }
    ]}],
    ["Omega plasma array", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 1, hit: 4, 
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            traits: ["Accurate"], voidShields: 1
        },
    ]}],
    ["Karacnos mortar battery", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 30, dice: 2, hit: 4,
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            voidShields: 1,
            traits: ["Barrage", "Ignores Cover"]
        }
    ]}],
    ["Kheres assault cannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 10, dice: 1, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Rapid Fire"], voidShields: 1
        },
    ]}],
    ["Kratos autocannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 2, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
        },
    ]}],
    ["Kratos battlecannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 10, dice: 1, hit: 4,
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -4, wounds: 1},
            vShvKT: {modifier: -4, wounds: 1},
            ionShield: {modifier: -2, wounds: 1},
            traits: ["Anti-tank", "Armourbane"], voidShields: 1
        },
        {minRange: 0, maxRange: 20, dice: 2, hit: 4,
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: [], voidShields: 1
        }
    ]}],
    ["Kratos lascannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 1, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Anti-tank"], voidShields: 1
        },
    ]}],
    ["Krios lightning cannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 2, hit: 5, 
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            traits: [], voidShields: 1
        }
    ]}],
    ["Las-locks", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 1, hit: 6, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light"]
        }
    ]}],
    ["Lascannon batteries", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Anti-tank", "Skyfire"], voidShields: 1
        },
    ]}],
    ["Lascannon sponson turrets", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 1, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Anti-tank"], voidShields: 1
        },
    ]}],
    ["Laser destroyer array", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 15, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            traits: ["Anti-tank"], voidShields: 1
        },
    ]}],
    ["Legion bolters", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 4, dice: 2, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Assault", "Light"]
        },
        {minRange: 4, maxRange: 8, dice: 1, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Assault", "Light"]
        }
    ]}],
    ["Leman Russ battlecannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 25, dice: 1, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            voidShields: 1,
            traits: []
        }
    ]}],
    ["Leviathan siege claw", {
        arc: "Melee", weaponStatsAtRange: [{
            structure: {modifier: -2, wounds: 2},
            traits: ["Rend", "Wrecker (2)"],
        }]
    }],
    ["Leviathan storm cannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 10, dice: 1, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Rapid Fire"], voidShields: 1
        },
    ]}],
    ["Lightning cannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 2, hit: 5, 
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            traits: ["Blast (3\")"], voidShields: 1
        }
    ]}],
    ["Lightning guns", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 8, dice: 2, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
        }
    ]}],
    ["Lightning locks", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 2, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            voidShields: 1,
            traits: ["Point Defence"]
        }
    ]}],
    ["Lightning twin lascannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Anti-tank", "Skyfire"], voidShields: 1
        },
    ]}],
    ["Lightning twin multi-laser", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 14, dice: 4, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Skyfire"]
        },
    ]}],
    ["Malcador battlecannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 25, dice: 1, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            voidShields: 1,
            traits: []
        }
    ]}],
    ["Malcador autocannon sponsons", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 2, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
        },
    ]}],
    ["Malcador inferno gun", {arc: "Front", weaponStatsAtRange: [
        {hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Firestorm", "Light AT"],
        }
    ]}],
    ["Malcador lascannon sponsons", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 1, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Anti-tank"], voidShields: 1
        },
    ]}],
    ["Malcador lascannon turret", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Anti-tank"], voidShields: 1
        },
    ]}],
    ["Malcador Vanquisher battlecannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 32, dice: 1, hit: 4,
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1,
            traits: ["Anti-tank", "Armourbane"], 
        }
    ]}],
    ["Mauler bolt cannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 8, dice: 3, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
        },
    ]}],
    ["Marauder bomb bay", {arc: "Rear", weaponStatsAtRange: [
        {dice: 3, hit: 4, 
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1,
            traits: ["Bombing Run"]
        }
    ]}],
    ["Marauder heavy bolter turrets", {arc: "Rear", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 3, hit: 6, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Point Defence", "Skyfire"]
        }
    ]}],
    ["Maxima bolters", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 4, dice: 4, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Assault", "Light"]
        },
        {minRange: 4, maxRange: 8, dice: 2, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Assault", "Light"]
        }
    ]} ],
    ["Missile launchers", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 20, dice: 2, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Ignores Cover", "Light"],
        },
        {minRange: 0, maxRange: 20, dice: 1, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Anti-tank"], voidShields: 1
        }
    ]}],
    ["Melta blastgun", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 8, dice: 1, hit: 4, 
            infAndCav:{modifier: 0, wounds: 1}, 
            walker: {modifier: -4, wounds: 1},
            vShvKT: {modifier: -4, wounds: 1},
            ionShield: {modifier: -2, wounds: 1},
            structure: {modifier: -8, wounds: 1},
            traits: ["Anti-tank", "Armourbane", "Bunker Buster"], voidShields: 1
        }
    ]}],
    ["Meltagun", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 1, hit: 4, 
            infAndCav:{modifier: 0, wounds: 1}, 
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            traits: ["Anti-tank"], voidShields: 1
        }
    ]}],
    ["Mole mortar", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 20, dice: 1, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Burrowing"]
        }
    ]}],
    ["Multi-laser", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 2, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
        }
    ]}],
    ["Multi-melta", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 1, hit: 4, 
            infAndCav:{modifier: 0, wounds: 1}, 
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            traits: ["Anti-tank"], voidShields: 1
        }
    ]}],
    ["Myrmidon plasma-fusil", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 10, dice: 1, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
        }
    ]}],
    ["Myrmidon volkites", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 2, hit: 4, infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, 
            traits: ["Deflagrate", "Light"]}
    ]}],
    ["Natrix shock lance", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 1, hit: 2,
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Bypass", "Shock Pulse"], 
        }
    ]}],
    ["Neutron beam laser", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 1, hit: 4, 
            infAndCav: {modifier: -3, wounds: 1},
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 2,
            traits: ["Shock Pulse"], 
        },
    ]}], 
    ["Nose Mounted autocannon array", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 6, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Skyfire"]
        },
    ]}],
    ["Nose Mounted heavy bolter", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 3, hit: 6, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Point Defence", "Skyfire"]
        },
    ]}],
    ["Nose Mounted heavy flamer", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 1, hit: 4, infAndCav: {modifier: 0, wounds: 1},
        walker: {modifier: 0, wounds: 1}, traits: ["Ignores Cover", "Light", "Point Defence"]}
    ]}],
    ["Nose Mounted lascannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Anti-tank", "Skyfire"], voidShields: 1
        },
    ]}],
    ["Phased plasma-fusil", {arc: "Front", weaponStatsAtRange:[
        {minRange:0, maxRange: 10, dice: 1, hit: 4, 
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
        }
    ]}],
    ["Phosphex bomb clusters", {arc: "Rear", weaponStatsAtRange: [
        {dice: 2, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Bombing Run", "Light AT", "Ignores Cover"]
        }
    ]}],
    ["Pintle Mounted multi-laser", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 2, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Point Defence"]
        }
    ]}],
    ["Pintle Mounted multi-melta", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 1, hit: 5, 
            infAndCav:{modifier: 0, wounds: 1}, 
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            traits: ["Anti-tank"], voidShields: 1
        }
    ]}],
    ["Pintle Mounted havoc launcher", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 15, dice: 1, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Point Defence"]
        }
    ]}],
    ["Pintle Mounted heavy bolter", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 2, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light", "Point Defence"]
        }
    ]}],
    ["Pintle Mounted heavy stubber", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 14, dice: 2, hit: 6, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light", "Point Defence"]
        }
    ]}],
    ["Pintle Mounted twin bolter", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 4, dice: 2, hit: 5, infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, traits: ["Assault", "Light", "Point Defence"]},
        {minRange: 4, maxRange: 8, dice: 1, hit: 5, infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, traits: ["Assault", "Light", "Point Defence"]}
    ]}],
    ["Pintle Mounted twin-linked bolter", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 4, dice: 2, hit: 5, infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, traits: ["Assault", "Light", "Point Defence"]},
        {minRange: 4, maxRange: 8, dice: 1, hit: 5, infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, traits: ["Assault", "Light", "Point Defence"]}
    ]}],
    ["Plasma blastgun", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 20, dice: 2, hit: 3, 
            infAndCav: {modifier: -3, wounds: 1},
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1,
            traits: []
        }
    ]}],
    ["Plasma cannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 1, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
        }
    ]}],
    ["Plasma guns", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 4, dice: 2, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Assault", "Light AT"]
        },
        {minRange: 4, maxRange: 8, dice: 1, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Assault", "Light AT"]
        }
    ]}],
    ["Plasma mortar", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 18, dice: 1, hit: 3, 
            infAndCav: {modifier: -3, wounds: 1},
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1,
            structure: {modifier: -3, wounds: 1},
            traits: ["Demolisher", "Ignores Cover"]
        }
    ]}],
    ["Power axes", {arc: "Melee", weaponStatsAtRange: [
        {traits: ["Rend"]},
    ]}],
    ["Power blade arrays", {arc: "Melee", weaponStatsAtRange: [
        {traits: ["Rend"]},
    ]}],
    ["Predator cannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 18, dice: 2, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
        }
    ]}],
    ["Predator lascannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 1, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Accurate", "Anti-tank"], voidShields: 1
        },
    ]}],
    ["Pulsar-fusil", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 1, hit: 3, 
            infAndCav:{modifier: 0, wounds: 1}, 
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            traits: ["Anti-tank"], voidShields: 1
        }
    ]}],
    ["Punisher rotary cannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 4, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Rapid Fire"]
        },
    ]}],
    ["Quad autocannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 4, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Skyfire"]
        },
    ]}],
    ["Quad heavy bolter batteries", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 4, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light", "Point Defence", "Skyfire"]
        }
    ]}],
    ["Quad launcher", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 1, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            structure: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Demolisher", "Light AT"],
        },
        {minRange: 6, maxRange: 30, dice: 2, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            traits: ["Barrage", "Light"]
        }
    ]}],
    ["Questoris-avenger gatling cannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 5, hit: 5, 
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Rapid Fire"]
        }
    ]}],
    ["Rapid-fire battlecannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 28, dice: 2, hit: 4,
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1, 
            traits: ["Rapid Fire"]
        }
    ]}],
    ["Reaper chainfist", {arc: "Melee", weaponStatsAtRange: [
        {traits: ["Rend"]},
    ]}],
    ["Reaper chainsword", {arc: "Melee", weaponStatsAtRange: [
        {traits: ["Rend"]},
    ]}],
    ["Rear Mounted heavy bolter", {arc: "Rear", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 3, hit: 6, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Point Defence", "Skyfire"]
        },
    ]}],
    ["Reaver conversion beam dissolutor", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 2, hit: 4,
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1, 
            traits: []
        },
        {minRange: 6, maxRange: 18, dice: 2, hit: 3,
            infAndCav: {modifier: -3, wounds: 1},
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1, 
            structure: {modifier: -3, wounds: 1},
            traits: ["Demolisher"]
        },
        {minRange: 18, maxRange: 35, dice: 2, hit: 3,
            infAndCav: {modifier: -4, wounds: 1},
            walker: {modifier: -4, wounds: 1},
            vShvKT: {modifier: -4, wounds: 1},
            ionShield: {modifier: -2, wounds: 1},
            voidShields: 1, 
            structure: {modifier: -4, wounds: 1},
            traits: ["Demolisher"]
        },
    ]}],
    ["Reaver graviton eradicator", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 30, dice: 2, hit: 0,
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1,
            structure: {modifier: -2, wounds: 1},
            traits: ["Graviton Pulse", "Demolisher"]
        },
    ]}],
    ["Reaver turbo-laser destructor", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 40, dice: 2, hit: 4, 
            infAndCav: {modifier: -3, wounds: 1},
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1, 
            traits: ["Accurate"]
        }
    ]}],
    ["Reaver volkite eradicator", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 3, hit: 4, 
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            voidShields: 1,
            traits: ["Beam", "Deflagrate", "Light AT", "Shieldbane"]
        }
    ]}],
    ["Reaver Vulcan mega-bolter", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 9, hit: 5,
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            voidShields: 1,
            traits: ["Light AT", "Rapid Fire", "Shieldbane"]
        }
    ]}],
    ["Rocket pods", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 2, hit: 4,
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            voidShields: 1,
            traits: ["Barrage"]
        }
    ]}],
    ["Rotor cannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 4, hit: 5,
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            traits: ["Light", "Rapid Fire"]
        }
    ]}],
    ["Sabre missiles", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 1, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
        }
    ]}], 
    ["Sarcophagus mounted weapon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 8, dice: 1, hit: 6, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light", "Point Defence"]
        }
    ]}],
    ["Scimitar heavy bolter", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 2, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light", "Point Defence"]
        }
    ]}],
    ["Scintillax lascutter", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 4, dice: 1, hit: 3, 
            infAndCav:{modifier: 0, wounds: 1}, 
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            structure: {modifier: -6, wounds: 1},
            voidShields: 1,
            traits: ["Anti-tank", "Bunker Buster"], 
        }
    ]}],
    ["Scorpius missile launcher", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 18, dice: 2, hit: 4,
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Barrage", "Light AT"]
        }
    ]}],
    ["Sentinel missile launcher", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 20, dice: 2, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Ignores Cover", "Light AT"],
        },
        {minRange: 0, maxRange: 20, dice: 1, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Anti-tank"], voidShields: 1
        }
    ]}], 
    ["Serperos lascutters", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 4, dice: 1, hit: 2, 
            infAndCav:{modifier: 0, wounds: 1}, 
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 2},
            ionShield: {modifier: -1, wounds: 2},
            structure: {modifier: -6, wounds: 1},
            voidShields: 1,
            traits: ["Anti-tank", "Bunker Buster", "Engine Killer (1)", "Rend"], 
        }
    ]}],
    ["Shadowsword heavy bolter sponsons", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 4, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light", "Point Defence"]
        }
    ]}],
    ["Shock lance", {arc: "Melee", weaponStatsAtRange: [
        {traits: ["Reach", "Rend"]},
    ]}],
    ["Shock ram", {arc: "Melee", weaponStatsAtRange: [{
        structure: {modifier: -2, wounds: 2},
        traits: ["Wrecker (2)"]
        }
    ]}],
    ["Siege melta array", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 1, hit: 3, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -4, wounds: 1},
            vShvKT: {modifier: -4, wounds: 3},
            ionShield: {modifier: -2, wounds: 3},
            voidShields: 1,
            structure: {modifier: -4, wounds: 1},
            traits: ["Anti-tank", "Demolisher", "Engine Killer (2)"], 
        }
    ]}],
    ["Skyreaper battery", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 20, dice: 3, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Skyfire", "Tracking"]
        },
    ]}],
    ["Skystrike missiles", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 30, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Anti-tank", "Skyfire", "Tracking"], voidShields: 1
        },
    ]}],
    ["Sollex heavy-las", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 1, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Armourbane"], voidShields: 1
        },
    ]}],
    ["Sponson Mounted heavy bolters", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 2, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light", "Point Defence"]
        }
    ]}],
    ["Sponson Mounted heavy flamers", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, 
            traits: ["Ignores Cover", "Light", "Point Defence"]}
    ]}],
    ["Sponson Mounted lascannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 1, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Anti-tank"], voidShields: 1
        },
    ]}],
    ["Sponson mounted laser destroyers", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 15, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            traits: ["Accurate", "Anti-tank"], voidShields: 1
        },
    ]}],
    ["Sponson Mounted quad lascannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Accurate", "Anti-tank"], voidShields: 1
        },
    ]}],
    ["Sponson Mounted twin-linked lascannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 1, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Accurate", "Anti-tank"], voidShields: 1
        },
    ]}],
    ["Stalker maxima bolters", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 4, dice: 6, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Assault", "Light", "Point Defence"]
        },
        {minRange: 4, maxRange: 8, dice: 3, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Assault", "Light", "Point Defence"]
        }
    ]} ],
    ["Storm Eagle heavy bolter", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 3, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light", "Point Defence", "Skyfire"]
        }
    ]}],
    ["Storm laser", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 15, dice: 3, hit: 5,
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            voidShields: 1,
            traits: ["Light AT", "Rapid Fire", "Shieldbane"]
        }
    ]}],
    ["Storm laser array", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 15, dice: 5, hit: 4,
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            voidShields: 1,
            traits: ["Light AT", "Rapid Fire", "Shieldbane"]
        }
    ]}],
    ["Storm laser flenser", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 3, hit: 4,
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            voidShields: 1,
            traits: ["Light AT", "Shieldbane"]
        }
    ]}],
    ["Stormhammer cannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 28, dice: 2, hit: 4, 
            infAndCav:{modifier: -2, wounds: 1}, 
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1,
            traits: ["Shred"]
        }
    ]}],
    ["Stormhammer lascannon sponsons", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 4, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Anti-tank"], voidShields: 1
        },
    ]}],
    ["Stormhammer multi-laser sponsons", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 5, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Point Defence"]
        }
    ]}],
    ["Stormsword siege cannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 30, dice: 1, hit: 3, 
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1, 
            structure: {modifier: -2, wounds: 1},
            traits: ["Demolisher", "Ignores Cover"]
        }
    ]}], 
    ["Super-heavy autocannon sponsons", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 2, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Point Defence"]
        },
    ]}],
    ["Super-heavy heavy bolter sponsons", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 4, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light", "Point Defence"]
        }
    ]}],
    ["Super-heavy heavy flamer sponsons", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, 
            traits: ["Ignores Cover", "Light", "Point Defence"]}
    ]}],
    ["Tarantula lascannon battery", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 2, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Accurate", "Anti-tank"], voidShields: 1
        },
    ]}],
    ["Tempest warblade", {arc: "Melee", weaponStatsAtRange: [
        {traits: ["Rend"]},
    ]}],
    ["Tempest rockets", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 35, dice: 1, hit: 2, 
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 2},
            ionShield: {modifier: -1, wounds: 2},
            traits: ["Skyfire"], voidShields: 1
        },
    ]}],
    ["Termite twin-linked bolters", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 4, dice: 4, hit: 5, infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, traits: ["Assault", "Light", "Point Defence"]},
        {minRange: 4, maxRange: 8, dice: 2, hit: 5, infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, traits: ["Assault", "Light", "Point Defence"]}
    ]}],
    ["Thermal cannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 1, hit: 3, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -4, wounds: 1},
            vShvKT: {modifier: -4, wounds: 2},
            ionShield: {modifier: -2, wounds: 2},
            voidShields: 1,
            structure: {modifier: -4, wounds: 1},
            traits: ["Anti-tank", "Demolisher", "Engine Killer (1)"], 
        },
        {minRange: 0, maxRange: 12, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            structure: {modifier: -3, wounds: 1},
            traits: ["Anti-tank", "Demolisher"], voidShields: 1
        },
    ]}],
    ["Thunderbolt twin-linked lascannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Anti-tank", "Skyfire"], voidShields: 1
        },
    ]}],
    ["Thunderhawk heavy bolters", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 3, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Point Defence", "Skyfire"]
        }
    ]}],
    ["Thunderhawk lascannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Anti-tank", "Skyfire"], voidShields: 1
        },
    ]}],
    ["Thunderstrike gauntlet", {arc: "Melee", weaponStatsAtRange: [{
        structure: {modifier: -2, wounds: 1},
        traits: ["Rend", "Wrecker (1)"]
        }
    ]}],
    ["Turret Mounted twin bolter", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 4, dice: 2, hit: 5, infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, traits: ["Assault", "Light", "Point Defence"]},
        {minRange: 4, maxRange: 8, dice: 1, hit: 5, infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, traits: ["Assault", "Light", "Point Defence"]}
    ]}],
    ["Turbo-laser destructor", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 40, dice: 2, hit: 4, 
            infAndCav: {modifier: -3, wounds: 1},
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1, 
            traits: ["Accurate"]
        }
    ]}],
    ["Twin magna lascannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 25, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -2, wounds: 1},
            traits: ["Accurate", "Anti-tank"], voidShields: 1
        },
    ]}],
    ["Twin-linked accelerator autocannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 3, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Tracking"], voidShields: 1
        },
    ]}],
    ["Twin-linked bolters", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 4, dice: 2, hit: 5, infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, traits: ["Assault", "Light", "Point Defence"]},
        {minRange: 4, maxRange: 8, dice: 1, hit: 5, infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, traits: ["Assault", "Light", "Point Defence"]}
    ]}],
    ["Twin-linked lascannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 1, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Accurate", "Anti-tank"], voidShields: 1
        },
    ]}],
    ["Twin-linked mauler bolt cannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 8, dice: 3, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
        },
    ]}],
    ["Twin-linked volkite calvier", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 1, hit: 4, infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, 
            traits: ["Accurate", "Deflagrate", "Light", "Point Defence"]}
    ]}],
    ["Twin-linked volkite calviers", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 1, hit: 4, infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, 
            traits: ["Accurate", "Deflagrate", "Light"]}
    ]}],
    ["Twin plasma guns", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 4, dice: 2, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Assault", "Light AT"]
        },
        {minRange: 4, maxRange: 8, dice: 1, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Assault", "Light AT"]
        }
    ]}],
    ["Ursus claw", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 1, hit: 4,
            traits: ["Impale"]
        }
    ]}],
    ["Vanquisher battlecannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 32, dice: 1, hit: 4,
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1,
            traits: ["Anti-tank", "Armourbane"], 
        }
    ]}],
    ["Vengance launcher", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 25, dice: 2, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
        }
    ]}],
    ["Volcano cannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 70, dice: 1, hit: 3, 
            infAndCav: {modifier: -4, wounds: 1},
            walker: {modifier: -4, wounds: 1},
            vShvKT: {modifier: -4, wounds: 3},
            ionShield: {modifier: -2, wounds: 3},
            traits: ["Engine Killer (2)"], voidShields: 1
        },
    ]}],
    ["Volkite calvier sponsons", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 1, hit: 4, infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, 
            traits: ["Accurate", "Deflagrate", "Light", "Point Defence"]}
    ]}],
    ["Volkite chargers", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 8, dice: 1, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Deflagrate", "Light"]
        }
    ]}],
    ["Volkite chieorovile", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 3, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            voidShields: 1,
            traits: ["Deflagrate", "Light AT", "Shieldbane"]},
    ]}],
    ["Volkite culverins", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 14, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Deflagrate", "Light"]
        }
    ]}],
    ["Volkite destructor", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 4, hit: 4, 
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            voidShields: 1,
            traits: ["Beam", "Deflagrate", "Light AT", "Shieldbane"]
        }
    ]}],
    ["Volkite eradicator", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 3, hit: 4, 
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            voidShields: 1,
            traits: ["Beam", "Deflagrate", "Light AT", "Shieldbane"]
        }
    ]}],
    ["Volkite incinerators", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 2, hit: 5,
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Deflagrate", "Light"]},
    ]}],
    ["Volkite serpenta", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 1, hit: 5,
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Deflagrate", "Light"]},
    ]}],
    ["Vulcan mega-bolter", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 10, hit: 5,
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            voidShields: 1,
            traits: ["Light AT", "Rapid Fire", "Shieldbane"]
        }
    ]}],
    ["Vultarax havoc launcher", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 15, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
        }
    ]}],
    ["Warhound shudder missiles", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 35, dice: 2, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            voidShields: 1,
            traits: ["Barrage", "Quake"]
        }
    ]}],
    ["Warhound swarmer missiles", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 35, dice: 8, hit: 5,
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            voidShields: 1,
            traits: ["Light AT", "Rapid Fire", "Shieldbane"]
        }
    ]}],
    ["Warlord graviton ruinator", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 30, dice: 3, hit: 0,
            infAndCav: {modifier: -3, wounds: 1},
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1,
            structure: {modifier: -3, wounds: 1},
            traits: ["Graviton Pulse", "Demolisher"]
        },
    ]}],
    ["Whirlwind missile launcher", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 30, dice: 2, hit: 4,
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Barrage", "Ignores Cover", "Rapid Fire"]
        }
    ]}],
    ["Wing bombs", {arc: "Rear", weaponStatsAtRange: [
        {dice: 2, hit: 4, 
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            voidShields: 1,
            traits: ["Bombing Run"]
        }
    ]}],
    ["Wing Mounted lascannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Anti-tank", "Skyfire"], voidShields: 1
        },
    ]}],
    ["Xiphon lascannon array", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Accurate", "Anti-tank", "Skyfire"], voidShields: 1
        },
    ]}],
    ["Xiphon rotary missile launcher", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 24, dice: 2, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Anti-tank", "Skyfire", "Tracking"], voidShields: 1
        },
    ]}]
]);

export function getWeaponStats(weaponType: WeaponType): WeaponStats | undefined {
    return weapons.get(weaponType);
}