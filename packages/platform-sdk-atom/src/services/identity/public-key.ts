import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

import { KeyPairService } from "./keys";

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
			const keys = new KeyPairService(this.#config);
			const { publicKey } = await keys.fromMnemonic(mnemonic);

			if (!publicKey) {
				throw new Error("Failed to derive the public key.");
			}

			return { publicKey };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
