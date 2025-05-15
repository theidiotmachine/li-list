import { useContext } from "preact/hooks/";
import { getDetachmentConfigurationForDetachmentName } from "../game/lists.ts";
import { ArmyListName, DetachmentName, ModelName } from "../game/types.ts";
import { AppState } from "../islands/App.tsx";
import { parseNumber } from "$std/semver/_shared.ts";
import { Select, SelectOption } from "./Select.tsx";

interface NumModelLoadoutSelectProps {
    uuid: string;
    armyListName: ArmyListName;
    detachmentIndex: number;
    modelLoadoutGroupIndex: number;
    number: number;
    detachmentName: DetachmentName;
    modelType: ModelName;
    editable: boolean;
}

export function NumModelLoadoutSelect(props: NumModelLoadoutSelectProps) {
    const { changeModelLoadoutGroupNumber } = useContext(AppState);
    
    const config = getDetachmentConfigurationForDetachmentName(props.armyListName, props.detachmentName);
    const modelOptions = config?.modelGroupShapes.find((x)=>x.modelName == props.modelType);

    const options: {num: number, points: number}[] = [];
    const pmgq = modelOptions?.possibleModelGroupQuantities;
    if(pmgq){
        const lastNumber = modelOptions?.maxModels ?? pmgq[pmgq.length-1].num;
        const firstNumber = 0; //I need to make this 1, really, but stuff breaks
        for(let i = firstNumber; i <= lastNumber; ++i) {
            const mgq = pmgq.find((s)=>s.num >= i);
            options.push({num: i, points: mgq?.points??0});
        }
    }

    return <Select<string>
        class="w-8 md:w-10 bg-opacity-0 bg-white" 
        disabled={!props.editable}
        onInput={(e) => changeModelLoadoutGroupNumber(
            props.uuid, props.detachmentIndex, props.modelType, props.modelLoadoutGroupIndex, parseNumber(e.toString(), "")
        )}>
        {options.map((x) => 
            <SelectOption type="option" key={x.num} selected={props.number == x.num} 
                optionText={x.num.toString() + " - " + x.points + "pts"}
            >{x.num.toString()}</SelectOption>
        )}
    </Select>
}