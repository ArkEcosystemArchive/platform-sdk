import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";

export class FeeService implements Contracts.FeeService {
	readonly #http: Contracts.HttpClient;
	readonly #peer: string;

	private constructor({ http, peer }) {
		this.#http = http;
		this.#peer = peer;
	}

	public static async construct(config: Coins.Config): Promise<FeeService> {
		try {
			return new FeeService({
				http: config.get<Contracts.HttpClient>("httpClient"),
				peer: config.get<string>("peer"),
			});
		} catch {
			return new FeeService({
				http: config.get<Contracts.HttpClient>("httpClient"),
				peer: `${Arr.randomElement(config.get<Coins.CoinNetwork>("network").hosts)}/api`,
			});
		}
	}

	public async destruct(): Promise<void> {
		//
	}

	public async all(days: number): Promise<Contracts.TransactionFees> {
		const node = await this.get("node/fees", { days });
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
			// Magistrate
			entityRegistration: this.transform("entity", 2, staticFees, dynamicFees),
			entityResignation: this.transform("entity", 2, staticFees, dynamicFees),
			entityUpdate: this.transform("entity", 2, staticFees, dynamicFees),
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
			max: dynamicFee ? dynamicFee.max : 0,
			min: dynamicFee ? dynamicFee.min : 0,
			avg: dynamicFee ? dynamicFee.avg : 0,
		};
	}

	private async get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		const response = await this.#http.get(`${this.#peer}/${path}`, query);

		return response.json();
	}
}
