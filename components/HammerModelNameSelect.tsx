import { AllModelNames, ModelType } from "../game/types.ts";

export type HammerModelNameSelectProps = {
    modelName: ModelType;
    changeModelName: (newModelName: ModelType) => void;
    class: string;
}
export function HammerModelNameSelect(props: HammerModelNameSelectProps) {
    return <select class={props.class}
        onInput={(e) => props.changeModelName(e.currentTarget.value)}
    >
        {AllModelNames.map((s)=><option selected={props.modelName == s} key={s}>{s}</option>)}
    </select>
}