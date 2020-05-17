import { Identities } from "@arkecosystem/crypto";
import { Coins, Contracts } from "@arkecosystem/platform-sdk";

export class PrivateKey implements Contracts.PrivateKey {
	public async fromPassphrase(passphrase: string): Promise<string> {
		return Identities.PrivateKey.fromPassphrase(passphrase);
	}

	public async fromWIF(wif: string): Promise<string> {
		return Identities.PrivateKey.fromWIF(wif);
	}
}
