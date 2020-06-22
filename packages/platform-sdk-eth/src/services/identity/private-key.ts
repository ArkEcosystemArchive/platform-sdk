import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { createWallet } from "./utils";

export class PrivateKey implements Contracts.PrivateKey {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		this.#config = config;
	}

	public async fromMnemonic(mnemonic: string): Promise<string> {
		return createWallet(mnemonic, this.#config.get("network.crypto.slip44"))
			.getPrivateKey()
			.toString("hex");
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}
}
