import { useContext } from "preact/hooks";
import { Allegiance, Formation, FormationType } from "../game/types.ts";
import { DetachmentTable } from "./DetachmentTable.tsx";
import { AppState } from "../islands/App.tsx";
import { FormationTypeSelect } from "./FormationTypeSelect.tsx";
import { FormationArmyListSelect } from "./FormationArmyListSelect.tsx";
import { DelButton } from "./DelButton.tsx";

interface FormationWidgetProps {
    formation: Formation;
    allegiance: Allegiance | "";
}

export function FormationWidget(props: FormationWidgetProps) {
    const { removeFormation } = useContext(AppState);
    //
    return <div class="mb-6 mt-6 md:mb-8 md:mt-8">
        <div class ="grid grid-cols-[6%_42%_42%_10%] gap-0">
            <div class="col-span-1">
                <DelButton hidden={false} onClick={() => removeFormation(props.formation.uuid)}></DelButton>
            </div>
            <div class="col-start-2">
                <FormationArmyListSelect uuid={props.formation.uuid}/>
            </div>
            
            <div class="col-start-3"><FormationTypeSelect uuid={props.formation.uuid}/> </div>
            <div class="col-start-4 justify-self-end text-lg md:text-xl">{props.formation.points}</div>
            <div class="row-start-2 col-start-2 col-span-1 md:text-lg">Breakpoint: {props.formation.breakPoint}</div>
            <div class="row-start-2 col-start-3 col-span-1 md:text-lg">Activations: {props.formation.activations}</div>
        </div>
        { 
        (props.formation.armyListName == "") ?
            <div></div> :
            <DetachmentTable 
                armyListName={props.formation.armyListName} detachments={props.formation.detachments} 
                uuid={props.formation.uuid} allegiance={props.allegiance} 
                //cast is because the reality is we have a formation type, or we wouldn't be at this point
                formationType={props.formation.formationType as FormationType}
            />
        }
    </div>
}