import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { deriveKeypair } from "ripple-keypairs";

export class PrivateKey implements Contracts.PrivateKey {
	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMnemonic");
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<string> {
		return deriveKeypair(secret).privateKey;
	}
}
