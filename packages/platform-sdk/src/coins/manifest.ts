import { get } from "dot-prop";

export class Manifest {
	readonly #manifest: Record<string, any>;

	public constructor(manifest: Record<string, any>) {
		this.#manifest = manifest;
	}

	public all(): Record<string, any> {
		return this.#manifest;
	}

	public get<T>(name: string): T {
		const result: T | undefined = get(this.#manifest, name);

		if (result === undefined) {
			throw new Error(`The [${name}] key does not exist in the manifest.`);
		}

		return result;
	}
}
