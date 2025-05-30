import { Signal, signal, computed } from "@preact/signals";
import { SaveArc, ModelName } from "../game/types.ts";
import { getStatsForModelName } from "../game/lists.ts";

export type HammerScenarioLoadout = {
    name: string;
    loadout: string;
}

export type HammerScenarioStateType = {
    range: Signal<number>;
    changeRange: (range: number) => void;

    arc: Signal<SaveArc>;
    changeArc: (newArc: SaveArc) => void;

    shooter: Signal<ModelName>;
    changeShooter: (newModelType: ModelName) => void;

    target: Signal<ModelName>;
    changeTarget: (newModelType: ModelName) => void;

    loadouts: Signal<HammerScenarioLoadout[]>;
    changeLoadout: (newLoadout: HammerScenarioLoadout) => void;
    changeLoadouts: (newLoadouts: HammerScenarioLoadout[]) => void;

    changed: Signal<boolean>;
    newUrl: Signal<string>;
}

export function createHammerScenarioState(urlString: string): HammerScenarioStateType {
    const url = URL.parse(urlString);

    const rangeString = (url?.searchParams.get("range") ?? "8");
    const targetArcString = (url?.searchParams.get("targetArc") ?? "Front") as SaveArc;
    const shooterString = url?.searchParams.get("shooter") ?? "Tactical Legionaries";
    const targetString = url?.searchParams.get("target") ?? "Tactical Legionaries";

    const stats = getStatsForModelName(shooterString);
    const loadoutStrings = url?.searchParams.getAll("loadout") ?? [];
    const loadoutsFromUrl = loadoutStrings.map((s)=>{
        const bits = s.split(":");
        return {name: bits[0], loadout: bits[1]}
    });
    const finalLoadouts = [];
    if(stats != undefined) {
        for(const s of stats.modelLoadoutSlots) {
            if(s.name == "")
                continue;
            const thisLoadoutFromUrl = loadoutsFromUrl.find((t)=>t.name == s.name);
            if(thisLoadoutFromUrl != undefined)
                finalLoadouts.push(thisLoadoutFromUrl);
            else
                finalLoadouts.push({name: s.name, loadout: s.possibleModelLoadouts[0].loadout})
        }
    }

    const changed = signal<boolean>(false);
    
    const range = signal<number>(parseInt(rangeString));
    const changeRange = (newRange: number) => {
        range.value = newRange;
        changed.value = true;
    }

    const arc = signal<SaveArc>(targetArcString);
    const changeArc = (newArc: SaveArc) => {
        arc.value = newArc;
        changed.value = true;
    }

    const shooter = signal<ModelName>(shooterString);
    const changeShooter = (newModelType: ModelName) => {
        shooter.value = newModelType;
        changed.value = true;
    }

    const target = signal<ModelName>(targetString);
    const changeTarget = (newModelType: ModelName) => {
        target.value = newModelType;
        changed.value = true;
    }

    const loadouts = signal<HammerScenarioLoadout[]>(finalLoadouts);
    const changeLoadouts = (newLoadouts: HammerScenarioLoadout[]) => {
        loadouts.value = newLoadouts;  
        changed.value = true;
    };
    const changeLoadout = (newLoadout: HammerScenarioLoadout) => {
        const newLoadouts = structuredClone(loadouts.value);
        const index = newLoadouts.findIndex((s)=>s.name == newLoadout.name);
        if(index != -1)
            newLoadouts[index] = newLoadout;
        loadouts.value = newLoadouts;
        changed.value = true;
    }

    const newUrl = computed(()=>{
        return encodeURI("./hammer?"
            + "range=" + range.value.toString() + "&"
            + "targetArc=" + arc.value + "&"
            + "shooter=" + shooter.value + "&"
            + "target=" + target.value + "&"
            + loadouts.value.map((s)=>{
                return "loadout=" + s.name + ":" + s.loadout
            }).join("&"));
        ;
    });

    return {range, changeRange, arc, changeArc, shooter, changeShooter, target, changeTarget, loadouts, changeLoadouts, changeLoadout, newUrl, changed};
}
