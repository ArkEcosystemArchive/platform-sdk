import { Contracts } from "@arkecosystem/platform-sdk";

import { deriveWallet } from "./utils";

export class WIF implements Contracts.WIF {
	readonly #slip44;

	public constructor(slip44: number) {
		this.#slip44 = slip44;
	}

	public async fromMnemonic(mnemonic: string): Promise<string> {
		return deriveWallet(mnemonic, this.#slip44).WIF;
	}
}
