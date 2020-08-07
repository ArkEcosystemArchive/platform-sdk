export class SignedTransactionData {
	readonly #id: string;
	readonly #data: any;

	public constructor(id: string, data: any) {
		this.#id = id;
		this.#data = data;
	}

	public id(): string {
		return this.#id;
	}

	public data(): any {
		return this.#data;
	}

	public get<T = string>(key: string): T {
		return this.#data[key];
	}

	public toString(): string {
		if (typeof this.#data === "string") {
			return this.#data;
		}

		return JSON.stringify(this.#data);
	}

	public toObject(): { id: string; data: any } {
		return { id: this.#id, data: this.#data };
	}
}
