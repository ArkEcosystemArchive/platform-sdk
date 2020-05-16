import delve from "dlv";

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
	readonly #networks: Network[];

	public constructor(networks: Network[]) {
		this.#networks = networks;
	}

	public all(): Network[] {
		return this.#networks;
	}

	public get(name: string): Network {
		return delve(this.#networks, name);
	}
}
