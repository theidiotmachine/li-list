import { useContext } from "preact/hooks";
import { ModelGroupShape, ModelGroup, ArmyListName, DetachmentName, Detachment, FormationType } from "../game/types.ts";
import { AppState } from "../islands/App.tsx";
import { EditButton } from "./DetachmentWidget.tsx";
import { ModelLoadoutWidget } from "./ModelLoadoutWidget.tsx";
import { NumModelSelect } from "./NumModelSelect.tsx";

type ModelGroupWidgetProps = {
  modelGroupShapeIndex: number;
  modelGroupShape: ModelGroupShape;
  modelGroup: ModelGroup;
  uuid: string;
  armyListName: ArmyListName;
  detachmentIndex: number;
  detachmentName: DetachmentName;
  detachment: Detachment;
  editable: boolean;
  formationType: FormationType | "Iconic";
};
export function ModelGroupWidget(props: ModelGroupWidgetProps) {
  const { addModelLoadoutGroup, modelGroupOpenState, getModelGroupKey } = useContext(AppState);

  return <div 
    class={"grid gap-[1%] grid-cols-[10%_78%_10%] md:gap-[0%] md:grid-cols-[20%_8%_62%_10%] dark:text-white " + ((props.modelGroupShapeIndex % 2) ? "bg-gray-50 dark:bg-gray-950 " : "bg-white dark:bg-black")}
  >
    {
      //if there are no size options, or we manage it from loadouts, just present a number. 
      (props.modelGroupShape.possibleModelGroupQuantities.length === 1 || props.modelGroupShape.modelLoadoutSlots.length > 0) ? (
        <div class="col-start-1 md:col-start-2 flex items-center">
          {props.modelGroup.number}
          {(props.modelGroupShape.possibleModelGroupQuantities.length === 1 && props.modelGroupShape.modelLoadoutSlots.length == 0) ?
            <div></div> :
            <EditButton 
              detachmentIndex={props.detachmentIndex} modelGroupShape={props.modelGroupShape} uuid={props.uuid} modelGroup={props.modelGroup} />}
        </div>
      ) : (
        <div class="col-start-1 md:col-start-2"><NumModelSelect 
          uuid={props.uuid} armyListName={props.armyListName} detachmentIndex={props.detachmentIndex} modelType={props.modelGroupShape.modelName}
          numModels={props.modelGroup.number} detachmentName={props.detachmentName} editable={props.editable} />
        </div>
      )}

    <div class="col-start-2 md:col-start-3">
      <a href={"unit/" + props.modelGroup.modelName} target="_blank" class="hover:underline">
        {props.modelGroup.modelName + ((props.modelGroupShape.dedicatedTransport ? " (dedicated transport)" : ""))}
      </a>
    </div>

    <div class="col-start-3 md:col-start-4 text-right w-full">{
      (props.formationType == "Iconic") ? "-" : props.modelGroup.points
    }</div> 

    {(props.modelGroupShape.modelLoadoutSlots.length > 0) ? (
      <div class="contents">
        <div class="col-start-1 col-span-4"
          hidden={(modelGroupOpenState.value.has(getModelGroupKey(props.uuid, props.detachmentIndex, props.modelGroupShape.modelName))) ? false : true}>
          {props.modelGroup.modelLoadoutGroups.map((x, j) => <ModelLoadoutWidget key={j} uuid={props.uuid} armyListName={props.armyListName}
            detachmentIndex={props.detachmentIndex}
            modelType={props.modelGroupShape.modelName} detachmentName={props.detachmentName}
            modelLoadoutGroup={x} modelLoadoutGroupIndex={j} groupSize={x.number}
            numModelLoadoutGroups={props.modelGroup.modelLoadoutGroups.length}
            editable={props.editable} />
          )}
        </div>
        <button type="button" class="w-full text-centre bg-blue-100 dark:bg-blue-900 col-start-2 md:col-start-3"
          hidden={!(modelGroupOpenState.value.has(getModelGroupKey(props.uuid, props.detachmentIndex, props.modelGroupShape.modelName)) && props.editable)}
          onClick={() => addModelLoadoutGroup(props.uuid, props.detachmentIndex, props.modelGroup.modelName)}>
          New Loadout Group
        </button>
      </div>
    ) :
      <div hidden></div> //sigh
    } 

  </div>;
}
