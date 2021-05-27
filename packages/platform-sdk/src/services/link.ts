/* istanbul ignore file */

import { formatString } from "@arkecosystem/utils";
import { URL } from "url";

import { Config, NetworkHost } from "../coins";
import { LinkService } from "../contracts/coins";
import { randomHostFromConfig } from "../helpers";

export interface LinkServiceSchema {
	block: string;
	transaction: string;
	wallet: string;
}

export abstract class AbstractLinkService implements LinkService {
	readonly #host: NetworkHost;
	readonly #schema: LinkServiceSchema;

	public constructor(config: Config, schema: LinkServiceSchema) {
		this.#host = randomHostFromConfig(config, "explorer");
		this.#schema = schema;
	}

	public async __destruct(): Promise<void> {
		//
	}

	public block(id: string): string {
		return this.buildURL(this.#schema.block, id);
	}

	public transaction(id: string): string {
		return this.buildURL(this.#schema.transaction, id);
	}

	public wallet(id: string): string {
		return this.buildURL(this.#schema.wallet, id);
	}

	private buildURL(schema: string, id: string): string {
		const url: URL = new URL(formatString(schema, id), this.#host.host);

		if (this.#host.query) {
			url.search = new URLSearchParams(this.#host.query).toString();
		}

		return url.toString();
	}
}
