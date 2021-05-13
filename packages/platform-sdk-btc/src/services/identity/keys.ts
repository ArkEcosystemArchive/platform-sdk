import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP32 } from "@arkecosystem/platform-sdk-crypto";
import { PrivateKey, PublicKey } from "bitcore-lib";

export class Keys implements Contracts.Keys {
	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<Contracts.KeyPair> {
		try {
			return this.normalize(new PrivateKey(BIP32.fromMnemonic(mnemonic).privateKey!.toString("hex")));
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPair> {
		try {
			return this.normalize(new PrivateKey(privateKey));
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<Contracts.KeyPair> {
		try {
			return this.normalize(PrivateKey.fromWIF(wif));
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromSecret(secret: string): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}

	private normalize(privateKey: Buffer): Contracts.KeyPair {
		try {
			return {
				publicKey: PublicKey.fromPrivateKey(privateKey).toString("hex"),
				privateKey: privateKey.toString("hex"),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
