import { PageProps } from "$fresh/server.ts";
import { ModelType, Save, SaveModifier, Stats, UnitTrait, WeaponStats, WeaponStatsAtRange, WeaponTrait } from "../../game/types.ts";
import { getStatsForModelType } from "../../game/lists.ts";
import { getWeaponStats } from "../../game/weapons.ts";
import { WeaponType } from "../../game/weaponTypes.ts";


function formatSaveModifier(saveModifier: SaveModifier): string {
  let out = saveModifier.modifier.toString();
  if(saveModifier.wounds > 1)
    out += ", " + saveModifier.wounds.toString() + "W";
  return out;
}

function formatSave(s: Save, i: number, stats: Stats) {
  return <td key={"c"+i}>
    {s.save.toString() + "+"}
    <span class="text-xs">{((hasUnitTrait(stats,"Armoured") && s.saveType=="Armour") ? " Reroll fails vs Light" : "")}</span>
    <span class="text-xs">{((hasUnitTrait(stats,"Ionic Flare Shield") && s.saveType=="Ion Shield") ? (" " + (s.save-2).toString() + "+ vs Barrage and Blast") : "")}</span>
    
  </td>
}

function hasUnitTrait(stats: Stats, unitTrait: UnitTrait): boolean {
  return stats.unitTraits.findIndex((t)=>t===unitTrait) != -1
}

function hasWeaponTrait(wsar: WeaponStatsAtRange, trait: WeaponTrait): boolean {
  return wsar.traits.findIndex((t)=>t===trait) != -1
}

function tableRowForWSAR(wt: WeaponType, w: WeaponStats, wsar: WeaponStatsAtRange, i: number, j: number, unitTraits: UnitTrait[]) {
  return <tr key={"b"+i+j} class="even:bg-gray-50 odd:bg-white">
      <td>{(i==0)?wt:""}</td>
      <td>{w.arc}</td>
      <td>
        {(wsar.minRange !=undefined)?(wsar.minRange.toString() + '" - ' + wsar.maxRange?.toString() + '"'):("")}
      </td>
      <td>{wsar.dice}</td>
      <td>
        {(wsar.hit != undefined)?(wsar.hit.toString() + "+"):""}
        <span class="text-xs">{hasWeaponTrait(wsar, "Accurate") ? " Reroll misses" : ""}</span>
        <span class="text-xs">{hasWeaponTrait(wsar, "Barrage") ? " Barrage" : ""}</span>
        <span class="text-xs">{hasWeaponTrait(wsar, "Skyfire") ? " Skyfire" : ""}</span>
        <span class="text-xs">{hasWeaponTrait(wsar, "Tracking") ? " Reroll misses vs flyers" : ""}</span>
        <span class="text-xs">{hasWeaponTrait(wsar, "Rapid Fire") ? " Nat 6 is +1 hit" : ""}</span>
      </td>
      <td>{(wsar.infAndCav)?(formatSaveModifier(wsar.infAndCav)):""}</td>
      <td>
        {(wsar.walker)?(formatSaveModifier(wsar.walker)):""}
      </td>
      <td>
        {(wsar.vShvKT)?(formatSaveModifier(wsar.vShvKT)):""}
        <span class="text-xs">{hasWeaponTrait(wsar, "Armourbane") ? " Reroll successes" : ""}</span>
      </td>
      <td>{(wsar.ionShield)?(formatSaveModifier(wsar.ionShield)):""}</td>
      <td>{(wsar.voidShields)?("-" + wsar.voidShields + "VS"):""}</td>
      <td>{(wsar.structure)?(formatSaveModifier(wsar.structure)):""}</td>
      <td>{wsar.traits.join(", ")}</td>
      <td>{unitTraits.join(", ")}</td>
    </tr>
}

export default function Unit(props: PageProps) {
  const modelType = decodeURIComponent(props.params.unitid) as ModelType;
  const stats = getStatsForModelType(modelType);
  if(stats) {
    const saveHeaders = stats.saves.map((s,i)=><td key={"a"+i} class="w-16">{(s.arc=="All"?"":(s.arc+" ")) + s.saveType}</td>);
    const saves = stats.saves.map((s, i)=>formatSave(s, i, stats));
    const weapons = stats.modelLoadoutSlots.flatMap((wt, j) => {
      return wt.possibleModelLoadouts.flatMap((ml)=>{
        const unitTraits = ml.unitTraits??[];
        const weaponTypes = ml.weaponTypes??[ml.loadout] as WeaponType[];
        return weaponTypes.flatMap((wt)=>{
          const w = getWeaponStats(wt);
          if(w === undefined)
            return <tr></tr>;

          return w.weaponStatsAtRange.map((wsar, i)=>{
            return tableRowForWSAR(wt, w, wsar, i, j, unitTraits);
          });
        });
      });
    });

    return <div class="flex flex-row justify-center mt-8"><div>
      <h1 class="text-xl">{modelType}</h1>
      <div>
        <p>{stats.unitTraits.join(", ")}</p>
      </div>
      <div>
        <table class="border-collapse border table-fixed text-sm">
          <thead>
            <tr class="border-b-2 border-gray-400 font-bold bg-gray-100">
              <td class="w-32">Type</td>
              <td class="w-16">Scale</td>
              <td class="w-16">Move</td>
              {saveHeaders}
              <td class="w-16">CAF</td>
              <td class="w-16">Morale</td>
              <td class="w-16">W</td>
              <td class="w-16">Tac. Str.</td>
            </tr>
          </thead>
          <tbody>
            <tr class="even:bg-gray-50 odd:bg-white">
              <td>{stats.unitType}</td>
              <td>{stats.scale}</td>
              <td>{(stats.move)?(stats.move+'"'): ""}</td>
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
      
      <ul>
      {stats.modelLoadoutSlots.map((smlfs, i) => {
        return <li class="text-sm" key={i}>
          {(smlfs.possibleModelLoadouts.length == 2 && smlfs.possibleModelLoadouts[0].weaponTypes?.length == 0)
          ?("Optional " + smlfs.possibleModelLoadouts[1].loadout)
          :(
            smlfs.possibleModelLoadouts.map((l)=>{
              if(l.weaponTypes !== undefined && l.weaponTypes.length == 0)
                return "Nothing";
              return l.weaponTypes?.join(", ")??l.loadout
            }).join(" or ")
          )}
        </li>
      })}
      </ul>

      <div>
      <table class="border-collapse border text-sm">
          <thead>
            <tr class="border-b-2 border-gray-400 font-bold bg-gray-100">
              <td class="w-32">Name</td>
              <td class="w-16">Arc</td>
              <td class="w-16">Range</td>
              <td class="w-16">D6</td>
              <td class="w-16">Hit</td>
              <td class="w-16">Inf, Cav</td>
              <td class="w-16">Walker</td>
              <td class="w-16">Ve., SHV, Kn., Ti.</td>
              <td class="w-16">Ion Shield</td>
              <td class="w-16">Void Shield</td>
              <td class="w-16">Struct</td>
              <td class="w-32">Traits</td>
              <td class="w-32">Unit Traits</td>
            </tr>
          </thead>
          <tbody >
            {weapons}
          </tbody>
        </table>
      </div>
    </div></div>
  } else {
    return <div>No stats for: {modelType}</div>;
  }
}