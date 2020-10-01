import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { CryptoConfig } from "../../contracts";
import { retrieveCryptoConfiguration } from "../helpers";

import { Address } from "./address";
import { Keys } from "./keys";
import { PrivateKey } from "./private-key";
import { PublicKey } from "./public-key";
import { WIF } from "./wif";

export class IdentityService implements Contracts.IdentityService {
	readonly #config: Coins.Config;
	readonly #configCrypto: CryptoConfig;

	private constructor(config: Coins.Config, configCrypto: any) {
		this.#config = config;
		this.#configCrypto = {
			pubKeyHash: configCrypto.network.pubKeyHash,
			wif: configCrypto.network.wif,
		};
	}

	public static async construct(config: Coins.Config): Promise<IdentityService> {
		return new IdentityService(config, (await retrieveCryptoConfiguration(config)).crypto);
	}

	public async destruct(): Promise<void> {
		//
	}

	public address(): Address {
		return new Address(this.#config, this.#configCrypto);
	}

	public publicKey(): PublicKey {
		return new PublicKey(this.#configCrypto);
	}

	public privateKey(): PrivateKey {
		return new PrivateKey(this.#configCrypto);
	}

	public wif(): WIF {
		return new WIF(this.#configCrypto);
	}

	public keys(): Keys {
		return new Keys(this.#configCrypto);
	}
}
