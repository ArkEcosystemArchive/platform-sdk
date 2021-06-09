import { Coins, IoC, Services } from "@arkecosystem/platform-sdk";
import { HttpClient } from "@arkecosystem/platform-sdk-http";

@IoC.injectable()
export class KnownWalletService extends Services.AbstractKnownWalletService {
	@IoC.inject(IoC.BindingType.ConfigRepository)
	private readonly configRepository!: Coins.ConfigRepository;

	@IoC.inject(IoC.BindingType.HttpClient)
	private readonly httpClient!: HttpClient;

	#source: string | undefined;

	public async all(): Promise<Services.KnownWallet[]> {
		if (this.#source === undefined) {
			return [];
		}

		try {
			const results = (await this.httpClient.get(this.#source)).json();

			if (Array.isArray(results)) {
				return results;
			}

			return [];
		} catch (error) {
			return [];
		}
	}

	@IoC.postConstruct()
	private onPostConstruct(): void {
		this.#source = this.configRepository.getLoose<string>(Coins.ConfigKey.KnownWallets);
	}
}
