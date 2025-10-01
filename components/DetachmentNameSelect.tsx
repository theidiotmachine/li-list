import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { Allegiance, ArmyListName, DetachmentName, Formation, FormationSlot } from "../game/types.ts";
import { getDetachmentConfigurationForDetachmentName, getDetachmentNamesForSlot } from "../game/lists.ts";
import { Select, SelectOption } from "./Select.tsx";

interface DetachmentNameSelectProps {
    uuid: string;
    armyListName: ArmyListName;
    detachmentIndex: number;
    slot: FormationSlot;
    allegiance: Allegiance  | "";
    editable: boolean;
};

export function DetachmentNameSelect(props: DetachmentNameSelectProps) {
    const { army, changeDetachmentName } = useContext(AppState);

    const detachmentNamesForSlot: (DetachmentName | "")[] = [""];
    detachmentNamesForSlot.push(...getDetachmentNamesForSlot(props.armyListName, props.slot, props.allegiance));

    const formation = army.value.formations.find((f: Formation)=>f.uuid == props.uuid);
    const detachment = formation?.detachments[props.detachmentIndex];
    const unit = detachment?.detachmentName;

    if(unit !== undefined && unit != "" && !detachmentNamesForSlot.includes(unit) && formation?.formationType === "Iconic") {
        detachmentNamesForSlot.push(unit);
    }

    const options = detachmentNamesForSlot.map((u)=> {
        let optionText = u;
        if(u != "") {
            const c = getDetachmentConfigurationForDetachmentName(props.armyListName, u);
            optionText += " - " + c.modelGroupShapes[0].possibleModelGroupQuantities[0].points + "pts";
        }
        
        return <SelectOption type="option" key={u} selected={unit == u} optionText={optionText}>{u}</SelectOption>
    });
    return <Select<DetachmentName | "">
        class="w-full md:font-medium md:text-lg bg-white md:bg-gray-100 dark:bg-black md:dark:bg-gray-900 dark:text-white" 
        disabled={!props.editable}
        onInput={(e) => changeDetachmentName(props.uuid, props.detachmentIndex, e)}>
        {options}
    </Select>
}