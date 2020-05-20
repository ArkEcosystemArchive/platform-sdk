import { Storage } from "../contracts";

export class NullStorage implements Storage {
	public async all(): Promise<object> {
		return {};
	}

	public async get<T = any>(key: string): Promise<T | undefined> {
		return undefined;
	}

	public async put(key: string, value: string): Promise<void> {
		//
	}

	public async forget(key: string): Promise<void> {
		//
	}

	public async flush(): Promise<void> {
		//
	}

	public async count(): Promise<number> {
		return 0;
	}
}
