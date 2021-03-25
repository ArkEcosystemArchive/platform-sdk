import { v4 as uuidv4 } from "uuid";
import { IContact, IContactAddress, IContactAddressInput, IContactRepository, IProfile } from "../../../contracts";

import { Contact } from "../contacts/contact";
import { pqueue } from "../../../helpers/queue";
import { DataRepository } from "./data-repository";

export class ContactRepository implements IContactRepository {
	#data: DataRepository;
	#profile: IProfile;

	public constructor(profile: IProfile) {
		this.#data = new DataRepository();
		this.#profile = profile;
	}

	public all(): Record<string, IContact> {
		return this.#data.all() as Record<string, IContact>;
	}

	public first(): IContact {
		return this.#data.first();
	}

	public last(): IContact {
		return this.#data.last();
	}

	public keys(): string[] {
		return this.#data.keys();
	}

	public values(): IContact[] {
		return this.#data.values();
	}

	public create(name: string): IContact {
		const contacts: IContact[] = this.values();

		for (const contact of contacts) {
			if (contact.name().toLowerCase() === name.toLowerCase()) {
				throw new Error(`The contact [${name}] already exists.`);
			}
		}

		const id: string = uuidv4();

		const result: IContact = new Contact({ id, name, starred: false }, this.#profile);

		this.#data.set(id, result);

		return result;
	}

	public async fill(contacts: object): Promise<void> {
		const promises: (() => Promise<void>)[] = [];

		for (const [id, contact] of Object.entries(contacts)) {
			const instance: IContact = new Contact(contact, this.#profile);

			promises.push(() => instance.restore(contact.addresses));

			this.#data.set(id, instance);
		}

		await pqueue(promises);
	}

	public findById(id: string): IContact {
		const contact: IContact | undefined = this.#data.get(id);

		if (!contact) {
			throw new Error(`Failed to find a contact for [${id}].`);
		}

		return contact;
	}

	public async update(id: string, data: { name?: string; addresses?: IContactAddressInput[] }): Promise<void> {
		const result = this.findById(id);

		if (data.name) {
			const contacts: IContact[] = this.values();

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

	public findByAddress(value: string): IContact[] {
		return this.findByColumn("address", value);
	}

	public findByCoin(value: string): IContact[] {
		return this.findByColumn("coin", value);
	}

	public findByNetwork(value: string): IContact[] {
		return this.findByColumn("network", value);
	}

	private findByColumn(column: string, value: string): IContact[] {
		const result: IContact[] = [];

		for (const contact of Object.values(this.all())) {
			const match: IContactAddress | undefined = contact
				.addresses()
				.values()
				.find((address: IContactAddress) => address[column]() === value);

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
