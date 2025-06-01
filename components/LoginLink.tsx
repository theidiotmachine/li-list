import { IS_BROWSER } from "$fresh/runtime.ts";

export type LoginLinkProps = {
    text: string;
}
export default function LoginLink(props: LoginLinkProps) {
    let redirectPath = "/"
        if(IS_BROWSER) {
            const url = new URL(globalThis.location.href);
            redirectPath = url.pathname + url.search;
        }

    return <a class="cursor-pointer underline" href={"./login?redirect=" + redirectPath}>{props.text}</a>
}