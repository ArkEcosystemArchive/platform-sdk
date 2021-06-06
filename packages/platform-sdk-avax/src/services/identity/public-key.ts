import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

import { cb58Encode, keyPairFromMnemonic } from "../helpers";

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
		const { child, path } = keyPairFromMnemonic(this.#config, mnemonic, options);

		return {
			publicKey: cb58Encode(child.getPublicKey()),
			path,
		};
	}
}
