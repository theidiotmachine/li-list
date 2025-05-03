import { useEffect, useId, useState } from "preact/hooks";
import { createRef } from "preact";
import { VNode } from "preact/src/index.d.ts";

export type SelectOptionProps = {
    optionText?: string;
    value?: string | number;
    children: string;
    selected?: boolean;
}

export type SelectProps = {
    class?: string;
    disabled?: boolean;
    onInput: (value: string|number) => void;
    children: VNode<SelectOptionProps>[]
};

export function SelectOption(props: SelectOptionProps) {
    return <div>{props.optionText ?? props.children}</div>
}

export function Select(props: SelectProps) {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const anchorId = useId();

    const choices = props.children;

    useEffect(()=>{
        const thisSelectedIndex = choices.findIndex((s)=>s.props.selected);
        console.log(thisSelectedIndex);
        console.log(choices[thisSelectedIndex])
        setSelectedIndex(thisSelectedIndex);
    }
    , [props.children]);

    const menu = createRef();
    const main = createRef();

    const callBack = (selectedIndex: number) => {
        const choice = choices[selectedIndex]; 
        const value = choice?.props.value??choice?.props.children??"";
        props.onInput(value);
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


        //that means above
        //bottom:anchor(top)
        //that means below
        //top: anchor(bottom)
    }

    const close = () => {
        menu.current.classList.add("hidden");
        menu.current.classList.remove("flex");
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
                    const newSI = (selectedIndex + 1) % choices.length;
                    setSelectedIndex(newSI);
                    setHighlightedIndex(-1);
                    if(menu.current.classList.contains("hidden"))
                        callBack(newSI);
                    break;
                }
                case "ArrowUp": {
                    let newSI = selectedIndex - 1;
                    if(newSI < 0)
                        newSI = choices.length - 1;
                    setSelectedIndex(newSI);
                    setHighlightedIndex(-1);
                    if (menu.current.classList.contains("hidden"))
                        callBack(newSI);
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
            <div class="flex-grow select-none">{((choices[selectedIndex]?.props.children??"") == "")?(<br/>):(choices[selectedIndex]?.props.children)}</div>
            <img class ={(props.disabled)?"hidden":""} src="/dropdownarrow-clean.svg"></img>
        </div>

        
        <div class="absolute z-100 hidden flex-col bg-gray-50 border-black border-[1px] max-h-56 overflow-y-auto" 
            style={"position-anchor:--" + anchorId + "; "} 
            ref={menu}
        > {
            props.children.map((s, i)=>{
                return <div class={"px-1 select-none font-normal " + (((highlightedIndex != -1 && i == highlightedIndex) || (highlightedIndex == -1 && i==selectedIndex))?"bg-black text-white":"")} 
                    key={s.props.value} 
                    onMouseOver={()=>{
                        setHighlightedIndex(i);
                    }}
                    onClick={(e)=>{
                        close();
                        callBack(i)
                }}>{(s.props.optionText==undefined) ? s.props.children:((s.props.optionText == ""?(<br/>):s.props.optionText))}</div>
            })
        } </div>
    </div>
}