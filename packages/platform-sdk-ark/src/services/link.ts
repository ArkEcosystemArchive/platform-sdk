import { Coins, Contracts, Helpers } from "@arkecosystem/platform-sdk";
import { URL } from "url";

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
		return new URL(`block/${id}`, this.#baseUrl).toString();
	}

	public transaction(id: string): string {
		return new URL(`transaction/${id}`, this.#baseUrl).toString();
	}

	public wallet(id: string): string {
		return new URL(`wallets/${id}`, this.#baseUrl).toString();
	}
}
