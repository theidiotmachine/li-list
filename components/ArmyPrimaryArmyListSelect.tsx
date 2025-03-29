import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { ArmyListName } from "../game/types.ts";

export function ArmyPrimaryArmyListSelect() {
    const { army, changePrimaryArmyListName } = useContext(AppState);
    const primaryArmyListName = army.value.primaryArmyListName;
    return <select class ="text-2xl w-80 appearance-none bg-[url(dropdownarrow-clean.svg)] bg-no-repeat bg-right" 
        onInput={(e) => changePrimaryArmyListName(e.currentTarget.value as ArmyListName)}>
        <option value="" selected={primaryArmyListName == ""}>Primary Army List</option>
        <option selected={primaryArmyListName == "Legions Astartes"}>Legions Astartes</option>
        <option selected={primaryArmyListName == "Solar Auxilia"}>Solar Auxilia</option>
        <option selected={primaryArmyListName == "Strategic Asset"}>Strategic Asset</option>
    </select>
}