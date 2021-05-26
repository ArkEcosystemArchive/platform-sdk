import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BinTools } from "avalanche";

import { cb58Encode, keyPairFromMnemonic, useKeychain } from "../helpers";

export class KeyPairService implements Contracts.KeyPairService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
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

	public async fromWIF(wif: string): Promise<Contracts.KeyPairDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<Contracts.KeyPairDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
