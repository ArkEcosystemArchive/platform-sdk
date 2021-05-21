import { Coins, Contracts, Helpers } from "@arkecosystem/platform-sdk";

export class LinkService implements Contracts.LinkService {
	readonly #baseUrl: string;

	private constructor(network: Coins.NetworkManifest) {
		this.#baseUrl = Helpers.randomHostByType(network.hosts, "explorer").host.url;
	}

	public static async __construct(config: Coins.Config): Promise<LinkService> {
		return new LinkService(config.get<Coins.NetworkManifest>("network"));
	}

	public async __destruct(): Promise<void> {
		//
	}

	public block(id: string): string {
		return `${this.#baseUrl}block/${id}`;
	}

	public transaction(id: string): string {
		return `${this.#baseUrl}transaction/${id}`;
	}

	public wallet(id: string): string {
		return `${this.#baseUrl}wallets/${id}`;
	}
}
