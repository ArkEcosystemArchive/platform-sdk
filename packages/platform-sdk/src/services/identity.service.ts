/* istanbul ignore file */

import {
	AddressService,
	ExtendedAddressService,
	IdentityService,
	KeyPairService,
	PrivateKeyService,
	PublicKeyService,
	WIFService,
} from "./identity.contract";

interface Services {
	address: AddressService;
	extendedAddress: ExtendedAddressService;
	keyPair: KeyPairService;
	privateKey: PrivateKeyService;
	publicKey: PublicKeyService;
	wif: WIFService;
}

export abstract class AbstractIdentityService implements IdentityService {
	readonly #services: Services;

	protected constructor(services: Services) {
		this.#services = services;
	}

	public async __destruct(): Promise<void> {
		//
	}

	public address(): AddressService {
		return this.#services.address;
	}

	public extendedAddress(): ExtendedAddressService {
		return this.#services.extendedAddress;
	}

	public keyPair(): KeyPairService {
		return this.#services.keyPair;
	}

	public privateKey(): PrivateKeyService {
		return this.#services.privateKey;
	}

	public publicKey(): PublicKeyService {
		return this.#services.publicKey;
	}

	public wif(): WIFService {
		return this.#services.wif;
	}
}
