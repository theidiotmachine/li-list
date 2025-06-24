import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { LoadingState } from "../state/appState.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { DelButton } from "./DelButton.tsx";
import LoginLink from "./LoginLink.tsx";
import SignupLink from "./SignupLink.tsx";
import { Header } from "./Header.tsx";

export type LoadWidgetProps = {
  isLoggedIn: boolean;
  username: string;
};

export function LoadWidget(props: LoadWidgetProps) {
  const {
    localSaves,
    refreshLocalSaves,
    armiesLocalLoadState,
    deleteLocalSave,
    refreshKvSaves,
    armiesKvLoadState,
    kvSaves,
    deleteKvSave,
    isLoggedIn,
    username,
    makeNewArmy,
  } = useContext(AppState);

  isLoggedIn.value = props.isLoggedIn;
  username.value = props.username;

  //fresh runs on some combination of browser and server. As soon as we hit the loading code, we
  //have to use the local IndexDB on the browser, so we only refresh the save cache if we're local
  if (IS_BROWSER) {
    refreshLocalSaves();
    refreshKvSaves();
  }

  return (
    <>
      <Header />
      <div class="flex flex-row justify-center mt-8">
        <div class="flex flex-col">
          <h1 class="text-2xl mb-4 bg-gray-100 border-b-2 border-gray-400">Local Saves</h1>
          {(armiesLocalLoadState.value == LoadingState.Loading)
            ? <h1>Loading...</h1>
            : (
              <div class="grid grid-cols-[80%_20%] gap-2 md:w-[600px]">
                <h1 class="text-xl">Army name</h1>
                <p class="text-xl">Delete</p>
                {localSaves.value.map((s) => (
                  <div key={s.uuid} class="contents">
                    <div class="grid-col-1">
                      <a href={"./?localuuid=" + s.uuid}>{s.name}</a>
                    </div>
                    <div class="grid-col-2">
                      <DelButton
                        hidden={false}
                        onClick={() => deleteLocalSave(s.uuid)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          <h1 class="text-2xl mt-8 mb-4 bg-gray-100 border-b-2 border-gray-400">Cloud Saves</h1>
          {(props.isLoggedIn)
            ? (
              (armiesKvLoadState.value == LoadingState.Loading)
                ? <h1>Loading...</h1>
                : (
                  <div class="grid grid-cols-[80%_20%] gap-2 md:w-[600px]">
                    <h1 class="text-xl">Army name</h1>
                    <p class="text-xl">Delete</p>
                    {kvSaves.value.map((s) => (
                      <div key={s.uuid} class="contents">
                        <div class="grid-col-1">
                          <a href={"./?clouduuid=" + s.uuid}>{s.name}</a>
                        </div>
                        <div class="grid-col-2">
                          <DelButton
                            hidden={false}
                            onClick={() =>
                              deleteKvSave(s.uuid)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )
            )
            : (
              <>
                <p>
                  Not logged in. <LoginLink text="Log in" /> or{" "}
                  <SignupLink text="sign up" />.
                </p>
              </>
            )}
          <h1 class="text-2xl mt-8 mb-4 bg-gray-100 border-b-2 border-gray-400">New Army</h1>
          <div>
            Make a <a onClick={() => makeNewArmy()} class="cursor-pointer underline">
              new army
            </a> (with a jolly generated name).
          </div>
        </div>
      </div>
    </>
  );
}
