/* istanbul ignore file */

import { formatString } from "@arkecosystem/utils";
import { URL } from "url";

import { ConfigRepository } from "../coins";
import { randomNetworkHostFromConfig } from "../helpers";
import { inject, postConstruct } from "../ioc";
import { BindingType } from "../ioc/service-provider.contract";
import { NetworkHost } from "../networks";
import { LinkService, LinkServiceSchema } from "./link.contract";

export abstract class AbstractLinkService implements LinkService {
	@inject(BindingType.ConfigRepository)
	private readonly configRepository!: ConfigRepository;

	#host!: NetworkHost;

	public async __destruct(): Promise<void> {
		//
	}

	public block(id: string): string {
		return this.#buildURL(this.schema().block, id);
	}

	public transaction(id: string): string {
		return this.#buildURL(this.schema().transaction, id);
	}

	public wallet(id: string): string {
		return this.#buildURL(this.schema().wallet, id);
	}

	protected abstract schema(): LinkServiceSchema;

	@postConstruct()
	private __construct(): void {
		this.#host = randomNetworkHostFromConfig(this.configRepository, "explorer");
	}

	#buildURL(schema: string, id: string): string {
		const url: URL = new URL(formatString(schema, id), this.#host.host);

		if (this.#host.query) {
			url.search = new URLSearchParams(this.#host.query).toString();
		}

		return url.toString();
	}
}
