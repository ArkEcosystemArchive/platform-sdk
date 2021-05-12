import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { makeAccount } from "../helpers";

export class PublicKey implements Contracts.PublicKey {
	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<string> {
		const account = makeAccount();
		account.loadFromMnemonic(mnemonic);

		return account.publicKeyAsString();
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
