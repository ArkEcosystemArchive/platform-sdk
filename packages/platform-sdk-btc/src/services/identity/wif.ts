import { Contracts, Utils } from "@arkecosystem/platform-sdk";

export class WIF implements Contracts.WIF {
	public async fromPassphrase(passphrase: string): Promise<string> {
		return BIP44.deriveMasterKey(passphrase).toWIF();
	}
}
