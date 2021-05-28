export abstract class AbstractValueSignatory {
	readonly #signingKey: string;
	readonly #address: string;
	readonly #publicKey: string;

	public constructor({ signingKey, address, publicKey }: { signingKey: string; address: string; publicKey: string }) {
		this.#signingKey = signingKey;
		this.#address = address;
		this.#publicKey = publicKey;
	}

	public signingKey(): string {
		return this.#signingKey.normalize("NFD");
	}

	public address(): string {
		return this.#address;
	}

	public publicKey(): string {
		return this.#publicKey;
	}
}
