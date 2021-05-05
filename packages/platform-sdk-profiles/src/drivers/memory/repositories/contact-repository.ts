import { v4 as uuidv4 } from "uuid";
import { injectable } from "inversify";
import { IContact, IContactAddress, IContactAddressInput, IContactRepository } from "../../../contracts";

import { Contact } from "../contacts/contact";
import { pqueue } from "../../../helpers/queue";
import { DataRepository } from "../../../repositories/data-repository";
import { emitProfileChanged } from "../helpers";

@injectable()
export class ContactRepository implements IContactRepository {
	readonly #data: DataRepository = new DataRepository();
	#dataRaw: object = {};

	/** {@inheritDoc IContactRepository.all} */
	public all(): Record<string, IContact> {
		return this.#data.all() as Record<string, IContact>;
	}

	/** {@inheritDoc IContactRepository.first} */
	public first(): IContact {
		return this.#data.first();
	}

	/** {@inheritDoc IContactRepository.last} */
	public last(): IContact {
		return this.#data.last();
	}

	/** {@inheritDoc IContactRepository.keys} */
	public keys(): string[] {
		return this.#data.keys();
	}

	/** {@inheritDoc IContactRepository.values} */
	public values(): IContact[] {
		return this.#data.values();
	}

	/** {@inheritDoc IContactRepository.create} */
	public create(name: string): IContact {
		const contacts: IContact[] = this.values();

		for (const contact of contacts) {
			if (contact.name().toLowerCase() === name.toLowerCase()) {
				throw new Error(`The contact [${name}] already exists.`);
			}
		}

		const id: string = uuidv4();

		const result: IContact = new Contact({ id, name, starred: false });

		this.#data.set(id, result);

		emitProfileChanged();

		return result;
	}

	/** {@inheritDoc IContactRepository.findById} */
	public findById(id: string): IContact {
		const contact: IContact | undefined = this.#data.get(id);

		if (!contact) {
			throw new Error(`Failed to find a contact for [${id}].`);
		}

		return contact;
	}

	/** {@inheritDoc IContactRepository.update} */
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

		emitProfileChanged();
	}

	/** {@inheritDoc IContactRepository.forget} */
	public forget(id: string): void {
		this.findById(id);

		this.#data.forget(id);

		emitProfileChanged();
	}

	/** {@inheritDoc IContactRepository.flush} */
	public flush(): void {
		this.#data.flush();

		emitProfileChanged();
	}

	/** {@inheritDoc IContactRepository.count} */
	public count(): number {
		return this.keys().length;
	}

	/** {@inheritDoc IContactRepository.findByAddress} */
	public findByAddress(value: string): IContact[] {
		return this.findByColumn("address", value);
	}

	/** {@inheritDoc IContactRepository.findByCoin} */
	public findByCoin(value: string): IContact[] {
		return this.findByColumn("coin", value);
	}

	/** {@inheritDoc IContactRepository.findByNetwork} */
	public findByNetwork(value: string): IContact[] {
		return this.findByColumn("network", value);
	}

	/** {@inheritDoc IContactRepository.toObject} */
	public toObject(): Record<string, object> {
		const result: Record<string, object> = {};

		for (const [id, contact] of Object.entries(this.#data.all())) {
			result[id] = contact.toObject();
		}

		return result;
	}

	/** {@inheritDoc IContactRepository.fill} */
	public fill(contacts: object): void {
		this.#dataRaw = contacts;

		for (const [id, contact] of Object.entries(contacts)) {
			this.#data.set(id, new Contact(contact));
		}
	}

	/** {@inheritDoc IContactRepository.restore} */
	public async restore(): Promise<void> {
		const promises: (() => Promise<void>)[] = [];

		for (const [id, contact] of Object.entries(this.#dataRaw)) {
			promises.push(() => this.findById(id).restore(contact.addresses));
		}

		await pqueue(promises);
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
}
