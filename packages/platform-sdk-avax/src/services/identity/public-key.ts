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
		return {
			publicKey: cb58Encode(keyPairFromMnemonic(this.#config, mnemonic).getPublicKey()),
		};
	}
}
