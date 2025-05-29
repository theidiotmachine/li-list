import { Handlers } from "$fresh/server.ts";

import { userExists, writeNewUser } from "../../server/kv.ts";

export const handler: Handlers = {
  async POST(req) {
    const form = await req.formData();

    const username = form.get("username");
    if (username == null || typeof username != "string") {
      return new Response(null, {
        status: 422, //Unprocessable Content
      });
    }

    const exists = await userExists(username);
    if (exists) {
      return new Response(null, {
        status: 409, // Conflict
      });
    }

    const password = form.get("password");
    if (password == null || typeof password != "string") {
      return new Response(null, {
        status: 422, //Unprocessable Content
      });
    }
    
    const ok = await writeNewUser(username, password);
    if (!ok) {
      return new Response(null, {
        status: 500, // Internal Server Error
      });
    }

    //not sure about this....
    const headers = new Headers();
    headers.set("location", "/login");
    return new Response(null, {
      status: 303, // "See Other"
      headers,
    });
  },
};
