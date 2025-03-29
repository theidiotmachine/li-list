import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";

export function ToolBar() {
    const {undo, redo, makeNewArmy, canUndo, canRedo, canMakeNewArmy} = useContext(AppState);
    return <div class="flex fixed top-0 left-0 w-full bg-gray-200">  
    <button type="button" disabled={!(canMakeNewArmy.value)} onClick={()=>makeNewArmy()}
            class="flex-1 disabled:text-gray-500 cursor-pointer disabled:cursor-not-allowed">New Army</button >
        <button type="button" disabled={!(canUndo.value)} onClick={()=>undo()} 
            class="flex-1 disabled:text-gray-500 cursor-pointer disabled:cursor-not-allowed">Undo</button >
        <button type="button" disabled={!(canRedo.value)} onClick={()=>redo()} 
            class="flex-1 disabled:text-gray-500 cursor-pointer disabled:cursor-not-allowed">Redo</button >
        
    </div>
}