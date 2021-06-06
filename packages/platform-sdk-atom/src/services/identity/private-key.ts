import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

import { KeyPairService } from "./key-pair";

export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	readonly #config: Coins.ConfigRepository;

	public constructor(config: Coins.ConfigRepository) {
		super();

		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PrivateKeyDataTransferObject> {
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
