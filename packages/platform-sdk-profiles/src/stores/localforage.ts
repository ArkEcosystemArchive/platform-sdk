import localForage from "localforage";

import { Storage } from "../contracts";

export class LocalForage implements Storage {
	public constructor(driver: string) {
		localForage.config({
			driver: {
				indexeddb: localForage.INDEXEDDB,
				websql: localForage.WEBSQL,
				localstorage: localForage.LOCALSTORAGE,
			}[driver],
		});
	}

	public async all(): Promise<object> {
		return {};
	}

	public async get<T = any>(key: string): Promise<T | undefined> {
		return localForage.getItem(key);
	}

	public async put(key: string, value: string | object): Promise<void> {
		await localForage.setItem(key, value);
	}

	public async forget(key: string): Promise<void> {
		await localForage.removeItem(key);
	}

	public async flush(): Promise<void> {
		await localForage.clear();
	}

	public async count(): Promise<number> {
		return localForage.length();
	}
}
