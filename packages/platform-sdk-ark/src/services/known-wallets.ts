import { Coins, Services } from "@arkecosystem/platform-sdk";
import { HttpClient } from "@arkecosystem/platform-sdk-http";

export class KnownWalletService extends Services.AbstractKnownWalletService {
	readonly #httpClient: HttpClient;
	readonly #source: string | undefined;

	private constructor(config: Coins.Config) {
		super();

		this.#httpClient = config.get<HttpClient>(Coins.ConfigKey.HttpClient);
		this.#source = config.getLoose<string>(Coins.ConfigKey.KnownWallets);
	}

	public static async __construct(config: Coins.Config): Promise<KnownWalletService> {
		return new KnownWalletService(config);
	}

	public async all(): Promise<Services.KnownWallet[]> {
		if (this.#source === undefined) {
			return [];
		}

		try {
			const results = (await this.#httpClient.get(this.#source)).json();

			if (Array.isArray(results)) {
				return results;
			}

			return [];
		} catch (error) {
			return [];
		}
	}
}
