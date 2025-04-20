import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { ArmyListName } from "../game/types.ts";

export type ArmyPrimaryArmyListSelectProps = {
    enabled: boolean;
    primaryArmyListName: ArmyListName | "";
};
export function ArmyPrimaryArmyListSelect(props: ArmyPrimaryArmyListSelectProps) {
    const { changePrimaryArmyListName } = useContext(AppState);
    
    return <select class ="text-l md:text-xl w-52 md:w-80 appearance-none bg-[url(dropdownarrow-clean.svg)] bg-no-repeat bg-right" 
        disabled={!props.enabled}
        onInput={(e) => changePrimaryArmyListName(e.currentTarget.value as ArmyListName)}>
        <option value="" selected={props.primaryArmyListName == ""}>Primary Army List</option>
        <option selected={props.primaryArmyListName == "Collegia Titanica"}>Collegia Titanica</option>
        <option selected={props.primaryArmyListName == "Legions Astartes"}>Legions Astartes</option>
        <option selected={props.primaryArmyListName == "Questoris Familia"}>Questoris Familia</option>
        <option selected={props.primaryArmyListName == "Solar Auxilia"}>Solar Auxilia</option>
    </select>
}