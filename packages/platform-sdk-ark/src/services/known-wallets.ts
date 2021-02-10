import { Coins, Contracts } from "@arkecosystem/platform-sdk";

export class KnownWalletService implements Contracts.KnownWalletService {
	readonly #httpClient: Contracts.HttpClient;
	readonly #source: string | undefined;

	private constructor(config: Coins.Config) {
		this.#httpClient = config.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient);
		this.#source = config.getLoose<string>(Coins.ConfigKey.KnownWallets);
	}

	public static async __construct(config: Coins.Config): Promise<KnownWalletService> {
		return new KnownWalletService(config);
	}

	public async __destruct(): Promise<void> {}

	public async all(): Promise<Contracts.KnownWallet[]> {
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
