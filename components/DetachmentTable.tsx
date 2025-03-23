import { JSX } from "preact";
import { DetachmentWidget } from "./DetachmentWidget.tsx";
import { ArmyListName, Detachment } from "../game/types.ts";

interface DetachmentTableProps extends JSX.HTMLAttributes<HTMLTableElement>{
    uuid: string;
    armyListName: ArmyListName;
    detachments: Detachment[];
}

export function DetachmentTable(props: DetachmentTableProps) {
    return <div>
        {props.detachments.map((x, i) => DetachmentWidget({uuid: props.uuid, armyListName: props.armyListName, detachment: x, detachmentIndex: i}))}
    </div>
}