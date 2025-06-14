import { Buffer } from "node:buffer";
import * as crypto from "node:crypto";
import { KVStoredArmy } from "./KVStoredArmy.ts";
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
    const res = await kv.get<KVStoredArmy>(["armies", uuid]);
    if (res.value == null) {
        return undefined; // Army not found
    }
    return res.value;
}

export async function saveArmyKV(army: KVStoredArmy, username: string): Promise<boolean> {
    const ownerRes = await kv.get<string>(["uuid_by_username", army.uuid]);
    if (ownerRes.value != null) {
        if(ownerRes.value != username)
            return false; //not owned
    }

    const res = await kv.atomic()
        .set(["armies", army.uuid], army)
        .set(["armies_by_username", army.username, army.uuid], {uuid: army.uuid, name: army.name})
        .set(["uuid_by_username", army.uuid], army.username)
        .commit()
    ;
    return res.ok;
}

export async function delArmyKV(uuid: string, username: string) {
    const res = await kv.get<string>(["uuid_by_username", uuid]);
    if (res.value == null) {
        return; // Army not found
    }

    if(res.value != username)
        return; //does not own this army

    await kv.atomic()
        .delete(["armies", uuid])
        .delete(["armies_by_username", username, uuid])
        .delete(["uuid_by_username", uuid])
        .commit();
}

export async function getArmyNamesKV(username: string): Promise<SaveState[]> {
    const out: SaveState[] = [];
    const iter = kv.list<SaveState>({ prefix: ["armies_by_username", username] });
    for await (const { value } of iter) {
        out.push(value);
    }
    return out;
}

export type LoginHistoryStateFine = {
    name: "fine"
}

export type LoginHistoryStateFailed = {
    name: "failed",
    num: number
}

export type LoginHistoryStateLocked = {
    name: "locked",
    until: number
}

export type LoginHistoryState = LoginHistoryStateFine | LoginHistoryStateFailed | LoginHistoryStateLocked;

export async function getFailedLoginHistoryState(username: string): Promise<LoginHistoryState> {
    const res = await kv.get<LoginHistoryState>(["failed_login_state_by_username", username]);
    if (res.value == null) {
        return {name: "fine"}; 
    }
    return res.value;
}

export async function registerFailedLoginHistoryState(username: string): Promise<string>{
    const res = await kv.get<LoginHistoryState>(["failed_login_state_by_username", username]);
    if(res.value == null) {
        kv.set(["failed_login_state_by_username", username], {name: "failed", num: 1});
        return "failure";
    } else if(res.value.name == "failed") {
        if(res.value.num >= 5) {
            kv.set(["failed_login_state_by_username", username], {name: "locked", until: Date.now() + 1000 * 60 * 60});
            return "failureandlocked";
        } else {
            kv.set(["failed_login_state_by_username", username], {name: "failed", num: res.value.num + 1});
            return "failure";
        }
    } else if(res.value.name == "locked") {
        //if we get here, we got a failed login while the account is locked, so extend the lock time
        kv.set(["failed_login_state_by_username", username], {name: "locked", until: Date.now() + 1000 * 60 * 60});
        return "failureandlocked";
    } else {
        //not sure what's going on here, but we treat it as a failed login
        return "failure";
    }
}

export function registerSuccessLoginHistoryState(username: string) {
    kv.delete(["failed_login_state_by_username", username]);
}