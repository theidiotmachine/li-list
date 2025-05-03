import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { ArmyListName } from "../game/types.ts";
import { Select, SelectOption } from "./Select.tsx";

export type ArmyPrimaryArmyListSelectProps = {
    enabled: boolean;
    primaryArmyListName: ArmyListName | "";
};
export function ArmyPrimaryArmyListSelect(props: ArmyPrimaryArmyListSelectProps) {
    const { changePrimaryArmyListName } = useContext(AppState);
    
    return <Select 
        class ="text-l md:text-xl w-full bg-right bg-white" onInput={(e) => {
            changePrimaryArmyListName(e as ArmyListName)
        }}
        disabled={!props.enabled}
        //selectedValue={props.primaryArmyListName}
    >
        <SelectOption selected={props.primaryArmyListName == ""} optionText="" value="">Choose Primary Army List</SelectOption>
        <SelectOption selected={props.primaryArmyListName == "Collegia Titanica"}>Collegia Titanica</SelectOption>
        <SelectOption selected={props.primaryArmyListName == "Legions Astartes"}>Legions Astartes</SelectOption>
        <SelectOption selected={props.primaryArmyListName == "Questoris Familia"}>Questoris Familia</SelectOption>
        <SelectOption selected={props.primaryArmyListName == "Solar Auxilia"}>Solar Auxilia</SelectOption>
    </Select>
    /*
    return <select class ="text-l md:text-xl w-full appearance-none bg-[url(dropdownarrow-clean.svg)] bg-no-repeat bg-right bg-white" 
        disabled={!props.enabled}
        onInput={(e) => changePrimaryArmyListName(e.currentTarget.value as ArmyListName)}>
        <option value="" selected={props.primaryArmyListName == ""}>Primary Army List</option>
        <option selected={props.primaryArmyListName == "Collegia Titanica"}>Collegia Titanica</option>
        <option selected={props.primaryArmyListName == "Legions Astartes"}>Legions Astartes</option>
        <option selected={props.primaryArmyListName == "Questoris Familia"}>Questoris Familia</option>
        <option selected={props.primaryArmyListName == "Solar Auxilia"}>Solar Auxilia</option>
    </select>
    */
}