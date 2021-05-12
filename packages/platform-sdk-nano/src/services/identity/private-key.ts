import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { deriveAccountKey } from "./helpers";

export class PrivateKey implements Contracts.PrivateKey {
	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<string> {
		return deriveAccountKey(mnemonic, options?.bip44?.account || 0).privateKey;
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
