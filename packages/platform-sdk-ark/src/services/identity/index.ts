import { Managers } from "@arkecosystem/crypto";
import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { applyCryptoConfiguration, retrieveCryptoConfiguration } from "../helpers";

import { Address } from "./address";
import { Keys } from "./keys";
import { PrivateKey } from "./private-key";
import { PublicKey } from "./public-key";
import { WIF } from "./wif";

export class IdentityService implements Contracts.IdentityService {
	readonly #config: Coins.Config;
	readonly #configCrypto: any;

	private constructor(config: Coins.Config, configCrypto: any) {
		this.#config = config;
		this.#configCrypto = configCrypto;
	}

	public static async construct(config: Coins.Config): Promise<IdentityService> {
		return new IdentityService(config, await retrieveCryptoConfiguration(config));
	}

	public async destruct(): Promise<void> {
		//
	}

	public address(): Address {
		applyCryptoConfiguration(this.#configCrypto);

		return new Address(this.#config);
	}

	public publicKey(): PublicKey {
		applyCryptoConfiguration(this.#configCrypto);

		return new PublicKey();
	}

	public privateKey(): PrivateKey {
		applyCryptoConfiguration(this.#configCrypto);

		return new PrivateKey();
	}

	public wif(): WIF {
		applyCryptoConfiguration(this.#configCrypto);

		return new WIF();
	}

	public keys(): Keys {
		applyCryptoConfiguration(this.#configCrypto);

		return new Keys();
	}
}
