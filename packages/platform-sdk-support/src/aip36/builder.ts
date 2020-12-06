import { get, set } from "dot-prop";

export abstract class Builder {
	public constructor(protected data: Record<string, unknown>) {
		//
	}

	protected get<T>(key: string, defaultValue?: unknown): T {
		return get(this.data, key, defaultValue) as T;
	}

	protected set(key: string, value: unknown): void {
		set(this.data, key, value);
	}

	protected push<T>(collection: string, item: T): void {
		this.set(collection, this.get<T[]>(collection, []).push(item));
	}
}
