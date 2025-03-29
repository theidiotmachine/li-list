import { Entity } from 'dexie';
import type ArmyDB from './ArmyDB.ts';
import { Army } from "../game/types.ts";

export default class StoredArmy extends Entity<ArmyDB> {
  uuid!: string;
  name!: string;
  data!: string;

  // example method that access the DB:
  /*
  async birthday() {
    // this.db is inherited from Entity<AppDB>:
    await this.db.friends.update(this.id, (friend) => ++friend.age);
  }
    */

}