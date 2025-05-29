import { createContext } from "preact";
import state, { type AppStateType } from "../state/appState.ts";

import { ArmyHeader, ArmyWidget } from "../components/ArmyWidget.tsx";
import { ToolBar } from "../components/ToolBar.tsx";
import { HelloWidget } from "../components/HelloWidget.tsx";

export const AppState = createContext<AppStateType>({} as AppStateType);

export type AppProps = {
  uuid: string;
  armyAsJson: string;
};

export default function App(props: AppProps) {
  return (
    <div className="App relative" >
      <AppState.Provider value={state}>
        <div class="flex flex-col">
          <div class="flex flex-row fixed z-50 w-full gap-0 bg-blue-50">
            <ToolBar class="grow md:min-w-8 bg-white"/>
            <ArmyHeader uuid={props.uuid} armyAsJson={props.armyAsJson} class="md:flex-none flex-grow"/>
            <div class="grow md:min-w-8 bg-white"></div>
          </div>

          {(props.uuid != "" || props.armyAsJson != "")
            ? <ArmyWidget uuid={props.uuid} armyAsJson={props.armyAsJson} class="mt-40 md:mt-32 relative"/>
            : <HelloWidget/>
          }
          </div>
      </AppState.Provider>
    </div>
  );
}
