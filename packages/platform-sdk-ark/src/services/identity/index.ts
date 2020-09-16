import { Managers } from "@arkecosystem/crypto";
import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { retrieveCryptoConfiguration } from "../helpers";

import { Address } from "./address";
import { Keys } from "./keys";
import { PrivateKey } from "./private-key";
import { PublicKey } from "./public-key";
import { WIF } from "./wif";

export class IdentityService implements Contracts.IdentityService {
	readonly #config: Coins.Config;

	private constructor(config: Coins.Config) {
		this.#config = config;
	}

	public static async construct(config: Coins.Config): Promise<IdentityService> {
		await retrieveCryptoConfiguration(config);

		return new IdentityService(config);
	}

	public async destruct(): Promise<void> {
		//
	}

	public address(): Address {
		return new Address(this.#config);
	}

	public publicKey(): PublicKey {
		return new PublicKey();
	}

	public privateKey(): PrivateKey {
		return new PrivateKey();
	}

	public wif(): WIF {
		return new WIF();
	}

	public keys(): Keys {
		return new Keys();
	}
}
