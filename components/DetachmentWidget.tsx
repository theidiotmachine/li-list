import { DetachmentNameSelect } from "./DetachmentNameSelect.tsx";
import { getDetachmentConfigurationForDetachmentName, getShapeForFormationName } from "../game/lists.ts";
import { NumModelSelect } from "./NumModelSelect.tsx";
import { DetachmentValidityIcon, DetachmentValidityText } from "./DetachmentValidity.tsx";
import { ModelLoadoutWidget } from "./ModelLoadoutWidget.tsx";
import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { Allegiance, ArmyListName, Detachment, FormationName, ModelGroup } from "../game/types.ts";
import { DetachmentAttachmentSelect } from "./DetachmentAttachmentSelect.tsx";

interface DetachmentWidgetProps {
    uuid: string;
    armyListName: ArmyListName;
    formationType: FormationName;
    detachmentIndex: number;
    detachment: Detachment;
    allegiance: Allegiance  | "";
}

export function DetachmentWidget(props: DetachmentWidgetProps) {
    const { addModelLoadoutGroup, army, openModelGroup: open, modelGroupOpenState: openState, closeModelGroup: close, getModelGroupKey } = useContext(AppState);
    const formationName = army.value.formations.find(x=>x.uuid == props.uuid)?.formationName ?? "";

    const shape = getShapeForFormationName(props.armyListName, formationName);

    let modelGroups = <div></div>;
    const detachmentName = props.detachment.detachmentName;
    if(detachmentName != "") {
        const config = getDetachmentConfigurationForDetachmentName(props.armyListName, detachmentName);
        modelGroups = <div> {
            config.modelGroupShapes
                .filter(u=>u.formationNames === undefined || u.formationNames.findIndex((s)=>s===formationName) != -1)
                .map((u, i) => {
                    const modelGroupIndex = props.detachment.modelGroups.findIndex((m: ModelGroup) => m.modelType == u.modelType);
                    return <div class={"grid gap-[1%] grid-cols-[10%_78%_10%] md:grid-cols-[19%_7%_61%_10%] " + ((i%2)?"bg-gray-50":"bg-white")} key={i}>
                        {
                            //if there are no size options, or we manage it from loadouts, just present a number. 
                            (u.possibleModelGroupQuantities.length === 1 || u.modelLoadoutSlots.length > 0) ? ( 
                                <div class="col-start-1 md:col-start-2 flex items-center">
                                    {props.detachment.modelGroups[modelGroupIndex].number}
                                    {(u.possibleModelGroupQuantities.length === 1 && u.modelLoadoutSlots.length == 0)?
                                        <div></div>: 
                                        (openState.value.has(getModelGroupKey(props.uuid, props.detachmentIndex, u.modelType)))?
                                        <img 
                                            src="/tick-clean.svg" class="w-6 h-6 mr-1 ml-1 md:ml-3 cursor-pointer"
                                            onClick={()=>close(props.uuid, props.detachmentIndex, props.detachment.modelGroups[modelGroupIndex].modelType)}
                                        ></img>
                                        :
                                        <img 
                                            src="/edit-clean.svg" class="w-6 h-6 mr-1 ml-1 md:ml-3 cursor-pointer"
                                            onClick={()=>open(props.uuid, props.detachmentIndex, props.detachment.modelGroups[modelGroupIndex].modelType)}
                                        ></img>
                                    }
                                </div> 
                            ) : (
                                <div class="col-start-1 md:col-start-2"><NumModelSelect 
                                    uuid={props.uuid} armyListName={props.armyListName} detachmentIndex={props.detachmentIndex} modelType={u.modelType}
                                    numModels={props.detachment.modelGroups[modelGroupIndex].number} detachmentName={detachmentName}
                                />
                                </div>
                            )
                        }

                        <div class="col-start-2 md:col-start-3">
                            <a href={"unit/"+props.detachment.modelGroups[i].modelType} target="_blank" class="hover:underline">
                                {props.detachment.modelGroups[i].modelType + ((u.dedicatedTransport ? " (dedicated transport)": ""))}
                            </a>
                        </div>

                        <div class="col-start-3 md:col-start-4 justify-self-end">{props.detachment.modelGroups[i].points}</div> 
                        {
                            (u.modelLoadoutSlots.length > 0) ? (
                                <div class="contents">
                                    
                                    <div class="col-start-1 col-span-4"
                                        hidden={(openState.value.has(getModelGroupKey(props.uuid, props.detachmentIndex, u.modelType)))?false:true}>
                                        {props.detachment.modelGroups[i].modelLoadoutGroups.map((x, j)=>
                                            <ModelLoadoutWidget key={j} uuid={props.uuid} armyListName={props.armyListName}
                                            formationType={props.formationType} detachmentIndex={props.detachmentIndex} 
                                            modelType={u.modelType} detachmentName={detachmentName}
                                            modelLoadoutGroup={x} modelLoadoutGroupIndex={j} groupSize={x.number} 
                                            numModelLoadoutGroups={props.detachment.modelGroups[i].modelLoadoutGroups.length}/>
                                        )}
                                    </div>
                                    <button type="button" class="w-full text-centre bg-gray-100 col-start-2 md:col-start-3"
                                        hidden={(openState.value.has(getModelGroupKey(props.uuid, props.detachmentIndex, u.modelType)))?false:true}
                                        onClick={() => addModelLoadoutGroup(props.uuid, props.detachmentIndex, props.detachment.modelGroups[i].modelType)}>
                                        New Loadout
                                    </button>
                            </div>
                            ) :
                            <div hidden></div>//sigh
                        }
                    </div>
                })
            } </div>   
    }

    const slotDisplayName = (props.detachmentIndex+1).toString() 
        + ": " 
        + (shape.slotRequirements[props.detachmentIndex].displayName ?? props.detachment.slot)
        //    + ((shape.slotRequirements[props.detachmentIndex].slotRequirementType == "Optional")?" optional": "")
        //    + ((shape.slotRequirements[props.detachmentIndex].slotRequirementType == "One Of")?(" optional group " + shape.slotRequirements[props.detachmentIndex].oneOfGroup?.toString()): "")
    ;
    
    

    //border-t-2 border-gray-100
    return <div class="mb-1 mt-1">
        <div class="grid grid-cols-[90%_10%] md:grid-cols-[20%_70%_10%] gap-0">
            <div class="font-medium text-lg bg-gray-100">
                <DetachmentValidityIcon detachment={props.detachment}/>{slotDisplayName}
            </div> 
            <div class="col-start-1 row-start-2 md:col-start-2 md:row-start-1">
                <DetachmentNameSelect 
                    uuid = {props.uuid} detachmentIndex = {props.detachmentIndex} slot = {props.detachment.slot}
                    armyListName={props.armyListName} allegiance={props.allegiance}/>
            </div>
            
            <div class="row-start-1 col-start-2 md:col-start-3 justify-self-end font-medium text-lg bg-gray-100">
                {props.detachment.points}
            </div>
            <DetachmentValidityText class="col-start-1 row-start-3 md:col-start-2 md:col-span-2" detachment={props.detachment}/>
            {(props.detachment.attachedDetachmentIndex != undefined)?
                <DetachmentAttachmentSelect 
                    uuid={props.uuid} detachmentIndex={props.detachmentIndex} detachmentAttachmentIndex={props.detachment.attachedDetachmentIndex}
                    class="md:col-start-2 col-start-1"
                />:
                <div class="hidden"></div>
            }
            
        </div>
        {modelGroups}
    </div>
}