import { Coins, Contracts, Http } from "@arkecosystem/platform-sdk";

export class PeerService implements Contracts.PeerService {
	readonly #config: Coins.Config;

	private constructor(config) {
		this.#config = config;
	}

	public static async __construct(config: Coins.Config): Promise<PeerService> {
		return new PeerService(config);
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async validate(url: string): Promise<boolean> {
		const http: Contracts.HttpClient = this.#config.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient);

		const response = await http.get(`${url}/node/configuration/crypto`);

		if (response.json().data.network.client.token !== this.#config.get(Coins.ConfigKey.CurrencyTicker)) {
			throw new Http.BadResponseException(`ERR_NETWORK_MISMATCH`);
		}

		if (response.failed()) {
			throw new Http.BadResponseException(`ERR_FAILED`);
		}

		return true;
	}
}
