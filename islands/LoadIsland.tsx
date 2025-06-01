import state from "../state/appState.ts";
import { AppState } from "./App.tsx";
import { LoadWidget } from "../components/LoadWidget.tsx";

export type LoadIslandProps = {
  isLoggedIn: boolean;
  username: string;
}

export default function LoadIsland(props: LoadIslandProps) {
  return (
    <div className="App">
      <AppState.Provider value={state}>
        <LoadWidget isLoggedIn={props.isLoggedIn} username={props.username}/>
      </AppState.Provider>
    </div>
  );
}