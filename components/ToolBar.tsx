import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { encodeArmyJsonGzipBase64 } from "../storage/storageClient.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";

export type ToolBarProps = {
    class: string
};
export function ToolBar(props: ToolBarProps) {
    const {undo, redo, makeNewArmy, canUndo, canRedo, canCloneArmy, cloneArmy, army, canMoveToKv, moveToKv, isLoggedIn} = useContext(AppState);

    let redirectPath = ""
    if(IS_BROWSER) {
        const url = new URL(globalThis.location.href);
        redirectPath = url.pathname + url.search;
    }
    

    return <div class={props.class}>
        <img src="/menu-clean.svg" class="bg-gray-100 p-1 w-8" id="menu-button" onClick={(e) => {
            const menu = document.getElementById("menu");
            const menuButton = (e.target as HTMLImageElement);
            if (menu) {
                if (menu.classList.contains("hidden")) {
                    menu.classList.remove("hidden");
                    menu.classList.add("flex");
                    menuButton.src = "/cross-clean.svg";
                } else {
                    menu.classList.add("hidden");
                    menu.classList.remove("flex");
                    menuButton.src = "/menu-clean.svg"
                }
                menu.focus();
            }
        }}></img>
        <div class="absolute flex-col hidden bg-gray-100 pl-1 pr-1 h-screen w-32" id="menu"
            onBlur={(e) => {
                const t = (e.target) as HTMLElement;
                t.classList.add("hidden");
            }}
        >
            <a onClick={()=>{makeNewArmy()}}
                class="flex-none cursor-pointer">New army</a>
            <a href='./load'
                class="flex-none cursor-pointer">Load army</a>
            {(canCloneArmy.value)?
                <a onClick={()=>{cloneArmy()}}
                    class="flex-none cursor-pointer">Clone army</a>
                :
                <span 
                    class="flex-none text-gray-500">Clone army</span>
            }
            {(!isLoggedIn.value)?
                <a href={"./login?redirect=" + redirectPath} class="flex-none cursor-pointer">Log in</a>
                :
                <span 
                    class="flex-none text-gray-500">Log in</span>
            }
            {(isLoggedIn.value)?
                <a href={"./logout?redirect=" + redirectPath} class="flex-none cursor-pointer">Log out</a>
                :
                <span 
                    class="flex-none text-gray-500">Log out</span>
            }
            {(canMoveToKv.value)?
                <a onClick={()=>{moveToKv()}} class="flex-none cursor-pointer">Move to cloud</a>
                :
                <span 
                    class="flex-none text-gray-500">Move to cloud</span>
            }
            {(canUndo.value)?
                <a onClick={()=>undo()} 
                    class="flex-none cursor-pointer">Undo</a>
                :
                <span 
                    class="flex-none text-gray-500">Undo</span>
            }
            {(canRedo.value)?
                <a onClick={()=>redo()} 
                    class="flex-none cursor-pointer">Redo</a>
                :
                <span 
                    class="flex-none text-gray-500">Redo</span>
            }
            <a onClick={()=>{
                const encodedPromise = encodeArmyJsonGzipBase64(army.value);
                encodedPromise.then((encoded)=>{location.href='./export?army='+encoded;})
            }} class="flex-none cursor-pointer">Export PDF</a>
            <a onClick={()=>{
                const encodedPromise = encodeArmyJsonGzipBase64(army.value);
                encodedPromise.then((encoded)=>{location.href='./export?army='+encoded+"&damageBoxes=true";})
            }} class="flex-none cursor-pointer">Export box PDF</a>
            <a onClick={()=>{
                const encodedPromise = encodeArmyJsonGzipBase64(army.value);
                encodedPromise.then((encoded)=>{location.href='/qr?army='+encoded;})
            }} class="flex-none cursor-pointer">QR code</a>
            <a class="flex-none cursor-pointer" href="./hammer">Maths hammer</a>
            <a class="flex-none cursor-pointer" href="./about">About</a>
            
        </div>
    </div>
}