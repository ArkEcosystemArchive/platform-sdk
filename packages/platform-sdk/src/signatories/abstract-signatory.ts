export abstract class AbstractSignatory {
	readonly #signingKey: string;
	readonly #identifier: string;

	public constructor(signingKey: string, identifier: string) {
		this.#signingKey = signingKey;
		this.#identifier = identifier;
	}

	public signingKey(): string {
		return this.#signingKey;
	}

	public identifier(): string {
		return this.#identifier;
	}
}
