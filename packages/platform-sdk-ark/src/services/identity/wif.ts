import { Identities } from "@arkecosystem/crypto";
import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class WIF implements Contracts.WIF {
	public async fromMnemonic(mnemonic: string): Promise<string> {
		try {
			return Identities.WIF.fromPassphrase(mnemonic);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
