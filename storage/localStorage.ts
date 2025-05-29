import { db } from "./localdb.ts";
import { Army } from "../game/types.ts";
import { SaveState } from "./storageTypes.ts";

export async function deleteArmyLocally(uuid: string) {
  await db.armies.delete(uuid);
}

export async function saveArmyLocally(army: Army) {
  await db.armies.put({uuid: army.uuid, name: army.name, data: JSON.stringify(army)});
}

export async function loadArmyLocally(uuid: string): Promise<Army|undefined> {
  const storedArmy = await db.armies.get(uuid);
  if(storedArmy === undefined)
    return undefined;
  return JSON.parse(storedArmy.data);
}

export async function getArmyNamesLocally(): Promise<SaveState[]> {
    const armies = await db.armies.toArray();
    return armies.map((army) => ({ uuid: army.uuid, name: army.name }));
}
