import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { Allegiance, Formation, FormationName } from "../game/types.ts";
import { getFormationNamesForArmyListName, getShapeForFormationName} from "../game/lists.ts";
import { Select, SelectOptGroup, SelectOption } from "./Select.tsx";
import { LegionName } from "../game/legionTypes.ts";

interface FormationTypeSelectProps {
    uuid: string;
    editable: boolean;
    allegiance: Allegiance | "";
    legionName: LegionName | "";
};

export function FormationTypeSelect(props: FormationTypeSelectProps) {
    const { army, changeFormationName } = useContext(AppState);
    const formation = army.value.formations.find((f: Formation)=>f.uuid == props.uuid)

    const formationType = formation?.formationName ?? "";

    if(!props.editable) return <div 
        class ="w-full md:font-medium md:text-xl md:bg-gray-100 dark:md:bg-gray-900 md:border-b-2 border-gray-400 dark:border-gray-600 bg-white dark:bg-black dark:text-white"
    >
        {formationType}
    </div>;

    const formationNames = getFormationNamesForArmyListName(formation?.armyListName ?? "");

    const formationGroups: {label: string, formationNames: (FormationName | "")[]}[] = [
        {label: "", formationNames: [""]},
        {label: "Normal", formationNames: []},
        {label: "Support", formationNames: []},
        {label: "Iconic", formationNames: []}
    ];

    for(const formationName of formationNames) {
        const shape = getShapeForFormationName(formation?.armyListName ?? "", formationName as FormationName);
        if(shape.allegiance !== undefined && shape.allegiance !== props.allegiance) {
            continue;
        }
        if(shape.legionName !== undefined && shape.legionName !== props.legionName) {
            continue;
        }
        if(shape.formationType==="Normal")
            formationGroups[1].formationNames.push(formationName)
        else if(shape.formationType==="Support")
            formationGroups[2].formationNames.push(formationName)
        else if(shape.formationType==="Iconic")
            formationGroups[3].formationNames.push(formationName)
    }

    return <Select 
        class="w-full md:font-medium md:text-xl md:bg-gray-100 dark:md:bg-gray-900 md:border-b-2 border-gray-400 dark:border-gray-600 bg-white dark:bg-black dark:text-white" 
        onInput={(e) => changeFormationName(props.uuid, e as FormationName)}>
        {
            formationGroups.map((fg)=>{
                return <SelectOptGroup type="optionGroup" label={fg.label} key={fg.label}>{
                    fg.formationNames.map((f)=>{
                        return <SelectOption type="option" key={f} optionText={f} selected={formationType == f}>{(f=="")?"Choose Formation":f}</SelectOption>
                    })
                }</SelectOptGroup>
            })
        }
    </Select>
}