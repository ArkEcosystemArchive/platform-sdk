import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { manifest } from "../manifest";

export class LinkService implements Contracts.LinkService {
	readonly #baseUrl: string;

	private constructor(network: Coins.CoinNetwork) {
		this.#baseUrl = network.explorer;
	}

	public static async construct(config: Coins.Config): Promise<LinkService> {
		return new LinkService(config.get<Coins.CoinNetwork>("network"));
	}

	public async destruct(): Promise<void> {
		//
	}

	public block(id: string): string {
		return `${this.#baseUrl}/block/height/${id}`;
	}

	public transaction(id: string): string {
		return `${this.#baseUrl}/tx/${id}`;
	}

	public wallet(id: string): string {
		return `${this.#baseUrl}/address/${id}`;
	}
}
