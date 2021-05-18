export abstract class AbstractKeySignatory {
	readonly #signingKey: string;

	public constructor(signingKey: string) {
		this.#signingKey = signingKey;
	}

	public signingKey(): string {
		return this.#signingKey;
	}

	public identifier(): string {
		return this.#signingKey;
	}
}
