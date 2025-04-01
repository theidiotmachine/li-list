import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { ArmyListName, Formation } from "../game/types.ts";

interface FormationArmyListSelectProps {
    uuid: string;
};

export function FormationArmyListSelect(props: FormationArmyListSelectProps) {
    const { army, changeFormationArmyList } = useContext(AppState);
    const formation = army.value.formations.find((f: Formation)=>f.uuid == props.uuid);
    const formationArmyListName = formation?.armyListName ?? "";
    return <select class ="md:text-xl w-48 md:w-80 appearance-none bg-[url(dropdownarrow-clean.svg)] bg-no-repeat bg-right" 
        onInput={(e) => changeFormationArmyList(props.uuid, e.currentTarget.value as ArmyListName)}>
        <option value="" selected={formationArmyListName == ""}>Choose an Army List</option>
        <option selected={formationArmyListName == "Legions Astartes"}>Legions Astartes</option>
        <option selected={formationArmyListName == "Solar Auxilia"}>Solar Auxilia</option>
        <option selected={formationArmyListName == "Strategic Asset"}>Strategic Asset</option>
    </select>
}