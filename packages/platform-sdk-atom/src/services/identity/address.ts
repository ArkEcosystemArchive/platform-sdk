import { Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";
import bech32 from "bech32";

import { manifest } from "../../manifest";

export class Address implements Contracts.Address {
	public async fromPassphrase(passphrase: string): Promise<string> {
		const child = Utils.BIP44.deriveChild(passphrase, { coinType: manifest.slip44, index: 0 });
		const words = bech32.toWords(child.identifier);

		return bech32.encode(manifest.bech32Prefix, words);
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromPublicKey(publicKey: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPublicKey");
	}

	public async fromPrivateKey(privateKey: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}
}
