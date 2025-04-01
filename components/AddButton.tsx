export interface AddButtonProps{
    onClick: () => void;
    hidden: boolean
}

export function AddButton(props: AddButtonProps) {
  return (
    <img hidden={props.hidden} src="/plus-clean.svg" class="w-6 h-6 md:w-4 md:h-4 mr-1 ml-1 cursor-pointer" onClick={props.onClick}></img>
  );
}