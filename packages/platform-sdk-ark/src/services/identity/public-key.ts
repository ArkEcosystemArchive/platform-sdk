import { Identities } from "@arkecosystem/crypto";
import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class PublicKey implements Contracts.PublicKey {
	public async fromMnemonic(mnemonic: string): Promise<string> {
		try {
			return Identities.PublicKey.fromPassphrase(mnemonic);
		} catch (error) {
			throw new Exceptions.CryptoException(error.message);
		}
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		try {
			return Identities.PublicKey.fromMultiSignatureAsset({ min, publicKeys });
		} catch (error) {
			throw new Exceptions.CryptoException(error.message);
		}
	}

	public async fromWIF(wif: string): Promise<string> {
		try {
			return Identities.PublicKey.fromWIF(wif);
		} catch (error) {
			throw new Exceptions.CryptoException(error.message);
		}
	}
}
