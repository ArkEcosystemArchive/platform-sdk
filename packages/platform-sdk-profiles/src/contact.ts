import { Avatar } from "./avatar";
import { ContactAddress, ContactStruct } from "./contracts";
import { Profile } from "./profile";

export class Contact {
	#profile: Profile;

	#id: string;
	#name: string;
	#addresses: ContactAddress[] = [];
	#starred: boolean;

	public constructor({ id, name, starred, addresses }: ContactStruct, profile: Profile) {
		this.#profile = profile;

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

	public isStarred(): boolean {
		return this.#starred;
	}

	public addresses(): ContactAddress[] {
		return this.#addresses;
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
