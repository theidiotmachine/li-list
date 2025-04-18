import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { AllLegionNames, LegionName } from "../game/legionTypes.ts";

interface FormationLegionNameListSelectProps {
    uuid: string;
    legionName: LegionName | ""
    class: string
};

export function FormationLegionNameListSelect(props: FormationLegionNameListSelectProps) {
    const { changeFormationLegionName } = useContext(AppState);
    return <select class ={"md:text-xl w-48 md:w-80 appearance-none bg-[url(dropdownarrow-clean.svg)] bg-no-repeat bg-right " + props.class}
        onInput={(e) => changeFormationLegionName(props.uuid, e.currentTarget.value as LegionName)}>
            <option value="" selected={props.legionName == ""}></option>
            {AllLegionNames.map((s, i)=>{
                return <option key={"ln"+i} selected={props.legionName == s}>{s}</option>
            })}
    </select>
}
