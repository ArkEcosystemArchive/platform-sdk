import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { deriveKeyPair, deriveWallet } from "./utils";

export class Keys implements Contracts.Keys {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		this.#config = config;
	}

	public async fromMnemonic(mnemonic: string): Promise<Contracts.KeyPair> {
		try {
			const { publicKey, privateKey } = deriveWallet(mnemonic, this.#config.get<number>("network.crypto.slip44"));

			return { publicKey, privateKey };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPair> {
		try {
			return deriveKeyPair(privateKey);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<Contracts.KeyPair> {
		try {
			return deriveKeyPair(wif);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
