export interface DelButtonProps{
    onClick: () => void;
    hidden: boolean
}

export function DelButton(props: DelButtonProps) {
  return (
    <svg hidden={props.hidden} class="w-6 h-6 cursor-pointer fill-red-500 " width="16" height="16" version="1.1" viewBox="0 0 4.2333 4.2333" onClick={props.onClick}>
       <path d="m1.0877 0.7135-0.37418 0.37418 1.029 1.029-1.029 1.029 0.37418 0.37418 1.029-1.029 1.029 1.029 0.37418-0.37418-1.029-1.029 1.029-1.029-0.37418-0.37418-1.029 1.029z"/>
    </svg>
  );
}