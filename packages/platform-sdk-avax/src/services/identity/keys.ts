import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BinTools } from "avalanche"

import { useKeychain } from "../helpers";

export class Keys implements Contracts.Keys {
	readonly #keychain;

	public constructor(config: Coins.Config) {
		this.#keychain = useKeychain(config);
	}

	public async fromMnemonic(mnemonic: string): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMnemonic");
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPair> {
		return {
			publicKey: this.#keychain.importKey(BinTools.getInstance().cb58Decode(privateKey)).getPublicKeyString(),
			privateKey,
		};
	}

	public async fromWIF(wif: string): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}
}
