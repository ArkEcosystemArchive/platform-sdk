import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { createWallet, deriveWallet } from "./utils";

export class PublicKey implements Contracts.PublicKey {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		this.#config = config;
	}

	public async fromMnemonic(mnemonic: string): Promise<string> {
		try {
			return deriveWallet(mnemonic, this.#config.get<number>("network.crypto.slip44")).publicKey;
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromWIF(wif: string): Promise<string> {
		try {
			return createWallet(wif).publicKey;
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
