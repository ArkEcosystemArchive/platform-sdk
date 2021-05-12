import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { Keys } from "./keys";

export class PrivateKey implements Contracts.PrivateKey {
	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<string> {
		try {
			const { privateKey } = await new Keys().fromMnemonic(mnemonic);

			if (!privateKey) {
				throw new Error("Failed to derive the private key.");
			}

			return privateKey;
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
