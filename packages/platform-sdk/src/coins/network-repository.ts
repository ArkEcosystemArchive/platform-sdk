interface Network {
	explorer: string;
	currency: {
		ticker: string;
		symbol: string;
	};
	crypto: {
		chainId?: string;
		slip44: number;
		bech32?: string;
	};
}

export class NetworkRepository {
	readonly #networks: Record<string, Network>;

	public constructor(networks: Record<string, Network>) {
		this.#networks = networks;
	}

	public all(): Record<string, Network> {
		return this.#networks;
	}

	public get(name: string): Network {
		const result: Network | undefined = this.#networks[name];

		if (!result) {
			throw new Error(`The [${name}] network is not supported.`);
		}

		return result;
	}

	public push(name: string, data: Network): void {
		this.#networks[name] = data;
	}

	public forget(name: string): void {
		delete this.#networks[name];
	}
}
