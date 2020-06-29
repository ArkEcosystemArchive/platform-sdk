import { Avatar } from "./avatar";
import { ContactAddress, ContactStruct } from "./contracts";

export class Contact {
	#id!: string;
	#name!: string;
	#addresses: ContactAddress[] = [];
	#starred!: boolean;

	public constructor({ id, name, starred, addresses }: ContactStruct) {
		this.#id = id;
		this.#name = name;
		this.#starred = starred;
		this.#addresses = addresses;

		for (const item of this.#addresses) {
			item.avatar = Avatar.make(item.address);
		}
	}

	public id(): string {
		return this.#id;
	}

	public name(): string {
		return this.#name;
	}

	public addresses(): ContactAddress[] {
		return this.#addresses;
	}

	public isDelegate(): boolean {
		return false;
	}

	public isKnown(): boolean {
		return false;
	}

	public isLedger(): boolean {
		return false;
	}

	public isMultiSignature(): boolean {
		return false;
	}

	public isSecondSignature(): boolean {
		return false;
	}

	public isStarred(): boolean {
		return this.#starred;
	}

	public toggleStarred(): void {
		this.#starred = !this.isStarred();
	}

	public toObject(): ContactStruct {
		return {
			id: this.id(),
			name: this.name(),
			starred: this.isStarred(),
			addresses: this.addresses(),
		};
	}
}
