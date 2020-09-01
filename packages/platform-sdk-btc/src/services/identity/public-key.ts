import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-crypto";
import Bitcoin from "bitcore-lib";

export class PublicKey implements Contracts.PublicKey {
	public async fromMnemonic(mnemonic: string): Promise<string> {
		try {
			return BIP44.deriveMasterKey(mnemonic).publicKey.toString("hex");
		} catch (error) {
			throw new Exceptions.CryptoException(error.message);
		}
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromWIF(wif: string): Promise<string> {
		try {
			return Bitcoin.PrivateKey.fromWIF(wif).toPublicKey().toString();
		} catch (error) {
			throw new Exceptions.CryptoException(error.message);
		}
	}
}
