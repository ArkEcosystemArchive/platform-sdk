import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { deriveKeypair } from "ripple-keypairs";

export class PublicKey implements Contracts.PublicKey {
	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMnemonic");
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<string> {
		return deriveKeypair(secret).publicKey;
	}
}
