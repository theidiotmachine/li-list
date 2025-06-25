import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { AllLegionNames, LegionName } from "../game/legionTypes.ts";
import { Select, SelectOption } from "./Select.tsx";

interface FormationLegionNameListSelectProps {
    uuid: string;
    legionName: LegionName | ""
    class: string;
    editable: boolean;
};

export function FormationLegionNameListSelect(props: FormationLegionNameListSelectProps) {
    const { changeFormationLegionName } = useContext(AppState);
    if(!props.editable) return <div class={"md:text-xl w-full dark:bg-black dark:text-white " + props.class}>
        {props.legionName}
    </div>;
    const options = [
        <SelectOption type="option" value="" selected={props.legionName == ""} key=""> </SelectOption>
    ];
    AllLegionNames.forEach((s, i)=>{
        options.push(<SelectOption type="option" key={"ln"+i} selected={props.legionName == s}>{s}</SelectOption>)
    })

    return <Select class={"md:text-xl w-full bg-right bg-white dark:bg-black dark:text-white " + props.class}
        onInput={(e) => changeFormationLegionName(props.uuid, e as LegionName)}>
        {options}
    </Select>
}
