export interface DelButtonProps{
    onClick: () => void;
    hidden: boolean
}

export function DelButton(props: DelButtonProps) {
  return (
    <img hidden={props.hidden} src="/cross-clean.svg" class="w-6 h-6 mr-1 ml-1 cursor-pointer" onClick={props.onClick}></img>
  );
}