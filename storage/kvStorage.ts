import { Army } from "../game/types.ts";

export async function deleteArmyKv(uuid: string) {
    const url = new URL(globalThis.location.href);
    await fetch(url.origin + "/api/data/armies/" + uuid, {
        method: "DELETE"
    });
}

export async function saveArmyKv(army: Army): Promise<boolean> {
  const url = new URL(globalThis.location.href);
    const res = await fetch(url.origin + "/api/data/armies/" + army.uuid, {
        method: "PUT", body: JSON.stringify({
            uuid: army.uuid,
            name: army.name,
            jsonData: JSON.stringify(army),
            username: "" //we don't send this, we rely on the auth token
        })
    });
    if(res.status != 200) {
        return false;
    }
    return true;
}