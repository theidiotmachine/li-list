import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { IconicDetachmentRequirementType } from "../game/types.ts";
import { Select, SelectOption } from "./Select.tsx";

export type IconicFormationExpandedSelectProps = {
    uuid: string;
    iconicDetachmentRequirementType: IconicDetachmentRequirementType;
    class: string;
    editable: boolean;
}

export function IconicFormationExpandedSelect(props: IconicFormationExpandedSelectProps) {
    const { changeIconicFormationRequirement } = useContext(AppState);

    if(!props.editable) return <div class={"md:text-xl w-full dark:bg-black dark:text-white " + props.class}>
        {props.iconicDetachmentRequirementType}
    </div>;

    const options = [
        <SelectOption type="option" value="Standard" selected={props.iconicDetachmentRequirementType == "Standard"} key="Standard">Standard</SelectOption>,
        <SelectOption type="option" value="Expanded" selected={props.iconicDetachmentRequirementType == "Expanded"} key="Expanded">Expanded</SelectOption>
    ];

    return <Select class={"md:text-xl w-full bg-right bg-white dark:bg-black dark:text-white " + props.class}
        onInput={(e) => changeIconicFormationRequirement(props.uuid, e as IconicDetachmentRequirementType)}>
        {options}
    </Select>
}