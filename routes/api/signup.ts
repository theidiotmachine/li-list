import { Handlers } from "$fresh/server.ts";

import { userExists, writeNewUser } from "../../server/kv.ts";

function failure(form: FormData, error: string) {
  const headers = new Headers();
  const redirect = form.get("redirect") as string ?? "/";
  const redirectUrl = "/signup?redirect=" + redirect + "&failed=" + error;
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
      return failure(form, "nousername");
    }

    const exists = await userExists(username);
    if (exists) {
      return failure(form, "conflict");
    }

    const password = form.get("password");
    if (password == null || typeof password != "string") {
      return failure(form, "nopassword");
    }
    
    const ok = await writeNewUser(username, password);
    if (!ok) {
      return failure(form, "failure");
    }

    const redirect = form.get("redirect") as string ?? "/";
    const headers = new Headers();
    headers.set("location", "/login?redirect="+redirect);
    return new Response(null, {
      status: 303, // "See Other"
      headers,
    });
  },
};
