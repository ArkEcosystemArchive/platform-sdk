import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { createWallet, deriveWallet } from "./utils";

export class PublicKey implements Contracts.PublicKey {
	readonly #slip44;

	public constructor(slip44: number) {
		this.#slip44 = slip44;
	}

	public async fromPassphrase(passphrase: string): Promise<string> {
		return deriveWallet(passphrase, this.#slip44).publicKey;
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromWIF(wif: string): Promise<string> {
		return createWallet(wif).publicKey;
	}
}
