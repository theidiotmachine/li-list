import { useCSP } from "$fresh/runtime.ts";
import { RouteConfig, RouteContext } from "$fresh/server.ts";

import App from "../islands/App.tsx";

export default function Home(req: Request, ctx: RouteContext) {

  /*
  useCSP((csp) => {

    csp.directives.imgSrc?.push( 'unsafe-inline' );
    csp.directives.imgSrc?.push( 'localhost:8000' );

    csp.directives.scriptSrc = [];
    csp.directives.scriptSrc?.push( 'unsafe-inline' );
    csp.directives.scriptSrc?.push( 'localhost:8000' );

    csp.directives.styleSrc?.push( 'localhost:8000' );
  });
  */  
  

  return <App />;
}

/*

export const config: RouteConfig = {
  csp: true,
};
*/