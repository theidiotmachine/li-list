import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
export function HelloWidget() {
    const {makeNewArmy} = useContext(AppState);

    return <div class="flex flex-row justify-center mt-48 m:mt-28">
        <div class="flex flex-col">
        <div class="mx-3">I'm working on updating the stats from the new Liber. I'm sorry to say that your existing saved armies will probably be broken.</div>
        <div class="mx-3">Current status:</div>
        <div class="mx-3">Legions, Auxilia, Mech, Dark Mech and Titans have new points.</div>
        <div class="mx-3">Knights do not.</div>
        <div class="mx-3">No Iconic Formations yet.</div>
        <div class="mx-3 my-3"></div>
        <div class="mx-3">Make a <a onClick={()=>{makeNewArmy()}}
                class="flex-1 cursor-pointer underline">new army</a> (with a jolly generated name), or <a href='./load'
                class="flex-1 cursor-pointer underline">load</a> a saved one.</div>
                </div>
    </div>
}