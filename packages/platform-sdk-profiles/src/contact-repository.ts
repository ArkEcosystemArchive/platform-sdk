import { v4 as uuidv4 } from "uuid";

import { Contact, ContactAddress, ContactList, ContactStruct } from "./contracts";
import { Data } from "./data";

export class ContactRepository {
	readonly #data: Data;
	#contacts: ContactList = [];

	private constructor({ contacts, data }) {
		this.#contacts = contacts;
		this.#data = data;
	}

	public static async make(data: Data): Promise<ContactRepository> {
		return new ContactRepository({ contacts: await data.get("contacts", []), data });
	}

	public all(): ContactList {
		return this.#contacts;
	}

	public async create(data: ContactStruct): Promise<Contact> {
		const contact: Contact = { id: uuidv4(), ...data };

		this.#contacts.push(contact);

		await this.persist();

		return contact;
	}

	public find(id: string): Contact {
		return this.#contacts[this.findIndex(id)];
	}

	public async update(id: string, data: object): Promise<void> {
		const index: number = this.findIndex(id);

		this.#contacts[index] = { ...this.#contacts[index], ...data };

		await this.persist();
	}

	public async destroy(id: string): Promise<void> {
		this.#contacts.splice(this.findIndex(id), 1);

		await this.persist();
	}

	public async flush(): Promise<void> {
		this.#contacts = [];

		await this.persist();
	}

	public findByAddress(value: string): ContactList {
		return this.findByColumn("address", value);
	}

	public findByCoin(value: string): ContactList {
		return this.findByColumn("coin", value);
	}

	public findByNetwork(value: string): ContactList {
		return this.findByColumn("network", value);
	}

	private findByColumn(column: string, value: string): ContactList {
		return this.#contacts.filter((contact: Contact) =>
			contact.addresses.find((address: ContactAddress) => address[column] === value),
		);
	}

	private async persist(): Promise<void> {
		await this.#data.set("contacts", this.#contacts);
	}

	private findIndex(id: string): number {
		const index: number = this.#contacts.findIndex((contact: Contact) => contact.id === id);

		if (index === -1) {
			throw new Error(`Failed to find a contact for [${id}].`);
		}

		return index;
	}
}
