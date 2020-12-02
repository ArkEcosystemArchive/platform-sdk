// import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { Keys } from "./keys";

export class PrivateKey implements Contracts.PrivateKey {
	public async fromMnemonic(mnemonic: string): Promise<string> {
		try {
			const { privateKey } = await new Keys().fromMnemonic(mnemonic);

			return privateKey!;
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}
}
