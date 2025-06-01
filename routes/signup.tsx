import {Handlers, PageProps} from "$fresh/server.ts";

interface Data {
  redirect: string;
}

export const handler: Handlers = {
  GET(req, ctx) {
    
    const url = new URL(req.url);
    const redirect = url.searchParams.get("redirect") ?? "/";
    const data = {redirect};
    return ctx.render!(data);
  }
}

export default function Signup(props: PageProps<Data>) {
  return (
    <div class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-4xl font-bold mb-4">Sign up</h1>
      <p class="w-80 text-sm mb-4">You need to sign up to share armies between devices and people. If you just want to use LI List Builder locally, you don't need to do this.</p>
      <p class="w-80 text-sm mb-4">Once you're logged in, this site uses a cookie to identify you. It doesn't do anything else with it.</p>
      <form method="POST" action="/api/signup" class="flex flex-col space-y-4">
        <input type="text" name="username" placeholder="Username" class="border p-2" required autoFocus/>
        <input type="password" name="password" placeholder="Password" class="border p-2" required />
        <button type="submit" class="bg-gray-100 p-2">Sign up</button>
        <input type="hidden" name="redirect" value={props.data.redirect} />
      </form>
    </div>
  );
}