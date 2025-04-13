import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { Army } from "../game/types.ts";

interface ArmyValidityProps{
    army: Army;
}

export function ArmyValidity(props: ArmyValidityProps) {
    if(props.army.validationState.valid) 
        return <span></span>
    return <img src="/alert-clean.svg" class="inline h-6"/>
}

interface ArmyValidityTextProps {
    army: Army;
    class: string
};

export function ArmyValidityText(props: ArmyValidityTextProps) {
    if(props.army.validationState.valid) 
        return <div></div>
    let errorText = props.army.validationState.error;
    if(props.army.validationState.data) 
        errorText += ", " + props.army.validationState.data;
    return <div class={props.class + " text-red-600 italic"}>{errorText}</div>
}