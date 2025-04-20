import { useContext } from "preact/hooks";
import { ArmyListName, DetachmentName, FormationName, ModelLoadoutGroup, ModelType } from "../game/types.ts";
import { ModelLoadoutSelect } from "./ModelLoadoutSelect.tsx";
import { NumModelLoadoutSelect } from "./NumModelLoadoutSelect.tsx";
import { AppState } from "../islands/App.tsx";
import { DelButton } from "./DelButton.tsx";
import { getDetachmentConfigurationForDetachmentName, getStatsForModelType } from "../game/lists.ts";

interface ModelLoadoutWidgetProps {
    uuid: string;
    armyListName: ArmyListName;
    formationType: FormationName;
    detachmentIndex: number;
    groupSize: number;
    modelType: ModelType;
    detachmentName: DetachmentName;
    modelLoadoutGroup: ModelLoadoutGroup;
    modelLoadoutGroupIndex: number;
    numModelLoadoutGroups: number;
}

export function ModelLoadoutWidget(props: ModelLoadoutWidgetProps) {
    const { removeModelLoadoutGroup } = useContext(AppState);
    const config = getDetachmentConfigurationForDetachmentName(props.armyListName, props.detachmentName);
    const modelOptions = config?.modelGroupShapes.find((x)=>x.modelType == props.modelType);
    const filteredModelLoadoutSlotShapes = modelOptions?.modelLoadoutSlots.filter((t)=>t.formationType==undefined || t.formationType==props.formationType);
    if(filteredModelLoadoutSlotShapes == undefined)
        return <div>No data</div>

    const stats = getStatsForModelType(props.modelType);

    return <div class="grid grid-cols-[20%_8%_25%_47%] gap-0">
        <div class="col-span-1 col-start-1 order-2 justify-self-end flex"> 
            <a href={"/hammer?shooterModelType="+props.modelType + "&"
                + props.modelLoadoutGroup.modelLoadoutSlots.flatMap((x) => {
                    const statsSlot = stats?.modelLoadoutSlots.find((s)=>s.name == x.name);
                    if(statsSlot === undefined)
                        return [];
                    const mlfs = statsSlot.possibleModelLoadouts.find((y) => y.loadout == x.modelLoadout.loadout);
                    if(mlfs?.weaponTypes === undefined)
                        return ["additionalShooterWeapon="+mlfs?.loadout];
                    return mlfs?.weaponTypes?.map((y) => "additionalShooterWeapon="+y)
                }).join("&")
            } target="_blank" >
                <img src="/hammer-clean.svg" class="w-6 h-6 mr-1 ml-1 cursor-pointer opacity-5 hover:opacity-100"></img>
            </a> 

            {
                (props.numModelLoadoutGroups > 1) ?
                (<div class="">
                    <DelButton hidden={false}
                        onClick={() => removeModelLoadoutGroup(props.uuid, props.detachmentIndex, props.modelType, props.modelLoadoutGroupIndex)}
                    ></DelButton>
                </div>) : 
                (<div class = ""></div>)
            }
            
        </div>
        <div class="col-span-1 col-start-2 order-2">
            <NumModelLoadoutSelect number={props.groupSize} detachmentName={props.detachmentName} modelType={props.modelType}
            uuid={props.uuid} armyListName={props.armyListName} detachmentIndex={props.detachmentIndex} modelLoadoutGroupIndex={props.modelLoadoutGroupIndex}
            />
            
        </div>
        
        {filteredModelLoadoutSlotShapes.map((x,i) => 
            //need these for tailwind to understand the dynamic css:
            //row-start-2 row-start-3 row-start-4 row-start-5
            //order-3 order-4 order-5 order-6 order-7 order-8 order-9 order-10
            <div key={"n"+i} class = {"col-start-3 col-span-1 row-start-"+(i+1)+" order-"+(3+i*2)}>
                {x.name}
            </div>)}
        {filteredModelLoadoutSlotShapes.map((x,i) => {
            const loadout = props.modelLoadoutGroup.modelLoadoutSlots.find((t)=>t.name == x.name);
            if(loadout == undefined)
                return <div key={"s"+i}>No data</div>

            return <div key={"s"+i} class = {"col-start-4 col-span-1 row-start-"+(i+1)+" order-"+(4+i*2)}>
                <ModelLoadoutSelect key={i} 
                    modelType={props.modelType} detachmentName={props.detachmentName} modelLoadoutSlotName={x.name} loadout={loadout.modelLoadout}
                    uuid={props.uuid} armyListName={props.armyListName} detachmentIndex={props.detachmentIndex} 
                    modelLoadoutGroupIndex={props.modelLoadoutGroupIndex}
                /></div>})}
    </div>
}