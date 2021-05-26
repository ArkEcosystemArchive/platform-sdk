import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { cb58Encode, keyPairFromMnemonic } from "../helpers";

export class PrivateKeyService implements Contracts.PrivateKeyService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.PrivateKeyDataTransferObject> {
		return {
			privateKey: cb58Encode(keyPairFromMnemonic(this.#config, mnemonic).getPrivateKey()),
		};
	}

	public async fromWIF(wif: string): Promise<Contracts.PrivateKeyDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<Contracts.PrivateKeyDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
