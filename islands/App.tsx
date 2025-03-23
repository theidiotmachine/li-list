import { createContext } from "preact";
import state, { type AppStateType } from "../state.ts";
import { ArmyWidget } from "../components/ArmyWidget.tsx";

export const AppState = createContext<AppStateType>({} as AppStateType);

export default function App() {
    
  return (
    <div className="App">
        <AppState.Provider value={state}>
            <h1>LI List Builder</h1>

            <ArmyWidget/>    
            
        </AppState.Provider>
    </div>
  );
}