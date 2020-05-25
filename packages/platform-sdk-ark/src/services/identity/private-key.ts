import { Identities } from "@arkecosystem/crypto";
import { Contracts } from "@arkecosystem/platform-sdk";

export class PrivateKey implements Contracts.PrivateKey {
	public async fromMnemonic(mnemonic: string): Promise<string> {
		return Identities.PrivateKey.fromMnemonic(passphrase);
	}

	public async fromWIF(wif: string): Promise<string> {
		return Identities.PrivateKey.fromWIF(wif);
	}
}
