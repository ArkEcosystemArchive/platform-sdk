import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { createWallet } from "./utils";

export class PrivateKey implements Contracts.PrivateKey {
	readonly #slip44;

	public constructor(slip44: number) {
		this.#slip44 = slip44;
	}

	public async fromMnemonic(mnemonic: string): Promise<string> {
		return createWallet(passphrase, this.#slip44)
			.getPrivateKey()
			.toString("hex");
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}
}
