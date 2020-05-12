import { Contracts } from "@arkecosystem/platform-sdk";

import { manifest } from "../manifest";

export class LinkService implements Contracts.LinkService {
	readonly #baseUrl: string;

	private constructor(network: string) {
		this.#baseUrl = manifest.networks[network].explorer;
	}

	public static async construct(opts: Contracts.KeyValuePair): Promise<LinkService> {
		return new LinkService(opts.network);
	}

	public async destruct(): Promise<void> {
		//
	}

	public block(id: string): string {
		return `${this.#baseUrl}/ledger/${id}`;
	}

	public transaction(id: string): string {
		return `${this.#baseUrl}/tx/${id}`;
	}

	public wallet(id: string): string {
		return `${this.#baseUrl}/account/${id}`;
	}
}
