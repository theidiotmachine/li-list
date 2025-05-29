/**
 * I had a nightmare of a time sharing this code. I ended up in node hell, because the gunzip 
 * seemed to pull in `node:` dependencies on the client. So as a result, I copied and pasted
 * and split it up. You'll see a few copies.
 * 
 * I think it's a deno fresh bug and I expect it will be fixed in 2.
 */

import { encodeBase64 } from "jsr:@std/encoding/base64";

export async function encodeArmyJsonGzipBase64<T>(army: T): Promise<string> {
  const armyAsJson = JSON.stringify(army);

  const stream = new Blob([armyAsJson], {
      type: 'text/json',
  }).stream(); 

  // gzip stream
  const compressedReadableStream = stream.pipeThrough(
      new CompressionStream("gzip")
  );

  // create Response
  const compressedResponse = new Response(compressedReadableStream);

  // Get response Blob
  const blob = await compressedResponse.blob();

  // Get the ArrayBuffer
  const buffer = await blob.arrayBuffer();
        
  // convert ArrayBuffer to base64 encoded string
  const compressedBase64 = encodeBase64(buffer);        

  return encodeURIComponent(compressedBase64);
}
