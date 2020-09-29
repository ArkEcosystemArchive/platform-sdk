import { get } from "dot-prop";

import { CoinNetwork } from "./network.models";
import { Config } from "./config";
import { Manifest } from "./manifest";

export class Network {
	readonly #network: CoinNetwork;
	readonly #featureFlags: object;

	public constructor(config: Config, manifest: Manifest) {
		this.#network = config.get("network");
		this.#featureFlags = manifest.get<object>("featureFlags")!;
	}

	public all(): CoinNetwork {
		return this.#network;
	}

	public can(ability: string): boolean {
		return get(this.#featureFlags, ability) === true;
	}

	public cannot(ability: string): boolean {
		return !this.can(ability);
	}

	public check(ability: string): void {
		if (this.cannot(ability)) {
			throw new Error(`The [${ability}] ability is not supported.`);
		}
	}
}
