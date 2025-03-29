import { Dexie, type EntityTable } from 'dexie';
import StoredArmy from './StoredArmy.ts';

export default class ArmyDB extends Dexie {
  armies!: EntityTable<StoredArmy, 'uuid'>;

  constructor() {
    super('ArmiesDB');
    this.version(1).stores({
        armies: '++uuid, name, data'
    });
    this.armies.mapToClass(StoredArmy);
  }
}