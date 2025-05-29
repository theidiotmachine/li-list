import { Buffer } from "node:buffer";
import * as crypto from "node:crypto";
import { KVStoredArmy } from "./KVStoredArmy.ts";
import { decodeBase64GzipJson, encodeArmyJsonGzipBase64 } from "./storageServer.ts";
import { SaveState } from "../storage/storageTypes.ts";

type User = {
    hashedPassword: Buffer<ArrayBufferLike>;
    salt: Buffer<ArrayBufferLike>;
};

const kv = await Deno.openKv();

export async function writeNewUser(username: string, password: string): Promise<boolean> {
    const salt = crypto.randomBytes(16);
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 310000, 32, "sha256");
    const res = await kv.set(["users", username], {hashedPassword, salt});
    return res.ok
}

export async function userExists(username: string): Promise<boolean> {
    const res = await kv.get(["users", username]);
    return res.value != null;
}

export async function verifyUser(username: string, password: string): Promise<boolean> {
    const res = await kv.get<User>(["users", username]);
    if (res.value == null) {
        return false; // User does not exist
    }
    const { hashedPassword, salt } = res.value;
    const hashedInputPassword = crypto.pbkdf2Sync(password, salt, 310000, 32, "sha256");
    return crypto.timingSafeEqual(hashedInputPassword, hashedPassword);
}

export async function loadArmyKV(uuid: string): Promise<KVStoredArmy | undefined> {
    const res = await kv.get<string>(["armies", uuid]);
    if (res.value == null) {
        return undefined; // Army not found
    }
    return decodeBase64GzipJson<KVStoredArmy>(res.value);
}

export async function saveArmyKV(army: KVStoredArmy): Promise<boolean> {
    const encoded = encodeArmyJsonGzipBase64(army);
    const res = await kv.atomic()
        .set(["armies", army.uuid], encoded)
        .set(["armies_by_username", army.username, army.uuid], {uuid: army.uuid, name: army.name})
        .commit()
    ;
    return res.ok;
}

export async function getArmyNamesKV(username: string): Promise<SaveState[]> {
    const out: SaveState[] = [];
    const iter = kv.list<SaveState>({ prefix: ["armies_by_username", username] });
    for await (const { value } of iter) {
        out.push(value);
    }
    return out;
}
