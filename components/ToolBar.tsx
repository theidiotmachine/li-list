import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { getEncodedArmy } from "../storage/storage.ts";

export type ToolBarProps = {
    class: string
};
export function ToolBar(props: ToolBarProps) {
    const {undo, redo, makeNewArmy, canUndo, canRedo, canCloneArmy, cloneArmy, army} = useContext(AppState);

    return <div class={props.class}>
        <img src="/menu-clean.svg" class="bg-gray-100 p-1 w-8" id="menu-button" onClick={(e) => {
            const menu = document.getElementById("menu");
            const menuButton = (e.target as HTMLImageElement);
            if (menu) {
                if (menu.classList.contains("hidden")) {
                    menu.classList.remove("hidden");
                    menu.classList.add("flex");
                    menuButton.src = "/cross-clean.svg";
                } else {
                    menu.classList.add("hidden");
                    menu.classList.remove("flex");
                    menuButton.src = "/menu-clean.svg"
                }
                menu.focus();
            }
        }}></img>
        <div class="absolute flex-col hidden bg-gray-100 pl-1 pr-1 h-screen w-32" id="menu"
            onBlur={(e) => {
                const t = (e.target) as HTMLElement;
                t.classList.add("hidden");
            }}
        >
            <a onClick={()=>{makeNewArmy()}}
                class="flex-none cursor-pointer">New Army</a>
            <a href='./load'
                class="flex-none cursor-pointer">Load Army</a>
            {(canCloneArmy.value)?
                <a onClick={()=>{cloneArmy()}}
                    class="flex-none cursor-pointer">Clone Army</a>
                :
                <span 
                    class="flex-none text-gray-500">Clone Army</span>
            }
            {(canUndo.value)?
                <a onClick={()=>undo()} 
                    class="flex-none cursor-pointer">Undo</a>
                :
                <span 
                    class="flex-none text-gray-500">Undo</span>
            }
            {(canRedo.value)?
                <a onClick={()=>redo()} 
                    class="flex-none cursor-pointer">Redo</a>
                :
                <span 
                    class="flex-none text-gray-500">Redo</span>
            }
            {   
                <a onClick={()=>{
                    const encodedPromise = getEncodedArmy(army.value);
                    encodedPromise.then((encoded)=>{location.href='./export?army='+encoded;})
                }} class="flex-none cursor-pointer">Export PDF</a>
            }
            {   
                <a onClick={()=>{
                    const encodedPromise = getEncodedArmy(army.value);
                    encodedPromise.then((encoded)=>{location.href='./export?army='+encoded+"&damageBoxes=true";})
                }} class="flex-none cursor-pointer">Export Box PDF</a>
            }
            <a class="flex-none cursor-pointer" href="./hammer">Hammer</a>
            <a class="flex-none cursor-pointer" href="./about">About</a>
            
        </div>
    </div>
    /*
    
            <button type="button" disabled={!(canSaveLocally.value)} onClick={() => {
            const encodedPromise = getEncodedArmy(army.value);
            encodedPromise.then((encoded)=>{location.href='./?army='+encoded;})
            
        }}
            class="flex-1 disabled:text-gray-500 cursor-pointer disabled:cursor-not-allowed">URL</button >
        */

            /*
    const {undo, redo, makeNewArmy, canUndo, canRedo, canCloneArmy, cloneArmy} = useContext(AppState);
    return <div class="flex fixed top-0 left-0 w-full bg-gray-200">  
        <a onClick={()=>{makeNewArmy()}}
            class="flex-1 cursor-pointer text-center">New Army</a>
        <a href='./load'
            class="flex-1 cursor-pointer text-center">Load Army</a>
        {(canCloneArmy.value)?
            <a onClick={()=>{cloneArmy()}}
                class="flex-1 cursor-pointer text-center">Clone Army</a>
            :
            <span 
                class="flex-1 text-gray-500 text-center">Clone Army</span>
        }
        {(canUndo.value)?
            <a onClick={()=>undo()} 
                class="flex-1 cursor-pointer text-center">Undo</a>
            :
            <span 
                class="flex-1 text-gray-500 text-center">Undo</span>
        }
        {(canRedo.value)?
            <a onClick={()=>redo()} 
                class="flex-1 cursor-pointer text-center">Redo</a>
            :
            <span 
                class="flex-1 text-gray-500 text-center">Redo</span>
        }
    </div>
    */
}