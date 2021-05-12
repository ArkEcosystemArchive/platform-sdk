import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP32 } from "@arkecosystem/platform-sdk-crypto";
import Bitcoin from "bitcore-lib";

export class PrivateKey implements Contracts.PrivateKey {
	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<string> {
		try {
			return BIP32.fromMnemonic(mnemonic).privateKey!.toString("hex");
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<string> {
		try {
			const privateKey: Buffer = Bitcoin.PrivateKey.fromWIF(wif);

			if (!privateKey) {
				throw new Error(`Failed to derive private key for [${wif}].`);
			}

			return privateKey.toString("hex");
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromSecret(secret: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
