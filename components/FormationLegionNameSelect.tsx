import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { AllLegionNames, LegionName } from "../game/legionTypes.ts";

interface FormationLegionNameListSelectProps {
    uuid: string;
    legionName: LegionName | ""
    class: string;
    editable: boolean;
};

export function FormationLegionNameListSelect(props: FormationLegionNameListSelectProps) {
    const { changeFormationLegionName } = useContext(AppState);
    if(!props.editable) return <div class={"md:text-xl w-full bg-white " + props.class}>
        {props.legionName}
    </div>;
    return <select class={"md:text-xl w-full appearance-none bg-[url(dropdownarrow-clean.svg)] bg-no-repeat bg-right bg-white " + props.class}
        onInput={(e) => changeFormationLegionName(props.uuid, e.currentTarget.value as LegionName)}>
            <option value="" selected={props.legionName == ""}></option>
            {AllLegionNames.map((s, i)=>{
                return <option key={"ln"+i} selected={props.legionName == s}>{s}</option>
            })}
    </select>
}
