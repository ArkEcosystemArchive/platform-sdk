import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { createWallet } from "./utils";

export class PrivateKey implements Contracts.PrivateKey {
	public async fromPassphrase(passphrase: string): Promise<string> {
		return createWallet(passphrase).getPrivateKey().toString("hex");
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}
}
