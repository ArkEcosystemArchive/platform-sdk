import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { makeAccount } from "../helpers";

export class Address implements Contracts.Address {
	public async fromMnemonic(mnemonic: string): Promise<string> {
		const account = makeAccount();
		account.loadFromMnemonic(mnemonic);

		return account.address();
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromPublicKey(publicKey: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPublicKey");
	}

	public async fromPrivateKey(privateKey: string): Promise<string> {
		const account = makeAccount();
		account.loadFromHexPrivateKey(privateKey);

		return account.address();
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async validate(address: string): Promise<boolean> {
		return true;
	}
}
