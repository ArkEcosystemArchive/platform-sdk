import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { Keys } from "./keys";

export class PublicKey implements Contracts.PublicKey {
	public async fromMnemonic(mnemonic: string): Promise<string> {
		try {
			// root extended publicKey
			const { publicKey } = await new Keys().fromMnemonic(mnemonic);

			return publicKey!;
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}
}
