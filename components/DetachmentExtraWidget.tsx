import { YesNoExtraSelect } from "./YesNoExtraSelect.tsx";

type DetachmentExtraWidgetProps = {
  uuid: string;
  detachmentIndex: number;
  detachmentExtraIndex: number;
  extraName: string;
  points: number;
  has: boolean;
  editable: boolean;
};
export function DetachmentExtraWidget(props: DetachmentExtraWidgetProps) {
  return <div 
    class={"grid gap-[1%] grid-cols-[10%_78%_10%] md:gap-[0%] md:grid-cols-[20%_8%_62%_10%] dark:text-white " + ((props.detachmentExtraIndex % 2) ? "bg-gray-50 dark:bg-gray-950 " : "bg-white dark:bg-black")}
  >
    <div class="col-start-1 md:col-start-2">
      <YesNoExtraSelect uuid={props.uuid} detachmentIndex={props.detachmentIndex}
        extraName={props.extraName} has={props.has} points={props.points} editable={props.editable} />
    </div>

    <div class="col-start-2 md:col-start-3">
      {props.extraName}
    </div>

    <div class="col-start-3 md:col-start-4 text-right w-full">{props.has ? props.points : 0}</div> 
  </div>;
}
