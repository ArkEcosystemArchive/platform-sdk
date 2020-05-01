import { Contracts } from "@arkecosystem/platform-sdk";

export class LinkService implements Contracts.LinkService {
	readonly #urls: { live: string; test: string } = {
		live: "https://cosmos.bigdipper.live/",
		test: "https://gaia.bigdipper.live/",
	};

	readonly #baseUrl: string;

	public constructor(mode: string) {
		this.#baseUrl = this.#urls[mode];
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
