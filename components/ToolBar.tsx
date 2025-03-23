import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";

export function ToolBar() {
    const { undo, redo } = useContext(AppState);
    return <div class="flex fixed top-0 left-0 w-full bg-gray-200">  
        <button type="button" onClick={()=>undo()} class="flex-1">Undo</button >
        <button type="button" onClick={()=>redo()} class="flex-1">Redo</button >
    </div>
}