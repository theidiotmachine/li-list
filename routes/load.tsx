import LoadIsland from "../islands/LoadIsland.tsx";
import type { Handlers, PageProps } from "$fresh/server.ts";

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

export default function Load({ data }: PageProps<Data>) {
    return <LoadIsland isLoggedIn={data.isLoggedIn} username={data.username}/>;
}