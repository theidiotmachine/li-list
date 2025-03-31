import { createContext } from "preact";
import state, { type AppStateType } from "../state.ts";
import { ArmyWidget } from "../components/ArmyWidget.tsx";
import { ToolBar } from "../components/ToolBar.tsx";

export const AppState = createContext<AppStateType>({} as AppStateType);

export type AppProps = {
  uuid: string;
  armyAsJson: string
}

export default function App(props: AppProps) {
  return (
    <div className="App">
        <AppState.Provider value={state}>
            <ToolBar/>
            {(props.uuid != "" || props.armyAsJson != "")?
            <ArmyWidget uuid={props.uuid} armyAsJson={props.armyAsJson}/>
            :
            <div class="flex flex-row justify-center mt-8"><div>Make a new army, or load a saved one</div></div>
            
            }    
        </AppState.Provider>
    </div>
  );
}