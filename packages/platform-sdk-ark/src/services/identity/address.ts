import { Address as BaseAddress, Keys } from "@arkecosystem/crypto-identities";
import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

import { CryptoConfig } from "../../contracts";

export class AddressService extends Services.AbstractAddressService {
	readonly #config: CryptoConfig;

	public constructor(config: CryptoConfig) {
		super();

		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		try {
			return {
				type: "bip39",
				address: BaseAddress.fromPassphrase(mnemonic, this.#config),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<Services.AddressDataTransferObject> {
		try {
			return {
				type: "bip39",
				address: BaseAddress.fromMultiSignatureAsset({ min, publicKeys }, this.#config),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPublicKey(
		publicKey: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		try {
			return {
				type: "bip39",
				address: BaseAddress.fromPublicKey(publicKey, this.#config),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPrivateKey(
		privateKey: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		try {
			return {
				type: "bip39",
				address: BaseAddress.fromPrivateKey(Keys.fromPrivateKey(privateKey), this.#config),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<Services.AddressDataTransferObject> {
		try {
			return {
				type: "bip39",
				address: BaseAddress.fromWIF(wif, this.#config),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async validate(address: string): Promise<boolean> {
		try {
			return BaseAddress.validate(address, this.#config);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
