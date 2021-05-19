export interface MultiSignature {
	publicKeys: string[];
	min: number;
}

export class MultiSignatureSignatory {
	readonly #signature: MultiSignature;
	readonly #identifier: string | undefined;

	public constructor(signature: MultiSignature, identifier?: string) {
		this.#signature = signature;
		this.#identifier = identifier;
	}

	public signingList(): MultiSignature {
		return this.#signature;
	}

	public identifier(): string | undefined {
		return this.#identifier;
	}
}
