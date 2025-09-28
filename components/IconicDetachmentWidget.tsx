import { getDetachmentConfigurationForDetachmentName, getShapeForFormationName } from "../game/lists.ts";
import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { Allegiance, ArmyListName, Detachment, ModelGroup } from "../game/types.ts";
import { DetachmentValidityIcon, DetachmentValidityText } from "./DetachmentValidity.tsx";
import { DetachmentNameSelect } from "./DetachmentNameSelect.tsx";
import { ModelGroupWidget } from "./ModelGroupWidget.tsx";
import { DetachmentExtraWidget } from "./DetachmentExtraWidget.tsx";

export type IconicDetachmentWidgetProps = {
    uuid: string;
    armyListName: ArmyListName;
    detachmentIndex: number;
    detachment: Detachment;
    allegiance: Allegiance | "";
}

export function IconicDetachmentWidget(props: IconicDetachmentWidgetProps) {
    const {army} = useContext(AppState);
    const formationName = army.value.formations.find(x=>x.uuid == props.uuid)?.formationName ?? "";
    
    const shape = getShapeForFormationName(props.armyListName, formationName);
    if(shape.formationType !== "Iconic")
        return <div></div>
    const slotDisplayName = (props.detachmentIndex+1).toString() 
        + ": " 
        + (props.detachment.slot)
    ;
    
    let modelGroups = <div></div>;
    let extras = <div></div>

    const detachmentName = props.detachment.detachmentName;
    if(detachmentName != "") {
        const config = getDetachmentConfigurationForDetachmentName(props.armyListName, detachmentName);
        modelGroups = <div> {
            config.modelGroupShapes
                .map((u, i) => {
                    const modelGroupIndex = props.detachment.modelGroups.findIndex((m: ModelGroup) => m.modelName == u.modelName);
                    return <ModelGroupWidget 
                        modelGroupShapeIndex={i} modelGroupShape={u} uuid={props.uuid}
                        modelGroup={props.detachment.modelGroups[modelGroupIndex]}
                        armyListName={props.armyListName} detachmentIndex={props.detachmentIndex}
                        detachmentName={detachmentName} detachment={props.detachment} key={i}
                        editable={false} formationType="Iconic"
                    />
                })
        } </div>
        if(props.detachment.extras != undefined) {
            extras = <div>{
                props.detachment.extras.
                    map((u, i) => {
                        return <DetachmentExtraWidget uuid={props.uuid} detachmentIndex={props.detachmentIndex}
                            detachmentExtraIndex={i} key={i} extraName={u.name} 
                            has={u.has} points={u.points} editable={false}/>
                    })
            }</div>
        }    
    }
        
    return <div class="mb-1 mt-1">
        <div class="grid grid-cols-[90%_10%] md:grid-cols-[20%_70%_10%] gap-0">
            <div class="font-medium text-lg bg-gray-100 dark:bg-gray-900 dark:text-white">
                <DetachmentValidityIcon detachment={props.detachment}/>{slotDisplayName}
            </div> 
            <div class="col-start-1 row-start-2 md:col-start-2 md:row-start-1">
                <DetachmentNameSelect 
                    uuid = {props.uuid} detachmentIndex = {props.detachmentIndex} slot = {props.detachment.slot}
                    editable={false}
                    armyListName={props.armyListName} allegiance={props.allegiance}/>
            </div>
                
            <div class="row-start-1 col-start-2 md:col-start-3 font-medium text-right text-lg bg-gray-100 dark:bg-gray-900 dark:text-white">
                -
            </div>
            <DetachmentValidityText class="col-start-1 row-start-3 md:col-start-2 md:col-span-2" detachment={props.detachment}/>
        </div>
        {modelGroups}
        {extras}
    </div>
}