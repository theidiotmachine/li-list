import { Handlers } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";
import { createJWT } from "../../server/jwt.ts";
import { getFailedLoginHistoryState, registerFailedLoginHistoryState, registerSuccessLoginHistoryState, verifyUser } from "../../server/kv.ts";

async function failure(form: FormData, error: string) {
  //wait for a bit to prevent brute force attacks
  await new Promise(resolve => setTimeout(resolve, 1000));
  const headers = new Headers();
  const redirect = form.get("redirect") as string ?? "/";
  const redirectUrl = "/login?redirect=" + redirect + "&failed=" + error;
  headers.set("location", redirectUrl);
  return new Response(null, {
    status: 303, // "See Other"
    headers,
  });
}


export const handler: Handlers = {
  async POST(req) {
    const form = await req.formData();
    const username = form.get("username");
    if (username == null || typeof username != "string") {
      return await failure(form, "nousername");
    }
    
    const flhs = await getFailedLoginHistoryState(username);
    if(flhs.name == "locked" && Date.now() < flhs.until)
      return await failure(form, "locked");

    const password = form.get("password");
    if (password == null || typeof password != "string") {
      return await failure(form, "nopassword");
    }
    
    const ok = await verifyUser(username, password);
    if (ok) {
      registerSuccessLoginHistoryState(username);
      
      const headers = new Headers();
      const uuid = crypto.randomUUID(); //I'm not sure if JWTs have randomness, so put this in
      const jwt = await createJWT({ username, uuid });

      setCookie(headers, {name: "auth", value: jwt, maxAge: 3600, sameSite: "Lax", secure: true, httpOnly: true, path: "/"});
      
      const redirect = form.get("redirect") as string ?? "/";
      headers.set("location", redirect);
      return new Response(null, {
        status: 303, // "See Other"
        headers,
      });
    } else {
      const status = await registerFailedLoginHistoryState(username);
     return await failure(form, status);
    }
  },
};