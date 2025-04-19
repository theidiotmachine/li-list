import { useContext } from "preact/hooks";
import { getDetachmentConfigurationForDetachmentName } from "../game/lists.ts";
import { ArmyListName, DetachmentName, ModelLoadoutForSlot, ModelType } from "../game/types.ts";
import { AppState } from "../islands/App.tsx";

interface ModelLoadoutSelectProps{
    loadout: ModelLoadoutForSlot;
    uuid: string;
    armyListName: ArmyListName;
    detachmentIndex: number;
    modelType: ModelType;
    detachmentName: DetachmentName;
    modelLoadoutGroupIndex: number;
    modelLoadoutSlotName: string;
}

export function ModelLoadoutSelect(props: ModelLoadoutSelectProps) {
    const { changeModelLoadout } = useContext(AppState);
    
    const config = getDetachmentConfigurationForDetachmentName(props.armyListName, props.detachmentName);
    const modelOptions = config?.modelGroupShapes.find((x)=>x.modelType == props.modelType);
    if(modelOptions == undefined)
        return <div></div>
        
    const slot = modelOptions.modelLoadoutSlots.find((s)=>s.name == props.modelLoadoutSlotName);
    if(slot === undefined) return <div>No model loadout</div>
    return <select class="w-44 md:w-72 appearance-none bg-[url(dropdownarrow-clean.svg)] bg-no-repeat bg-right bg-white bg-opacity-0"
        onInput={
            (e)=> changeModelLoadout(
                props.uuid, props.detachmentIndex, props.modelType, props.modelLoadoutGroupIndex, props.modelLoadoutSlotName, e.currentTarget.value
            )
        }>
        {slot.possibleModelLoadouts.map((x,i)=>
            <option class="bg-white bg-opacity-0" key={i} selected={props.loadout.loadout == x.loadout}>{x.loadout}</option>
        )} 
    </select>
    
}