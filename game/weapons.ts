import { WeaponStats } from "./types.ts";
import { WeaponType } from "./weaponTypes.ts";

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
    ["Anvilus autocannon battery", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 16, dice: 2, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Accurate", "Light AT"]
        },
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
    ["Omega plasma array", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 1, hit: 4, 
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: -2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            traits: ["Accurate"], voidShields: 1
        },
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
    ["Kratos battlecannon", {arc: "Front", weaponStatsAtRange: [
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
            vShvKT: {modifier: 2, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            traits: ["Blast (3\")"], voidShields: 1
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
    ["Multi-melta", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 1, hit: 4, 
            infAndCav:{modifier: 0, wounds: 1}, 
            walker: {modifier: -3, wounds: 1},
            vShvKT: {modifier: -3, wounds: 1},
            ionShield: {modifier: -1, wounds: 1},
            traits: ["Anti-tank"], voidShields: 1
        }
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
    ["Predator cannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 18, dice: 2, hit: 5, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"]
        }
    ]}],
    ["Predator lascannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 1, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Accurate", "Anti-tank"], voidShields: 1
        },
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
    ["Shock lance", {arc: "Melee", weaponStatsAtRange: [
        {traits: ["Reach", "Rend"]},
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
    ["Sponson Mounted quad lascannon", {arc: "All", weaponStatsAtRange: [
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
    ["Twin-linked volkite calvier", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 1, hit: 4, infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, 
            traits: ["Accurate", "Deflagrate", "Light", "Point Defence"]}
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
    ["Volkite chieorovile", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 3, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            voidShields: 1,
            traits: ["Deflagrate", "Light AT", "Shieldbane"]},
    ]}]
]);

export function getWeaponStats(weaponType: WeaponType): WeaponStats | undefined {
    return weapons.get(weaponType);
}