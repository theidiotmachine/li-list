import { Detachment } from "../game/types.ts";

interface DetachmentValidityProps {
    detachment: Detachment;
};

export function DetachmentValidity(props: DetachmentValidityProps) {
    if(props.detachment.validationState.valid) 
        return <span></span>
    let errorText = props.detachment.validationState.error;
    if(props.detachment.validationState.data) 
        errorText += ", " + props.detachment.validationState.data;
    return <img src="/alert-clean.svg" class="inline" title={errorText}/>
}