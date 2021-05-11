import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { getPeerFromConfig } from "../helpers";

export class FeeService implements Contracts.FeeService {
	readonly #config: Coins.Config;
	readonly #http: Contracts.HttpClient;

	private constructor(config: Coins.Config) {
		this.#config = config;
		this.#http = config.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient);
	}

	public static async __construct(config: Coins.Config): Promise<FeeService> {
		return new FeeService(config);
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async all(): Promise<Contracts.TransactionFees> {
		const node = await this.get("node/fees");
		const type = await this.get("transactions/fees");

		const staticFees: object = type.data;
		const dynamicFees: object = node.data;

		return {
			// Core
			transfer: this.transform("transfer", 1, staticFees, dynamicFees),
			secondSignature: this.transform("secondSignature", 1, staticFees, dynamicFees),
			delegateRegistration: this.transform("delegateRegistration", 1, staticFees, dynamicFees),
			vote: this.transform("vote", 1, staticFees, dynamicFees),
			multiSignature: this.transform("multiSignature", 1, staticFees, dynamicFees),
			ipfs: this.transform("ipfs", 1, staticFees, dynamicFees),
			multiPayment: this.transform("multiPayment", 1, staticFees, dynamicFees),
			delegateResignation: this.transform("delegateResignation", 1, staticFees, dynamicFees),
			htlcLock: this.transform("htlcLock", 1, staticFees, dynamicFees),
			htlcClaim: this.transform("htlcClaim", 1, staticFees, dynamicFees),
			htlcRefund: this.transform("htlcRefund", 1, staticFees, dynamicFees),
		};
	}

	private transform(
		type: string,
		typeGroup: number,
		staticFees: object,
		dynamicFees: object,
	): Contracts.TransactionFee {
		const dynamicFee = dynamicFees[typeGroup][type];

		return {
			static: staticFees[typeGroup][type],
			max: dynamicFee?.max || "0",
			min: dynamicFee?.min || "0",
			avg: dynamicFee?.avg || "0",
		};
	}

	private async get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return (await this.#http.get(`${this.host()}/${path}`, query)).json();
	}

	private host(): string {
		return getPeerFromConfig(this.#config);
	}
}
