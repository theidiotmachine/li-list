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
};

export function DetachmentNameSelect(props: DetachmentNameSelectProps) {
    const { army, changeDetachmentName } = useContext(AppState);

    const detachmentNamesForSlot: (DetachmentName | "")[] = [""];
    detachmentNamesForSlot.push(...getDetachmentNamesForSlot(props.armyListName, props.slot, props.allegiance));

    const formation = army.value.formations.find((f: Formation)=>f.uuid == props.uuid);
    const detachment = formation?.detachments[props.detachmentIndex];
    const unit = detachment?.detachmentName;


    const options = detachmentNamesForSlot.map((u)=> {
        let optionText = u;
        if(u != "") {
            const c = getDetachmentConfigurationForDetachmentName(props.armyListName, u);
            optionText += " - " + c.modelGroupShapes[0].possibleModelGroupQuantities[0].points + "pts";
        }
        
        return <SelectOption key={u} selected={unit == u} optionText={optionText}>{u}</SelectOption>
    });
    return <Select 
        class="w-full md:font-medium md:text-lg bg-white md:bg-gray-100" 
        onInput={(e) => changeDetachmentName(props.uuid, props.detachmentIndex, e as DetachmentName | "")}>
        {options}
    </Select>
    /*
    const options = detachmentNamesForSlot.map((u, i)=> <option class="md:bg-gray-100" key={i} selected={unit == u}>{u}</option>);

    return <select 
        class="w-full md:font-medium md:text-lg appearance-none bg-[url(dropdownarrow-clean.svg)] bg-no-repeat bg-right bg-white md:bg-gray-100" 
        onInput={(e) => changeDetachmentName(props.uuid, props.detachmentIndex, e.currentTarget.value as DetachmentName | "")}>
        {options}
    </select>
    */
}