import { useContext } from "preact/hooks";
import { ArmyListName, DetachmentName, FormationName, ModelLoadoutGroup, ModelName } from "../game/types.ts";
import { ModelLoadoutSelect } from "./ModelLoadoutSelect.tsx";
import { NumModelLoadoutSelect } from "./NumModelLoadoutSelect.tsx";
import { AppState } from "../islands/App.tsx";
import { DelButton } from "./DelButton.tsx";
import { getDetachmentConfigurationForDetachmentName } from "../game/lists.ts";

interface ModelLoadoutWidgetProps {
    uuid: string;
    armyListName: ArmyListName;
    formationType: FormationName;
    detachmentIndex: number;
    groupSize: number;
    modelType: ModelName;
    detachmentName: DetachmentName;
    modelLoadoutGroup: ModelLoadoutGroup;
    modelLoadoutGroupIndex: number;
    numModelLoadoutGroups: number;
    editable: boolean;
}

export function ModelLoadoutWidget(props: ModelLoadoutWidgetProps) {
    const { removeModelLoadoutGroup } = useContext(AppState);
    const config = getDetachmentConfigurationForDetachmentName(props.armyListName, props.detachmentName);
    const modelOptions = config?.modelGroupShapes.find((x)=>x.modelName == props.modelType);
    const filteredModelLoadoutSlotShapes = modelOptions?.modelLoadoutSlots.filter((t)=>t.formationType==undefined || t.formationType==props.formationType);
    if(filteredModelLoadoutSlotShapes == undefined)
        return <div>No data</div>

    return <div class="grid gap-[1%] grid-cols-[10%_8%_69%_10%] md:grid-cols-[19%_7%_20%_40%_10%]">
        <div class="col-start-1 order-2 justify-self-end flex"> 
            {
                (props.numModelLoadoutGroups > 1) ?
                (<div class="">
                    <DelButton hidden={!props.editable}
                        onClick={() => removeModelLoadoutGroup(props.uuid, props.detachmentIndex, props.modelType, props.modelLoadoutGroupIndex)}
                    ></DelButton>
                </div>) : 
                (<div class = ""></div>)
            }
            
        </div>
        <div class="col-start-2 order-2">
            <NumModelLoadoutSelect number={props.groupSize} detachmentName={props.detachmentName} modelType={props.modelType}
                uuid={props.uuid} armyListName={props.armyListName} 
                detachmentIndex={props.detachmentIndex} 
                modelLoadoutGroupIndex={props.modelLoadoutGroupIndex}
                editable={props.editable}
            />
            
        </div>
        
        {filteredModelLoadoutSlotShapes.map((x,i) => 
            //need these for tailwind to understand the dynamic css:
            //row-start-2 row-start-3 row-start-4 row-start-5
            //row-start-6 row-start-7 row-start-8 row-start-9
            //order-3 order-4 order-5 order-6 order-7 order-8 order-9 order-10
            <div key={"n"+i} class = {"col-start-3 row-start-" + ((i*2)+1) + " md:row-start-"+(i+1)+" order-"+(3+i*2)}>
                {x.name}
            </div>)}
        {filteredModelLoadoutSlotShapes.map((x,i) => {
            const loadout = props.modelLoadoutGroup.modelLoadoutSlots.find((t)=>t.name == x.name);
            if(loadout == undefined)
                return <div key={"s"+i}>No data</div>

            return <div key={"s"+i} class = {"col-start-3 md:col-start-4 row-start-" + ((i*2)+2) + " md:row-start-"+(i+1)+" order-"+(4+i*2)}>
                <ModelLoadoutSelect key={i} editable={props.editable}
                    modelType={props.modelType} detachmentName={props.detachmentName} modelLoadoutSlotName={x.name} loadout={loadout.modelLoadout}
                    uuid={props.uuid} armyListName={props.armyListName} detachmentIndex={props.detachmentIndex} 
                    modelLoadoutGroupIndex={props.modelLoadoutGroupIndex}
                /></div>})}
    </div>
}