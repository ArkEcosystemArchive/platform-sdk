import { ContactStruct } from "./contracts";
import { Profile } from "./profile";
import { ContactAddressRepository } from "./repositories/contact-address-repository";

export class Contact {
	#profile: Profile;

	#id: string;
	#name: string;
	#addresses: ContactAddressRepository;
	#starred: boolean;

	public constructor({ id, name, starred, addresses }: ContactStruct, profile: Profile) {
		this.#profile = profile;

		this.#id = id;
		this.#name = name;
		this.#starred = starred;

		this.#addresses = new ContactAddressRepository(this.#profile);

		if (addresses) {
			this.#addresses.fill(addresses);
		}
	}

	public id(): string {
		return this.#id;
	}

	public name(): string {
		return this.#name;
	}

	public addresses(): ContactAddressRepository {
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
			addresses: this.addresses().toObject(),
		};
	}
}
