import { Storage } from "../contracts";

export class NullStorage implements Storage {
	public async all(): Promise<object> {
		return {};
	}

	public async get<T = any>(key: string): Promise<T | undefined> {
		return undefined;
	}

	public async set(key: string, value: string): Promise<void> {
		//
	}

	public async has(key: string): Promise<boolean> {
		return false;
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
