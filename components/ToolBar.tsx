import { useContext } from "preact/hooks";
import { AppState } from "../islands/App.tsx";
import { encodeArmyJsonGzipBase64 } from "../storage/storageClient.ts";

export type ToolBarProps = {
    class: string
};
export function ToolBar(props: ToolBarProps) {
    const {undo, redo, makeNewArmy, canUndo, canRedo, canCloneArmy, cloneArmy, army} = useContext(AppState);

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
                class="flex-none cursor-pointer">New Army</a>
            <a href='./load'
                class="flex-none cursor-pointer">Load Army</a>
            {(canCloneArmy.value)?
                <a onClick={()=>{cloneArmy()}}
                    class="flex-none cursor-pointer">Clone Army</a>
                :
                <span 
                    class="flex-none text-gray-500">Clone Army</span>
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
            }} class="flex-none cursor-pointer">Export Box PDF</a>
            <a onClick={()=>{
                const encodedPromise = encodeArmyJsonGzipBase64(army.value);
                encodedPromise.then((encoded)=>{location.href='./?army='+encoded;})
            }} class="flex-none cursor-pointer">Share Link</a>
            <a onClick={()=>{
                const encodedPromise = encodeArmyJsonGzipBase64(army.value);
                encodedPromise.then((encoded)=>{location.href='/qr?army='+encoded;})
            }} class="flex-none cursor-pointer">QR Code</a>
            <a class="flex-none cursor-pointer" href="./hammer">Maths Hammer</a>
            <a class="flex-none cursor-pointer" href="./about">About</a>
            
        </div>
    </div>
}