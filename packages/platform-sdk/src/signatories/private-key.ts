export class PrivateKeySignatory {
	readonly #signingKey: string;
	readonly #address: string;

	public constructor({
		signingKey,
		address,
	}: {
		signingKey: string;
		address: string;
	}) {
		this.#signingKey = signingKey;
		this.#address = address;
	}

	public signingKey(): string {
		return this.#signingKey;
	}

	public address(): string {
		return this.#address;
	}

	public privateKey(): string {
		return this.#signingKey;
	}
}
