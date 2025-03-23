import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { Formation } from "../state.ts";
import { ArmyListName } from "../game/types.ts";

interface FormationArmyListSelectProps {
    uuid: string;
};

export function FormationArmyListSelect(props: FormationArmyListSelectProps) {
    const { army, changeFormationArmyList } = useContext(AppState);
    const formation = army.value.formations.find((f: Formation)=>f.uuid == props.uuid);
    const formationArmyListName = formation?.armyListName ?? "";
    return <select class ="text-xl w-80 appearance-none" onInput={(e) => changeFormationArmyList(props.uuid, e.currentTarget.value as ArmyListName)}>
        <option value="" selected={formationArmyListName == ""}>Choose an Army List</option>
        <option selected={formationArmyListName == "Legions Astartes"}>Legions Astartes</option>
        <option selected={formationArmyListName == "Solar Auxilia"}>Solar Auxilia</option>
        <option selected={formationArmyListName == "Strategic Asset"}>Strategic Asset</option>
    </select>
}