import { Detachment } from "../game/types.ts";

interface DetachmentValidityProps {
    detachment: Detachment;
};

export function DetachmentValidityIcon(props: DetachmentValidityProps) {
    if(props.detachment.validationState.valid) 
        return <span></span>
    return <img src="/alert-clean.svg" class="inline"/>
}

interface DetachmentValidityTextProps {
    detachment: Detachment;
    class: string
};

export function DetachmentValidityText(props: DetachmentValidityTextProps) {
    if(props.detachment.validationState.valid) 
        return <div class="hidden"></div>
    let errorText = props.detachment.validationState.error;
    if(props.detachment.validationState.data) 
        errorText += ", " + props.detachment.validationState.data;
    return <div class={props.class + " text-red-600 italic"}>{errorText}</div>
}