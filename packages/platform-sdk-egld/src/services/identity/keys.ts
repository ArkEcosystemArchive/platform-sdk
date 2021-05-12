import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { makeAccount } from "../helpers";

export class Keys implements Contracts.Keys {
	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<Contracts.KeyPair> {
		const account = makeAccount();
		account.loadFromMnemonic(mnemonic);

		return {
			publicKey: account.publicKeyAsString(),
			privateKey: account.privateKeyAsString(),
		};
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPair> {
		const account = makeAccount();
		account.loadFromHexPrivateKey(privateKey);

		return {
			publicKey: account.publicKeyAsString(),
			privateKey: account.privateKeyAsString(),
		};
	}

	public async fromWIF(wif: string): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
