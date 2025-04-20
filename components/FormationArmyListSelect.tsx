import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { ArmyListName, Formation } from "../game/types.ts";

interface FormationArmyListSelectProps {
    uuid: string;
};

export function FormationArmyListSelect(props: FormationArmyListSelectProps) {
    const { army, changeFormationArmyList } = useContext(AppState);
    const formation = army.value.formations.find((f: Formation)=>f.uuid == props.uuid);
    const formationArmyListName = formation?.armyListName ?? "";
    const primaryArmyListName = army.value.primaryArmyListName;
    const options = [{value: "", text: "Choose an Army List"}];
    if(primaryArmyListName == "Collegia Titanica")
        options.push({value: "Collegia Titanica", text: "Collegia Titanica"});
    options.push({value: "Legions Astartes", text: "Legions Astartes"});
    options.push({value: "Solar Auxilia", text: "Solar Auxilia"});
    options.push({value: "Strategic Asset", text: "Strategic Asset"});

    return <select class ="md:text-xl w-48 md:w-80 appearance-none bg-[url(dropdownarrow-clean.svg)] bg-no-repeat bg-right" 
        onInput={(e) => changeFormationArmyList(props.uuid, e.currentTarget.value as ArmyListName)}>
            {options.map((s, i)=>{
                return <option key={i} value={s.value} selected={formationArmyListName==s.value}>{s.text}</option>
            })}
    </select>
}