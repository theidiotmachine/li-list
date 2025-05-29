import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { verifyJWT } from "../server/jwt.ts";

interface Data {
  isAllowed: boolean;
  username: string;
}

export const handler: Handlers = {
  async GET(req, ctx) {
    const cookies = getCookies(req.headers);
    const payload = await verifyJWT(cookies.auth);
    if(payload == undefined)
      return ctx.render!({ isAllowed: false });
    else
      return ctx.render!({ isAllowed: true, username: payload.username });
  },
};

export default function Hello({ data }: PageProps<Data>) {
  return (
    <div>
      <div>
        You currently {data.isAllowed ? "are" : "are not"} logged in. {data.isAllowed? ("Username: " +data.username) : ""}
      </div>
    </div>
  );
}