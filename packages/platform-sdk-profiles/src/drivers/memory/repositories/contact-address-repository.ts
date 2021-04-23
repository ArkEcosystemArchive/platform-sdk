import { v4 as uuidv4 } from "uuid";
import { IContactAddress, IContactAddressInput, IContactAddressRepository } from "../../../contracts";
import { ContactAddress } from "../contacts/contact-address";
import { injectable } from "inversify";

import { DataRepository } from "../../../repositories/data-repository";

@injectable()
export class ContactAddressRepository implements IContactAddressRepository {
	readonly #data: DataRepository = new DataRepository();

	public all(): Record<string, IContactAddress> {
		return this.#data.all() as Record<string, IContactAddress>;
	}

	public first(): IContactAddress {
		return this.#data.first();
	}

	public last(): IContactAddress {
		return this.#data.last();
	}

	public keys(): string[] {
		return this.#data.keys();
	}

	public values(): IContactAddress[] {
		return this.#data.values();
	}

	public async create(data: IContactAddressInput): Promise<IContactAddress> {
		const id: string = uuidv4();

		const address: IContactAddress = await ContactAddress.make({ id, ...data });

		this.#data.set(id, address);

		return address;
	}

	public async fill(addresses: any[]): Promise<void> {
		for (const address of addresses) {
			this.#data.set(address.id, await ContactAddress.make(address));
		}
	}

	public findById(id: string): IContactAddress {
		const contact: IContactAddress | undefined = this.#data.get(id);

		if (!contact) {
			throw new Error(`Failed to find an address for [${id}].`);
		}

		return contact;
	}

	public findByAddress(value: string): IContactAddress[] {
		return this.findByColumn("address", value);
	}

	public findByCoin(value: string): IContactAddress[] {
		return this.findByColumn("coin", value);
	}

	public findByNetwork(value: string): IContactAddress[] {
		return this.findByColumn("network", value);
	}

	public update(id: string, data: Record<string, string>): void {
		const address = this.findById(id);

		if (data.name) {
			address.setName(data.name);
		}

		if (data.address) {
			address.setAddress(data.address);
		}

		this.#data.set(id, address);
	}

	public forget(id: string): void {
		this.findById(id);

		this.#data.forget(id);
	}

	public flush(): void {
		this.#data.flush();
	}

	public count(): number {
		return this.#data.count();
	}

	public toArray(): object[] {
		const result: object[] = [];

		for (const address of this.values()) {
			result.push(address.toObject());
		}

		return result;
	}

	private findByColumn(column: string, value: string): IContactAddress[] {
		const result: IContactAddress[] = [];

		for (const contact of Object.values(this.all())) {
			const match: IContactAddress | undefined = this.values().find(
				(address: IContactAddress) => address[column]() === value,
			);

			if (match) {
				result.push(match);
			}
		}

		return result;
	}
}
