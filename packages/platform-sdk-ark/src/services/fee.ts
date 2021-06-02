import { Coins, Contracts, Helpers, Services } from "@arkecosystem/platform-sdk";

export class FeeService extends Services.AbstractFeeService {
	readonly #config: Coins.Config;
	readonly #http: Contracts.HttpClient;

	private constructor(config: Coins.Config) {
		super();

		this.#config = config;
		this.#http = config.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient);
	}

	public static async __construct(config: Coins.Config): Promise<FeeService> {
		return new FeeService(config);
	}

	public async all(): Promise<Services.TransactionFees> {
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
	): Services.TransactionFee {
		const dynamicFee = dynamicFees[typeGroup][type];

		return {
			static: staticFees[typeGroup][type],
			max: dynamicFee?.max || "0",
			min: dynamicFee?.min || "0",
			avg: dynamicFee?.avg || "0",
		};
	}

	private async get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return (await this.#http.get(`${Helpers.randomHostFromConfig(this.#config)}/${path}`, query)).json();
	}
}
