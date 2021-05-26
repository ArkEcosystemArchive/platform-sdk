import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { createWallet, deriveWallet } from "./utils";

export class PrivateKeyService implements Contracts.PrivateKeyService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.PrivateKeyDataTransferObject> {
		try {
			return {
				privateKey: deriveWallet(
					mnemonic,
					this.#config.get<number>("network.constants.slip44"),
					options?.bip44?.account || 0,
					options?.bip44?.change || 0,
					options?.bip44?.addressIndex || 0,
				).privateKey,
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<Contracts.PrivateKeyDataTransferObject> {
		try {
			return {
				privateKey: createWallet(wif).privateKey,
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromSecret(secret: string): Promise<Contracts.PrivateKeyDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
