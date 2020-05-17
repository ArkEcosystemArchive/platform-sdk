import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { deriveWallet } from "./utils";

export class WIF implements Contracts.WIF {
	readonly #slip44;

	public constructor(slip44: number) {
		this.#slip44 = slip44;
	}

	public async fromPassphrase(passphrase: string): Promise<string> {
		return deriveWallet(passphrase, this.#slip44).WIF;
	}
}
