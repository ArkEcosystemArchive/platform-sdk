import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

import { cb58Encode, keyPairFromMnemonic } from "../helpers";

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
		const { child, path } = keyPairFromMnemonic(this.#config, mnemonic, options);

		return {
			privateKey: cb58Encode(child.getPrivateKey()),
			path,
		};
	}
}
