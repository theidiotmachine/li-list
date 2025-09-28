import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";

export function FormationEditButton(props: { isOpen: boolean; uuid: string; }) {
  const { openFormation, closeFormation } = useContext(AppState);

  if (props.isOpen)
    return <svg width="16" height="16" version="1.1" viewBox="0 0 4.2333 4.2333" xmlns="http://www.w3.org/2000/svg"
      class="w-6 h-6 cursor-pointer fill-green-500 stroke-green-500" onClick={() => closeFormation(props.uuid)}
    >
      <path d="m1.1906 2.249 0.26458-0.26458 0.52917 0.52917 0.79375-1.0583 0.26458 0.26458-1.0583 1.3229z" stroke="none" />
      <ellipse cx="2.1167" cy="2.1167" rx="1.7198" ry="1.7198" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width=".28708" />
    </svg>;

  else
    return <svg width="16" height="16" version="1.1" viewBox="0 0 4.2333 4.2333" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
      class="w-6 h-6 cursor-pointer fill-blue-500 stroke-blue-500" onClick={() => openFormation(props.uuid)}
    >
      <path d="m0.66146 2.7781-1e-8 0.79375 0.79375 1e-7 2.3812-2.3812-0.79375-0.79375z" fill="none" stroke-width=".26458px" />
      <path d="m2.5135 0.92604 0.79375 0.79375" fill="none" stroke-width=".26458px" />
      <path d="m0.66146 2.7781v0.79375h0.79375z" stroke="none" />
    </svg>;
}
