import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { deriveWallet } from "./utils";

export class WIF implements Contracts.WIF {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		this.#config = config;
	}

	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<string> {
		try {
			return deriveWallet(
				mnemonic,
				this.#config.get<number>("network.crypto.slip44"),
				options?.bip44?.account || 0,
				options?.bip44?.change || 0,
				options?.bip44?.addressIndex || 0,
			).WIF;
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPrivateKey(privateKey: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromSecret(secret: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
