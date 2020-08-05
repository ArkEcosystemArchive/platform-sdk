import { Storage } from "../env.models";
import { LocalStorage } from "./local";
import { MemoryStorage } from "./memory";
import { NullStorage } from "./null";

export class StorageFactory {
	public static make(driver: string): Storage {
		return {
			memory: new MemoryStorage(),
			null: new NullStorage(),
			indexeddb: new LocalStorage("indexeddb"),
			websql: new LocalStorage("websql"),
			localstorage: new LocalStorage("localstorage"),
		}[driver];
	}
}
