import { Contracts } from "@arkecosystem/platform-sdk";

export class LinkService implements Contracts.LinkService {
	readonly #urls: { live: string; test: string } = {
		live: "https://bithomp.com/explorer/",
		test: "https://test.bithomp.com/explorer/",
	};

	readonly #baseUrl: string;

	private constructor(mode: string) {
		this.#baseUrl = this.#urls[mode];
	}

	public static async construct(opts: Contracts.KeyValuePair): Promise<LinkService> {
		return new LinkService(opts.mode);
	}

	public async destruct(): Promise<void> {
		//
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
