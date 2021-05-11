import { Coins, Contracts } from "@arkecosystem/platform-sdk";

export class FeeService implements Contracts.FeeService {
	readonly #http: Contracts.HttpClient;

	private constructor(http: Contracts.HttpClient) {
		this.#http = http;
	}

	public static async __construct(config: Coins.Config): Promise<FeeService> {
		return new FeeService(config.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient));
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async all(): Promise<Contracts.TransactionFees> {
		const { slow, normal, fast, instant } = (await this.#http.get("https://ethgas.watch/api/gas")).json();

		const fees = {
			static: instant.gwei.toString(),
			min: slow.gwei.toString(),
			avg: normal.gwei.toString(),
			max: fast.gwei.toString(),
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
