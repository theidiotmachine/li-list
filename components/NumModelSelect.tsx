import { useContext } from "preact/hooks/";
import { getDetachmentConfigurationForDetachmentName } from "../game/lists.ts";
import { ArmyListName, DetachmentName, ModelType } from "../game/types.ts";
import { AppState } from "../islands/App.tsx";
import { parseNumber } from "$std/semver/_shared.ts";

interface NumModelSelectProps {
    uuid: string;
    armyListName: ArmyListName;
    detachmentIndex: number;
    detachmentName: DetachmentName;
    modelType: ModelType;
    numModels: number;
};

export function NumModelSelect(props: NumModelSelectProps) {
    const { changeModelNumber } = useContext(AppState);

    const config = getDetachmentConfigurationForDetachmentName(props.armyListName, props.detachmentName);
    const modelOptions = config?.modelGroupShapes.find((x)=>x.modelType == props.modelType);
    return <select class = "w-8 md:w-10 appearance-none bg-[url(dropdownarrow-clean.svg)] bg-no-repeat bg-right bg-white bg-opacity-0" 
        onInput={(e) => changeModelNumber(props.uuid, props.detachmentIndex, props.modelType, parseNumber(e.currentTarget.value, ""))}>
        {modelOptions?.possibleModelGroupQuantities.map((x) => 
            <option class="bg-white bg-opacity-0" key={x.num} selected={props.numModels == x.num}>{x.num}</option>
        )}
    </select>
}