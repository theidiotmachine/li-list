import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { Allegiance, ArmyListName } from "../game/types.ts";
import { Select, SelectOption } from "./Select.tsx";

export type ArmyPrimaryArmyListSelectProps = {
    enabled: boolean;
    allegiance: Allegiance | "";
    primaryArmyListName: ArmyListName | "";
    class: string;
};
export function ArmyPrimaryArmyListSelect(props: ArmyPrimaryArmyListSelectProps) {
    const {changePrimaryArmyListName} = useContext(AppState);
    
    const options = [
        {optionText: "", value: "", text: "Choose Primary Army List"},
        {optionText: "Collegia Titanica", value: "Collegia Titanica", text: "Collegia Titanica"},
    ];
    if(props.allegiance == "Traitor")
        options.push({optionText: "Dark Mechanicum", value: "Dark Mechanicum", text: "Dark Mechanicum"});
    options.push({optionText: "Legiones Astartes", value: "Legiones Astartes", text: "Legiones Astartes"});
    options.push({optionText: "Mechanicum Taghmata", value: "Mechanicum Taghmata", text: "Mechanicum Taghmata"});
    options.push({optionText: "Questoris Familia", value: "Questoris Familia", text: "Questoris Familia"});
    options.push({optionText: "Solar Auxilia", value: "Solar Auxilia", text: "Solar Auxilia"});

    return <Select<ArmyListName | "">
        class={"text-l md:text-xl w-full "+props.class}onInput={(e) => {
            changePrimaryArmyListName(e)
        }}
        disabled={!props.enabled}
    >
        {options.map((o)=>{
            return <SelectOption type="option"
                selected={props.primaryArmyListName == o.value} optionText={o.optionText} value={o.value} key={o.value}>{o.text}
            </SelectOption>
        })}
    </Select>
}