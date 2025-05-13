import { useContext } from "preact/hooks/";
import { getDetachmentConfigurationForDetachmentName } from "../game/lists.ts";
import { ArmyListName, DetachmentName, ModelName } from "../game/types.ts";
import { AppState } from "../islands/App.tsx";
import { parseNumber } from "$std/semver/_shared.ts";
import { Select, SelectOption } from "./Select.tsx";

interface NumModelSelectProps {
    uuid: string;
    armyListName: ArmyListName;
    detachmentIndex: number;
    detachmentName: DetachmentName;
    modelType: ModelName;
    numModels: number;
};

export function NumModelSelect(props: NumModelSelectProps) {
    const { changeModelNumber } = useContext(AppState);

    const config = getDetachmentConfigurationForDetachmentName(props.armyListName, props.detachmentName);
    const modelOptions = config?.modelGroupShapes.find((x)=>x.modelName == props.modelType);
    const options = modelOptions?.possibleModelGroupQuantities.map((x) => {
        return <SelectOption type="option" key={x.num} selected={props.numModels == x.num} 
            optionText={x.num.toString() + " - " + x.points + "pts"}
        >{x.num.toString()}</SelectOption>
    }) ?? [];
    return <Select<string> class = "w-8 md:w-10 bg-right bg-white bg-opacity-0" 
        onInput={(e) => changeModelNumber(props.uuid, props.detachmentIndex, props.modelType, parseNumber(e.toString(), ""))}>
        {options}
    </Select>
}