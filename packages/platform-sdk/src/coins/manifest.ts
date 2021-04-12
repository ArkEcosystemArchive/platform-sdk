import { get } from "dot-prop";

export class Manifest {
	readonly #manifest: object;

	public constructor(manifest: object) {
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
