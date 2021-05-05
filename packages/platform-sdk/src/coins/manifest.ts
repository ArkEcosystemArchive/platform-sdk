import { get } from "dot-prop";

import { CoinNetwork } from "./network.models";

export class Manifest {
	readonly #manifest: CoinNetwork;

	public constructor(manifest: CoinNetwork) {
		this.#manifest = manifest;
	}

	public all(): CoinNetwork {
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
