export abstract class AbstractDoubleSignatory {
	readonly #signingKey: string;
	readonly #confirmKey: string;
	readonly #identifier: string;

	public constructor(signingKey: string, confirmKey: string, identifier: string) {
		this.#signingKey = signingKey;
		this.#confirmKey = confirmKey;
		this.#identifier = identifier;
	}

	public signingKey(): string {
		return this.#signingKey;
	}

	public confirmKey(): string {
		return this.#confirmKey;
	}

	public identifier(): string {
		return this.#identifier;
	}
}
