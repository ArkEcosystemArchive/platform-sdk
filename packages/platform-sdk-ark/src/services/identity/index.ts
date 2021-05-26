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
	readonly #addressService: AddressService;
	readonly #extendedAddressService: ExtendedAddressService;
	readonly #publicKeyService: PublicKeyService;
	readonly #privateKeyService: PrivateKeyService;
	readonly #wIFService: WIFService;
	readonly #keyPairService: KeyPairService;

	private constructor(config: CryptoConfig) {
		this.#config = config;
		this.#addressService = new AddressService(this.#config);
		this.#extendedAddressService = new ExtendedAddressService();
		this.#publicKeyService = new PublicKeyService(this.#config);
		this.#privateKeyService = new PrivateKeyService(this.#config);
		this.#wIFService = new WIFService(this.#config);
		this.#keyPairService = new KeyPairService(this.#config);
	}

	public static async __construct(config: Coins.Config): Promise<IdentityService> {
		return new IdentityService(config.get("NETWORK_CONFIGURATION.crypto.network"));
	}

	public async __destruct(): Promise<void> {
		//
	}

	public address(): AddressService {
		return this.#addressService;
	}

	public extendedAddress(): ExtendedAddressService {
		return this.#extendedAddressService;
	}

	public publicKey(): PublicKeyService {
		return this.#publicKeyService;
	}

	public privateKey(): PrivateKeyService {
		return this.#privateKeyService;
	}

	public wif(): WIFService {
		return this.#wIFService;
	}

	public keyPair(): KeyPairService {
		return this.#keyPairService;
	}
}
