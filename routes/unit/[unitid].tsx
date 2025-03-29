import { PageProps } from "$fresh/server.ts";
import { ModelType, SaveModifier, Stats, UnitTrait, WeaponStatsAtRange, WeaponTrait } from "../../game/types.ts";
import { getStatsForModelType } from "../../game/lists.ts";
import { getWeaponStats } from "../../game/weapons.ts";


function formatSaveModifier(saveModifier: SaveModifier): string {
  let out = saveModifier.modifier.toString();
  if(saveModifier.wounds > 1)
    out += ", " + saveModifier.wounds.toString() + "W";
  return out;
}

function hasUnitTrait(stats: Stats, unitTrait: UnitTrait): boolean {
  return stats.unitTraits.findIndex((t)=>t===unitTrait) != -1
}

function hasWeaponTrait(wsar: WeaponStatsAtRange, trait: WeaponTrait): boolean {
  return wsar.traits.findIndex((t)=>t===trait) != -1
}

export default function Unit(props: PageProps) {
  const modelType = decodeURIComponent(props.params.unitid) as ModelType;
  const stats = getStatsForModelType(modelType);
  if(stats) {
    const saveHeaders = stats.saves.map((s,i)=><td key ={i} class="w-16">{(s.arc=="All"?"":(s.arc+" ")) + s.saveType}</td>);
    const saves = stats.saves.map(s=><td>{s.save.toString() + "+"}</td>);
    const weapons = stats.weaponTypes.flatMap((wt)=> {
        const w = getWeaponStats(wt);
        if(w === undefined)
          return <tr></tr>;

        return w.weaponStatsAtRange.map((wsar, i)=>{
          return <tr><td>{(i==0)?wt:""}</td>
            <td>{w.arc}</td>
            <td>
              {wsar.minRange}"-{wsar.maxRange}"
            </td>
            <td>{wsar.dice}</td>
            <td>
              {wsar.hit}+ 
              <span class="text-xs">{hasWeaponTrait(wsar, "Accurate") ? " Reroll misses" : ""}</span>
              <span class="text-xs">{hasWeaponTrait(wsar, "Barrage") ? " Barrage" : ""}</span>
              <span class="text-xs">{hasWeaponTrait(wsar, "Skyfire") ? " Skyfire" : ""}</span>
              <span class="text-xs">{hasWeaponTrait(wsar, "Tracking") ? " Reroll misses vs flyers" : ""}</span>
              <span class="text-xs">{hasWeaponTrait(wsar, "Rapid Fire") ? " Nat 6 is +1 hit" : ""}</span>
            </td>
            <td>{(wsar.infAndCav)?(formatSaveModifier(wsar.infAndCav)):""}</td>
            <td>
              {(wsar.walker)?(formatSaveModifier(wsar.walker)):""}<span class="text-xs">{hasWeaponTrait(wsar, "Light") ? " Reroll fails" : ""}</span>
            </td>
            <td>{(wsar.vShvKT)?(formatSaveModifier(wsar.vShvKT)):""}</td>
            <td>{(wsar.structure)?(formatSaveModifier(wsar.structure)):""}</td>
            <td>{(wsar.ionShield)?(formatSaveModifier(wsar.ionShield)):""}</td>
            <td>{(wsar.voidShields)?("-" + wsar.voidShields + "VS"):""}</td>
            <td>{wsar.traits.join(", ")}</td>
          </tr>
        })}
      );
    return <div class="flex flex-row justify-center mt-8"><div>
      <h1 class="text-xl">{modelType}</h1>
      <div>
        <p>{stats.unitTraits.join(", ")}</p>
      </div>
      <div>
        <table class="border-collapse border border-gray-400 table-fixed">
          <thead>
            <tr>
              <td class="w-32">Type</td>
              <td class="w-16">Scale</td>
              <td class="w-16">Advance</td>
              <td class="w-16">Charge</td>
              <td class="w-16">March</td>
              {saveHeaders}
              <td class="w-16">CAF</td>
              <td class="w-16">Morale</td>
              <td class="w-16">W</td>
              <td class="w-16">Tac. Str.</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{stats.unitType}</td>
              <td>{stats.scale}</td>
              <td>{stats.advance}"</td>
              <td>{stats.charge}"</td>
              <td>{stats.march}"</td>
              {saves}
              <td>{(stats.caf >= 0)?("+" + stats.caf.toString()):stats.caf}</td>
              <td>
                {(stats.morale)?(stats.morale.toString() + "+"):""}
                <span class="text-xs">{hasUnitTrait(stats,"Implacable")?" Choose if lose combat":""}</span>
              </td>
              <td>
                {stats.wounds.toString() + (stats.voidShields?("W, " + stats.voidShields + "VS"):"")}
              </td>
              <td>{stats.tacticalStrength}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div>
      <table class="border-collapse border border-gray-400">
          <thead>
            <tr>
              <td class="w-32">Name</td>
              <td class="w-16">Arc</td>
              <td class="w-16">Range</td>
              <td class="w-16">D6</td>
              <td class="w-16">Hit</td>
              <td class="w-16">Inf, Cav</td>
              <td class="w-16">Walker</td>
              <td class="w-16">Ve, SHV, Kn, Ti</td>
              <td class="w-16">Struct</td>
              <td class="w-16">Ion Shield</td>
              <td class="w-16">Void Shield</td>
              <td class="w-16">Traits</td>
            </tr>
          </thead>
          <tbody>
            {weapons}
          </tbody>
        </table>
      </div>
    </div></div>
  } else {
    return <div>No stats for: {modelType}</div>;
  }
}