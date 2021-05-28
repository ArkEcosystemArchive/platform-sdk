import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

import { deriveWallet } from "./utils";

export class WIFService extends Services.AbstractWIFService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		super();

		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.WIFDataTransferObject> {
		try {
			return {
				wif: deriveWallet(
					mnemonic,
					this.#config.get<number>("network.constants.slip44"),
					options?.bip44?.account || 0,
					options?.bip44?.change || 0,
					options?.bip44?.addressIndex || 0,
				).WIF,
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
