import { getStatsForModelName } from "./lists.ts";
import { SaveArc, ModelName, SaveType, Stats, statsHasTrait, statsHasTraitLike } from "./types.ts";
import { getWeaponStats } from "./weapons.ts";
import { hasWeaponTrait, weaponHasTrait, weaponHasTraitLike, WeaponStats, WeaponStatsAtRange, WeaponType } from "./weaponTypes.ts";

type NamedWeaponStats = {
    weaponType: WeaponType;
    weaponStats: WeaponStats;
}

export type HitResultOutcome = {
    fraction: number;
    hits: number;
}

type AimResult = {
    resultTable: HitResultOutcome[];
}

type DamageResult = {
    damageFraction: number;
    wounds: number;
    saveType: SaveType;
    notes: string[];
}

type HitAndDamageResult = {
    fraction: number;
    wounds: number;
}

export type ShootResultOutcome = {
    fraction: number;
    wounds: number;
}

export type SingleShootResult = {
    weaponType: WeaponType;
    resultTable: ShootResultOutcome[],
    saveType: SaveType;
    hitTable: HitResultOutcome[];
    damageFraction: number;
    hitAndDamageTable: HitAndDamageResult[];
    dice: number;
    notes: string[];
}

export type ShootResult = {
    individualResults: (SingleShootResult | undefined)[],
    netResults: ShootResultOutcome[],
    unknownWeapons: string[],
}

const hitDiceTable = [
    5/6,    //0+
    5/6,    //1+
    5/6,    //2+
    4/6,    //3+
    3/6,    //4+
    2/6,    //5+
    1/6,    //6+
    1/6,    //7+
];

const saveDiceTable = [
    1,      //0+
    1,      //1+
    5/6,    //2+
    4/6,    //3+
    3/6,    //4+
    2/6,    //5+
    1/6,    //6+
    0,      //7+
    0,      //8+
    0,      //9+
    0,      //10+
];

function aimWeapon(wsar: WeaponStatsAtRange, targetStats: Stats): AimResult | undefined {
    //TODO Ripple Fire
    if(wsar.hit == undefined)
        return undefined; 

    let hit = wsar.hit;
    if(statsHasTrait(targetStats, "Flyer")) {
        //everyone's favourite FAQ: you can't hit flyers with burrowing rounds
        if(weaponHasTrait(wsar, "Burrowing") || weaponHasTrait(wsar, "Beam") || weaponHasTrait(wsar, "Bombing Run"))
            return {resultTable: [
                {fraction: 1, hits: 0}
            ]};

        if(!weaponHasTrait(wsar, "Skyfire")) {
            if(weaponHasTraitLike(wsar, "Blast ")) {
                //if you have blast and no skyfire, you can't hit flyers
                return {resultTable: [
                    {fraction: 1, hits: 0}
                ]}; 
            } else {
                hit = 6;
            }
        }   
    } else {
        //blast + skyfire can only hit flyers
        if(weaponHasTraitLike(wsar, "Blast ") && weaponHasTrait(wsar, "Skyfire"))
            return {resultTable: [
                {fraction: 1, hits: 0}
            ]}; 
    }

    if(weaponHasTrait(wsar, "Rapid Fire") || (statsHasTrait(targetStats, "Flyer") && weaponHasTrait(wsar, "Tracking"))) {
        const hitFraction = hitDiceTable[hit+1];
        const superHitFraction = hitDiceTable[6];
        const missFraction = 1 - (hitFraction + superHitFraction);
        return {resultTable: [
            {fraction: missFraction, hits: 0},
            {fraction: hitFraction, hits: 1},
            {fraction: superHitFraction, hits: 2},
        ]};
    }

    let hitFraction = hitDiceTable[hit];
    
    if(weaponHasTrait(wsar, "Accurate")) {
        //the miss gets a second bite of the cherry
        const missFraction = 1-hitFraction;
        const reRollHitFraction = missFraction * hitFraction;
        hitFraction += reRollHitFraction;
    }

    return {resultTable: [
        {fraction: 1-hitFraction,hits: 0},
        {fraction: hitFraction, hits: 1}
    ]};
}

function saveThrow(wsar: WeaponStatsAtRange, targetStats: Stats, targetArc: SaveArc): DamageResult | undefined {
    const wsarTraits = structuredClone(wsar.traits);
    if(hasWeaponTrait(wsarTraits, "Neutron-flux")) {
        if(statsHasTraitLike(targetStats, "Cybernetica Cortex")) {
            wsarTraits.push("Armourbane");
            wsarTraits.push("Shred");
        }
    }

    //not implemented
    if(hasWeaponTrait(wsarTraits, "Impale"))
        return {damageFraction: 0, wounds: 0, saveType: "Armour", notes: ["'Impale' not implemented"]};

    //also bypasses void shields but we don't have that yet
    if(hasWeaponTrait(wsarTraits, "Burrowing"))
        targetArc = "Rear";

    let armourSaveModifier = undefined;
    if(targetStats.detachmentType == "Infantry" || targetStats.detachmentType == "Cavalry") {
        armourSaveModifier = wsar.infAndCav;
        if(armourSaveModifier == undefined)
            return {damageFraction: 0, wounds: 0, saveType: "Armour", notes: ["Can't damage this unit with this weapon"]};
    } else if(targetStats.detachmentType == "Walker") {
        armourSaveModifier = wsar.walker;
        if(armourSaveModifier == undefined)
            return {damageFraction: 0, wounds: 0, saveType: "Armour", notes: ["Can't damage this unit with this weapon"]};
    } else if(targetStats.detachmentType == "Vehicle" || targetStats.detachmentType == "Super-heavy vehicle" 
        || targetStats.detachmentType == "Knight" || targetStats.detachmentType == "Titan"
    ) {
        armourSaveModifier = wsar.vShvKT;
        if(armourSaveModifier == undefined)
            return {damageFraction: 0, wounds: 0, saveType: "Armour", notes: ["Can't damage this unit with this weapon"]};
    } else {
        armourSaveModifier = wsar.structure;
        if(armourSaveModifier == undefined)
            return {damageFraction: 0, wounds: 0, saveType: "Armour", notes: ["Can't damage this Structure with this weapon"]};
    }

    const targetSaves = targetStats.saves;
    if(statsHasTrait(targetStats, "Explorer Adaptation") && (weaponHasTrait(wsar, "Barrage") || weaponHasTraitLike(wsar, "Blast ("))) {
        targetSaves.push({save: 6, saveType: "Invuln", arc: "All"});
    }
    
    const out: DamageResult = {
        damageFraction: 0,
        wounds: 0,
        saveType: "Armour",
        notes: [],
    }
    const armourSave = targetSaves.find((s)=>s.saveType == "Armour" && (s.arc == "All" || s.arc == targetArc));
    if(armourSave != undefined) {
        let save = armourSave.save;
        save -= armourSaveModifier.modifier;
        out.damageFraction = 1-saveDiceTable[save];

        if((hasWeaponTrait(wsarTraits, "Shred") && (targetStats.detachmentType == "Infantry" || targetStats.detachmentType == "Cavalry" || targetStats.detachmentType == "Walker"))
            || (hasWeaponTrait(wsarTraits, "Armourbane") && (targetStats.detachmentType == "Vehicle" || targetStats.detachmentType == "Super-heavy vehicle" 
                || targetStats.detachmentType == "Knight" || targetStats.detachmentType == "Titan"))) {
            //reroll successes
            out.notes.push("Shred/Armourbane reroll");
            const saveFraction = 1-out.damageFraction;
            const twoSaveFraction = saveFraction * saveFraction;
            out.damageFraction = 1-twoSaveFraction;
        }

        out.wounds = armourSaveModifier.wounds;
        out.saveType = "Armour";
    }

    const ionSave = targetSaves.find((s)=>s.saveType == "Ion Shield" && (s.arc == "All" || s.arc == targetArc));
    if(ionSave != undefined) {
        const ionShieldModifier = wsar.ionShield;
        if(ionShieldModifier != undefined) {
            const finalIonSave = ionSave.save - ionShieldModifier?.modifier;
            const damageFraction = 1-saveDiceTable[finalIonSave];
            if(damageFraction < out.damageFraction) {
                out.damageFraction = damageFraction;
                out.wounds = ionShieldModifier.wounds;
                out.saveType = "Ion Shield";
            }
        }
    }

    const jinkSave = targetSaves.find((s)=>s.saveType == "Jink" && (s.arc == "All" || s.arc == targetArc));
    if(jinkSave != undefined) {
        const damageFraction = 1-saveDiceTable[jinkSave.save];
        if(damageFraction < out.damageFraction) {
            out.damageFraction = damageFraction;
            out.saveType = "Jink";
        }
    }

    const invulnSave = targetSaves.find((s)=>s.saveType == "Invuln" && (s.arc == "All" || s.arc == targetArc));
    if(invulnSave != undefined) {
        const damageFraction = 1-saveDiceTable[invulnSave.save];
        if(damageFraction < out.damageFraction) {
            out.damageFraction = damageFraction;
            out.saveType = "Invuln";
        }
    }

    return out;
}

function shootWeapon(nws: NamedWeaponStats, targetStats: Stats, targetArc: SaveArc, range: number): SingleShootResult | undefined {
    type IntermediateShootResult = {
        hitFractions: HitResultOutcome[];
        damageFraction: number;
        wounds: number;
        weaponType: WeaponType;
        saveType: SaveType;
        wsar: WeaponStatsAtRange;
        hitAndDamageFractions: HitAndDamageResult[];
        notes: string[];
    };

    let eligibleWSARs = nws.weaponStats.weaponStatsAtRange.filter((wsar)=>{
        return !(
            weaponHasTrait(wsar, "Deflagrate") 
            || weaponHasTrait(wsar, "Collapsing Singularity")
            || weaponHasTrait(wsar, "Firestorm")
            || weaponHasTrait(wsar, "Graviton Pulse")
            || weaponHasTrait(wsar, "Saturation Fire")
        )
    });

    if(eligibleWSARs.length == 0) {
        return {
            weaponType: nws.weaponType,
            saveType: "Armour",
            resultTable: [{wounds: 0, fraction: 1}],
            hitTable: [{hits: 0, fraction: 1}],
            damageFraction: 0,
            hitAndDamageTable: [{wounds: 0, fraction: 1}],
            dice: 0,
            notes: ["Trait not implemented"]
        };
    }

    //filter down the ones in range
    eligibleWSARs = nws.weaponStats.weaponStatsAtRange.filter((wsar)=>
        wsar.minRange != undefined && wsar.maxRange != undefined && wsar.minRange < range && wsar.maxRange >= range && nws.weaponStats.arc != "Melee"
    );

    if(eligibleWSARs.length == 0) {
        return {
            weaponType: nws.weaponType,
            saveType: "Armour",
            resultTable: [{wounds: 0, fraction: 1}],
            hitTable: [{hits: 0, fraction: 1}],
            damageFraction: 0,
            hitAndDamageTable: [{wounds: 0, fraction: 1}],
            dice: 0,
            notes: ["Out of range"]
        };
    }
    
    const aimResults = eligibleWSARs.map((wsar)=>{return{aimResult: aimWeapon(wsar, targetStats), wsar}});
    const shootResults: (IntermediateShootResult|undefined)[] = aimResults.map(({aimResult, wsar})=>{
        if(aimResult === undefined)
            return undefined;
        const damageResult = saveThrow(wsar, targetStats, targetArc);
        
        if(damageResult === undefined)
            return undefined;
        const notes = damageResult.notes;

        const damageTable: HitAndDamageResult[] = [];
        for(let i = 0; i < aimResult.resultTable.length; ++i) {
            damageTable.push({fraction: 0, wounds: i * damageResult.wounds});
        }

        for(let i = 0; i < aimResult.resultTable.length; ++i) {
            damageTable[0].fraction += aimResult.resultTable[i].fraction * (1-damageResult.damageFraction);
            damageTable[i].fraction += aimResult.resultTable[i].fraction * damageResult.damageFraction;
        }

        return {
            hitFractions: aimResult.resultTable,
            damageFraction: damageResult.damageFraction,
            wounds: damageResult.wounds,
            weaponType: nws.weaponType,
            saveType: damageResult.saveType,
            wsar: wsar,
            hitAndDamageFractions: damageTable,
            notes,
        }
    });

    let ssr: IntermediateShootResult | undefined = undefined;

    //we choose the best of the weapon options. This is a little hard; let's choose the one
    //with the lowest percentage of misses
    for (const sr of shootResults) {
        if(sr != undefined){
            if(ssr == undefined)
                ssr = sr;
            else {
                if(ssr.hitAndDamageFractions[0].fraction > sr.hitAndDamageFractions[0].fraction)
                    ssr = sr;
            }
        }
    }
    
    if(ssr == undefined)
        return undefined;

    if(ssr.wsar.dice == undefined || typeof(ssr.wsar.dice) == "string")
        return undefined;

    let outTable: ShootResultOutcome[] = [{fraction: 1, wounds: 0}];
    for(let i = 0; i < ssr.wsar.dice; ++i) {

        const newOutTable: ShootResultOutcome[] = structuredClone(outTable);
        for(let j = 0; j < newOutTable.length; ++j)
            newOutTable[j].fraction = 0;

        for(let j = 0; j < outTable.length; ++j) {
            for(let k = 0; k < ssr.hitAndDamageFractions.length; ++k) {
                const index = j + ssr.hitAndDamageFractions[k].wounds;
                while(index >= newOutTable.length)
                    newOutTable.push({fraction: 0, wounds: newOutTable.length});

                newOutTable[index].fraction += outTable[j].fraction * ssr.hitAndDamageFractions[k].fraction;
            }
        }
        outTable = newOutTable;
    }

    outTable = outTable.filter((t, i)=>i === 0 || t.fraction > 0);

    return {
        weaponType: ssr.weaponType,
        saveType: ssr.saveType,
        resultTable: outTable,
        hitTable: ssr.hitFractions,
        damageFraction: ssr.damageFraction,
        hitAndDamageTable: ssr.hitAndDamageFractions,
        dice: ssr.wsar.dice,
        notes: ssr.notes,
    };
}

export function shoot(
    shooterModelType: ModelName, additionalShooterWeapons: WeaponType[], targetModelType: ModelName, targetArc: SaveArc, range: number
): ShootResult | undefined {
    const shooterStats = getStatsForModelName(shooterModelType);
    const namedWeaponStats: NamedWeaponStats[] = [];
    const unknownWeapons: string[] = [];

    const recordStats = (wt: WeaponType) => {
        const weaponStats = getWeaponStats(wt);
        if(weaponStats != undefined)
            namedWeaponStats.push({weaponType: wt, weaponStats: weaponStats});
        else
            unknownWeapons.push(wt);
    };

    shooterStats?.modelLoadoutSlots.forEach((slot)=>{
        //if the name is empty, it's required
        if(slot.name == "") {
            if(slot.possibleModelLoadouts[0].weaponTypes != undefined)
                slot.possibleModelLoadouts[0].weaponTypes.forEach(recordStats);
            else
                recordStats(slot.possibleModelLoadouts[0].loadout as WeaponType);
        }
    });

    additionalShooterWeapons.forEach(recordStats);

    const targetStats = getStatsForModelName(targetModelType);
    if(targetStats == undefined) 
        return undefined;

    const individualResults: (SingleShootResult|undefined)[] = namedWeaponStats.map(nws=>shootWeapon(nws, targetStats, targetArc, range));
    let netResults: ShootResultOutcome[] = [];
    let w = 0;

    individualResults.forEach((ssr)=>{
        if(ssr!=undefined){
            ssr.resultTable.forEach((t)=>{
                for(let i = 0; i<t.wounds; ++i) {
                    netResults.push({fraction: 0, wounds: w});
                    w += 1;
                }
            });
        }
    });

    netResults.push({fraction: 0, wounds: w});
    netResults[0].fraction = 1;

    for(let i = 0; i < individualResults.length; ++i) {
        const thisIndividualResult = individualResults[i];
        if(thisIndividualResult == undefined)
            continue;

        const newNetResults: ShootResultOutcome[] = structuredClone(netResults);
        for(let j = 0; j < newNetResults.length; ++j)
            newNetResults[j].fraction = 0;

        for(let j = 0; j < netResults.length; ++j) {
            for(let k = 0; k < thisIndividualResult.resultTable.length; ++k) {
                const thisIndividualResultTableElem = thisIndividualResult.resultTable[k];
                const index = netResults[j].wounds + thisIndividualResultTableElem.wounds;
                if(index >= newNetResults.length)
                    break;
                newNetResults[index].fraction += netResults[j].fraction * thisIndividualResultTableElem.fraction;
            }
        }
        netResults = newNetResults;
    }

    netResults = netResults.filter((t, i)=>i === 0 || t.fraction > 0);
        
    return{
        individualResults: individualResults,
        netResults: netResults,
        unknownWeapons: unknownWeapons
    }
}