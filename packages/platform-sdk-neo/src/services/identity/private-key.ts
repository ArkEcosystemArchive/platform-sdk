import { Contracts } from "@arkecosystem/platform-sdk";

import { createWallet, deriveWallet } from "./utils";

export class PrivateKey implements Contracts.PrivateKey {
	public async fromPassphrase(passphrase: string): Promise<string> {
		return deriveWallet(passphrase).privateKey;
	}

	public async fromWIF(wif: string): Promise<string> {
		return createWallet(wif).privateKey;
	}
}
