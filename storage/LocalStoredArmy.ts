import { Entity } from 'dexie';
import type LocalArmyDB from './LocalArmyDB.ts';

export default class LocalStoredArmy extends Entity<LocalArmyDB> {
  uuid!: string;
  name!: string;
  data!: string; //jsoned army
}