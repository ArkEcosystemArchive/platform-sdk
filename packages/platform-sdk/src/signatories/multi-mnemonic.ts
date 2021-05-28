export class MultiMnemonicSignatory {
	readonly #signingKeys: string[];
	readonly #identifiers: string[];

	public constructor(signingKeys: string[], identifiers: string[]) {
		this.#signingKeys = signingKeys.map((signingKey: string) => signingKey.normalize("NFD"));
		this.#identifiers = identifiers;
	}

	public signingKeys(): string[] {
		return this.#signingKeys;
	}

	public identifiers(): string[] {
		return this.#identifiers;
	}
}
