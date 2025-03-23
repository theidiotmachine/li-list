import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { ArmyListName, DetachmentType, FormationSlot } from "../game/types.ts";
import { getDetachmentTypesForSlot } from "../game/lists.ts";
import { Formation } from "../state.ts";

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

    const options = unitTypesForSlot.map((u, i)=> <option key={i} selected={unit == u}>{u}</option>);

    return <select class="w-[490px] text-lg appearance-none" onInput={(e) => changeDetachmentType(props.uuid, props.detachmentIndex, e.currentTarget.value as DetachmentType | "")}>
        {options}
    </select>
}