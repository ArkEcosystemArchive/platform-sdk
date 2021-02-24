import { Coins, Contracts } from "@arkecosystem/platform-sdk";

export class FeeService implements Contracts.FeeService {
	readonly #http: Contracts.HttpClient;

	private constructor(http: Contracts.HttpClient) {
		this.#http = http;
	}

	public static async __construct(config: Coins.Config): Promise<FeeService> {
		return new FeeService(config.get<Contracts.HttpClient>("httpClient"));
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async all(): Promise<Contracts.TransactionFees> {
		const { safeLow, average, fast } = (await this.#http.get("https://ethgasstation.info/json/ethgasAPI.json")).json();

		const fees = {
			static: "0",
			min: safeLow.toString(),
			avg: average.toString(),
			max: fast.toString(),
		};

		return {
			transfer: fees,
			secondSignature: fees,
			delegateRegistration: fees,
			vote: fees,
			multiSignature: fees,
			ipfs: fees,
			multiPayment: fees,
			delegateResignation: fees,
			htlcLock: fees,
			htlcClaim: fees,
			htlcRefund: fees,
		};
	}
}
