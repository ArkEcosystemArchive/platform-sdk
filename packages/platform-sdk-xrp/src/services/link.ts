import { Coins, Contracts } from "@arkecosystem/platform-sdk";

export class LinkService implements Contracts.LinkService {
	readonly #baseUrl: string;

	private constructor(network: Coins.NetworkManifest) {
		this.#baseUrl = network.explorer;
	}

	public static async __construct(config: Coins.Config): Promise<LinkService> {
		return new LinkService(config.get<Coins.NetworkManifest>("network"));
	}

	public async __destruct(): Promise<void> {
		//
	}

	public block(id: string): string {
		return `${this.#baseUrl}/ledgers/${id}`;
	}

	public transaction(id: string): string {
		return `${this.#baseUrl}/transactions/${id}`;
	}

	public wallet(id: string): string {
		return `${this.#baseUrl}/accounts/${id}`;
	}
}
