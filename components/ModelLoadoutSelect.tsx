import { useContext } from "preact/hooks";
import { getDetachmentConfigurationForDetachmentType } from "../game/lists.ts";
import { ArmyListName, DetachmentType, ModelLoadoutForSlot, ModelType } from "../game/types.ts";
import { AppState } from "../islands/App.tsx";

interface ModelLoadoutSelectProps{
    loadout: ModelLoadoutForSlot;
    uuid: string;
    armyListName: ArmyListName;
    detachmentIndex: number;
    modelType: ModelType;
    detachmentType: DetachmentType;
    modelLoadoutGroupIndex: number;
    modelLoadoutSlotIndex: number;
}

export function ModelLoadoutSelect(props: ModelLoadoutSelectProps) {
    const { changeModelLoadout } = useContext(AppState);
    
    const config = getDetachmentConfigurationForDetachmentType(props.armyListName, props.detachmentType);
    const modelOptions = config?.modelGroupShapes.find((x)=>x.modelType == props.modelType);
    if(modelOptions == undefined)
        return <div></div>
        
    const slot = modelOptions.modelLoadoutSlots[props.modelLoadoutSlotIndex];
    return <select class="w-72 appearance-none"onInput={(e)=> changeModelLoadout(props.uuid, props.detachmentIndex, props.modelType, props.modelLoadoutGroupIndex, props.modelLoadoutSlotIndex, e.currentTarget.value)}>
        {slot.possibleModelLoadouts.map((x,i)=><option key={i} selected={props.loadout.loadout == x.loadout}>{x.loadout}</option>)} 
    </select>
    
}