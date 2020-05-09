import { Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";
import { secp256k1 } from "bcrypto";

import { manifest } from "../../manifest";

export class Keys implements Contracts.Keys {
	public async fromPassphrase(passphrase: string): Promise<Contracts.KeyPair> {
		const privateKey: Buffer | undefined = Utils.BIP44.deriveChild(passphrase, {
			coinType: manifest.slip44,
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
