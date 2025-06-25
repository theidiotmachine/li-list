import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { LoadingState } from "../state/appState.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { DelButton } from "./DelButton.tsx";
import LoginLink from "./LoginLink.tsx";
import SignupLink from "./SignupLink.tsx";
import { Header } from "./Header.tsx";

type H1Props = {
    text: string
};

function H1(props: H1Props) {
  return <h1 class="text-2xl mb-4 mt-8 bg-gray-100 dark:bg-gray-900 border-b-2 border-gray-400 dark:border-gray-600 dark:text-white">{props.text}</h1>
}

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
        <div class="flex flex-col ">
          <H1 text="Local Saves"/>
          {(armiesLocalLoadState.value == LoadingState.Loading)
            ? <h1 class="dark:text-white">Loading...</h1>
            : (
              <div class="grid grid-cols-[80%_20%] gap-2 md:w-[600px]">
                <h1 class="text-xl dark:text-white">Army name</h1>
                <p class="text-xl dark:text-white">Delete</p>
                {localSaves.value.map((s) => (
                  <div key={s.uuid} class="contents">
                    <div class="grid-col-1 dark:text-white">
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
            <H1 text="Cloud Saves"/>
          {(props.isLoggedIn)
            ? (
              (armiesKvLoadState.value == LoadingState.Loading)
                ? <h1 class="dark:text-white">Loading...</h1>
                : (
                  <div class="grid grid-cols-[80%_20%] gap-2 md:w-[600px]">
                    <h1 class="text-xl dark:text-white">Army name</h1>
                    <p class="text-xl dark:text-white">Delete</p>
                    {kvSaves.value.map((s) => (
                      <div key={s.uuid} class="contents">
                        <div class="grid-col-1 dark:text-white">
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
                <p class="dark:text-white">
                  Not logged in. <LoginLink text="Log in" /> or{" "}
                  <SignupLink text="sign up" />.
                </p>
              </>
            )}
            <H1 text="New Army"/>
          <div class="text-white">
            Make a <a onClick={() => makeNewArmy()} class="cursor-pointer underline">
              new army
            </a> (with a jolly generated name).
          </div>
        </div>
      </div>
    </>
  );
}
