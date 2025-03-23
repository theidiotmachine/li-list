import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { Formation } from "../state.ts";
import { FormationType } from "../game/types.ts";
import { getFormationTypesForArmyListName } from "../game/lists.ts";

interface FormationTypeSelectProps {
    uuid: string;
};

export function FormationTypeSelect(props: FormationTypeSelectProps) {
    const { army, changeFormationType } = useContext(AppState);
    const formation = army.value.formations.find((f: Formation)=>f.uuid == props.uuid)

    const formationType = formation?.formationType ?? "";

    let formationTypes: (FormationType | "")[] = [""];
    formationTypes = formationTypes.concat(getFormationTypesForArmyListName(formation?.armyListName ?? ""));

    return <select class="w-80 text-xl appearance-none" onInput={(e) => changeFormationType(props.uuid, e.currentTarget.value as FormationType)}>
        {formationTypes.map((f, i)=><option key={i} selected={formationType == f}>{f}</option>)}
    </select>
}