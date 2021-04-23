import { v4 as uuidv4 } from "uuid";
import { IContactAddress, IContactAddressInput, IContactAddressRepository } from "../../../contracts";
import { ContactAddress } from "../contacts/contact-address";
import { injectable } from "inversify";

import { DataRepository } from "../../../repositories/data-repository";
import { emitProfileChanged } from "../helpers";

@injectable()
export class ContactAddressRepository implements IContactAddressRepository {
	readonly #data: DataRepository = new DataRepository();

	/** {@inheritDoc IWalletFactory.generate} */
	public all(): Record<string, IContactAddress> {
		return this.#data.all() as Record<string, IContactAddress>;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public first(): IContactAddress {
		return this.#data.first();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public last(): IContactAddress {
		return this.#data.last();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public keys(): string[] {
		return this.#data.keys();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public values(): IContactAddress[] {
		return this.#data.values();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public async create(data: IContactAddressInput): Promise<IContactAddress> {
		const id: string = uuidv4();

		const address: IContactAddress = await ContactAddress.make({ id, ...data });

		this.#data.set(id, address);

		emitProfileChanged();

		return address;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public async fill(addresses: any[]): Promise<void> {
		for (const address of addresses) {
			this.#data.set(address.id, await ContactAddress.make(address));
		}
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public findById(id: string): IContactAddress {
		const contact: IContactAddress | undefined = this.#data.get(id);

		if (!contact) {
			throw new Error(`Failed to find an address for [${id}].`);
		}

		return contact;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public findByAddress(value: string): IContactAddress[] {
		return this.findByColumn("address", value);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public findByCoin(value: string): IContactAddress[] {
		return this.findByColumn("coin", value);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public findByNetwork(value: string): IContactAddress[] {
		return this.findByColumn("network", value);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public update(id: string, data: Record<string, string>): void {
		const address = this.findById(id);

		if (data.name) {
			address.setName(data.name);
		}

		if (data.address) {
			address.setAddress(data.address);
		}

		this.#data.set(id, address);

		emitProfileChanged();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public forget(id: string): void {
		this.findById(id);

		this.#data.forget(id);

		emitProfileChanged();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public flush(): void {
		this.#data.flush();

		emitProfileChanged();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public count(): number {
		return this.#data.count();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public toArray(): object[] {
		const result: object[] = [];

		for (const address of this.values()) {
			result.push(address.toObject());
		}

		return result;
	}

	private findByColumn(column: string, value: string): IContactAddress[] {
		const result: IContactAddress[] = [];

		for (const _ of Object.values(this.all())) {
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
