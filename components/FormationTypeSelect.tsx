import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { Formation, FormationName } from "../game/types.ts";
import { getFormationTypesForArmyListName } from "../game/lists.ts";

interface FormationTypeSelectProps {
    uuid: string;
};

export function FormationTypeSelect(props: FormationTypeSelectProps) {
    const { army, changeFormationName } = useContext(AppState);
    const formation = army.value.formations.find((f: Formation)=>f.uuid == props.uuid)

    const formationType = formation?.formationName ?? "";

    let formationTypes: (FormationName | "")[] = [""];
    formationTypes = formationTypes.concat(getFormationTypesForArmyListName(formation?.armyListName ?? ""));

    return <select 
        class="w-full md:font-medium md:text-xl appearance-none bg-[url(dropdownarrow-clean.svg)] bg-no-repeat bg-right md:bg-gray-100 md:border-b-2 border-gray-400 bg-white" 
        onInput={(e) => changeFormationName(props.uuid, e.currentTarget.value as FormationName)}>
        {formationTypes.map((f, i)=><option key={i} selected={formationType == f}>{f}</option>)}
    </select>
}