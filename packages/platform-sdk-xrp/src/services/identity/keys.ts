import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { deriveKeypair } from "ripple-keypairs";

export class Keys implements Contracts.Keys {
	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<Contracts.KeyPair> {
		try {
			return deriveKeypair(mnemonic);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}
}
