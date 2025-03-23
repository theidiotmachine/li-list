import { useContext } from "preact/hooks";
import { Formation } from "../state.ts";
import { DetachmentTable } from "./DetachmentTable.tsx";
import { AppState } from "../islands/App.tsx";
import { FormationTypeSelect } from "./FormationTypeSelect.tsx";
import { FormationArmyListSelect } from "./FormationArmyListSelect.tsx";
import { DelButton } from "./DelButton.tsx";

interface FormationWidgetProps {
    formation: Formation;
}

export function FormationWidget(props: FormationWidgetProps) {
    const { removeFormation } = useContext(AppState);
    //
    return <div class="mb-8 mt-8">
        <div class ="grid grid-cols-[6%_42%_42%_10%] gap-0">
            <div class="col-span-1">
                <DelButton hidden={false} onClick={() => removeFormation(props.formation.uuid)}></DelButton>
            </div>
            <div class="col-start-2">
                <FormationArmyListSelect uuid={props.formation.uuid}/>
            </div>
            
            <div class="col-start-3"><FormationTypeSelect uuid={props.formation.uuid}/> </div>
            <div class="col-start-4 justify-self-end text-xl">{props.formation.points}</div>
        </div>
        { 
        (props.formation.armyListName == "") ?
            <div></div> :
            <DetachmentTable armyListName={props.formation.armyListName} detachments={props.formation.detachments} uuid={props.formation.uuid}/>
        }
    </div>
}