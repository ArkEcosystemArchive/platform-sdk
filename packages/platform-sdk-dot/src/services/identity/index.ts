import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { cryptoWaitReady } from "@polkadot/util-crypto";

import { AddressService } from "./address";
import { ExtendedAddressService } from "./address-list";
import { KeyPairService } from "./keys";
import { PrivateKeyService } from "./private-key";
import { PublicKeyService } from "./public-key";
import { WIFService } from "./wif";

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

	public address(): AddressService {
		return new AddressService(this.#config);
	}

	public extendedAddress(): ExtendedAddressService {
		return new ExtendedAddressService();
	}

	public publicKey(): PublicKeyService {
		return new PublicKeyService();
	}

	public privateKey(): PrivateKeyService {
		return new PrivateKeyService();
	}

	public wif(): WIFService {
		return new WIFService();
	}

	public keyPair(): KeyPairService {
		return new KeyPairService();
	}
}
