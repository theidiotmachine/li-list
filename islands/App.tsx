import { createContext } from "preact";
import state, { type AppStateType } from "../state/appState.ts";

import { ArmyHeader, ArmyWidget } from "../components/ArmyWidget.tsx";
import { ToolBar } from "../components/ToolBar.tsx";
import { HelloWidget } from "../components/HelloWidget.tsx";

export const AppState = createContext<AppStateType>({} as AppStateType);

export type AppProps = {
  localuuid: string;
  clouduuid: string;
  isLoggedIn: boolean;
  username: string;
};

//
export default function App(props: AppProps) {
  return (
    <div className="App relative">
      <AppState.Provider value={state}>
        <div class="flex flex-col">
          <div class="fixed z-50">
            <div class="flex flex-row w-screen justify-center bg-gray-100 dark:bg-gray-900">
              <ToolBar class="grow md:min-w-8" />
              <div class="w-full bg-gray-100 dark:bg-gray-900 content-center text-lg text-center font-semibold dark:text-white">
                LI List Builder
              </div>
            </div>
            <div class="flex flex-row w-screen justify-center bg-gray-100 dark:bg-gray-900">
              <div class="flex flex-col mx-4 md:w-[800px]">
                <div class="flex flex-row justify-center">
                </div>
                <ArmyHeader
                  localuuid={props.localuuid}
                  clouduuid={props.clouduuid}
                  isLoggedIn={props.isLoggedIn}
                  username={props.username}
                />
              </div>
            </div>
          </div>

          {(props.localuuid != "" || props.clouduuid != "")
            ? (
              <ArmyWidget
                localuuid={props.localuuid}
                clouduuid={props.clouduuid}
                isLoggedIn={props.isLoggedIn}
                username={props.username}
                class="mt-44 md:mt-36 relative"
              />
            )
            : <HelloWidget />}
        </div>
      </AppState.Provider>
    </div>
  );
}
