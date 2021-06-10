/* istanbul ignore file */

export class LedgerSignatory {
	readonly #signingKey: string;

	public constructor(signingKey: string) {
		this.#signingKey = signingKey;
	}

	public signingKey(): string {
		return this.#signingKey;
	}
}
