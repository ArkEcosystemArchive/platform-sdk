import { CoinNetwork } from "./contracts";

export class NetworkRepository {
	readonly #networks: Record<string, CoinNetwork>;

	public constructor(networks: Record<string, CoinNetwork>) {
		this.#networks = networks;
	}

	public all(): Record<string, CoinNetwork> {
		return this.#networks;
	}

	public get(name: string): CoinNetwork {
		const result: CoinNetwork | undefined = this.#networks[name];

		if (!result) {
			throw new Error(`The [${name}] network is not supported.`);
		}

		return result;
	}

	public push(name: string, data: CoinNetwork): void {
		this.#networks[name] = data;
	}

	public forget(name: string): void {
		delete this.#networks[name];
	}
}
