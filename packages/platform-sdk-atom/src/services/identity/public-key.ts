import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { Keys } from "./keys";

export class PublicKey implements Contracts.PublicKey {
	readonly #keys: Keys;

	public constructor() {
		this.#keys = new Keys();
	}

	public async fromPassphrase(passphrase: string): Promise<string> {
		const { publicKey } = await this.#keys.fromPassphrase(passphrase);

		if (!publicKey) {
			throw new Error("Failed to derive the public key.");
		}

		return publicKey;
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}
}
