import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { ArmyListName, DetachmentType, Formation, FormationSlot } from "../game/types.ts";
import { getDetachmentTypesForSlot } from "../game/lists.ts";

interface UnitTypeSelectProps {
    uuid: string;
    armyListName: ArmyListName;
    detachmentIndex: number;
    slot: FormationSlot;
};

export function DetachmentTypeSelect(props: UnitTypeSelectProps) {
    const { army, changeDetachmentType } = useContext(AppState);

    const unitTypesForSlot = [""];
    unitTypesForSlot.push(...getDetachmentTypesForSlot(props.armyListName, props.slot));

    const formation = army.value.formations.find((f: Formation)=>f.uuid == props.uuid);
    const detachment = formation?.detachments[props.detachmentIndex];
    const unit = detachment?.detachmentType;

    const options = unitTypesForSlot.map((u, i)=> <option class="bg-gray-100" key={i} selected={unit == u}>{u}</option>);

    return <select 
        class="w-full font-medium md:w-[490px] md:text-lg appearance-none bg-[url(dropdownarrow-clean.svg)] bg-no-repeat bg-right bg-gray-100" 
        onInput={(e) => changeDetachmentType(props.uuid, props.detachmentIndex, e.currentTarget.value as DetachmentType | "")}>
        {options}
    </select>
}