import { Army } from "../game/types.ts";
import { db } from './db.ts';

import { encodeBase64 } from "jsr:@std/encoding/base64";

export type SaveState = {
    uuid: string;
    name: string;
}

export async function saveArmy(army: Army) {
  //console.log({uuid: army.uuid, name: army.name, data: JSON.stringify(army)});
  console.log("saveArmy");
  await db.armies.put({uuid: army.uuid, name: army.name, data: JSON.stringify(army)});
}

export async function loadArmy(uuid: string): Promise<Army|undefined> {
  const storedArmy = await db.armies.get(uuid);
  if(storedArmy === undefined)
    return undefined;
  return JSON.parse(storedArmy.data);
}

export async function deleteArmy(uuid:string) {
    await db.armies.delete(uuid);
}

export async function getArmyNames(): Promise<SaveState[]> {
    const armies = await db.armies.toArray();
    return armies.map((army) => ({ uuid: army.uuid, name: army.name }));
}

export async function getEncodedArmy(army: Army): Promise<string> {
  const armyAsJson = JSON.stringify(army);

  const stream = new Blob([armyAsJson], {
      type: 'text/json',
  }).stream(); 

  // gzip stream
  const compressedReadableStream = stream.pipeThrough(
      new CompressionStream("gzip")
  );

  // create Response
  const compressedResponse = await new Response(compressedReadableStream);

  // Get response Blob
  const blob = await compressedResponse.blob();

  // Get the ArrayBuffer
  const buffer = await blob.arrayBuffer();
        
  // convert ArrayBuffer to base64 encoded string
  const compressedBase64 = encodeBase64(buffer);        

  return encodeURIComponent(compressedBase64);
}