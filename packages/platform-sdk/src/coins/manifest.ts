import delve from "dlv";

export class Manifest {
	readonly #manifest: object;

	public constructor(manifest: object) {
		this.#manifest = manifest;
	}

	public all(): object {
		return this.#manifest;
	}

	public get<T>(name: string): T {
		return delve(this.#manifest, name);
	}
}
