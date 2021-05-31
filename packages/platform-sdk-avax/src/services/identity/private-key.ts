import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

import { cb58Encode, keyPairFromMnemonic } from "../helpers";

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
		const { child, path } = keyPairFromMnemonic(this.#config, mnemonic, options);

		return {
			privateKey: cb58Encode(child.getPrivateKey()),
			path,
		};
	}
}
