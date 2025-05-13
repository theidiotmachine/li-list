import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { ArmyListName, Formation } from "../game/types.ts";
import { Select, SelectOption } from "./Select.tsx";

interface FormationArmyListSelectProps {
    uuid: string;
    editable: boolean;
};

export function FormationArmyListSelect(props: FormationArmyListSelectProps) {
    const { army, changeFormationArmyList } = useContext(AppState);

    if(!props.editable) return <div class ="font-medium text-lg md:text-xl w-full  bg-gray-100 border-b-2 border-gray-400">
        {army.value.primaryArmyListName}
    </div>;

    const formation = army.value.formations.find((f: Formation)=>f.uuid == props.uuid);
    const formationArmyListName = formation?.armyListName ?? "";
    const primaryArmyListName = army.value.primaryArmyListName;
    const allegiance = army.value.allegiance;
    const options: [{value: string; optionText?: string; text: string}] = [{value: "", optionText: "", text: "Choose an Army List"}];
    if(primaryArmyListName == "Collegia Titanica")
        options.push({value: "Collegia Titanica", text: "Collegia Titanica"});
    if(allegiance == "Traitor")
        options.push({value: "Dark Mechanicum", text: "Dark Mechanicum"});
    options.push({value: "Legions Astartes", text: "Legions Astartes"});
    options.push({value: "Mechanicum Taghmata", text: "Mechanicum Taghmata"});
    if(primaryArmyListName == "Questoris Familia")
        options.push({value: "Questoris Familia", text: "Questoris Familia"});
    options.push({value: "Solar Auxilia", text: "Solar Auxilia"});
    options.push({value: "Strategic Asset", text: "Strategic Asset"});

    return <Select<ArmyListName | ""> class ="font-medium text-lg md:text-xl w-full bg-gray-100 border-b-2 border-gray-400" 
    onInput={(e) => changeFormationArmyList(props.uuid, e)}>
        {options.map((s)=>{
            return <SelectOption 
                type="option" key={s.value} value={s.value} optionText={s.optionText} selected={formationArmyListName==s.value}
            >{s.text}</SelectOption>
        })}
    </Select>
}