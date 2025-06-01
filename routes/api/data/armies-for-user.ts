import { FreshContext, Handlers } from "$fresh/server.ts";
import { getArmyNamesKV } from "../../../server/kv.ts";

export const handler: Handlers = {
    async GET(_req: Request, ctx: FreshContext) {
        const username = ctx.state.username;
        if (!username || typeof username !== "string") {
            return new Response("Not signed in", { status: 401 });
        }
        const res = await getArmyNamesKV(username);
        return new Response(JSON.stringify(res), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        })
    }
}