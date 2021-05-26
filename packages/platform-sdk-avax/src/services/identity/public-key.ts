import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { cb58Encode, keyPairFromMnemonic } from "../helpers";

export class PublicKeyService implements Contracts.PublicKeyService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
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

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<Contracts.PublicKeyDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromWIF(wif: string): Promise<Contracts.PublicKeyDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<Contracts.PublicKeyDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
