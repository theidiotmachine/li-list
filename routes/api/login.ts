import { Handlers } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";
import { createJWT } from "../../server/jwt.ts";
import { verifyUser } from "../../server/kv.ts";

export const handler: Handlers = {
  async POST(req) {
    const form = await req.formData();
    const username = form.get("username");
    if (username == null || typeof username != "string") {
      return new Response(null, {
        status: 422, //Unprocessable Content
      });
    }
    
    const password = form.get("password");
    if (password == null || typeof password != "string") {
      return new Response(null, {
        status: 422, //Unprocessable Content
      });
    }
    
    const ok = await verifyUser(username, password);
    if (ok) {
      const headers = new Headers();

      const jwt = await createJWT({ username });

      setCookie(headers, {name: "auth", value: jwt, maxAge: 3600, sameSite: "Lax", secure: true, httpOnly: true, path: "/"});
      
      const redirect = form.get("redirect") as string ?? "/";
      headers.set("location", redirect);
      return new Response(null, {
        status: 303, // "See Other"
        headers,
      });
    } else {
      return new Response(null, {
        status: 403,
      });
    }
  },
};