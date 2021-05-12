import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { deriveAddress, deriveKeypair } from "ripple-keypairs";

export class Address implements Contracts.Address {
	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMnemonic");
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromPublicKey(publicKey: string, options?: Contracts.IdentityOptions): Promise<string> {
		try {
			return deriveAddress(publicKey);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPrivateKey(privateKey: string, options?: Contracts.IdentityOptions): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<string> {
		return deriveAddress(deriveKeypair(secret).publicKey);
	}

	public async validate(address: string): Promise<boolean> {
		return true;
	}
}
