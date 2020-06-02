import { ContactAddress } from "./contracts";

export class Contact {
	readonly #name: string;
	readonly #addresses: ContactAddress[];
	#starred: boolean;

	public constructor({ name, addresses, starred }) {
		this.#name = name;
		this.#addresses = addresses;
		this.#starred = starred;
	}

	public name(): string {
		return this.#name;
	}

	public addresses(): ContactAddress[] {
		return this.#addresses;
	}

	public isStarred(): boolean {
		return this.#starred;
	}

	public star(): void {
		this.#starred = true;
	}

	public unstar(): void {
		this.#starred = false;
	}

	public toObject(): {
		name: string;
		addresses: ContactAddress[];
		starred: boolean;
	} {
		return {
			name: this.#name,
			addresses: this.#addresses,
			starred: this.#starred,
		};
	}
}
