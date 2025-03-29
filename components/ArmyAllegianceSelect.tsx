import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { Allegiance, Allegiances } from "../game/types.ts";

export function ArmyAllegianceSelect() {
    const { army, changeArmyAllegiance } = useContext(AppState);
    const allegiance = army.value.allegiance;
    const options = [
        <option key= "" value="" selected={allegiance == ""}>Allegiance</option>
    ];
    Allegiances.forEach(a => {
        options.push(<option key={a} value={a} selected={allegiance == a}>{a}</option>)
    });
    return <select class ="text-2xl w-80 appearance-none bg-[url(dropdownarrow-clean.svg)] bg-no-repeat bg-right bg-grey-200" 
        onInput={(e) => changeArmyAllegiance(e.currentTarget.value as Allegiance)}>
        {options}
    </select>
}