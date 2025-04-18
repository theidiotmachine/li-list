import { useContext } from "preact/hooks/";
import { getDetachmentConfigurationForDetachmentName } from "../game/lists.ts";
import { ArmyListName, DetachmentName, ModelType } from "../game/types.ts";
import { AppState } from "../islands/App.tsx";
import { parseNumber } from "$std/semver/_shared.ts";

interface NumModelLoadoutSelectProps {
    uuid: string;
    armyListName: ArmyListName;
    detachmentIndex: number;
    modelLoadoutGroupIndex: number;
    number: number;
    detachmentName: DetachmentName;
    modelType: ModelType;
}

export function NumModelLoadoutSelect(props: NumModelLoadoutSelectProps) {
    const { changeModelLoadoutGroupNumber } = useContext(AppState);
    
    const config = getDetachmentConfigurationForDetachmentName(props.armyListName, props.detachmentName);
    const modelOptions = config?.modelGroupShapes.find((x)=>x.modelType == props.modelType);

    const options: number[] = [];
    const pmgq = modelOptions?.possibleModelGroupQuantities;
    if(pmgq){
        const lastNumber = modelOptions?.maxModels ?? pmgq[pmgq.length-1].num;
        for(let i = 0; i <= lastNumber; ++i) {
            options.push(i);
        }
    }

    return <select 
        class="w-8 md:w-10 appearance-none bg-[url(dropdownarrow-clean.svg)] bg-no-repeat bg-right bg-opacity-0 bg-white" 
        onInput={(e) => changeModelLoadoutGroupNumber(
            props.uuid, props.detachmentIndex, props.modelType, props.modelLoadoutGroupIndex, parseNumber(e.currentTarget.value, "")
        )}>
        {options.map((x) => 
            <option class="bg-opacity-0 bg-white" key={x} selected={props.number == x}>{x}</option>
        )}
    </select>
}