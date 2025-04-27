import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { ArmyListName, Formation } from "../game/types.ts";

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
    const options = [{value: "", text: "Choose an Army List"}];
    if(primaryArmyListName == "Collegia Titanica")
        options.push({value: "Collegia Titanica", text: "Collegia Titanica"});
    options.push({value: "Legions Astartes", text: "Legions Astartes"});
    if(primaryArmyListName == "Questoris Familia")
        options.push({value: "Questoris Familia", text: "Questoris Familia"});
    options.push({value: "Solar Auxilia", text: "Solar Auxilia"});
    options.push({value: "Strategic Asset", text: "Strategic Asset"});

    return <select class ="font-medium text-lg md:text-xl w-full appearance-none bg-[url(dropdownarrow-clean.svg)] bg-no-repeat bg-right bg-gray-100 border-b-2 border-gray-400" 
        onInput={(e) => changeFormationArmyList(props.uuid, e.currentTarget.value as ArmyListName)}>
            {options.map((s, i)=>{
                return <option key={i} value={s.value} selected={formationArmyListName==s.value}>{s.text}</option>
            })}
    </select>
}