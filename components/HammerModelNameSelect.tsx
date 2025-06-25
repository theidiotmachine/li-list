import { AllModelNames, ModelName } from "../game/types.ts";
import { Select, SelectOption } from "./Select.tsx";

export type HammerModelNameSelectProps = {
    modelName: ModelName;
    changeModelName: (newModelName: ModelName) => void;
    class: string;
}
export function HammerModelNameSelect(props: HammerModelNameSelectProps) {
    return <Select<string> class={props.class}
        onInput={(e) => props.changeModelName(e)}
    >
        {AllModelNames.map((s)=><SelectOption type="option" selected={props.modelName == s} key={s}>{s}</SelectOption>)}
    </Select>
}