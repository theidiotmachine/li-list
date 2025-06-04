import { PageProps, Handlers } from "$fresh/server.ts";

import App from "../islands/App.tsx";

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
  
  return <App localuuid={localuuid} clouduuid={clouduuid} isLoggedIn={props.data.isLoggedIn} username={props.data.username}/>;
}

