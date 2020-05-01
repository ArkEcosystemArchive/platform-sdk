import { Contracts } from "@arkecosystem/platform-sdk";

export class LinkService implements Contracts.LinkService {
	readonly #urls: { live: string; test: string } = {
		live: "https://etherscan.io/",
		test: "https://rinkeby.etherscan.io/",
	};

	readonly #baseUrl: string;

	public constructor(mode: string) {
		this.#baseUrl = this.#urls[mode];
	}

	public block(id: string): string {
		return `${this.#baseUrl}/block/${id}`;
	}

	public transaction(id: string): string {
		return `${this.#baseUrl}/tx/${id}`;
	}

	public wallet(id: string): string {
		return `${this.#baseUrl}/address/${id}`;
	}
}
