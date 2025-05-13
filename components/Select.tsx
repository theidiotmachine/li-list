import { useEffect, useId, useState } from "preact/hooks";
import { createRef } from "preact";
import { VNode } from "preact/src/index.d.ts";

export type SelectOptionProps<T> = {
    type: "option";
    optionText?: string;
    value?: T;
    children: string;
    selected?: boolean;
}

export type SelectOptGroupProps<T> = {
    type: "optionGroup";
    label: string;
    children: VNode<SelectOptionProps<T>>[]
};

export type SelectProps<T> = {
    class?: string;
    disabled?: boolean;
    onInput: (value: T) => void;
    children: VNode<SelectOptionProps<T> | SelectOptGroupProps<T>>[]
};

export function SelectOption<T>(props: SelectOptionProps<T>) {
    return <div>{props.optionText ?? props.children}</div>
}

export function SelectOptGroup<T>(props: SelectOptGroupProps<T>) {
    return <div>{props.label ?? props.children}</div>
}

export function Select<T>(props: SelectProps<T>) {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const anchorId = useId();

    const flattenedChoices: ((SelectOptionProps<T>&{depth: number}) | (SelectOptGroupProps<T>&{depth: number}))[] = [];
    for(const choice of props.children) {
        if(choice.props.type == "option") {
            flattenedChoices.push({...choice.props, depth: 0});
        } else if(choice.props.type == "optionGroup") {
            flattenedChoices.push({...choice.props, depth: 0});
            for(const subChoice of choice.props.children) {
                flattenedChoices.push({...subChoice.props, depth: 1});
            }
        }
    }

    useEffect(()=>{
        const thisSelectedIndex = flattenedChoices.findIndex((s)=>s.type == "option" && s.selected == true);
        setSelectedIndex(thisSelectedIndex);
    }
    , [props.children]);

    const menu = createRef();
    const main = createRef();

    const callBack = (selectedIndex: number) => {
        const choice = flattenedChoices[selectedIndex]; 
        if(choice == undefined)
            return;
        if(choice.type == "option") {
            const value = choice?.value??choice?.children??"";
            props.onInput(value as T);
        }
    }

    const open = () => {
        menu.current.classList.remove("hidden");
        menu.current.classList.add("flex");
        menu.current.style.minWidth = main.current.clientWidth + "px";

        const rect = main.current.getBoundingClientRect();
        const mid = (rect.top + rect.bottom) * 0.5;
        const viewportHeight = document.documentElement.clientHeight;
        if(mid > viewportHeight * 0.6) {
            menu.current.style.bottom = "anchor(top)";
            menu.current.style.top = "";
        } else {
            menu.current.style.bottom = "";
            menu.current.style.top = "anchor(bottom)";
        }
    }

    const close = () => {
        if(menu.current) {
            menu.current.classList.add("hidden");
            menu.current.classList.remove("flex");
        }
    }

    const toggle = () =>{
        if(props.disabled)
            return;
        if (menu.current.classList.contains("hidden"))
            open();
        else
            close();
    }

    //yeah this is wack
    const mergeClasses = (base: string, override: string) => {
        const baseBits = base.split(" ").map((s)=>s.trim());
        const overrideBits = override.split(" ").map((s)=>s.trim());
        const hasBorder = overrideBits.findIndex((s)=>s.startsWith("border-"))
        for(const baseBit of baseBits) {
            if(hasBorder && baseBit.startsWith("border-"))
                continue;
            overrideBits.push(baseBit);
        }
        return overrideBits.join(" ");
    }

    return <div class={mergeClasses("cursor-default border-2 border-transparent focus:border-black", (props.class??""))} tabIndex={0} ref={main} onBlur={close} 
        onKeyDown={(e)=>{
            if(props.disabled)
                return;
            switch(e.key) {
                case " ":
                    open();
                    break;
                case "ArrowDown": {
                    let newSI = selectedIndex + 1;
                    while(newSI != selectedIndex) {
                        if(newSI >= flattenedChoices.length)
                            newSI = 0;
                        else if(flattenedChoices[newSI].type == "optionGroup")
                            newSI += 1;
                        else
                            break;
                    }
                    if(selectedIndex != newSI) {
                        setSelectedIndex(newSI);
                        setHighlightedIndex(-1);
                        if(menu.current.classList.contains("hidden"))
                            callBack(newSI);
                    }
                    break;
                }
                case "ArrowUp": {
                    let newSI = selectedIndex - 1;
                    while(newSI != selectedIndex) {
                        if(newSI < 0) {
                            newSI = flattenedChoices.length - 1;
                        } else if(flattenedChoices[newSI].type == "optionGroup")
                            newSI -= 1;
                        else
                            break;
                    }
                    if(selectedIndex != newSI) {
                        setSelectedIndex(newSI);
                        setHighlightedIndex(-1);
                        if (menu.current.classList.contains("hidden"))
                            callBack(newSI);
                    }
                    break;
                }
                    
                case "Enter":
                    if (menu.current.classList.contains("hidden")) {
                        open();
                    } else {
                        callBack(selectedIndex);
                        close();
                    }
                    break;    
                case "Escape":
                    if (!menu.current.classList.contains("hidden")) {
                        callBack(selectedIndex);
                        close();
                    }
                    break;
            }
        }}
        >
            
        <div onClick={toggle} class="flex" style={"anchor-name:--" + anchorId }>
            <div class="flex-grow select-none">{
                ((flattenedChoices[selectedIndex]?.children??"") == "")?(<br/>):(flattenedChoices[selectedIndex]?.children)
            }</div>
            <img class ={(props.disabled)?"hidden":""} src="/dropdownarrow-clean.svg"></img>
        </div>
        
        <div class="absolute z-100 hidden flex-col bg-gray-50 border-black border-[1px] max-h-56 overflow-y-auto" 
            style={"position-anchor:--" + anchorId + "; "} 
            ref={menu}
        > {
            flattenedChoices.map((s, i)=> {
                if(s.type == "option") {
                    let text = "";
                    if(s.depth > 0)
                        text += '\u00A0'
                    if(s.optionText == undefined) {
                        text += s.children
                    } else if(s.optionText == ""){
                        text += '\u00A0'
                    } else {
                        text += s.optionText;
                    }
                    return <div 
                        class={
                            "px-1 select-none font-normal " 
                                + (
                                    ((highlightedIndex != -1 && i == highlightedIndex) || (highlightedIndex == -1 && i==selectedIndex))
                                        ?"bg-gray-600 text-white"
                                        :""
                                )
                        } 
                        key={s.value} 
                        onMouseOver={()=>{
                            setHighlightedIndex(i);
                        }}
                        onClick={()=>{
                            close();
                            callBack(i)
                        }
                    }>{text}</div>
                } else if(s.type == "optionGroup") {
                    return <div class="px-1 select-none font-medium" key={"grp" + s.label}>{s.label}</div>;
                }
            })
        } </div>
    </div>
}