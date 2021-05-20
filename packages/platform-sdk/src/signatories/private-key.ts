export class PrivateKeySignatory {
	readonly #signingKey: string;
	readonly #address: string;
	readonly #privateKey: string;

	public constructor({
		signingKey,
		address,
		privateKey,
	}: {
		signingKey: string;
		address: string;
		privateKey: string;
	}) {
		this.#signingKey = signingKey;
		this.#address = address;
		this.#privateKey = privateKey;
	}

	public signingKey(): string {
		return this.#signingKey;
	}

	public address(): string {
		return this.#address;
	}

	public privateKey(): string | undefined {
		return this.#privateKey;
	}
}
