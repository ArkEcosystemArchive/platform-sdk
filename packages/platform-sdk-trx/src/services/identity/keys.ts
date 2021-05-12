import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class Keys implements Contracts.Keys {
	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMnemonic");
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
