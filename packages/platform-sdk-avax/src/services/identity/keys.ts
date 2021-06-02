import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { BinTools } from "avalanche";

import { cb58Encode, keyPairFromMnemonic, useKeychain } from "../helpers";

export class KeyPairService extends Services.AbstractKeyPairService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		super();

		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.KeyPairDataTransferObject> {
		const { child, path } = keyPairFromMnemonic(this.#config, mnemonic, options);

		return {
			publicKey: cb58Encode(child.getPublicKey()),
			privateKey: cb58Encode(child.getPrivateKey()),
			path,
		};
	}

	public async fromPrivateKey(privateKey: string): Promise<Services.KeyPairDataTransferObject> {
		const keyPair = useKeychain(this.#config).importKey(BinTools.getInstance().cb58Decode(privateKey));

		return {
			publicKey: cb58Encode(keyPair.getPublicKey()),
			privateKey: cb58Encode(keyPair.getPrivateKey()),
		};
	}
}
