import { Contracts } from "@arkecosystem/platform-sdk";

export class LinkService implements Contracts.LinkService {
	readonly #urls: { live: string; test: string } = {
		live: "https://bithomp.com/explorer/",
		test: "https://test.bithomp.com/explorer/",
	};

	readonly #baseUrl: string;

	public constructor(mode: string) {
		this.#baseUrl = this.#urls[mode];
	}

	public block(id: string): string {
		return `${this.#baseUrl}/${id}`;
	}

	public transaction(id: string): string {
		return `${this.#baseUrl}/${id}`;
	}

	public wallet(id: string): string {
		return `${this.#baseUrl}/${id}`;
	}
}
