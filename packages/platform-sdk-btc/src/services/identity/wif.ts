import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-crypto";

export class WIF implements Contracts.WIF {
	public async fromMnemonic(mnemonic: string): Promise<string> {
		try {
			return BIP44.deriveMasterKey(mnemonic).toWIF();
		} catch (error) {
			throw new Exceptions.CryptoException(error.message);
		}
	}
}
