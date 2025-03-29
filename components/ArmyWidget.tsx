import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { FormationWidget } from "./FormationWidget.tsx";
import { ArmyPrimaryArmyListSelect } from "./ArmyPrimaryArmyListSelect.tsx";
import { ArmyAllegianceSelect } from "./ArmyAllegianceSelect.tsx";
import { ArmyValidity } from "./ArmyValidity.tsx";


export function ArmyWidget() {
    const { army, addFormation, changeArmyName, changeArmyMaxPoints } = useContext(AppState);

    return(
        <div class="flex flex-row justify-center mt-8">
            <div>
                <div class="grid grid-cols-[10%_20%_20%_20%_20%_10%] gap-y-2 w-[800px]">
                    
                    <div class="col-span-4 col-start-1">
                        <ArmyValidity/>
                        <input type="text" placeholder="My army name" class="text-2xl w-96" value={army.value.name} onChange={(e) => {
                            const target = e.target as HTMLInputElement;
                            changeArmyName(target.value);
                        }}/>
                    </div>

                    <div class="col-span-2 col-start-5 justify-self-end ">
                        <label class="text-sm">Max:</label>
                        <input type="number"
                            //this madness removes the spinners
                            class="text-2xl w-20 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" min="0" 
                            value={army.value.maxPoints} onChange={(e) => {
                                const target = e.target as HTMLInputElement;
                                changeArmyMaxPoints(parseInt(target.value));
                            }}
                        />
                    </div>

                    <div class="row-start-2 col-start-1 col-span-2">
                        <ArmyAllegianceSelect/>
                    </div>

                    <div class="row-start-2 col-start-4">
                        <ArmyPrimaryArmyListSelect/>
                    </div>

                    <div class="row-start-2 col-span-1 col-start-6 text-2xl justify-self-end">
                        {army.value.points}
                    </div>

                    <div class="row-start-3 col-span-7 col-start-1">
                        <button type="button" class="text-2xl w-full text-centre bg-gray-200" onClick={() => addFormation()}>New Formation</button>
                    </div>
                </div>
                
                <div>
                    {army.value.formations.map((x) => FormationWidget({formation: x})) }
                </div>
            </div>
        </div>
    )
}