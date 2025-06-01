import { PageProps } from "$fresh/server.ts";
import QRCode from 'qrcode'


export default async function QR(props: PageProps) {
    const urlIn = URL.parse(props.url);
    if(urlIn == null) {
        return <div>No QR code</div>
    }

    const clouduuid = urlIn.searchParams.get("clouduuid") ?? "";
    console.log(clouduuid);
  
    if(clouduuid == "") {
        return <div>No QR code</div>
    }
  
    let urlOut = "";
    urlOut = urlIn.origin + '/?clouduuid' + clouduuid;

    const dataURL = await QRCode.toDataURL(urlOut);
    return <div class="flex flex-row justify-center mt-8">
        <img src={dataURL}/>
    </div>
}

