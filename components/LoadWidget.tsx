import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { LoadState } from "../state.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { DelButton } from "./DelButton.tsx";

export function LoadWidget() {
    const { saves, refreshSaves, armiesLoadState, deleteSave } = useContext(AppState);

    //fresh runs on some combination of browser and server. As soon as we hit the loading code, we
    //have to use the local IndexDB on the browser, so we only refresh the save cache if we're local
    if (IS_BROWSER)
        refreshSaves();

    return(
        <div class="flex flex-row justify-center mt-8"> {
            (armiesLoadState.value == LoadState.Loading)?
                (<h1>Loading...</h1>)
            :
                (
                    
                    <div class="grid grid-cols-[80%_20%] gap-2 w-[600px]"> 
                        <h1 class="text-xl">Army name</h1>
                        <p class="text-xl">Delete</p>    
                    {
                        (saves.value.map((s,i)=><div key={i} class="contents">
                            <div class="grid-col-1"><a href={"./?uuid="+s.uuid}>{s.name}</a></div>
                            <div class="grid-col-2"><DelButton hidden={false} onClick={()=>deleteSave(s.uuid)}/></div>
                        </div>))
                    } </div>
                )
        } </div>
    )
}