import { useContext } from "preact/hooks";
import { Allegiance, Formation, FormationName } from "../game/types.ts";
import { DetachmentTable } from "./DetachmentTable.tsx";
import { AppState } from "../islands/App.tsx";
import { FormationTypeSelect } from "./FormationTypeSelect.tsx";
import { FormationArmyListSelect } from "./FormationArmyListSelect.tsx";
import { DelButton } from "./DelButton.tsx";
import { FormationLegionNameListSelect } from "./FormationLegionNameSelect.tsx";

interface FormationWidgetProps {
    formation: Formation;
    allegiance: Allegiance | "";
}

export function FormationWidget(props: FormationWidgetProps) {
    const { removeFormation } = useContext(AppState);
    const isLegion = props.formation.armyListName == "Legions Astartes";
    //
    return <div class="mb-6 md:mb-8">
        <div class ="grid grid-cols-[89%_10%] md:grid-cols-[44%_44%_10%] gap-[1%] mb-4">
            
            <div class="col-start-1">
                <FormationArmyListSelect uuid={props.formation.uuid}/>
            </div>
            
            <div class="col-start-1 row-start-2 md:col-start-2 md:row-start-1"><FormationTypeSelect uuid={props.formation.uuid}/> </div>
            <div class="row-start-1 col-start-2 md:col-start-3 text-right font-medium text-lg md:text-xl border-b-2 border-gray-400 bg-gray-100">{props.formation.points}</div>
            {(isLegion)?
                (<FormationLegionNameListSelect uuid={props.formation.uuid} 
                    class = "row-start-3 md:row-start-2 col-start-1 md:text-lg"
                    legionName={props.formation.legionName??""}/>)
                :(<div class="hidden"></div>)
            }

            <div class={"col-start-1 md:text-lg " + ((isLegion)?"md:row-start-3 row-start-5" : "md:row-start-2 row-start-4")}>
                Breakpoint: {props.formation.breakPoint}
            </div>
            <div class={"col-start-1 md:col-start-2 md:text-lg " + ((isLegion)?"md:row-start-3 row-start-6" : "md:row-start-2 row-start-5")}>
                Activations: {props.formation.activations}
            </div>
            <div class={"col-start-1 md:text-lg " + ((isLegion)?"md:row-start-4 row-start-7" : "md:row-start-3 row-start-6")}>
                <button type = "button" class="w-full text-centre justify-center bg-gray-100" onClick={() => removeFormation(props.formation.uuid)}>Delete</button>
            </div>
        </div>
        { 
        (props.formation.armyListName == "") ?
            <div></div> :
            <DetachmentTable 
                armyListName={props.formation.armyListName} detachments={props.formation.detachments} 
                uuid={props.formation.uuid} allegiance={props.allegiance} 
                //cast is because the reality is we have a formation type, or we wouldn't be at this point
                formationType={props.formation.formationName as FormationName}
            />
        }
        <div class="col-start-1 col-span-3 mt-6 md:col-span-4 border-b-2"></div>
    </div>
}