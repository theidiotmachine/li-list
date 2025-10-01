import { DetachmentNameSelect } from "./DetachmentNameSelect.tsx";
import { getDetachmentConfigurationForDetachmentName, getShapeForFormationName } from "../game/lists.ts";
import { DetachmentValidityIcon, DetachmentValidityText } from "./DetachmentValidity.tsx";
import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { Allegiance, ArmyListName, Detachment, FormationName, ModelGroup, ModelGroupShape } from "../game/types.ts";
import { DetachmentAttachmentSelect } from "./DetachmentAttachmentSelect.tsx";
import { ModelGroupWidget } from "./ModelGroupWidget.tsx";
import { DetachmentExtraWidget } from "./DetachmentExtraWidget.tsx";

export function EditButton(props: { detachmentIndex: number, modelGroupShape: ModelGroupShape; uuid: string, modelGroup: ModelGroup }) {
    const {openModelGroup, closeModelGroup, modelGroupOpenState, getModelGroupKey} = useContext(AppState);
    if (modelGroupOpenState.value.has(getModelGroupKey(props.uuid, props.detachmentIndex, props.modelGroupShape.modelName))) 
        return <svg width="16" height="16" version="1.1" viewBox="0 0 4.2333 4.2333" xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 mr-1 ml-1 md:ml-3 cursor-pointer fill-green-500 stroke-green-500" 
            onClick={()=>closeModelGroup(props.uuid, props.detachmentIndex, props.modelGroup.modelName)}
        >
            <path d="m1.1906 2.249 0.26458-0.26458 0.52917 0.52917 0.79375-1.0583 0.26458 0.26458-1.0583 1.3229z" stroke="none"/>
            <ellipse cx="2.1167" cy="2.1167" rx="1.7198" ry="1.7198" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width=".28708"/>
        </svg>
    else
        return <svg width="16" height="16" version="1.1" viewBox="0 0 4.2333 4.2333" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 mr-1 ml-1 md:ml-3 cursor-pointer fill-blue-500 stroke-blue-500" 
            onClick={()=>openModelGroup(props.uuid, props.detachmentIndex, props.modelGroup.modelName)}
        >
            <path d="m0.66146 2.7781-1e-8 0.79375 0.79375 1e-7 2.3812-2.3812-0.79375-0.79375z" fill="none" stroke-width=".26458px"/>
            <path d="m2.5135 0.92604 0.79375 0.79375" fill="none" stroke-width=".26458px"/>
            <path d="m0.66146 2.7781v0.79375h0.79375z" stroke="none"/>
        </svg>
}

interface DetachmentWidgetProps {
    uuid: string;
    armyListName: ArmyListName;
    formationName: FormationName;
    detachmentIndex: number;
    detachment: Detachment;
    allegiance: Allegiance  | "";
    editable: boolean
}

export function DetachmentWidget(props: DetachmentWidgetProps) {
    const {army} = useContext(AppState);
    const formationName = army.value.formations.find(x=>x.uuid == props.uuid)?.formationName ?? "";

    const shape = getShapeForFormationName(props.armyListName, formationName);
    //handled elsewhere
    if(shape.formationType === "Iconic")
        return <div></div>

    let modelGroups = <div></div>;
    let extras = <div></div>
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
                        armyListName={props.armyListName} detachmentIndex={props.detachmentIndex}
                        detachmentName={detachmentName} detachment={props.detachment} key={i}
                        editable={props.editable} formationType={shape.formationType}
                    />
                })
        } </div>
        if(props.detachment.extras != undefined) {
            const extrasShape = config.extras ?? [];
            extras = <div>{
                props.detachment.extras.
                    filter((u) => {
                        const extraShape = extrasShape.find((s) => s.name === u.name);
                        if(extraShape === undefined) { return false };

                        if(extraShape.slotRequirementType !== undefined)
                            if(shape.slotRequirements[props.detachmentIndex].slotRequirementType !== extraShape.slotRequirementType)
                                return false;

                        return extraShape.formationNames === undefined || extraShape.formationNames.findIndex((s)=>s===formationName) != -1
                    }).
                    map((u, i) => {
                    return <DetachmentExtraWidget uuid={props.uuid} detachmentIndex={props.detachmentIndex}
                        detachmentExtraIndex={i} key={i} extraName={u.name} formationType={shape.formationType}
                        has={u.has} points={u.points} editable={props.editable}
                    />
                })
            }</div>
        }
        
    }

    const slotDisplayName = (props.detachmentIndex+1).toString() 
        + ": " 
        + (shape.slotRequirements[props.detachmentIndex].displayName ?? props.detachment.slot)
    ;
    
    return <div class="mb-1 mt-1">
        <div class="grid grid-cols-[90%_10%] md:grid-cols-[20%_70%_10%] gap-0">
            <div class="font-medium text-lg bg-gray-100 dark:bg-gray-900 dark:text-white">
                <DetachmentValidityIcon detachment={props.detachment}/>{slotDisplayName}
            </div> 
            <div class="col-start-1 row-start-2 md:col-start-2 md:row-start-1">
                <DetachmentNameSelect 
                    uuid = {props.uuid} detachmentIndex = {props.detachmentIndex} slot = {props.detachment.slot}
                    editable={props.editable}
                    armyListName={props.armyListName} allegiance={props.allegiance}/>
            </div>
            
            <div class="row-start-1 col-start-2 md:col-start-3 font-medium text-right text-lg bg-gray-100 dark:bg-gray-900 dark:text-white">
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
        {extras}
    </div>
}

interface DisabledDetachmentWidgetProps {
    uuid: string;
    armyListName: ArmyListName;
    detachmentIndex: number;
    detachment: Detachment;
}

export function DisabledDetachmentWidget(props: DisabledDetachmentWidgetProps) {
    const {army} = useContext(AppState);
    const formationName = army.value.formations.find(x=>x.uuid == props.uuid)?.formationName ?? "";

    const shape = getShapeForFormationName(props.armyListName, formationName);
    if(shape.formationType == "Iconic")
        return <div></div>

    const slotDisplayName = (props.detachmentIndex+1).toString() 
        + ": " 
        + (shape.slotRequirements[props.detachmentIndex].displayName ?? props.detachment.slot)
    ;
    return <div class="mb-1 mt-1">
        <div class="grid grid-cols-[90%_10%] md:grid-cols-[20%_70%_10%] gap-0">
            <div class="text-lg bg-gray-50 text-gray-500 dark:bg-gray-950">
                <DetachmentValidityIcon detachment={props.detachment}/>{slotDisplayName}
            </div>
            <div class="col-start-1 row-start-2 md:col-start-2 md:row-start-1 bg-gray-50">
                {props.detachment.detachmentName}
            </div>
                
            <div class="row-start-1 col-start-2 md:col-start-3 text-right text-lg bg-gray-50 text-gray-500 dark:bg-gray-950">
                {props.detachment.points}
            </div>
        </div>
    </div>   
}