import { createContext } from "preact";
import state, { type AppStateType } from "../state.ts";
import { ArmyWidget } from "../components/ArmyWidget.tsx";
import { ToolBar } from "../components/ToolBar.tsx";

export const AppState = createContext<AppStateType>({} as AppStateType);

export default function App() {
    
  return (
    <div className="App">
        <AppState.Provider value={state}>
            <ToolBar/>
            <ArmyWidget/>    
        </AppState.Provider>
    </div>
  );
}