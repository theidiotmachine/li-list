import { DetachmentTypeSelect } from "./DetachmentTypeSelect.tsx";
import { getDetachmentConfigurationForDetachmentType, getShapeForFormationType } from "../game/lists.ts";
import { NumModelSelect } from "./NumModelSelect.tsx";
import { DetachmentValidity } from "./DetachmentValidity.tsx";
import { ModelLoadoutWidget } from "./ModelLoadoutWidget.tsx";
import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { ArmyListName, Detachment, ModelGroup } from "../game/types.ts";
import { AddButton } from "./AddButton.tsx";

interface DetachmentWidgetProps {
    uuid: string;
    armyListName: ArmyListName;
    detachmentIndex: number;
    detachment: Detachment;
}

export function DetachmentWidget(props: DetachmentWidgetProps) {
    const { addModelLoadoutGroup, army } = useContext(AppState);
    const formationType = army.value.formations.find(x=>x.uuid == props.uuid)?.formationType ?? "";

    const shape = getShapeForFormationType(props.armyListName, formationType);

    let modelGroups = <div></div>;
    const detachmentType = props.detachment.detachmentType;
    if(detachmentType != "") {
        const config = getDetachmentConfigurationForDetachmentType(props.armyListName, detachmentType);
        modelGroups = <div> {
            config.modelGroupShapes
                .filter(u=>u.formationType ===undefined || u.formationType === formationType)
                .map((u, i) => {
                    const modelGroupIndex = props.detachment.modelGroups.findIndex((m: ModelGroup) => m.modelType == u.modelType);
                    //border-t-2 border-gray-50 grid-cols-6 
                    return <div class="grid gap-0 grid-cols-[20%_8%_22%_20%_20%_10%]" key={i}>
                        {
                            //if there are no size options, or we manage it from loadouts, just present a number. 
                            (u.possibleModelGroupQuantities.length === 1 || u.modelLoadoutSlots.length > 0) ? ( 
                                <div class="col-span-1 col-start-2 flex items-center">
                                    {props.detachment.modelGroups[modelGroupIndex].number}
                                    <AddButton hidden={(u.modelLoadoutSlots.length== 0)} 
                                        onClick={() => addModelLoadoutGroup(props.uuid, props.detachmentIndex, props.detachment.modelGroups[i].modelType)}>
                                    </AddButton>
                                </div> 
                            ) : (
                                <div class="col-span-1 col-start-2"><NumModelSelect 
                                    uuid={props.uuid} armyListName={props.armyListName} detachmentIndex={props.detachmentIndex} modelType={u.modelType}
                                    numModels={props.detachment.modelGroups[modelGroupIndex].number} detachmentType={detachmentType}
                                />
                                </div> 
                            )
                        }

                        <div class="col-span-3 col-start-3">
                            <a href={"unit/"+props.detachment.modelGroups[i].modelType} target="_blank" class="hover:underline">
                                {props.detachment.modelGroups[i].modelType + ((u.dedicatedTransport ? " (dedicated transport)": ""))}
                            </a>
                        </div>

                        <div class="col-span-1 col-start-6 justify-self-end">{props.detachment.modelGroups[i].points}</div> 
                        {
                            (u.modelLoadoutSlots.length > 0) ? (
                            <div class="row-start-2 col-span-7">
                                {props.detachment.modelGroups[i].modelLoadoutGroups.map((x, j)=>
                                    <ModelLoadoutWidget key={j} uuid={props.uuid} armyListName={props.armyListName}
                                    detachmentIndex={props.detachmentIndex}
                                    modelType={u.modelType} detachmentType={detachmentType}
                                    modelLoadoutGroup={x} modelLoadoutGroupIndex={j} groupSize={x.number} 
                                    numModelLoadoutGroups={props.detachment.modelGroups[i].modelLoadoutGroups.length}/>
                                )}
                            </div>
                            ) :
                            <div hidden></div>//sigh
                        }
                    </div>
                })
            } </div>   
    }

    const slotDisplayName = shape.slotRequirements[props.detachmentIndex].displayName ?? props.detachment.slot;
        
    //border-t-2 border-gray-100
    return <div class="mb-1 mt-1">
        <div class="grid grid-cols-[20%_8%_22%_20%_20%_10%] gap-0 ">
            <div class="col-span-2 font-medium text-lg">
                <DetachmentValidity detachment={props.detachment}/>{slotDisplayName}
            </div> 
            <div class="col-span-4 col-start-2 row-start-2 md:col-start-3 md:row-start-1 md:col-span-3"><DetachmentTypeSelect 
                uuid = {props.uuid} detachmentIndex = {props.detachmentIndex} slot = {props.detachment.slot}
                armyListName={props.armyListName}/></div>
            <div class="col-span-1 col-start-6 justify-self-end md:text-lg">{props.detachment.points}</div>
        </div>
        {modelGroups}
    </div>
}