import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { deriveWallet } from "./utils";

export class WIF implements Contracts.WIF {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		this.#config = config;
	}

	public async fromMnemonic(mnemonic: string): Promise<string> {
		return deriveWallet(mnemonic, this.#config.get<number>("network.crypto.slip44")).WIF;
	}
}
