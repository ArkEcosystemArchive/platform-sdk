import { Identities } from "@arkecosystem/crypto";
import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class PrivateKey implements Contracts.PrivateKey {
	public async fromMnemonic(mnemonic: string): Promise<string> {
		try {
			return Identities.PrivateKey.fromPassphrase(mnemonic);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<string> {
		try {
			return Identities.PrivateKey.fromWIF(wif);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
