import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { cryptoWaitReady } from "@polkadot/util-crypto";

import { Address } from "./address";
import { AddressList } from "./address-list";
import { Keys } from "./keys";
import { PrivateKey } from "./private-key";
import { PublicKey } from "./public-key";
import { WIF } from "./wif";

export class IdentityService implements Contracts.IdentityService {
	readonly #config: Coins.Config;

	private constructor(config: Coins.Config) {
		this.#config = config;
	}

	public static async __construct(config: Coins.Config): Promise<IdentityService> {
		await cryptoWaitReady();

		return new IdentityService(config);
	}

	public async __destruct(): Promise<void> {
		//
	}

	public address(): Address {
		return new Address(this.#config);
	}

	public addressList(): AddressList {
		return new AddressList();
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
