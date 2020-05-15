import { Contracts } from "@arkecosystem/platform-sdk";
import delve from "dlv";

import { manifest } from "../manifest";

export class LinkService implements Contracts.LinkService {
	readonly #baseUrl: string;

	private constructor(network: string) {
		this.#baseUrl = delve(manifest.networks, `${network}.explorer`);
	}

	public static async construct(opts: Contracts.KeyValuePair): Promise<LinkService> {
		return new LinkService(opts.network);
	}

	public async destruct(): Promise<void> {
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
