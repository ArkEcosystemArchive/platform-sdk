import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

import { cb58Encode, keyPairFromMnemonic } from "../helpers";

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
		const { child, path } = keyPairFromMnemonic(this.#config, mnemonic, options);

		return {
			publicKey: cb58Encode(child.getPublicKey()),
			path,
		};
	}
}
