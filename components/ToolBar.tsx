import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { getEncodedArmy } from "../storage/storage.ts";

export type ToolBarProps = {
    class: string
};
export function ToolBar(props: ToolBarProps) {
    const {undo, redo, makeNewArmy, canUndo, canRedo, canCloneArmy, cloneArmy} = useContext(AppState);

    return <div class={props.class}>
        <button class="bg-gray-200 p-1"
            onClick={() => {
            const menu = document.getElementById("menu");
            if (menu) {
                if (menu.classList.contains("hidden")) {
                    menu.classList.remove("hidden");
                } else {
                    menu.classList.add("hidden");
                }
                menu.focus();
            }
        }}
        
        >Menu</button>
        <div class="absolute flex flex-col hidden bg-gray-200 pl-1 pr-1" id="menu"
            onBlur={(e) => {
                const t = (e.target) as HTMLElement;
                t.classList.add("hidden");
            }}
        >
            <a onClick={()=>{makeNewArmy()}}
                class="flex-1 cursor-pointer">New Army</a>
            <a href='./load'
                class="flex-1 cursor-pointer">Load Army</a>
            {(canCloneArmy.value)?
                <a onClick={()=>{cloneArmy()}}
                    class="flex-1 cursor-pointer">Clone Army</a>
                :
                <span 
                    class="flex-1 text-gray-500">Clone Army</span>
            }
            {(canUndo.value)?
                <a onClick={()=>undo()} 
                    class="flex-1 cursor-pointer">Undo</a>
                :
                <span 
                    class="flex-1 text-gray-500">Undo</span>
            }
            {(canRedo.value)?
                <a onClick={()=>redo()} 
                    class="flex-1 cursor-pointer">Redo</a>
                :
                <span 
                    class="flex-1 text-gray-500">Redo</span>
            }
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