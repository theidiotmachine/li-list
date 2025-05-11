import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { Formation, statsHasTraitLike } from "../game/types.ts";
import { getStatsForModelName } from "../game/lists.ts";

interface DetachmentAttachmentSelectProps {
    uuid: string;
    detachmentIndex: number;
    detachmentAttachmentIndex: number;
    class: string;
}

export function DetachmentAttachmentSelect(props: DetachmentAttachmentSelectProps) {
    const { army, changeDetachmentAttachment } = useContext(AppState);
    const formation = army.value.formations.find((f: Formation)=>f.uuid == props.uuid);
    
    const detachmentAttachmentsForSlot = [{text: "No attached Detachment", index: -1}];
    if(formation !== undefined) {
        const stats = getStatsForModelName(formation?.detachments[props.detachmentIndex].modelGroups[0].modelName);
        const commandAttachment = stats?.commandAttachment ?? "SameType";
        
        //you can attach to a detachment which isn't this one, is being filled, and fits the attachment alg
        const possibleDetachmentData = formation?.detachments.map((s, i)=>{
            if(i == props.detachmentIndex)
                return {text: "", index: -1};
            if(s.modelGroups.length == 0)
                return {text: "", index: -1};
            const thisStats = getStatsForModelName(s.modelGroups[0].modelName);
            if(thisStats == undefined)
                return {text: "", index: -1};
            switch(commandAttachment) {
                case "SameType": {
                    if(thisStats.detachmentType == stats?.detachmentType)
                        return {text: "Attached to Detachment " + (i+1).toString() + ", " + s.detachmentName, index: i};
                    break;
                }
                case "MechanicumHQ": {
                    if(((thisStats.detachmentType == "Infantry" || thisStats.detachmentType == "Cavalry" 
                        || thisStats.detachmentType == "Walker" || thisStats.detachmentType == "Vehicle")
                        && statsHasTraitLike(thisStats, "Cybernetica Cortex"))
                        || thisStats.detachmentType == stats?.detachmentType
                    ) {
                        return {text: "Attached to Detachment " + (i+1).toString() + ", " + s.detachmentName, index: i};
                    }
                    break;
                }
            }
            
            return {text: "", index: -1};
        }).filter((s)=>s.index != -1);
        possibleDetachmentData.forEach((s)=>detachmentAttachmentsForSlot.push(s));
    }
    return <select
        class={"w-full appearance-none bg-[url(dropdownarrow-clean.svg)] bg-no-repeat bg-right bg-opacity-0 bg-white italic text-sm " + props.class} 
        onInput={(e) => changeDetachmentAttachment(props.uuid, props.detachmentIndex, parseInt(e.currentTarget.value))}>
        {detachmentAttachmentsForSlot.map((s, i)=>{return <option value={s.index.toString()} key={i} selected={props.detachmentAttachmentIndex==s.index}>
            {s.text}
        </option>})}
    </select>

}