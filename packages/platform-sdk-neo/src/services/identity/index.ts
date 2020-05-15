import { Contracts } from "@arkecosystem/platform-sdk";

import { manifest } from "../../manifest";
import { Address } from "./address";
import { Keys } from "./keys";
import { PrivateKey } from "./private-key";
import { PublicKey } from "./public-key";
import { WIF } from "./wif";

export class IdentityService implements Contracts.IdentityService {
	readonly #slip44;

	public constructor(network: string) {
		(this.#slip44 = manifest.networks[network].slip44), `${network}.slip44`;
	}

	public static async construct(opts: Contracts.KeyValuePair): Promise<IdentityService> {
		return new IdentityService(opts.network);
	}

	public async destruct(): Promise<void> {
		//
	}

	public address(): Address {
		return new Address(this.#slip44);
	}

	public publicKey(): PublicKey {
		return new PublicKey(this.#slip44);
	}

	public privateKey(): PrivateKey {
		return new PrivateKey(this.#slip44);
	}

	public wif(): WIF {
		return new WIF(this.#slip44);
	}

	public keys(): Keys {
		return new Keys(this.#slip44);
	}
}
