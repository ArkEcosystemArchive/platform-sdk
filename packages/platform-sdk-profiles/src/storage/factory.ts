import { Storage } from "../env.models";
import { LocalStorage } from "./local";
import { NullStorage } from "./null";

export class StorageFactory {
	public static make(driver: string): Storage {
		return {
			null: new NullStorage(),
			indexeddb: new LocalStorage("indexeddb"),
			websql: new LocalStorage("websql"),
			localstorage: new LocalStorage("localstorage"),
		}[driver];
	}
}
