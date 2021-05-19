export class PrivateMultiSignatureSignatory {
	readonly #signingKey: string;
	readonly #signingKeys: string[];

	public constructor(signingKey: string, signingKeys: string[]) {
		this.#signingKey = signingKey;
		this.#signingKeys = signingKeys;
	}

	public signingKey(): string {
		return this.#signingKey;
	}

	public signingKeys(): string[] {
		return this.#signingKeys;
	}
}
