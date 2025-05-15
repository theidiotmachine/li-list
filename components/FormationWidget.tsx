import { useContext } from "preact/hooks";
import { Allegiance, Formation, FormationName } from "../game/types.ts";
import { DetachmentTable } from "./DetachmentTable.tsx";
import { AppState } from "../islands/App.tsx";
import { FormationTypeSelect } from "./FormationTypeSelect.tsx";
import { FormationArmyListSelect } from "./FormationArmyListSelect.tsx";
import { FormationLegionNameListSelect } from "./FormationLegionNameSelect.tsx";
import { DelButton } from "./DelButton.tsx";

interface FormationWidgetProps {
    formation: Formation;
    allegiance: Allegiance | "";
    editable: boolean;
}

export function FormationWidget(props: FormationWidgetProps) {
    const { removeFormation, formationClosedState: formationClosedState, openFormation, closeFormation } = useContext(AppState);
    const isLegion = props.formation.armyListName == "Legions Astartes";
    const isOpen = !formationClosedState.value.has(props.formation.uuid);
    return <div class="mb-6 md:mb-8">
        <div class ="grid grid-cols-[6%_82%_10%] md:grid-cols-[5%_41%_41%_10%] gap-[1%] mb-4">   
            <div class="col-start-1">{
                (isOpen)?
                (<img src="/tick-clean.svg" class="w-6 h-6 cursor-pointer"
                    onClick={() => closeFormation(props.formation.uuid)}
                ></img>):
                (<img src="/edit-clean.svg" class="w-6 h-6 cursor-pointer"
                    onClick={() => openFormation(props.formation.uuid)}
                ></img>)
            }</div>
            <div class="col-start-2">
                <FormationArmyListSelect uuid={props.formation.uuid} editable={isOpen && props.editable}/>
            </div>
            
            <div class="row-start-2 md:row-start-1 col-start-2 md:col-start-3 ">
                <FormationTypeSelect uuid={props.formation.uuid} editable={isOpen && props.editable}/> 
            </div>
            <div class="row-start-1 col-start-3 md:col-start-4 text-right font-medium text-lg md:text-xl border-b-2 border-gray-400 bg-gray-100">{props.formation.points}</div>
            {(isLegion)?
                (<FormationLegionNameListSelect uuid={props.formation.uuid} editable={isOpen && props.editable}
                    class = "row-start-3 md:row-start-2 col-start-2 md:text-lg"
                    legionName={props.formation.legionName??""}/>)
                :(<div class="hidden"></div>)
            }

            <div class="col-start-1 row-start-2">
                <DelButton hidden={!isOpen || !props.editable} onClick={()=>removeFormation(props.formation.uuid)}></DelButton>
            </div>

            <div class={"col-start-2 md:text-lg " + ((isLegion)?"md:row-start-3 row-start-5" : "md:row-start-2 row-start-4")}>
                Breakpoint: {props.formation.breakPoint}
            </div>
            <div class={"col-start-2 md:col-start-3 md:text-lg " + ((isLegion)?"md:row-start-3 row-start-6" : "md:row-start-2 row-start-5")}>
                Activations: {props.formation.activations}
            </div>

        </div>
        { 
        (props.formation.armyListName == "" || !isOpen) ?
            <div></div> :
            <DetachmentTable 
                armyListName={props.formation.armyListName} detachments={props.formation.detachments} 
                uuid={props.formation.uuid} allegiance={props.allegiance} 
                //cast is because the reality is we have a formation type, or we wouldn't be at this point
                formationType={props.formation.formationName as FormationName}
                editable={props.editable}
            />
        }
        <div class="col-start-1 col-span-4 mt-6 md:col-span-5 border-b-2"></div>
    </div>
}