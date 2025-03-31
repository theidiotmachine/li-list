import { PageProps } from "$fresh/server.ts";
import { decodeBase64 } from "jsr:@std/encoding/base64";
import { gunzip } from "jsr:@deno-library/compress";

import App from "../islands/App.tsx";

export default function Home(props: PageProps) {
  const uuid = props.url.searchParams.get("uuid") ?? "";
  const encodedArmyString = props.url.searchParams.get("army") ?? "";
  let armyAsJson = "";
  
  if(encodedArmyString != "") {
    const zippedArmyString = decodeBase64(decodeURIComponent(encodedArmyString));
    armyAsJson = new TextDecoder().decode(gunzip(zippedArmyString));
  }
  
  return <App uuid={uuid} armyAsJson={armyAsJson}/>;
}

