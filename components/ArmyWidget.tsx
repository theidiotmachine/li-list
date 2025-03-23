import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { FormationWidget } from "./FormationWidget.tsx";
import { AddButton } from "./AddButton.tsx";


export function ArmyWidget() {
    const { army, addFormation } = useContext(AppState);

    return(
        <div class="flex flex-row justify-center mt-8">
            <div>
                <div class="grid grid-cols-[20%_10%_20%_20%_20%_10%] gap-0 w-[800px]">
                    <div class="col-span-1 col-start-1">
                        <AddButton hidden={false} onClick={() => addFormation()}/>
                    </div>
                    <div class="col-span-1 col-start-6 justify-self-end text-2xl">{army.value.points}</div>
                </div>
        
                <div>
                    {army.value.formations.map((x) => FormationWidget({formation: x})) }
                </div>
            </div>
        </div>
    )
}