import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { FormationWidget } from "./FormationWidget.tsx";
import { ArmyPrimaryArmyListSelect } from "./ArmyPrimaryArmyListSelect.tsx";
import { ArmyAllegianceSelect } from "./ArmyAllegianceSelect.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { LoadingState } from "../state/appState.ts";
import { ArmyValidity, ArmyValidityText } from "./ArmyValidity.tsx";
import { Allegiance, ArmyListName } from "../game/types.ts";
import LoginLink from "./LoginLink.tsx";
import SignupLink from "./SignupLink.tsx";

function isEditable(localuuid: string, clouduuid: string, username: string, kvArmyOwner: string): boolean {
    if(localuuid != "")
        return true;
    if(clouduuid != "" && username == kvArmyOwner)
        return true;
    return false;
}

export type ArmyHeaderProps = {
    localuuid: string;
    clouduuid: string;
    isLoggedIn: boolean;
    username: string;
}

export function ArmyHeader(props: ArmyHeaderProps) {
    const { army, changeArmyName, changeArmyMaxPoints, armyLocalLoadState, localLoad, kvLoad, armyKvLoadState, isLoggedIn, username, kvArmyOwner } = useContext(AppState);

    if(isLoggedIn.value != props.isLoggedIn)
        isLoggedIn.value = props.isLoggedIn;
    if(username.value != props.username)
        username.value = props.username;

    const bgColour = "bg-gray-100";
    if(props.localuuid != "" && IS_BROWSER)
        localLoad(props.localuuid)
    else if(props.clouduuid != "" && IS_BROWSER)
        kvLoad(props.clouduuid);

    let name = ""
    let maxPoints = 0
    let remainingPoints = 0;
    let alliedPoints = 0;
    let remainingAlliedPoints = 0;
    let maxAlliedPoints = 0;
    let points = 0;
    const editable = isEditable(props.localuuid, props.clouduuid, username.value, kvArmyOwner.value);
    let allegiance: Allegiance | "" = "";
    let primaryArmyListName: ArmyListName | "" = "";
    let activations = 0;
    let storage = "";
    if((props.localuuid != "" && armyLocalLoadState.value == LoadingState.Loaded) 
        || (props.clouduuid != "" && armyKvLoadState.value == LoadingState.Loaded) 
    ) {
        name = army.value.name;
        maxPoints = army.value.maxPoints;
        alliedPoints = army.value.alliedPoints;
        points = army.value.points;
        if(maxPoints > 0) {
            remainingPoints = maxPoints - points;
            maxAlliedPoints = maxPoints*0.3;
            remainingAlliedPoints = maxAlliedPoints - alliedPoints;
        }
            
        allegiance = army.value.allegiance;
        primaryArmyListName = army.value.primaryArmyListName;
        activations = army.value.activations;
        if(props.clouduuid != "")
            storage = "Cloud";
        if(props.localuuid != "")
            storage = "Stored locally";
    } 

    return <div class={"grid grid-cols-[50%_50%] md:grid-cols-[41%_41%_18%] gap-[0%]" + " " + bgColour}>
        <div class="md:col-span-2 col-start-1">
            <input disabled={!editable} type="text" placeholder="My army name" class={"text-lg md:text-xl w-full  " + bgColour}
                value={name} onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    changeArmyName(target.value);
                }}
            />
        </div>
        
        <div class="md:col-start-3 text-lg md:text-xl flex flex-row justify-self-end ">
            <div>{points}/</div>
            <input disabled={!editable}
                type="number"
                //this madness removes the spinners
                class={"w-12 md:w-16 text-right border border-gray-200  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none " + bgColour}
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

        <div class="col-start-1 row-start-3 col-span-1 md:col-span-1 md:col-start-2 md:row-start-2">
            Allied: {alliedPoints}/{maxAlliedPoints} ({remainingAlliedPoints} left)
        </div>

        <div class="col-start-2 md:col-start-3 md:text-lg flex flex-row justify-self-end row-start-2">
            ({remainingPoints} left)
        </div>

        <div class="col-start-2 flex flex-row justify-self-end row-start-3 md:col-start-3 md:hide-on-scroll">
            {storage}
        </div>

        <div class="col-start-1 col-span-2 md:col-span-1 md:row-start-3 hide-on-scroll md:mr-2">
            <ArmyAllegianceSelect allegiance={allegiance} enabled={editable} class={bgColour}/>
        </div>

        <div class="col-start-1 md:col-start-2 col-span-2 md:row-start-3 md:col-span-1 hide-on-scroll">
            <ArmyPrimaryArmyListSelect primaryArmyListName={primaryArmyListName} enabled={editable} allegiance={allegiance} class={bgColour}/>
        </div>

        <div class="col-start-1 col-span-2 md:row-start-4 md:col-span-3 flex">
            <ArmyValidity army={army.value}/>
            <ArmyValidityText army={army.value} class=""/>
        </div>
    </div>
}

export type LoadStateProps = {
    localuuid: string;
    clouduuid: string;
    class: string;
    isLoggedIn: boolean;
    armyKvLoadState: LoadingState;
}

function LoadState(props: LoadStateProps) {
    if(props.localuuid !== "")
        return <h1 class={props.class}>Loading...</h1>
    if(props.clouduuid != "") {
        if(props.armyKvLoadState == LoadingState.Loading)
            return <h1 class={props.class}>Loading...</h1>
        else {
            if(props.armyKvLoadState == LoadingState.Failed) {
                if(!props.isLoggedIn)
                    return <div class={props.class}>
                        <h1 >Must be logged in to load armies stored in the cloud.</h1>
                        <p><LoginLink text="Log in"/> or <SignupLink text="sign up"/></p>
                    </div>
                else
                    return <h1 class={props.class}>Can't load cloud army</h1>
            } 
        }
    }

    return <h1 class={props.class}>Can't load army</h1>
}

export type ArmyWidgetProps = {
    localuuid: string;
    clouduuid: string;
    class: string;
    isLoggedIn: boolean;
    username: string;
}

export function ArmyWidget(props: ArmyWidgetProps) {
    const {army, addFormation, armyLocalLoadState, localLoad, kvLoad, armyKvLoadState, isLoggedIn, username, kvArmyOwner} = useContext(AppState);

    if(isLoggedIn.value != props.isLoggedIn)
        isLoggedIn.value = props.isLoggedIn;
    if(username.value != props.username)
        username.value = props.username;

    if(props.localuuid != "" && IS_BROWSER)
        localLoad(props.localuuid);
    else if(props.clouduuid != "" && IS_BROWSER)
        kvLoad(props.clouduuid);

    const editable = isEditable(props.localuuid, props.clouduuid, username.value, kvArmyOwner.value);

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
            (
                (props.localuuid != "" && armyLocalLoadState.value != LoadingState.Loaded) 
                || (props.clouduuid != "" && armyKvLoadState.value != LoadingState.Loaded) 
            )
            ?
            (<LoadState localuuid={props.localuuid} clouduuid={props.clouduuid} class={props.class} isLoggedIn={props.isLoggedIn} armyKvLoadState={armyKvLoadState.value}/>)
            :
            (
                <div class="flex flex-col md:w-[800px] w-screen mx-4">
                    <div class={"w-full " + props.class}>
                        {army.value.formations.map((x) => FormationWidget({formation: x, allegiance: army.value.allegiance, editable: editable})) }
                    </div>               

                    <button type="button" class="text-lg md:text-xl w-full text-centre justify-center bg-blue-200" 
                        hidden={!editable}
                        onClick={() => addFormation()}
                    >New Formation</button>
                    
                    <div class="w-full py-4"
                        hidden={!editable}
                    ></div>
                </div>
            )
        } </div>
    )
}