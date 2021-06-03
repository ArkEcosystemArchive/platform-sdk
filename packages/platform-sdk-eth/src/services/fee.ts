import { Coins, Services } from "@arkecosystem/platform-sdk";
import { HttpClient } from "@arkecosystem/platform-sdk-http";

export class FeeService extends Services.AbstractFeeService {
	readonly #http: HttpClient;

	private constructor(http: HttpClient) {
		super();

		this.#http = http;
	}

	public static async __construct(config: Coins.Config): Promise<FeeService> {
		return new FeeService(config.get<HttpClient>(Coins.ConfigKey.HttpClient));
	}

	public async all(): Promise<Services.TransactionFees> {
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
