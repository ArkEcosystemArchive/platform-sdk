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
				peer: Arr.randomElement(config.get<string[]>("network.networking.hosts")),
			});
		}
	}

	public async destruct(): Promise<void> {
		//
	}

	public async all(days: number): Promise<Contracts.TransactionFees> {
		const staticFees = await this.get("fees");

		return {
			// Core
			transfer: this.transform("transfer", staticFees),
			secondSignature: this.transform("secondSignature", staticFees),
			delegateRegistration: this.transform("delegateRegistration", staticFees),
			vote: this.transform("vote", staticFees),
			multiSignature: this.transform("multiSignature", staticFees),
			ipfs: this.transform("ipfs", staticFees),
			multiPayment: this.transform("multiPayment", staticFees),
			delegateResignation: this.transform("delegateResignation", staticFees),
			htlcLock: this.transform("htlcLock", staticFees),
			htlcClaim: this.transform("htlcClaim", staticFees),
			htlcRefund: this.transform("htlcRefund", staticFees),
		};
	}

	private transform(type: string, staticFees: object): Contracts.TransactionFee {
		const fee = `${staticFees[type] || 0}`;

		return {
			static: fee,
			max: fee,
			min: fee,
			avg: fee,
		};
	}

	private async get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return (await this.#http.get(`${this.#peer}/${path}`, query)).json();
	}
}
