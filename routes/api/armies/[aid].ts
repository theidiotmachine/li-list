import { FreshContext, Handlers } from "$fresh/server.ts";
import { loadArmyKV, saveArmyKV } from "../../../server/kv.ts";
import { KVStoredArmy } from "../../../server/KVStoredArmy.ts";

export const handler: Handlers = {
    async GET(_req: Request, ctx: FreshContext) {
        const army = await loadArmyKV(ctx.params.aid);
        if(army === undefined)
            return new Response("No army", {status: 400});
        else
            return new Response(army.jsonData, {status: 200});
    },

    async PUT(req: Request, ctx: FreshContext) {
        const existingArmy = await loadArmyKV(ctx.params.aid);
        if(existingArmy !== undefined && existingArmy.username != ctx.state.username) {
            return new Response("Army not owned", {status: 403})
        } 
        const storedArmy: KVStoredArmy = await req.json();
        if(storedArmy === null)
            return new Response("No army", {status: 400});

        const res = await saveArmyKV(storedArmy);
        if(res)
            return new Response("OK", {status: 200});
        else
            return new Response("Couldn't write", {status: 500});   
    }
}