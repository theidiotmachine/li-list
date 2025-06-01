import { FreshContext, Handlers } from "$fresh/server.ts";
import { delArmyKV, loadArmyKV, saveArmyKV } from "../../../../server/kv.ts";
import { KVStoredArmy } from "../../../../server/KVStoredArmy.ts";

export const handler: Handlers = {
    async GET(_req: Request, ctx: FreshContext) {
        const army = await loadArmyKV(ctx.params.aid);
        if(army === undefined)
            return new Response("No army", {status: 400});
        else
            return new Response(JSON.stringify(army), {status: 200});
    },

    async PUT(req: Request, ctx: FreshContext) {
        const storedArmy: KVStoredArmy = await req.json();
        if(storedArmy === null)
            return new Response("No army", {status: 400});
        storedArmy.username = ctx.state.username as string;
        const res = await saveArmyKV(storedArmy, ctx.state.username as string);
        if(res)
            return new Response("OK", {status: 200});
        else
            return new Response("Couldn't write", {status: 500});   
    },

    DELETE(_req: Request, ctx: FreshContext) {
        delArmyKV(ctx.params.aid, ctx.state.username as string);
        return new Response("OK", {status: 200});
    }
}