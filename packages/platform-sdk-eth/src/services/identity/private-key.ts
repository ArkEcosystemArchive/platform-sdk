import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

import { createWallet } from "./utils";

export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		super();

		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.PrivateKeyDataTransferObject> {
		try {
			return {
				privateKey: createWallet(
					mnemonic,
					this.#config.get(Coins.ConfigKey.Slip44),
					options?.bip44?.account || 0,
					options?.bip44?.change || 0,
					options?.bip44?.addressIndex || 0,
				)
					.getPrivateKey()
					.toString("hex"),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
