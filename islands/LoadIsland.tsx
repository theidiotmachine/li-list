import state from "../state/appState.ts";
import { AppState } from "./App.tsx";
import { LoadWidget } from "../components/LoadWidget.tsx";

export default function LoadIsland() {
  return (
    <div className="App">
      <AppState.Provider value={state}>
            {
              <LoadWidget/>
            }
      </AppState.Provider>
    </div>
  );
}