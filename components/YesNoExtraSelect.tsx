import { useContext } from "preact/hooks/";
import { AppState } from "../islands/App.tsx";
import { Select, SelectOption } from "./Select.tsx";

export type YesNoExtraSelectProps = {
    uuid: string;
    detachmentIndex: number;
    extraName: string;
    has: boolean;
    points: number;
    editable: boolean;
}

export function YesNoExtraSelect(props: YesNoExtraSelectProps) {
    const {changeExtraHas} = useContext(AppState);

    if(!props.editable) {
        return <div class = "w-8 md:w-10 bg-right bg-white bg-opacity-0">
            {props.has?"1":"0"}
        </div>
    }
    
    const options = [
        <SelectOption type="option" key="1" selected={props.has} 
            optionText={"1 - " + props.points + "pts"}
        >1</SelectOption>,
        <SelectOption type="option" key="0" selected={!props.has} 
            optionText="0 - 0pts"
        >0</SelectOption>
    ];

    return <Select<string> class = "w-8 md:w-10 bg-right bg-white bg-opacity-0"     
        onInput={(e)=>{
            const has = (e=="1")?true:false;
            changeExtraHas(props.uuid, props.detachmentIndex, props.extraName, has)
        }}>
        {options}
    </Select>
}