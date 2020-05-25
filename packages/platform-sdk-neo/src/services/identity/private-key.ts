import { Contracts } from "@arkecosystem/platform-sdk";

import { createWallet, deriveWallet } from "./utils";

export class PrivateKey implements Contracts.PrivateKey {
	readonly #slip44;

	public constructor(slip44: number) {
		this.#slip44 = slip44;
	}

	public async fromMnemonic(mnemonic: string): Promise<string> {
		return deriveWallet(passphrase, this.#slip44).privateKey;
	}

	public async fromWIF(wif: string): Promise<string> {
		return createWallet(wif).privateKey;
	}
}
