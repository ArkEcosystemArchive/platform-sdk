import { get } from "dot-prop";

export class Manifest {
	readonly #manifest: object;

	public constructor(manifest: object) {
		this.#manifest = manifest;
	}

	public all(): object {
		return this.#manifest;
	}

	public get<T>(name: string): T | undefined {
		return get(this.#manifest, name);
	}
}
