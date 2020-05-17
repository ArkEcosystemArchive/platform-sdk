import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { manifest } from "../../manifest";
import { Address } from "./address";
import { Keys } from "./keys";
import { PrivateKey } from "./private-key";
import { PublicKey } from "./public-key";
import { WIF } from "./wif";

export class IdentityService implements Contracts.IdentityService {
	readonly #slip44;
	readonly #bech32;

	public constructor(network: string) {
		this.#slip44 = manifest.networks[network].crypto.slip44;
		this.#bech32 = manifest.networks[network].crypto.bech32;
	}

	public static async construct(config: Coins.Config): Promise<IdentityService> {
		return new IdentityService(config.get("network"));
	}

	public async destruct(): Promise<void> {
		//
	}

	public address(): Address {
		return new Address(this.#slip44, this.#bech32);
	}

	public publicKey(): PublicKey {
		return new PublicKey(this.#slip44);
	}

	public privateKey(): PrivateKey {
		return new PrivateKey(this.#slip44);
	}

	public wif(): WIF {
		return new WIF();
	}

	public keys(): Keys {
		return new Keys(this.#slip44);
	}
}
