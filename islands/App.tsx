import { createContext } from "preact";
import state, { type AppStateType } from "../state.ts";
import { ArmyHeader, ArmyWidget } from "../components/ArmyWidget.tsx";
import { ToolBar } from "../components/ToolBar.tsx";

export const AppState = createContext<AppStateType>({} as AppStateType);

export type AppProps = {
  uuid: string;
  armyAsJson: string;
};

export default function App(props: AppProps) {
  return (
    <div className="App">
      <AppState.Provider value={state}>
        <div class="flex flex-col">
          <div class="flex flex-row fixed w-full">
            <ToolBar class="basis-32 grow"/>
            <ArmyHeader uuid={props.uuid} armyAsJson={props.armyAsJson} class="flex-none"/>
            <div class="basis-32 grow"/>
          </div>

          {(props.uuid != "" || props.armyAsJson != "")
            ? <ArmyWidget uuid={props.uuid} armyAsJson={props.armyAsJson} class="mt-4 md:mt-28"/>
            : (
              <div class="flex flex-row justify-center mt-28">
                <div>Make a new army, or load a saved one</div>
              </div>
            )}
          </div>
      </AppState.Provider>
    </div>
  );
}
