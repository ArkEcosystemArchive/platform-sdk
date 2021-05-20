export abstract class AbstractDoubleSignatory {
	readonly #signingKey: string;
	readonly #confirmKey: string;
	readonly #address: string;
	readonly #publicKey: string;
	readonly #privateKey: string;

	public constructor({
		signingKey,
		confirmKey,
		address,
		publicKey,
		privateKey,
	}: {
		signingKey: string;
		confirmKey: string;
		address: string;
		publicKey: string;
		privateKey: string;
	}) {
		this.#signingKey = signingKey;
		this.#confirmKey = confirmKey;
		this.#address = address;
		this.#publicKey = publicKey;
		this.#privateKey = privateKey;
	}

	public signingKey(): string {
		return this.#signingKey;
	}

	public confirmKey(): string {
		return this.#confirmKey;
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
