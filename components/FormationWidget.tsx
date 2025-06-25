import { useContext } from "preact/hooks";
import { Allegiance, Formation, FormationName } from "../game/types.ts";
import { DetachmentTable } from "./DetachmentTable.tsx";
import { AppState } from "../islands/App.tsx";
import { FormationTypeSelect } from "./FormationTypeSelect.tsx";
import { FormationArmyListSelect } from "./FormationArmyListSelect.tsx";
import { FormationLegionNameListSelect } from "./FormationLegionNameSelect.tsx";
import { DelButton } from "./DelButton.tsx";

function EditButton(props: { isOpen: boolean, uuid: string }){
    const { openFormation, closeFormation } = useContext(AppState);

    if (props.isOpen) 
        return <svg width="16" height="16" version="1.1" viewBox="0 0 4.2333 4.2333" xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 cursor-pointer fill-green-500 stroke-green-500" onClick={() => closeFormation(props.uuid)}
        >
            <path d="m1.1906 2.249 0.26458-0.26458 0.52917 0.52917 0.79375-1.0583 0.26458 0.26458-1.0583 1.3229z" stroke="none"/>
            <ellipse cx="2.1167" cy="2.1167" rx="1.7198" ry="1.7198" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width=".28708"/>
        </svg>
    else
        return <svg width="16" height="16" version="1.1" viewBox="0 0 4.2333 4.2333" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 cursor-pointer fill-blue-500 stroke-blue-500" onClick={() => openFormation(props.uuid)}
        >
            <path d="m0.66146 2.7781-1e-8 0.79375 0.79375 1e-7 2.3812-2.3812-0.79375-0.79375z" fill="none" stroke-width=".26458px"/>
            <path d="m2.5135 0.92604 0.79375 0.79375" fill="none" stroke-width=".26458px"/>
            <path d="m0.66146 2.7781v0.79375h0.79375z" stroke="none"/>
        </svg>
}

interface FormationWidgetProps {
    formation: Formation;
    allegiance: Allegiance | "";
    editable: boolean;
}

export function FormationWidget(props: FormationWidgetProps) {
    const { removeFormation, formationClosedState } = useContext(AppState);
    const isLegion = props.formation.armyListName == "Legions Astartes";
    const isOpen = !formationClosedState.value.has(props.formation.uuid);
    return <div class="mb-6 md:mb-8">
        <div class ="grid grid-cols-[6%_82%_10%] md:grid-cols-[5%_41%_41%_10%] gap-[1%] mb-4">   
            <div class="col-start-1">
                <EditButton isOpen={isOpen} uuid={props.formation.uuid}/>
            </div>
            <div class="col-start-2">
                <FormationArmyListSelect uuid={props.formation.uuid} editable={isOpen && props.editable}/>
            </div>
            
            <div class="row-start-2 md:row-start-1 col-start-2 md:col-start-3 ">
                <FormationTypeSelect uuid={props.formation.uuid} editable={isOpen && props.editable}/> 
            </div>
            <div 
                class="row-start-1 col-start-3 md:col-start-4 text-right font-medium text-lg md:text-xl border-b-2 border-gray-400 bg-gray-100 dark:border-gray-600 dark:bg-gray-900 dark:text-white w-full"
            >
                {props.formation.points}
            </div>
            {(isLegion)?
                (<FormationLegionNameListSelect uuid={props.formation.uuid} editable={isOpen && props.editable}
                    class = "row-start-3 md:row-start-2 col-start-2 md:text-lg"
                    legionName={props.formation.legionName??""}/>)
                :(<div class="hidden"></div>)
            }

            <div class="col-start-1 row-start-2">
                <DelButton hidden={!isOpen || !props.editable} onClick={()=>removeFormation(props.formation.uuid)}></DelButton>
            </div>

            <div class={"col-start-2 md:text-lg dark:text-white " + ((isLegion)?"md:row-start-3 row-start-5" : "md:row-start-2 row-start-4")}>
                Breakpoint: {props.formation.breakPoint}
            </div>
            <div class={"col-start-2 md:col-start-3 md:text-lg dark:text-white " + ((isLegion)?"md:row-start-3 row-start-6" : "md:row-start-2 row-start-5")}>
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