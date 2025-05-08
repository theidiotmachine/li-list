import { useContext } from "preact/hooks";
import { HammerScenarioState } from "../islands/HammerScenarioIsland.tsx";
import { SaveArc, StatsModelLoadoutForSlot, StatsModelLoadoutSlot } from "../game/types.ts";
import { HammerModelNameSelect } from "./HammerModelNameSelect.tsx";
import { getStatsForModelName } from "../game/lists.ts";
import { HammerScenarioLoadout } from "../state/hammerScenarioState.ts";

type HammerModelLoadoutSelectProps = {
    name: string;
    loadout: string | undefined;
    possibleModelLoadouts: StatsModelLoadoutForSlot[];
}
function HammerModelLoadoutSelect(props: HammerModelLoadoutSelectProps) {
    const {changeLoadout} = useContext(HammerScenarioState);
    return <select class="w-full" onInput={(e)=>{
        changeLoadout({name: props.name, loadout: e.currentTarget.value})
    }}>
        {props.possibleModelLoadouts.map((s)=>{
            return <option key={s.loadout} selected={s.loadout != undefined && s.loadout==props.loadout}>{s.loadout}</option>
        })}
    </select>
}

type HammerModelLoadoutSlotProps = {
    statsModelLoadoutSlot: StatsModelLoadoutSlot;
    loadout: HammerScenarioLoadout | undefined;
}
function HammerModelLoadoutSlot(props: HammerModelLoadoutSlotProps) {
    return <div class="flex flex-col">
        <label>{props.statsModelLoadoutSlot.name}</label>
        <HammerModelLoadoutSelect 
            name={props.statsModelLoadoutSlot.name} 
            loadout={props.loadout?.loadout ?? undefined} 
            possibleModelLoadouts={props.statsModelLoadoutSlot.possibleModelLoadouts}
        />
    </div>
}

export function HammerScenario() {
    const {range, changeRange, arc, changeArc, shooter, changeShooter, target, changeTarget, loadouts, newUrl, changed} = useContext(HammerScenarioState);
    const stats = getStatsForModelName(shooter.value);
    
    return <div class="flex flex-col">  
        <div class="font-medium text-lg bg-gray-100 border-b-2 border-gray-400">Scenario</div>
        <div class="flex flex-row">
            <label class="font-medium w-32">Shooter</label>
            <HammerModelNameSelect class="w-56" modelName={shooter.value} changeModelName={changeShooter}/>
        </div>
        <div class="flex flex-row">
            <label class="font-medium w-32">Target</label>
            <HammerModelNameSelect class="w-56" modelName={target.value} changeModelName={changeTarget}/>
        </div>
        <div class="flex flex-row">
            <label class="font-medium w-32">Range</label>
            <input type="number"
                //this madness removes the spinners
                class="w-56 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                min="0" 
                value={range.value} onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    changeRange(parseInt(target.value));
                }}
            />
        </div>
        <div class="flex flex-row">
            <label class="font-medium w-32">Target Arc</label>
            <select class="w-56" onInput={(e) => changeArc(e.currentTarget.value as SaveArc)}>
                <option selected={arc.value == "Front"}>Front</option>
                <option selected={arc.value == "Rear"}>Rear</option>
            </select>
        </div>
        <div class="flex flex-col">
            <label class="font-medium">Loadout options</label>
            {
                stats?.modelLoadoutSlots.filter((statsModelLoadoutSlot)=>statsModelLoadoutSlot.name != "" && !statsModelLoadoutSlot.notAWeapon)
                    .map((statsModelLoadoutSlot, i)=>{
                        const s = loadouts.value.find((s)=>s.name == statsModelLoadoutSlot.name);
                        return <HammerModelLoadoutSlot key={i} loadout={s} statsModelLoadoutSlot={statsModelLoadoutSlot}/>
                    })
            }
            </div>
        <div>
            <button type="button" disabled={!changed.value} class="disabled:text-gray-500 bg-gray-200 pl-1 pr-1 w-full mt-4" onClick={()=>{
                globalThis.location.href = newUrl.value;
            }}>Rerun</button>
        </div>
    </div>
}