/* istanbul ignore file */

import { formatString } from "@arkecosystem/utils";
import { URL } from "url";

import { Config } from "../coins";
import { randomNetworkHostFromConfig } from "../helpers";
import { NetworkHost } from "../networks";
import { LinkService, LinkServiceSchema } from "./link.contract";

export abstract class AbstractLinkService implements LinkService {
	readonly #host: NetworkHost;
	readonly #schema: LinkServiceSchema;

	public constructor(config: Config, schema: LinkServiceSchema) {
		this.#host = randomNetworkHostFromConfig(config, "explorer");
		this.#schema = schema;
	}

	public async __destruct(): Promise<void> {
		//
	}

	public block(id: string): string {
		return this.#buildURL(this.#schema.block, id);
	}

	public transaction(id: string): string {
		return this.#buildURL(this.#schema.transaction, id);
	}

	public wallet(id: string): string {
		return this.#buildURL(this.#schema.wallet, id);
	}

	#buildURL(schema: string, id: string): string {
		const url: URL = new URL(formatString(schema, id), this.#host.host);

		if (this.#host.query) {
			url.search = new URLSearchParams(this.#host.query).toString();
		}

		return url.toString();
	}
}
