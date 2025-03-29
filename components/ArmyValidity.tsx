import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";

export function ArmyValidity() {
    const { army } = useContext(AppState);
    for(const formation of army.value.formations) {
        for(const detachment of formation.detachments) {
            if(!detachment.validationState.valid) 
                return <img src="/alert-clean.svg" class="inline"/>
        }
    }

    return <span></span>
}