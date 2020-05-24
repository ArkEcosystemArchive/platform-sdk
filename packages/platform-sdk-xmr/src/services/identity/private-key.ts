import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class PrivateKey implements Contracts.PrivateKey {
	public async fromPassphrase(passphrase: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPassphrase");
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}
}
