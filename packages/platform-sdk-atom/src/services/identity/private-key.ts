import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

import { KeyPairService } from "./keys";

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
			const keys = new KeyPairService(this.#config);
			const { privateKey } = await keys.fromMnemonic(mnemonic);

			if (!privateKey) {
				throw new Error("Failed to derive the private key.");
			}

			return { privateKey };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
