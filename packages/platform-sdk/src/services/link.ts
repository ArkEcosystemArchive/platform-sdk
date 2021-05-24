/* istanbul ignore file */

import { URL } from "url";

import { NetworkHost } from "../coins";
import { LinkService } from "../contracts/coins";

export interface LinkServiceSchema {
	block: (id: string) => string;
	transaction: (id: string) => string;
	wallet: (id: string) => string;
}

export abstract class AbstractLinkService implements LinkService {
	readonly #host: NetworkHost;
	readonly #schema: LinkServiceSchema;

	public constructor(host: NetworkHost, schema: LinkServiceSchema) {
		this.#host = host;
		this.#schema = schema;
	}

	public async __destruct(): Promise<void> {
		//
	}

	public block(id: string): string {
		return this.buildURL(this.#schema.block(id));
	}

	public transaction(id: string): string {
		return this.buildURL(this.#schema.transaction(id));
	}

	public wallet(id: string): string {
		return this.buildURL(this.#schema.wallet(id));
	}

	private buildURL(schema: string): string {
		const url: URL = new URL(schema, this.#host.host);

		if (this.#host.query) {
			url.search = new URLSearchParams(this.#host.query).toString();
		}

		return url.toString();
	}
}
