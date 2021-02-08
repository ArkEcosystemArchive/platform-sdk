import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { keyPairFromMnemonic } from "../helpers";

export class PrivateKey implements Contracts.PrivateKey {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		this.#config = config;
	}

	public async fromMnemonic(mnemonic: string): Promise<string> {
		return keyPairFromMnemonic(this.#config, mnemonic).getPrivateKeyString();
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}
}
