import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { FormationWidget } from "./FormationWidget.tsx";
import { ArmyPrimaryArmyListSelect } from "./ArmyPrimaryArmyListSelect.tsx";
import { ArmyAllegianceSelect } from "./ArmyAllegianceSelect.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { LoadState } from "../state.ts";
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
    let alliedPoints = 0;
    let points = 0;
    let enabled = false
    let allegiance: Allegiance | "" = "";
    let primaryArmyListName: ArmyListName | "" = "";
    if(props.uuid != "" && armyLoadState.value == LoadState.Loaded) {
        name = army.value.name;
        maxPoints = army.value.maxPoints;
        alliedPoints = army.value.maxPoints;
        points = army.value.points;
        enabled = true;
        allegiance = army.value.allegiance;
        primaryArmyListName = army.value.primaryArmyListName;
    } 

    return <div class={"grid grid-cols-[10%_20%_20%_20%_20%_10%] gap-y-2 w-[500px] md:w-[800px] bg-white mx-8" + " " + props.class}>
        <div class="col-span-3 col-start-1 flex">
            <input disabled={!enabled} type="text" placeholder="My army name" class="text-lg md:text-xl w-70 md:w-96" value={name} onChange={(e) => {
                const target = e.target as HTMLInputElement;
                changeArmyName(target.value);
                }}/>
        </div>
        
        <div class="col-span-2 col-start-4 text-lg">
            Allied: {alliedPoints} / {maxPoints*0.3}
        </div>

        <div class="col-span-1 col-start-6 justify-self-end text-lg md:text-xl flex flex-row">
            <div>{points}/</div>
            <input disabled={!enabled}
                type="number"
                //this madness removes the spinners
                class="w-16 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                min="0" 
                value={maxPoints} onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    changeArmyMaxPoints(parseInt(target.value));
                }}
            />
        </div>

        <div class="row-start-2 col-start-1 col-span-2">
            <ArmyAllegianceSelect allegiance={allegiance} enabled={enabled}/>
        </div>

        <div class="row-start-2 col-start-4">
            <ArmyPrimaryArmyListSelect primaryArmyListName={primaryArmyListName} enabled={enabled}/>
        </div>

        <div class="row-start-3 col-start-1 col-span-4 flex">
            <ArmyValidity army={army.value}/>
            <ArmyValidityText army={army.value} class=""/>
        </div>

        <div class="row-start-4 col-span-6 border-b-2"></div>
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
        <div class="flex flex-row justify-center"> {
            (props.uuid != "" && armyLoadState.value != LoadState.Loaded) 
            ?
            (<h1 class={props.class}>Loading...</h1>)
            :
            (
                <div>                
                    <div class={"border-t-100 w-[500px] md:w-[800px] " + props.class}>
                        {army.value.formations.map((x) => FormationWidget({formation: x, allegiance: army.value.allegiance})) }
                    </div>               

                    <div class="row-start-5 col-span-7 col-start-1 w-[500px] md:w-[800px]">
                        <button type="button" class="text-lg md:text-xl w-full text-centre bg-gray-200 mb-4" onClick={() => addFormation()}>New Formation</button>
                    </div>

                </div>
            )
        } </div>
    )
}