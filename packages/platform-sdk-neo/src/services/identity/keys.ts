import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

import { deriveKeyPair, deriveWallet } from "./utils";

export class KeyPairService extends Services.AbstractKeyPairService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		super();

		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.KeyPairDataTransferObject> {
		try {
			const { publicKey, privateKey } = deriveWallet(
				mnemonic,
				this.#config.get<number>("network.constants.slip44"),
				options?.bip44?.account || 0,
				options?.bip44?.change || 0,
				options?.bip44?.addressIndex || 0,
			);

			return { publicKey, privateKey };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPairDataTransferObject> {
		try {
			return deriveKeyPair(privateKey);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<Contracts.KeyPairDataTransferObject> {
		try {
			return deriveKeyPair(wif);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
