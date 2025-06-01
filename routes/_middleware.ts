import { FreshContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { verifyJWT } from "../server/jwt.ts";

export interface RouteState {
  username: string;
}

//middleware which sets the username on the ctx if we have a valid auth cookie, and forbids anything behind the data api
//if we don't
export async function handler(req: Request, ctx: FreshContext<RouteState>) {
  if (ctx.destination === "route") {
    //get the auth cookie
    const cookies = getCookies(req.headers);
    const authCookie = cookies.auth;
    if (authCookie === undefined) {
      if (ctx.route.startsWith("/api/data")) {
        return new Response("Not signed in", { status: 401 });
      }
    } else {
      //is it one of ours?
      const jwtPayload = await verifyJWT(authCookie);
      if (jwtPayload === undefined) {
        if (ctx.route.startsWith("/api/data")) {
          return new Response("Not signed in", { status: 401 });
        }
      } else {
        //does it have a username?
        const username = jwtPayload.username;
        if (username === undefined || typeof username != "string") {
          if (ctx.route.startsWith("/api/data")) {
            return new Response("Not signed in", { status: 401 });
          }
        } else {
          //it does, so store it
          ctx.state.username = username;
        }
      }
    }

    return ctx.next();
  }

  return ctx.next();
}
