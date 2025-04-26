import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { Allegiance, Allegiances } from "../game/types.ts";

export type ArmyAllegianceSelectProps = {
    enabled: boolean;
    allegiance: Allegiance | "";
};

export function ArmyAllegianceSelect(props: ArmyAllegianceSelectProps) {
    const { changeArmyAllegiance } = useContext(AppState);
    
    const options = [
        <option key= "" value="" selected={props.allegiance == ""}>Allegiance</option>
    ];
    Allegiances.forEach(a => {
        options.push(<option key={a} value={a} selected={props.allegiance == a}>{a}</option>)
    });
    return <select class ="text-l md:text-xl w-full appearance-none bg-[url(dropdownarrow-clean.svg)] bg-no-repeat bg-right bg-white" 
        disabled={!props.enabled}
        onInput={(e) => changeArmyAllegiance(e.currentTarget.value as Allegiance)}>
        {options}
    </select>
}