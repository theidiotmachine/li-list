import { useContext } from "preact/hooks";
import { ArmyListName, DetachmentType, ModelLoadout, ModelType } from "../game/types.ts";
import { ModelLoadoutSelect } from "./ModelLoadoutSelect.tsx";
import { NumModelLoadoutSelect } from "./NumModelLoadoutSelect.tsx";
import { AppState } from "../islands/App.tsx";
import { DelButton } from "./DelButton.tsx";

interface ModelLoadoutWidgetProps {
    uuid: string;
    armyListName: ArmyListName;
    detachmentIndex: number;
    groupSize: number;
    modelType: ModelType;
    detachmentType: DetachmentType;
    modelLoadoutGroup: ModelLoadout;
    modelLoadoutGroupIndex: number;
    numModelLoadoutGroups: number;
}

export function ModelLoadoutWidget(props: ModelLoadoutWidgetProps) {
    const { removeModelLoadoutGroup } = useContext(AppState);
    return <div class="grid grid-cols-[20%_8%_25%_47%] gap-0">
        <div class="col-span-1 col-start-1 order-2 justify-self-end">
        {
                (props.numModelLoadoutGroups > 1) ?
                (
                    <div class="">
                        <DelButton hidden={false}
                            onClick={() => removeModelLoadoutGroup(props.uuid, props.detachmentIndex, props.modelType, props.modelLoadoutGroupIndex)}
                        ></DelButton>
                    </div >
                ) : (<div class = ""></div >)
            }
        </div>
        <div class="col-span-1 col-start-2 order-2">
            <NumModelLoadoutSelect number={props.groupSize} detachmentType={props.detachmentType} modelType={props.modelType}
            uuid={props.uuid} armyListName={props.armyListName} detachmentIndex={props.detachmentIndex} modelLoadoutGroupIndex={props.modelLoadoutGroupIndex}
            />
        </div>
        
        
        {props.modelLoadoutGroup.modelLoadoutSlots.map((x,i) => 
            //need these for tailwind to understand the dynamic css:
            //row-start-2 row-start-3 row-start-4 row-start-5
            //order-3 order-4 order-5 order-6 order-7 order-8 order-9 order-10
            <div key={"n"+i} class = {"col-start-3 col-span-1 row-start-"+(i+1)+" order-"+(3+i*2)}>
                {x.name}
            </div>)}
        {props.modelLoadoutGroup.modelLoadoutSlots.map((x,i) => 
            <div key={"s"+i} class = {"col-start-4 col-span-1 row-start-"+(i+1)+" order-"+(4+i*2)}>
            <ModelLoadoutSelect key={i} 
                modelType={props.modelType} detachmentType={props.detachmentType} modelLoadoutSlotIndex={i} loadout={x.modelLoadout}
                uuid={props.uuid} armyListName={props.armyListName} detachmentIndex={props.detachmentIndex} 
                modelLoadoutGroupIndex={props.modelLoadoutGroupIndex}
            /></div>)}

        
    </div>
}