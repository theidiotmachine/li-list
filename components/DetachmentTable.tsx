import { JSX } from "preact";
import { DetachmentWidget } from "./DetachmentWidget.tsx";
import { Allegiance, ArmyListName, Detachment, FormationType } from "../game/types.ts";

interface DetachmentTableProps extends JSX.HTMLAttributes<HTMLTableElement>{
    uuid: string;
    armyListName: ArmyListName;
    formationType: FormationType;
    detachments: Detachment[];
    allegiance: Allegiance  | "";
}

export function DetachmentTable(props: DetachmentTableProps) {
    return <div>
        {props.detachments.map(
            (x, i) => DetachmentWidget(
                {uuid: props.uuid, armyListName: props.armyListName, detachment: x, 
                    detachmentIndex: i, allegiance: props.allegiance, formationType: props.formationType}
            )
        )}
    </div>
}