import { v4 as uuidv4 } from "uuid";

import { Contact } from "../contact";
import { ContactAddress } from "../contact-address";
import { Profile } from "../profile";
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

	public keys(): string[] {
		return this.#data.keys();
	}

	public values(): Contact[] {
		return this.#data.values();
	}

	public create(name: string): Contact {
		const id: string = uuidv4();

		const contact: Contact = new Contact({ id, name, starred: false }, this.#profile);

		this.#data.set(id, contact);

		return contact;
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

	public update(id: string, data: object): void {
		this.#data.set(id, { ...this.findById(id), ...data });
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
