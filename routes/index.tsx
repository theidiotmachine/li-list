import { useCSP } from "$fresh/runtime.ts";
import { RouteConfig, RouteContext } from "$fresh/server.ts";

import App from "../islands/App.tsx";

export default function Home(req: Request, ctx: RouteContext) {

  useCSP((csp) => {
    if (!csp.directives.styleSrc) {
      //not good but gets me in the water
      csp.directives.scriptSrc = [ 'unsafe-inline' ];
    }
  });

  return <App />;
}

export const config: RouteConfig = {
  csp: true,
};