import { v4 as uuidv4 } from "uuid";

import { Contact } from "../contacts/contact";
import { ContactAddress } from "../contacts/contact-address";
import { ContactAddressInput } from "../contacts/contact-address.models";
import { Profile } from "../profiles/profile";
import { DataRepository } from "./data-repository";

export class ContactRepository {
	#data: DataRepository;
	#profile: Profile;

	public constructor(profile: Profile) {
		this.#data = new DataRepository();
		this.#profile = profile;
	}

	public all(): Record<string, Contact> {
		return this.#data.all() as Record<string, Contact>;
	}

	public first(): Contact {
		return this.#data.first();
	}

	public last(): Contact {
		return this.#data.last();
	}

	public keys(): string[] {
		return this.#data.keys();
	}

	public values(): Contact[] {
		return this.#data.values();
	}

	public create(name: string): Contact {
		const contacts: Contact[] = this.values();

		for (const contact of contacts) {
			if (contact.name().toLowerCase() === name.toLowerCase()) {
				throw new Error(`The contact [${name}] already exists.`);
			}
		}

		const id: string = uuidv4();

		const result: Contact = new Contact({ id, name, starred: false }, this.#profile);

		this.#data.set(id, result);

		return result;
	}

	public async fill(contacts: object): Promise<void> {
		for (const [id, contact] of Object.entries(contacts)) {
			const instance: Contact = new Contact(contact, this.#profile);

			await instance.restore(contact.addresses);

			this.#data.set(id, instance);
		}
	}

	public findById(id: string): Contact {
		const contact: Contact | undefined = this.#data.get(id);

		if (!contact) {
			throw new Error(`Failed to find a contact for [${id}].`);
		}

		return contact;
	}

	public async update(id: string, data: { name?: string; addresses?: ContactAddressInput[] }): Promise<void> {
		const result = this.findById(id);

		if (data.name) {
			const contacts: Contact[] = this.values();

			for (const contact of contacts) {
				if (contact.id() === id) {
					continue;
				}

				if (contact.name().toLowerCase() === data.name.toLowerCase()) {
					throw new Error(`The contact [${data.name}] already exists.`);
				}
			}

			result.setName(data.name);
		}

		if (data.addresses) {
			await result.setAddresses(data.addresses);
		}

		this.#data.set(id, result);
	}

	public forget(id: string): void {
		this.findById(id);

		this.#data.forget(id);
	}

	public flush(): void {
		this.#data.flush();
	}

	public count(): number {
		return this.keys().length;
	}

	public findByAddress(value: string): Contact[] {
		return this.findByColumn("address", value);
	}

	public findByCoin(value: string): Contact[] {
		return this.findByColumn("coin", value);
	}

	public findByNetwork(value: string): Contact[] {
		return this.findByColumn("network", value);
	}

	private findByColumn(column: string, value: string): Contact[] {
		const result: Contact[] = [];

		for (const contact of Object.values(this.all())) {
			const match: ContactAddress | undefined = contact
				.addresses()
				.values()
				.find((address: ContactAddress) => address[column]() === value);

			if (match) {
				result.push(contact);
			}
		}

		return result;
	}

	public toObject(): Record<string, object> {
		const result: Record<string, object> = {};

		for (const [id, contact] of Object.entries(this.#data.all())) {
			result[id] = contact.toObject();
		}

		return result;
	}
}
