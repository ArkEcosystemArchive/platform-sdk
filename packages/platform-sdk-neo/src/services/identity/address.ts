import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

import { createWallet, deriveWallet } from "./utils";

export class AddressService extends Services.AbstractAddressService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		super();

		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		try {
			return {
				type: "bip44",
				address: deriveWallet(
					mnemonic,
					this.#config.get<number>("network.constants.slip44"),
					options?.bip44?.account || 0,
					options?.bip44?.change || 0,
					options?.bip44?.addressIndex || 0,
				).address,
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
				type: "bip44",
				address: createWallet(publicKey).address,
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
				type: "bip44",
				address: createWallet(privateKey).address,
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<Services.AddressDataTransferObject> {
		try {
			return {
				type: "bip44",
				address: createWallet(wif).address,
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async validate(address: string): Promise<boolean> {
		try {
			return address.length === 34;
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
