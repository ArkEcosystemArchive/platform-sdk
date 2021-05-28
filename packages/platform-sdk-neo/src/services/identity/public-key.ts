import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

import { createWallet, deriveWallet } from "./utils";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		super();

		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.PublicKeyDataTransferObject> {
		try {
			return {
				publicKey: deriveWallet(
					mnemonic,
					this.#config.get<number>("network.constants.slip44"),
					options?.bip44?.account || 0,
					options?.bip44?.change || 0,
					options?.bip44?.addressIndex || 0,
				).publicKey,
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<Contracts.PublicKeyDataTransferObject> {
		try {
			return {
				publicKey: createWallet(wif).publicKey,
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
