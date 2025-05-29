import {PageProps} from "$fresh/server.ts";

export default function Signup(_props: PageProps) {
  return (
    <div class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-2xl mb-4">Sign Up</h1>
      <form method="POST" action="/api/signup" class="w-80">
        <label class="block mb-2">
          Username:
          <input
            type="text"
            name="username"
            required
            class="w-full p-2 border border-gray-300 "
          />
        </label>
        <label class="block mb-2">
          Password:
          <input
            type="password"
            name="password"
            required
            class="w-full p-2 border border-gray-300"
          />
        </label>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}