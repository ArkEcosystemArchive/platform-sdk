/* istanbul ignore file */

import { formatString } from "@arkecosystem/utils";
import onetime from "onetime";
import { URL } from "url";

import { ConfigRepository } from "../coins";
import { randomNetworkHostFromConfig } from "../helpers";
import { inject, injectable } from "../ioc";
import { BindingType } from "../ioc/service-provider.contract";
import { LinkService } from "./link.contract";

@injectable()
export class AbstractLinkService implements LinkService {
	@inject(BindingType.ConfigRepository)
	private readonly configRepository!: ConfigRepository;

	public block(id: string): string {
		return this.#buildURL(this.configRepository.get("network.explorer.block"), id);
	}

	public transaction(id: string): string {
		return this.#buildURL(this.configRepository.get("network.explorer.transaction"), id);
	}

	public wallet(id: string): string {
		return this.#buildURL(this.configRepository.get("network.explorer.wallet"), id);
	}

	#buildURL(schema: string, id: string): string {
		const { host, query } = onetime(() => randomNetworkHostFromConfig(this.configRepository, "explorer"))();
		const url: URL = new URL(formatString(schema, id), host);

		if (query) {
			url.search = new URLSearchParams(query).toString();
		}

		return url.toString();
	}
}
