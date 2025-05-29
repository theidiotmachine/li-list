import { Dexie, type EntityTable } from 'dexie';
import LocalStoredArmy from './LocalStoredArmy.ts';

export default class LocalArmyDB extends Dexie {
  armies!: EntityTable<LocalStoredArmy, 'uuid'>;

  constructor() {
    super('ArmiesDB');
    this.version(1).stores({
        armies: '++uuid, name, data'
    });
    this.armies.mapToClass(LocalStoredArmy);
  }
}