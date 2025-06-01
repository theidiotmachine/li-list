import { createContext } from "preact";
import state, { type AppStateType } from "../state/appState.ts";

import { ArmyHeader, ArmyWidget } from "../components/ArmyWidget.tsx";
import { ToolBar } from "../components/ToolBar.tsx";
import { HelloWidget } from "../components/HelloWidget.tsx";

export const AppState = createContext<AppStateType>({} as AppStateType);

export type AppProps = {
  localuuid: string;
  clouduuid: string;
  armyAsJson: string;
  isLoggedIn: boolean;
  username: string;
};

export default function App(props: AppProps) {
  return (
    <div className="App relative" >
      <AppState.Provider value={state}>
        <div class="flex flex-col">
          <div class="flex flex-row fixed z-50 w-full gap-0 bg-blue-50">
            <ToolBar class="grow md:min-w-8 bg-white"/>
            <ArmyHeader localuuid={props.localuuid} clouduuid={props.clouduuid} armyAsJson={props.armyAsJson} isLoggedIn={props.isLoggedIn} username={props.username} class="md:flex-none flex-grow"/>
            <div class="grow md:min-w-8 bg-white"></div>
          </div>

          {(props.localuuid != "" || props.armyAsJson != "" || props.clouduuid != "")
            ? <ArmyWidget localuuid={props.localuuid} clouduuid={props.clouduuid} armyAsJson={props.armyAsJson} isLoggedIn={props.isLoggedIn} username={props.username} class="mt-40 md:mt-32 relative"/>
            : <HelloWidget/>
          }
          </div>
      </AppState.Provider>
    </div>
  );
}
