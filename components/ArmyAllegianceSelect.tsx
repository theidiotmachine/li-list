import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { Allegiance, Allegiances } from "../game/types.ts";
import { Select, SelectOption } from "./Select.tsx";

export type ArmyAllegianceSelectProps = {
    enabled: boolean;
    allegiance: Allegiance | "";
    class: string;
};

export function ArmyAllegianceSelect(props: ArmyAllegianceSelectProps) {
    const { changeArmyAllegiance } = useContext(AppState);
    
    const options = [
        <SelectOption key= "" value="" optionText="" selected={props.allegiance == ""} type="option">Choose Allegiance</SelectOption>
    ];
    Allegiances.forEach(a => {
        options.push(<SelectOption key={a} value={a} selected={props.allegiance == a} type="option">{a}</SelectOption>)
    });
    return <Select<Allegiance | ""> class ={"text-l md:text-xl w-full " + props.class} 
        disabled={!props.enabled}
        onInput={(e) => changeArmyAllegiance(e)}>
        {options}
    </Select>
}