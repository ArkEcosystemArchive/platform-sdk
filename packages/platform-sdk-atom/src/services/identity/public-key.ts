import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

import { KeyPairService } from "./key-pair";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	readonly #config: Coins.ConfigRepository;

	public constructor(config: Coins.ConfigRepository) {
		super();

		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PublicKeyDataTransferObject> {
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
