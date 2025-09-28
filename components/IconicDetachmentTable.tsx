import { JSX } from "preact";
import { Allegiance, ArmyListName, Detachment } from "../game/types.ts";
import { IconicDetachmentWidget } from "./IconicDetachmentWidget.tsx";

export interface IconicDetachmentTableProps extends JSX.HTMLAttributes<HTMLTableElement> {
    detachments: Detachment[];
    uuid: string;
    armyListName: ArmyListName;
    allegiance: Allegiance | "";
}

export function IconicDetachmentTable(props: IconicDetachmentTableProps) {
    return <div> {
        props.detachments.map(
            (x, i) => {
                return <IconicDetachmentWidget
                    key={props.uuid + "-" + i} uuid={props.uuid} detachment={x} 
                    detachmentIndex={i}
                    armyListName={props.armyListName}
                    allegiance={props.allegiance}
                />
            }
        )
    } </div>
}