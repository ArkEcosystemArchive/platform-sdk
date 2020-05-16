import delve from "dlv";

// interface Network {
// 	explorer: string;
// 	currency: {
// 		ticker: string;
// 		symbol: string;
// 	};
// 	crypto: {
// 		chainId?: string;
// 		slip44: number;
// 		bech32?: string;
// 	};
// }

// todo: come up with an interface because networks can be nested like "cosmos.mainnet" due to some coins supporting multiple sub-coins or forks like ERC20
type Network = any;

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
