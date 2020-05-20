import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { Keys } from "./keys";

export class PrivateKey implements Contracts.PrivateKey {
	readonly #keys: Keys;

	public constructor(slip44: number) {
		this.#keys = new Keys(slip44);
	}

	public async fromPassphrase(passphrase: string): Promise<string> {
		const { privateKey } = await this.#keys.fromPassphrase(passphrase);

		if (!privateKey) {
			throw new Error("Failed to derive the private key.");
		}

		return privateKey;
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}
}
