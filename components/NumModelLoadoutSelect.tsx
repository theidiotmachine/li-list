import { useContext } from "preact/hooks/";
import { getDetachmentConfigurationForDetachmentType } from "../game/lists.ts";
import { ArmyListName, DetachmentType, ModelType } from "../game/types.ts";
import { AppState } from "../islands/App.tsx";
import { parseNumber } from "$std/semver/_shared.ts";

interface NumModelLoadoutSelectProps {
    uuid: string;
    armyListName: ArmyListName;
    detachmentIndex: number;
    modelLoadoutGroupIndex: number;
    number: number;
    detachmentType: DetachmentType;
    modelType: ModelType;
}

export function NumModelLoadoutSelect(props: NumModelLoadoutSelectProps) {
    const { changeModelLoadoutGroupNumber } = useContext(AppState);
    
    const config = getDetachmentConfigurationForDetachmentType(props.armyListName, props.detachmentType);
    const modelOptions = config?.modelGroupShapes.find((x)=>x.modelType == props.modelType);

    const options: number[] = [];
    const pmgq = modelOptions?.possibleModelGroupQuantities;
    if(pmgq){
        const lastNumber = modelOptions?.maxModels ?? pmgq[pmgq.length-1].num;
        for(let i = 0; i <= lastNumber; ++i) {
            options.push(i);
        }
    }

    return <select class="w-10 appearance-none bg-[url(dropdownarrow-clean.svg)] bg-no-repeat bg-right" onInput={(e) => changeModelLoadoutGroupNumber(
        props.uuid, props.detachmentIndex, props.modelType, props.modelLoadoutGroupIndex, parseNumber(e.currentTarget.value, "")
        )}>
        {options.map((x) => 
            <option key={x} selected={props.number == x}>{x}</option>
        )}
    </select>
}