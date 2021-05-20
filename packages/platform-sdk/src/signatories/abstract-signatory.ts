export abstract class AbstractSignatory {
	readonly #signingKey: string;
	readonly #address: string;
	readonly #publicKey: string;
	readonly #privateKey: string;

	public constructor({
		signingKey,
		address,
		publicKey,
		privateKey,
	}: {
		signingKey: string;
		address: string;
		publicKey: string;
		privateKey: string;
	}) {
		this.#signingKey = signingKey;
		this.#address = address;
		this.#publicKey = publicKey;
		this.#privateKey = privateKey;
	}

	public signingKey(): string {
		return this.#signingKey;
	}

	public address(): string {
		return this.#address;
	}

	public publicKey(): string {
		return this.#publicKey;
	}

	public privateKey(): string {
		return this.#privateKey;
	}
}
