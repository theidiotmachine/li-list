import { FreshContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { verifyJWT } from "../../../server/jwt.ts";

export interface RouteState {
  username: string;
}

export async function handler(req: Request, ctx: FreshContext<RouteState>) {
  if (ctx.destination === "route") {
    const cookies = getCookies(req.headers);
    const jwtPayload = await verifyJWT(cookies.auth);
    if(jwtPayload === undefined) {
      return new Response("Not signed in", {status: 401});
    }

    const username = jwtPayload.username;
    if(username === undefined || typeof username != "string") {
      return new Response("Not signed in", {status: 401});
    }

    ctx.state.username = username;
    return ctx.next();
  }

  return ctx.next();
}