import { Army } from "./game/types.ts";
import Dexie, { type EntityTable } from 'dexie';

interface Friend {
    id: number; // This prop will be used as primary key (see below)
    name: string;
    age: number;
  }
  
  const db = new Dexie('FriendsDatabase') as Dexie & {
    friends: EntityTable<Friend, 'id'>
  };