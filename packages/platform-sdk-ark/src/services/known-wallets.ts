import { Coins, Contracts } from "@arkecosystem/platform-sdk";

export class KnownWalletService implements Contracts.KnownWalletService {
	readonly #httpClient: Contracts.HttpClient;
	readonly #source: string;

	private constructor(config: Coins.Config) {
		this.#httpClient = config.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient);
		this.#source = config.get<string>(Coins.ConfigKey.KnownWallets);
	}

	public static async construct(config: Coins.Config): Promise<KnownWalletService> {
		return new KnownWalletService(config);
	}

	public async destruct(): Promise<void> {}

	public async all(): Promise<Contracts.KnownWallet[]> {
		try {
			return (await this.#httpClient.get(this.#source)).json() as Contracts.KnownWallet[];
		} catch (error) {
			return [];
		}
	}
}
