import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { createWallet, deriveWallet } from "./utils";

export class PublicKey implements Contracts.PublicKey {
	public async fromPassphrase(passphrase: string): Promise<string> {
		return deriveWallet(passphrase).publicKey;
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromWIF(wif: string): Promise<string> {
		return createWallet(wif).publicKey;
	}
}
