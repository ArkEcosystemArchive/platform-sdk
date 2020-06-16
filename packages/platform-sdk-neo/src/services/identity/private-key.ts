import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { createWallet, deriveWallet } from "./utils";

export class PrivateKey implements Contracts.PrivateKey {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		this.#config = config;
	}

	public async fromMnemonic(mnemonic: string): Promise<string> {
		return deriveWallet(mnemonic, this.#config.get<number>("network.crypto.slip44")).privateKey;
	}

	public async fromWIF(wif: string): Promise<string> {
		return createWallet(wif).privateKey;
	}
}
