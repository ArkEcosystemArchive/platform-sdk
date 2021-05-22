import { Coins, Contracts, Helpers } from "@arkecosystem/platform-sdk";

export class LinkService implements Contracts.LinkService {
	readonly #baseUrl: string;

	private constructor({ host }: Coins.NetworkHost) {
		this.#baseUrl = host;
	}

	public static async __construct(config: Coins.Config): Promise<LinkService> {
		return new LinkService(Helpers.randomHostFromConfig(config, "explorer"));
	}

	public async __destruct(): Promise<void> {
		//
	}

	public block(id: string): string {
		return `${this.#baseUrl}/blocks/${id}`;
	}

	public transaction(id: string): string {
		return `${this.#baseUrl}/transactions/${id}`;
	}

	public wallet(id: string): string {
		return `${this.#baseUrl}/account/${id}`;
	}
}
