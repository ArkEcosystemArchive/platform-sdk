import { Storage } from "../contracts";
import { LocalForage } from "./localforage";
import { NullStorage } from "./null";

export class StorageFactory {
	public static make(driver: string): Storage {
		return {
			null: new NullStorage(),
			indexeddb: new LocalForage("indexeddb"),
			websql: new LocalForage("websql"),
			localstorage: new LocalForage("localstorage"),
		}[driver];
	}
}
