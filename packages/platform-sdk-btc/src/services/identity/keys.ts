import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-crypto";
import { PrivateKey, PublicKey } from "bitcore-lib";

export class Keys implements Contracts.Keys {
	public async fromMnemonic(mnemonic: string): Promise<Contracts.KeyPair> {
		try {
			return this.normalize(new PrivateKey(BIP44.deriveMasterKey(mnemonic).privateKey!.toString("hex")));
		} catch (error) {
			throw new Exceptions.CryptoException(error.message);
		}
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPair> {
		try {
			return this.normalize(new PrivateKey(privateKey));
		} catch (error) {
			throw new Exceptions.CryptoException(error.message);
		}
	}

	public async fromWIF(wif: string): Promise<Contracts.KeyPair> {
		try {
			return this.normalize(PrivateKey.fromWIF(wif));
		} catch (error) {
			throw new Exceptions.CryptoException(error.message);
		}
	}

	private normalize(privateKey: Buffer): Contracts.KeyPair {
		try {
			return {
				publicKey: PublicKey.fromPrivateKey(privateKey).toString("hex"),
				privateKey: privateKey.toString("hex"),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error.message);
		}
	}
}
