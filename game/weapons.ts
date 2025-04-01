import { WeaponStats } from "./types.ts";
import { WeaponType } from "./weaponTypes.ts";

const weapons = new Map<WeaponType, WeaponStats>([
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
            traits: ["Accurate", "Light AT"], voidShields: 0
        },
    ]} ],
    ["Bolt pistols", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 1, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light"], voidShields: 0
        }
    ]}],
    ["Combi bolters", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 4, dice: 2, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Accurate", "Light"], voidShields: 0
        },
        {minRange: 4, maxRange: 8, dice: 1, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Accurate", "Light"], voidShields: 0
        }
    ]}],
    ["Cyclone missile launcher", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 20, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Ignores Cover", "Light"], voidShields: 0
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
    ["Heavy bolter", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 2, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light", "Point Defence"], voidShields: 0
        }
    ]}],
    ["Hellfire plasma cannonade", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 14, dice: 2, hit: 4, 
            infAndCav: {modifier: -2, wounds: 1},
            walker: {modifier: -2, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"], voidShields: 0
        }
    ]}],
    ["Hull Mounted heavy bolters", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 2, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light", "Point Defence"], voidShields: 0
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
    ["Hyperios air defence missile launcher", {arc: "All", weaponStatsAtRange: [
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
            walker: {modifier: 0, wounds: 1}, traits: ["Light", "Point Defence"], voidShields: 0},
        {minRange: 4, maxRange: 8, dice: 1, hit: 5, infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, traits: ["Light", "Point Defence"], voidShields: 0}
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
            traits: ["Light"], voidShields: 0
        },
        {minRange: 4, maxRange: 8, dice: 1, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light"], voidShields: 0
        }
    ]}],
    ["Leviathan siege claw", {
        arc: "Melee", weaponStatsAtRange: [{
            traits: ["Rend", "Wrecker (2)"]
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
    ["Missile launchers", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 20, dice: 2, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Ignores Cover", "Light"], voidShields: 0
        },
        {minRange: 0, maxRange: 20, dice: 1, hit: 4, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
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
    ["Nose mounted heavy flamer", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 1, hit: 4, infAndCav: {modifier: 0, wounds: 1},
        walker: {modifier: 0, wounds: 1}, traits: ["Ignores Cover", "Light", "Point Defence"], voidShields: 0}
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
    ["Pintle Mounted twin bolter", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 4, dice: 2, hit: 5, infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, traits: ["Light", "Point Defence"], voidShields: 0},
        {minRange: 4, maxRange: 8, dice: 1, hit: 5, infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, traits: ["Light", "Point Defence"], voidShields: 0}
    ]}],
    ["Plasma cannon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 1, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"], voidShields: 0
        }
    ]}],
    ["Plasma guns", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 10, dice: 1, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"], voidShields: 0
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
            traits: ["Barrage", "Light"], voidShields: 1
        }
    ]}],
    ["Sarcophagus mounted weapon", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 8, dice: 1, hit: 6, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light", "Point Defence"], voidShields: 0
        }
    ]}],
    ["Scimitar heavy bolter", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 12, dice: 2, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1},
            traits: ["Light", "Point Defence"], voidShields: 0
        }
    ]}],
    ["Sponson mounted lascannon", {arc: "Front", weaponStatsAtRange: [
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
    ["Tarantula lascannon battery", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 22, dice: 2, hit: 5, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: -1, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Anti-tank"], voidShields: 1
        },
    ]}],
    ["Thermal cannon", {arc: "Front", weaponStatsAtRange: [
        {minRange: 0, maxRange: 6, dice: 1, hit: 3, 
            infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: -4, wounds: 1},
            vShvKT: {modifier: -4, wounds: 2},
            ionShield: {modifier: -2, wounds: 2},
            structure: {modifier: -4, wounds: 1},
            traits: [], voidShields: 1},
    ]}],
    ["Twin-linked bolters", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 4, dice: 2, hit: 5, infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, traits: ["Light", "Point Defence"], voidShields: 0},
        {minRange: 4, maxRange: 8, dice: 1, hit: 5, infAndCav: {modifier: 0, wounds: 1},
            walker: {modifier: 0, wounds: 1}, traits: ["Light", "Point Defence"], voidShields: 0}
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
        traits: ["Accurate", "Deflagrate", "Light", "Point Defence"], voidShields: 0}
    ]}],
    ["Twin plasma guns", {arc: "All", weaponStatsAtRange: [
        {minRange: 0, maxRange: 10, dice: 1, hit: 4, 
            infAndCav: {modifier: -1, wounds: 1},
            walker: {modifier: -1, wounds: 1},
            vShvKT: {modifier: 0, wounds: 1},
            ionShield: {modifier: 0, wounds: 1},
            traits: ["Light AT"], voidShields: 0
        }
    ]}]
]);

export function getWeaponStats(weaponType: WeaponType): WeaponStats | undefined {
    return weapons.get(weaponType);
}