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
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.KeyPairDataTransferObject> {
		const keyPair = keyPairFromMnemonic(this.#config, mnemonic);

		return {
			publicKey: cb58Encode(keyPair.getPublicKey()),
			privateKey: cb58Encode(keyPair.getPrivateKey()),
		};
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPairDataTransferObject> {
		const keyPair = useKeychain(this.#config).importKey(BinTools.getInstance().cb58Decode(privateKey));

		return {
			publicKey: cb58Encode(keyPair.getPublicKey()),
			privateKey: cb58Encode(keyPair.getPrivateKey()),
		};
	}
}
