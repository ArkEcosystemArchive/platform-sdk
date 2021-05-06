import { NetworkManifest } from "./network.models";

export class NetworkRepository {
	readonly #networks: Record<string, NetworkManifest>;

	public constructor(networks: Record<string, NetworkManifest>) {
		this.#networks = networks;
	}

	public all(): Record<string, NetworkManifest> {
		return this.#networks;
	}

	public get(name: string): NetworkManifest {
		const result: NetworkManifest | undefined = this.#networks[name];

		if (!result) {
			throw new Error(`The [${name}] network is not supported.`);
		}

		return result;
	}

	public push(name: string, data: NetworkManifest): void {
		this.#networks[name] = data;
	}

	public forget(name: string): void {
		delete this.#networks[name];
	}
}
