import { AbstractSignatory } from "./abstract-signatory";

export class HierarchicalDeterministicSignatory extends AbstractSignatory {
	readonly #path: string;

	public constructor({
		signingKey,
		address,
		publicKey,
		privateKey,
		path,
	}: {
		signingKey: string;
		address: string;
		publicKey: string;
		privateKey: string;
		path: string;
	}) {
		super({
			signingKey,
			address,
			publicKey,
			privateKey,
		});
		this.#path = path;
	}

	public path(): string {
		return this.#path;
	}
}
