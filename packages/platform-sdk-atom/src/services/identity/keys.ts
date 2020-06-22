import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-crypto";
import { secp256k1 } from "bcrypto";

export class Keys implements Contracts.Keys {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		this.#config = config;
	}

	public async fromMnemonic(mnemonic: string): Promise<Contracts.KeyPair> {
		const privateKey: Buffer | undefined = BIP44.deriveChild(mnemonic, {
			coinType: this.#config.get("network.crypto.slip44"),
			index: 0,
		}).privateKey;

		if (!privateKey) {
			throw new Error("Failed to derive private key.");
		}

		return {
			publicKey: secp256k1.publicKeyCreate(privateKey, true).toString("hex"),
			privateKey: privateKey.toString("hex"),
		};
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}
}
