import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { CryptoConfig } from "../../contracts";
import { AddressService } from "./address";
import { ExtendedAddressService } from "./address-list";
import { KeyPairService } from "./keys";
import { PrivateKeyService } from "./private-key";
import { PublicKeyService } from "./public-key";
import { WIFService } from "./wif";

export class IdentityService implements Contracts.IdentityService {
	readonly #config: CryptoConfig;

	private constructor(config: CryptoConfig) {
		this.#config = config;
	}

	public static async __construct(config: Coins.Config): Promise<IdentityService> {
		return new IdentityService(config.get("NETWORK_CONFIGURATION.crypto.network"));
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
		return new PublicKeyService(this.#config);
	}

	public privateKey(): PrivateKeyService {
		return new PrivateKeyService(this.#config);
	}

	public wif(): WIFService {
		return new WIFService(this.#config);
	}

	public keyPair(): KeyPairService {
		return new KeyPairService(this.#config);
	}
}
