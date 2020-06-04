import { v4 as uuidv4 } from "uuid";

import { Contact, ContactAddress, ContactList, ContactStruct } from "../contracts";
import { DataRepository } from "./data-repository";

export class ContactRepository {
	#data: DataRepository;

	public constructor() {
		this.#data = new DataRepository("profile", "contact");
	}

	public all(): ContactList {
		return Object.values(this.#data.all());
	}

	public create(data: ContactStruct): Contact {
		const contact: Contact = { id: uuidv4(), ...data };

		this.#data.set(contact.id, contact);

		return contact;
	}

	public find(id: string): Contact {
		const contact: Contact | undefined = this.#data.get(id);

		if (!contact) {
			throw new Error(`Failed to find a contact for [${id}].`);
		}

		return contact;
	}

	public update(id: string, data: object): void {
		this.#data.set(id, { ...this.find(id), ...data });
	}

	public destroy(id: string): void {
		this.find(id);

		this.#data.forget(id);
	}

	public flush(): void {
		this.#data.flush();
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
		const result: ContactList = [];

		for (const [id, contact] of Object.entries(this.all())) {
			if (contact.addresses.find((address: ContactAddress) => address[column] === value)) {
				result.push(contact);
			}
		}

		return result;
	}
}
