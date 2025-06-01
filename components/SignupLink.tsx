import { IS_BROWSER } from "$fresh/runtime.ts";

export type SignupLinkProps = {
    text: string;
}
export default function SignupLink(props: SignupLinkProps) {
    let redirectPath = "/"
        if(IS_BROWSER) {
            const url = new URL(globalThis.location.href);
            redirectPath = url.pathname + url.search;
        }

    return <a class="cursor-pointer underline" href={"./signup?redirect=" + redirectPath}>{props.text}</a>
}