import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { FormationWidget } from "./FormationWidget.tsx";
import { ArmyPrimaryArmyListSelect } from "./ArmyPrimaryArmyListSelect.tsx";
import { ArmyAllegianceSelect } from "./ArmyAllegianceSelect.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { LoadState } from "../state/appState.ts";
import { ArmyValidity, ArmyValidityText } from "./ArmyValidity.tsx";
import { Allegiance, ArmyListName } from "../game/types.ts";


export type ArmyHeaderProps = {
    uuid: string;
    armyAsJson: string;
    class: string
}

export function ArmyHeader(props: ArmyHeaderProps) {
    const { army, changeArmyName, changeArmyMaxPoints, armyLoadState, load } = useContext(AppState);

    if(props.uuid != "" && IS_BROWSER)
        load(props.uuid);
    if(props.armyAsJson != "")
        army.value = JSON.parse(props.armyAsJson);

    let name = ""
    let maxPoints = 0
    let remainingPoints = 0;
    let alliedPoints = 0;
    let remainingAlliedPoints = 0;
    let maxAlliedPoints = 0;
    let points = 0;
    let enabled = false
    let allegiance: Allegiance | "" = "";
    let primaryArmyListName: ArmyListName | "" = "";
    let activations = 0;
    if(props.uuid != "" && armyLoadState.value == LoadState.Loaded) {
        name = army.value.name;
        maxPoints = army.value.maxPoints;
        alliedPoints = army.value.alliedPoints;
        points = army.value.points;
        if(maxPoints > 0) {
            remainingPoints = maxPoints - points;
            maxAlliedPoints = maxPoints*0.3;
            remainingAlliedPoints = maxAlliedPoints - alliedPoints;
        }
            
        enabled = true;
        allegiance = army.value.allegiance;
        primaryArmyListName = army.value.primaryArmyListName;
        activations = army.value.activations;
    } 

    return <div class={"grid grid-cols-[50%_50%] md:grid-cols-[41%_41%_14%] gap-[1%] md:w-[800px] bg-white mr-2 md:mx-0" + " " + props.class}>
        <div class="md:col-span-2 col-start-1">
            <input disabled={!enabled} type="text" placeholder="My army name" class="text-lg md:text-xl w-full md:w-96" value={name} onChange={(e) => {
                const target = e.target as HTMLInputElement;
                changeArmyName(target.value);
                }}/>
        </div>
        
        <div class="md:col-start-3 text-lg md:text-xl flex flex-row justify-self-end ">
            <div>{points}/</div>
            <input disabled={!enabled}
                type="number"
                //this madness removes the spinners
                class="w-12 md:w-16 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                min="0" 
                value={maxPoints} onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    changeArmyMaxPoints(parseInt(target.value));
                }}
            />
        </div>

        <div class="col-start-1 row-start-2">
            Activations: {activations}
        </div>

        <div class="col-start-1 row-start-3 col-span-2 md:col-span-1 md:col-start-2 md:row-start-2">
            Allied: {alliedPoints}/{maxAlliedPoints} ({remainingAlliedPoints} left)
        </div>

        <div class="col-start-2 md:col-start-3 md:text-lg flex flex-row justify-self-end row-start-2">
            ({remainingPoints} left)
        </div>

        <div class="col-start-1 col-span-2 md:col-span-1 md:row-start-3 hide-on-scroll">
            <ArmyAllegianceSelect allegiance={allegiance} enabled={enabled}/>
        </div>

        <div class="col-start-1 md:col-start-2 col-span-2 md:row-start-3 md:col-span-1 hide-on-scroll">
            <ArmyPrimaryArmyListSelect primaryArmyListName={primaryArmyListName} enabled={enabled} allegiance={allegiance}/>
        </div>

        <div class="col-start-1 col-span-2 md:row-start-4 md:col-span-3 flex">
            <ArmyValidity army={army.value}/>
            <ArmyValidityText army={army.value} class=""/>
        </div>

        <div class="col-start-1 col-span-2 md:row-start-5 md:col-span-3 border-b-2"></div>
    </div>

}

export type ArmyWidgetProps = {
    uuid: string;
    armyAsJson: string;
    class: string;
}

export function ArmyWidget(props: ArmyWidgetProps) {
    const { army, addFormation, armyLoadState, load } = useContext(AppState);
    if(props.uuid != "" && IS_BROWSER)
        load(props.uuid);
    if(props.armyAsJson != "")
        army.value = JSON.parse(props.armyAsJson);

    return(
        <div class="flex flex-row justify-center overflow-x-scroll h-screen" onScroll={(e)=>{
                const k = e.target as HTMLElement;
                if(k.scrollTop > 60){
                    const elems = document.getElementsByClassName("hide-on-scroll");
                    for(const elem of elems) {
                        if (!elem.classList.contains("hidden")) {
                            elem.classList.add("hidden");
                        }
                    }
                } else {
                    const elems = document.getElementsByClassName("hide-on-scroll");
                    for(const elem of elems) {
                        if (elem.classList.contains("hidden")) {
                            elem.classList.remove("hidden");
                        }
                    }
                }
            }}> {
            (props.uuid != "" && armyLoadState.value != LoadState.Loaded) 
            ?
            (<h1 class={props.class}>Loading...</h1>)
            :
            (
                <div class="flex flex-col md:w-[800px] w-screen mx-2">
                    <div class={"w-full " + props.class}>
                        {army.value.formations.map((x) => FormationWidget({formation: x, allegiance: army.value.allegiance})) }
                    </div>               

                    <button type="button" class="text-lg md:text-xl w-48 md:w-full text-centre justify-center bg-gray-100 mb-4" 
                        onClick={() => addFormation()}
                    >New Formation</button>
                    
                </div>
            )
        } </div>
    )
}