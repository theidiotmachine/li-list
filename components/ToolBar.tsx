import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { encodeArmyJsonGzipBase64 } from "../storage/storageClient.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { ArmyLoadSource } from "../state/appState.ts";

export type ToolBarProps = {
    class: string
};
export function ToolBar(props: ToolBarProps) {
    const {undo, redo, makeNewArmy, canUndo, canRedo, canCloneArmy, cloneArmy, army, canMoveToKv, moveToKv, isLoggedIn, armyLoadSource} = useContext(AppState);

    let redirectPath = ""
    if(IS_BROWSER) {
        const url = new URL(globalThis.location.href);
        redirectPath = url.pathname + url.search;
    }

    /*
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
    */

    return <div class={props.class}>
        <svg width="16" height="16" version="1.1" viewBox="0 0 4.2333 4.2333" xml:space="preserve"
            class="bg-gray-100 dark:fill-white dark:bg-gray-900 p-1 w-8 h-8" id="menu-button" onClick={(_e) => {
            const menu = document.getElementById("menu");
            const menuButton = document.getElementById("menu-button");
            if(!menuButton)
                return;
            if (menu) {
                if (menu.classList.contains("hidden")) {
                    menu.classList.remove("hidden");
                    menu.classList.add("flex");
                    menuButton.innerHTML = '<path d="m1.0877 0.7135-0.37418 0.37418 1.029 1.029-1.029 1.029 0.37418 0.37418 1.029-1.029 1.029 1.029 0.37418-0.37418-1.029-1.029 1.029-1.029-0.37418-0.37418-1.029 1.029z"/>'
                } else {
                    menu.classList.add("hidden");
                    menu.classList.remove("flex");
                    menuButton.innerHTML = '<g>' +
                        '<path d="m0.52917 0.79375h3.175v0.52917h-3.175z"/>' +
                        '<path d="m0.52917 1.8521h3.175v0.52917h-3.175z"/>' +
                        '<path d="m0.52917 2.9104h3.175v0.52917h-3.175z"/>' +
                        '</g>';
                }
                menu.focus();
            }
        }}
        >
            <g>
            <path d="m0.52917 0.79375h3.175v0.52917h-3.175z"/>
            <path d="m0.52917 1.8521h3.175v0.52917h-3.175z"/>
            <path d="m0.52917 2.9104h3.175v0.52917h-3.175z"/>
            </g>
        </svg>
        
        <div class="absolute flex-col hidden bg-gray-100 dark:bg-gray-900 pl-1 pr-1 h-screen w-32" id="menu"
            onBlur={(e) => {
                const t = (e.target) as HTMLElement;
                t.classList.add("hidden");
            }}
        >
            <a onClick={()=>{makeNewArmy()}}
                class="flex-none cursor-pointer dark:text-white">New army</a>
            <a href='./load'
                class="flex-none cursor-pointer dark:text-white">Load army</a>
            {(canCloneArmy.value)?
                <a onClick={()=>{cloneArmy()}}
                    class="flex-none cursor-pointer dark:text-white">Clone army</a>
                :
                <span 
                    class="flex-none text-gray-500">Clone army</span>
            }
            {(!isLoggedIn.value)?
                <a href={"./login?redirect=" + redirectPath} class="flex-none cursor-pointer dark:text-white">Log in</a>
                :
                <span 
                    class="flex-none text-gray-500">Log in</span>
            }
            {(isLoggedIn.value)?
                <a href={"./logout?redirect=" + redirectPath} class="flex-none cursor-pointer dark:text-white">Log out</a>
                :
                <span 
                    class="flex-none text-gray-500">Log out</span>
            }
            {(canMoveToKv.value)?
                <a onClick={()=>{moveToKv()}} class="flex-none cursor-pointer dark:text-white">Move to cloud</a>
                :
                <span 
                    class="flex-none text-gray-500">Move to cloud</span>
            }
            {(canUndo.value)?
                <a onClick={()=>undo()} 
                    class="flex-none cursor-pointer dark:text-white">Undo</a>
                :
                <span 
                    class="flex-none text-gray-500">Undo</span>
            }
            {(canRedo.value)?
                <a onClick={()=>redo()} 
                    class="flex-none cursor-pointer dark:text-white">Redo</a>
                :
                <span class="flex-none text-gray-500">Redo</span>
            }
            <a onClick={()=>{
                if(isLoggedIn.value && armyLoadSource.value == ArmyLoadSource.KV) {
                    location.href='./export?clouduuid='+army.value.uuid;
                } else {
                    const encodedPromise = encodeArmyJsonGzipBase64(army.value);
                    encodedPromise.then((encoded)=>{location.href='./export?army='+encoded;})
                }
                
            }} class="flex-none cursor-pointer dark:text-white">Export PDF</a>
            <a onClick={()=>{
                if(isLoggedIn.value && armyLoadSource.value == ArmyLoadSource.KV) {
                    location.href='./export?clouduuid='+army.value.uuid+"&damageBoxes=true"
                } else {
                    const encodedPromise = encodeArmyJsonGzipBase64(army.value);
                    encodedPromise.then((encoded)=>{location.href='./export?army='+encoded+"&damageBoxes=true";})
                }
            }} class="flex-none cursor-pointer dark:text-white">Export box PDF</a>
            {
                (isLoggedIn.value && armyLoadSource.value == ArmyLoadSource.KV)?
                    <a href={'./qr?clouduuid='+army.value.uuid}
                        class="flex-none cursor-pointer dark:text-white">QR code</a>
                :
                    <span class="flex-none text-gray-500">QR code</span>
            }

            
            <a class="flex-none cursor-pointer dark:text-white" href="./hammer">Maths hammer</a>
            <a class="flex-none cursor-pointer dark:text-white" href="./about">About</a>
            
        </div>
    </div>
}