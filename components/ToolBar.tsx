import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { getEncodedArmy } from "../storage/storage.ts";

export function ToolBar() {
    /*
    
            <button type="button" disabled={!(canSaveLocally.value)} onClick={() => {
            const encodedPromise = getEncodedArmy(army.value);
            encodedPromise.then((encoded)=>{location.href='./?army='+encoded;})
            
        }}
            class="flex-1 disabled:text-gray-500 cursor-pointer disabled:cursor-not-allowed">URL</button >
        */
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
}