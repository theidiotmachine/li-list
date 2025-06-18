import { useContext } from "preact/hooks";
import { getDetachmentConfigurationForDetachmentName } from "../game/lists.ts";
import { ArmyListName, DetachmentName, ModelLoadoutForSlot, ModelName } from "../game/types.ts";
import { AppState } from "../islands/App.tsx";
import { Select, SelectOption } from "./Select.tsx";

interface ModelLoadoutSelectProps{
    loadout: ModelLoadoutForSlot;
    uuid: string;
    armyListName: ArmyListName;
    detachmentIndex: number;
    modelType: ModelName;
    detachmentName: DetachmentName;
    modelLoadoutGroupIndex: number;
    modelLoadoutSlotName: string;
    editable: boolean;
}

export function ModelLoadoutSelect(props: ModelLoadoutSelectProps) {
    const { changeModelLoadout } = useContext(AppState);
    
    const config = getDetachmentConfigurationForDetachmentName(props.armyListName, props.detachmentName);
    const modelOptions = config?.modelGroupShapes.find((x)=>x.modelName == props.modelType);
    if(modelOptions == undefined)
        return <div></div>
        
    const slot = modelOptions.modelLoadoutSlots.find((s)=>s.name == props.modelLoadoutSlotName);
    if(slot === undefined) return <div>No model loadout</div>
    return <Select<string> class="w-full bg-gray-100" disabled={!props.editable} onInput={
        (e)=> changeModelLoadout(
            props.uuid, props.detachmentIndex, props.modelType, props.modelLoadoutGroupIndex, props.modelLoadoutSlotName, e
        )
    }
    >
        {slot.possibleModelLoadouts.map((x)=>
            <SelectOption type="option" key={x.loadout} selected={props.loadout.loadout == x.loadout} 
                optionText={x.loadout + " - " + x.points + "pts"}
                value={x.loadout}
                >{x.loadout}</SelectOption>
        )} 
    </Select>
}