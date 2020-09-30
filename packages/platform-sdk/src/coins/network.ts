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

	public can(feature: string): boolean {
		return get(this.#featureFlags, feature) === true;
	}

	public cannot(feature: string): boolean {
		return !this.can(feature);
	}

	public check(feature: string): void {
		if (this.cannot(feature)) {
			throw new Error(`The [${feature}] feature flag is not accessible.`);
		}
	}

	public toJson(): string {
		return JSON.stringify(this.#network);
	}
}
