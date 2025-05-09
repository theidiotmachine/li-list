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
            traits: ["Skyfire"], voidShields: 1
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
        {minRange: 0, maxRange: 20, dice: 1, hit: 4, 
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
            traits: ["Light"]
        }
    ]}],
    ["Avenger bolt cannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 5, hit: 5,
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Skyfire"]
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
        {minRange: 0, maxRange: 10, dice: "D3+2", hit: 6, 
            infAndCav:{modifier: -1, wounds: 1}, 
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT", "Limited", "Saturation Fire"]
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
    ["Executioner plasma cannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 2, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
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
    ["Hellstrike missiles", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 30, dice: 2, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Armourbane"], voidShields: 1
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
    ["Hull Mounted twin lascannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 1, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Accurate", "Anti-tank"], voidShields: 1
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
            traits: ["Accurate", "Light AT"]
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
            traits: ["Accurate", "Anti-tank"], voidShields: 1
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
    ["Leviathan siege claw", {
        arc: "Melee", weaponStatsAtRange: [{
            structure: {modifier: -2, wounds: 2},
            traits: ["Rend", "Wrecker (2)"],
        }]
    }],
    ["Leviathan storm cannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 10, dice: 1, hit: 5, 
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
    ["Mauler bolt cannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 8, dice: 3, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
        },
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
        {minRange: 0, maxRange: 20, dice: 2, hit: 4, 
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
    ["Neutron beam laser", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 1, hit: 4, 
            infAndCav: {modifier: -3, wounds: 1},
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            traits: ["Shock Pulse"], voidShields: 2
        },
    ]}], 
    ["Nose Mounted heavy flamer", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 1, hit: 4, infAndCav: {modifier: 0, wounds: 1},
        walker: {modifier: 0, wounds: 1}, traits: ["Ignores Cover", "Light", "Point Defence"]}
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
    ["Pintle Mounted multi-melta", {arc: "Front", weaponStatsAtRange: [
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
            traits: ["Point Defence"]
        }
    ]}],
    ["Pintle Mounted twin bolter", {arc: "Front", weaponStatsAtRange: [
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
        {minRange: 0, maxRange: 10, dice: 1, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
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
        {minRange: 0, maxRange: 18, dice: 2, hit: 5, 
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
    ["Quad heavy bolter batteries", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 4, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light", "Point Defence", "Skyfire"]
        }
    ]}],
    ["Quad launcher", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 1, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            structure: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Anti-tank"], voidShields: 1
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
    ["Storm Eagle heavy bolter", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 3, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light", "Point Defence", "Skyfire"]
        }
    ]}],
    ["Stormsword heavy bolter sponsons", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 4, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light", "Point Defence"]
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
    ["Tarantula lascannon battery", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 2, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Anti-tank"], voidShields: 1
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
            structure: {modifier: -4, wounds: 1},
            traits: ["Anti-tank", "Demolisher", "Engine Killer (1)"], voidShields: 1
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
    ["Thunderhawk heavy bolters", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 3, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light", "Point Defence", "Skyfire"]
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
        {minRange: 0, maxRange: 10, dice: 1, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
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
    ["Vultarax havoc launcher", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 15, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
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