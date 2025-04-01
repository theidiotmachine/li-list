import { useContext } from "preact/hooks/";
import { getDetachmentConfigurationForDetachmentType } from "../game/lists.ts";
import { ArmyListName, DetachmentType, ModelType } from "../game/types.ts";
import { AppState } from "../islands/App.tsx";
import { parseNumber } from "$std/semver/_shared.ts";

interface NumModelSelectProps {
    uuid: string;
    armyListName: ArmyListName;
    detachmentIndex: number;
    detachmentType: DetachmentType;
    modelType: ModelType;
    numModels: number;
};

export function NumModelSelect(props: NumModelSelectProps) {
    const { changeModelNumber } = useContext(AppState);

    const config = getDetachmentConfigurationForDetachmentType(props.armyListName, props.detachmentType);
    const modelOptions = config?.modelGroupShapes.find((x)=>x.modelType == props.modelType);
    return <select class = "w-8 md:w-10 appearance-none bg-[url(dropdownarrow-clean.svg)] bg-no-repeat bg-right" 
        onInput={(e) => changeModelNumber(props.uuid, props.detachmentIndex, props.modelType, parseNumber(e.currentTarget.value, ""))}>
        {modelOptions?.possibleModelGroupQuantities.map((x) => 
            <option key={x.num} selected={props.numModels == x.num}>{x.num}</option>
        )}
    </select>
}