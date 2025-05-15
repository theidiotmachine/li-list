import { DetachmentNameSelect } from "./DetachmentNameSelect.tsx";
import { getDetachmentConfigurationForDetachmentName, getShapeForFormationName } from "../game/lists.ts";
import { NumModelSelect } from "./NumModelSelect.tsx";
import { DetachmentValidityIcon, DetachmentValidityText } from "./DetachmentValidity.tsx";
import { ModelLoadoutWidget } from "./ModelLoadoutWidget.tsx";
import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { Allegiance, ArmyListName, Detachment, DetachmentName, FormationName, ModelGroup, ModelGroupShape } from "../game/types.ts";
import { DetachmentAttachmentSelect } from "./DetachmentAttachmentSelect.tsx";

type ModelGroupWidgetProps = {
    modelGroupShapeIndex: number;
    modelGroupShape: ModelGroupShape;
    modelGroup: ModelGroup;
    uuid: string;
    armyListName: ArmyListName;
    formationType: FormationName;
    detachmentIndex: number;
    detachmentName: DetachmentName;
    detachment: Detachment;
    editable: boolean
}
function ModelGroupWidget(props: ModelGroupWidgetProps) {
    const {addModelLoadoutGroup, openModelGroup, modelGroupOpenState, closeModelGroup, getModelGroupKey} = useContext(AppState);

    return <div class={"grid gap-[1%] grid-cols-[10%_78%_10%] md:grid-cols-[19%_7%_61%_10%] " + ((props.modelGroupShapeIndex%2)?"bg-gray-50":"bg-white")}>
    {
        //if there are no size options, or we manage it from loadouts, just present a number. 
        (props.modelGroupShape.possibleModelGroupQuantities.length === 1 || props.modelGroupShape.modelLoadoutSlots.length > 0) ? ( 
            <div class="col-start-1 md:col-start-2 flex items-center">
                {props.modelGroup.number}
                {(props.modelGroupShape.possibleModelGroupQuantities.length === 1 && props.modelGroupShape.modelLoadoutSlots.length == 0)?
                    <div></div>: 
                    (modelGroupOpenState.value.has(getModelGroupKey(props.uuid, props.detachmentIndex, props.modelGroupShape.modelName)))?
                    <img 
                        src="/tick-clean.svg" class="w-6 h-6 mr-1 ml-1 md:ml-3 cursor-pointer"
                        onClick={()=>closeModelGroup(props.uuid, props.detachmentIndex, props.modelGroup.modelName)}
                    ></img>
                    :
                    <img 
                        src="/edit-clean.svg" class="w-6 h-6 mr-1 ml-1 md:ml-3 cursor-pointer"
                        onClick={()=>openModelGroup(props.uuid, props.detachmentIndex, props.modelGroup.modelName)}
                    ></img>
                }
            </div> 
        ) : (
            <div class="col-start-1 md:col-start-2"><NumModelSelect 
                uuid={props.uuid} armyListName={props.armyListName} detachmentIndex={props.detachmentIndex} modelType={props.modelGroupShape.modelName}
                numModels={props.modelGroup.number} detachmentName={props.detachmentName} editable={props.editable}
            />
            </div>
        )
    }

    <div class="col-start-2 md:col-start-3">
        <a href={"unit/"+props.modelGroup.modelName} target="_blank" class="hover:underline">
            {props.modelGroup.modelName + ((props.modelGroupShape.dedicatedTransport ? " (dedicated transport)": ""))}
        </a>
    </div>

    <div class="col-start-3 md:col-start-4 justify-self-end">{props.modelGroup.points}</div> 

    {
        (props.modelGroupShape.modelLoadoutSlots.length > 0) ? (
            <div class="contents">
                <div class="col-start-1 col-span-4"
                    hidden={(modelGroupOpenState.value.has(getModelGroupKey(props.uuid, props.detachmentIndex, props.modelGroupShape.modelName)))?false:true}>
                    {props.modelGroup.modelLoadoutGroups.map((x, j)=>
                        <ModelLoadoutWidget key={j} uuid={props.uuid} armyListName={props.armyListName}
                            formationType={props.formationType} detachmentIndex={props.detachmentIndex} 
                            modelType={props.modelGroupShape.modelName} detachmentName={props.detachmentName}
                            modelLoadoutGroup={x} modelLoadoutGroupIndex={j} groupSize={x.number} 
                            numModelLoadoutGroups={props.modelGroup.modelLoadoutGroups.length}
                            editable={props.editable}
                        />
                    )}
                </div>
                <button type="button" class="w-full text-centre bg-gray-100 col-start-2 md:col-start-3"
                    hidden={
                        (modelGroupOpenState.value.has(getModelGroupKey(props.uuid, props.detachmentIndex, props.modelGroupShape.modelName)) && props.editable)?false:true
                    }
                    onClick={() => addModelLoadoutGroup(props.uuid, props.detachmentIndex, props.modelGroup.modelName)}>
                    New Loadout
                </button>
            </div>
        ) :
            <div hidden></div>//sigh
    } 

    </div>
}

interface DetachmentWidgetProps {
    uuid: string;
    armyListName: ArmyListName;
    formationType: FormationName;
    detachmentIndex: number;
    detachment: Detachment;
    allegiance: Allegiance  | "";
    editable: boolean
}

export function DetachmentWidget(props: DetachmentWidgetProps) {
    const {army} = useContext(AppState);
    const formationName = army.value.formations.find(x=>x.uuid == props.uuid)?.formationName ?? "";

    const shape = getShapeForFormationName(props.armyListName, formationName);

    let modelGroups = <div></div>;
    const detachmentName = props.detachment.detachmentName;
    if(detachmentName != "") {
        const config = getDetachmentConfigurationForDetachmentName(props.armyListName, detachmentName);
        modelGroups = <div> {
            config.modelGroupShapes
                .filter(u=>u.formationNames === undefined || u.formationNames.findIndex((s)=>s===formationName) != -1)
                .filter(u=>u.formationSlotRequirement === undefined || shape.slotRequirements[props.detachmentIndex].slotRequirementType == u.formationSlotRequirement)
                .map((u, i) => {
                    const modelGroupIndex = props.detachment.modelGroups.findIndex((m: ModelGroup) => m.modelName == u.modelName);
                    return <ModelGroupWidget 
                        modelGroupShapeIndex={i} modelGroupShape={u} uuid={props.uuid}
                        modelGroup={props.detachment.modelGroups[modelGroupIndex]}
                        armyListName={props.armyListName} formationType={props.formationType} detachmentIndex={props.detachmentIndex}
                        detachmentName={detachmentName} detachment={props.detachment} key={i}
                        editable={props.editable}
                    />
                })
        } </div>   
    }

    const slotDisplayName = (props.detachmentIndex+1).toString() 
        + ": " 
        + (shape.slotRequirements[props.detachmentIndex].displayName ?? props.detachment.slot)
    ;
    
    return <div class="mb-1 mt-1">
        <div class="grid grid-cols-[90%_10%] md:grid-cols-[20%_70%_10%] gap-0">
            <div class="font-medium text-lg bg-gray-100">
                <DetachmentValidityIcon detachment={props.detachment}/>{slotDisplayName}
            </div> 
            <div class="col-start-1 row-start-2 md:col-start-2 md:row-start-1">
                <DetachmentNameSelect 
                    uuid = {props.uuid} detachmentIndex = {props.detachmentIndex} slot = {props.detachment.slot}
                    editable={props.editable}
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
                    editable={props.editable}
                />:
                <div class="hidden"></div>
            }
        </div>
        {modelGroups}
    </div>
}

interface DisabledDetachmentWidgetProps {
    uuid: string;
    armyListName: ArmyListName;
    //formationType: FormationName;
    detachmentIndex: number;
    detachment: Detachment;
    //allegiance: Allegiance  | "";
}

export function DisabledDetachmentWidget(props: DisabledDetachmentWidgetProps) {
    const {army} = useContext(AppState);
    const formationName = army.value.formations.find(x=>x.uuid == props.uuid)?.formationName ?? "";

    const shape = getShapeForFormationName(props.armyListName, formationName);

    const slotDisplayName = (props.detachmentIndex+1).toString() 
        + ": " 
        + (shape.slotRequirements[props.detachmentIndex].displayName ?? props.detachment.slot)
    ;
    return <div class="mb-1 mt-1">
        <div class="grid grid-cols-[90%_10%] md:grid-cols-[20%_70%_10%] gap-0">
            <div class="text-lg bg-gray-50 text-gray-700">
                <DetachmentValidityIcon detachment={props.detachment}/>{slotDisplayName}
            </div>
            <div class="col-start-1 row-start-2 md:col-start-2 md:row-start-1 bg-gray-50">
                {props.detachment.detachmentName}
            </div>
                
            <div class="row-start-1 col-start-2 md:col-start-3 justify-self-end text-lg bg-gray-50 text-gray-700">
                {props.detachment.points}
            </div>
        </div>
    </div>   
}