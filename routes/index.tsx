import { PageProps, Handlers } from "$fresh/server.ts";
import { decodeBase64 } from "jsr:@std/encoding/base64";
import { gunzip } from "jsr:@deno-library/compress";

import App from "../islands/App.tsx";


function decodeBase64Gzip(encodedArmyString: string): string {
  const zippedArmyString = decodeBase64(decodeURIComponent(encodedArmyString));
  const armyAsJson = new TextDecoder().decode(gunzip(zippedArmyString));
  return armyAsJson;
}

interface Data {
  isLoggedIn: boolean;
  username: string;
}

export const handler: Handlers = {
    GET(_req, ctx) {
        const data = {
            isLoggedIn: false,
            username: ""
        };
        if(ctx.state.username && typeof ctx.state.username === "string") {
            data.isLoggedIn = true;  
            data.username = ctx.state.username;
        }
        return ctx.render!(data);
    }
}

export default function Home(props: PageProps<Data>) {
  const localuuid = props.url.searchParams.get("localuuid") ?? "";
  const clouduuid = props.url.searchParams.get("clouduuid") ?? "";
  const encodedArmyString = props.url.searchParams.get("army") ?? "";
  let armyAsJson = "";
  
  if(encodedArmyString != "") {
      armyAsJson = decodeBase64Gzip(encodedArmyString)
  }
  
  return <App localuuid={localuuid} clouduuid={clouduuid} isLoggedIn={props.data.isLoggedIn} username={props.data.username} armyAsJson={armyAsJson}/>;
}

