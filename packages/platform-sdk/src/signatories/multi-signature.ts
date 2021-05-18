export interface MultiSignature {
	publicKeys: string[];
	min: number;
}

export class MultiSignatureSignatory {
	readonly #signature: MultiSignature;

	public constructor(signature: MultiSignature) {
		this.#signature = signature;
	}

	public signingList(): MultiSignature {
		return this.#signature;
	}
}
