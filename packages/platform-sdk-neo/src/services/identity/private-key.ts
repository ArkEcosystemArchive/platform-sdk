import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { createWallet, deriveWallet } from "./utils";

export class PrivateKey implements Contracts.PrivateKey {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		this.#config = config;
	}

	public async fromMnemonic(mnemonic: string): Promise<string> {
		try {
			return deriveWallet(mnemonic, this.#config.get<number>("network.crypto.slip44")).privateKey;
		} catch (error) {
			throw new Exceptions.CryptoException(error.message);
		}
	}

	public async fromWIF(wif: string): Promise<string> {
		try {
			return createWallet(wif).privateKey;
		} catch (error) {
			throw new Exceptions.CryptoException(error.message);
		}
	}
}
