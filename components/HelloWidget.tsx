import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
export function HelloWidget() {
    const {makeNewArmy} = useContext(AppState);

    return <div class="flex flex-row justify-center mt-48 m:mt-28">
        <div>Make a <a onClick={()=>{makeNewArmy()}}
                class="flex-1 cursor-pointer underline">new army</a> (with a jolly generated name), or <a href='./load'
                class="flex-1 cursor-pointer underline">load</a> a saved one.</div>
    </div>
}