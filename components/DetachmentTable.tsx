import { JSX } from "preact";
import { DetachmentWidget, DisabledDetachmentWidget } from "./DetachmentWidget.tsx";
import { Allegiance, ArmyListName, Detachment, FormationName } from "../game/types.ts";
import { getShapeForFormationName } from "../game/lists.ts";
import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";

interface DetachmentTableProps extends JSX.HTMLAttributes<HTMLTableElement>{
    uuid: string;
    armyListName: ArmyListName;
    formationName: FormationName;
    detachments: Detachment[];
    allegiance: Allegiance  | "";
    editable: boolean;
}

export function DetachmentTable(props: DetachmentTableProps) {
    return <div> {
        props.detachments.map(
            (x, i) => {
                const {army} = useContext(AppState);
                const formation = army.value.formations.find(x=>x.uuid == props.uuid);
                const formationName = formation?.formationName ?? "";
                const shape = getShapeForFormationName(props.armyListName, formationName);
                //handled in IconicDetachmentTable
                if(shape.formationType == "Iconic")
                    return <div key={props.uuid + "-" + i}></div>;
                if(shape.slotRequirements[i].linkedSlotIndex != undefined) {
                    //sigh. TODO make this more generic if need be
                    if(props.detachments[shape.slotRequirements[i].linkedSlotIndex].detachmentName != "Tech-Priest Auxilia")
                        return <div key={props.uuid + "-" + i}></div>
                }
                
                if(shape.slotRequirements[i].slotRequirementType == "One Of" 
                    || shape.slotRequirements[i].slotRequirementType == "One Of Group"
                    || shape.slotRequirements[i].slotRequirementType == "Required One Of Group"
                ) {
                    const oneOfGroup = shape.slotRequirements[i].oneOfGroup;
                    const oneOfGroupGroup = shape.slotRequirements[i].oneOfGroupGroup;
                    const otherGroupIndex = props.detachments.findIndex((t, j)=>{
                        if(shape.slotRequirements[i].slotRequirementType == "One Of")
                            return (j!=i
                                && shape.slotRequirements[j].slotRequirementType=="One Of"
                                && shape.slotRequirements[j].oneOfGroup == oneOfGroup
                                && t.detachmentName != ""
                            )
                        else
                            return (j!=i
                                && (shape.slotRequirements[j].slotRequirementType=="One Of Group" 
                                    || shape.slotRequirements[j].slotRequirementType=="Required One Of Group")
                                && shape.slotRequirements[j].oneOfGroup == oneOfGroup
                                && t.detachmentName != ""
                                && shape.slotRequirements[j].oneOfGroupGroup != oneOfGroupGroup
                            )
                    });
                    if(otherGroupIndex != -1)
                        return <DisabledDetachmentWidget 
                            key={props.uuid + "-" + i} uuid={props.uuid} armyListName={props.armyListName} detachment={x} detachmentIndex={i}
                        />
                }
                
                return <DetachmentWidget
                    uuid={props.uuid} armyListName={props.armyListName} detachment={x} 
                    detachmentIndex={i} allegiance={props.allegiance} formationName={props.formationName}
                    key={props.uuid + "-" + i}
                    editable={props.editable}
                />
            })
    } </div>
}