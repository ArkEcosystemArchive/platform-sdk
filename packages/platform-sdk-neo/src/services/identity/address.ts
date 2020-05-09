import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { createWallet, deriveWallet } from "./utils";

export class Address implements Contracts.Address {
	public async fromPassphrase(passphrase: string): Promise<string> {
		return deriveWallet(passphrase).address;
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromPublicKey(publicKey: string): Promise<string> {
		return createWallet(publicKey).address;
	}

	public async fromPrivateKey(privateKey: string): Promise<string> {
		return createWallet(privateKey).address;
	}

	public async fromWIF(wif: string): Promise<string> {
		return createWallet(wif).address;
	}
}
