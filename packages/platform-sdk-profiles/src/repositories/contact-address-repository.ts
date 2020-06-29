import { v4 as uuidv4 } from "uuid";

import { Contact } from "../contact";
import { ContactAddress } from "../contact-address";
import { Profile } from "../profile";
import { Wallet } from "../wallet";
import { DataRepository } from "./data-repository";

interface ContactAddressInput {
	coin: string;
	network: string;
	name: string;
	address: string;
}

export class ContactAddressRepository {
	#data: DataRepository;
	#profile: Profile;

	public constructor(profile: Profile) {
		this.#data = new DataRepository();
		this.#profile = profile;
	}

	public all(): Record<string, ContactAddress> {
		return this.#data.all() as Record<string, ContactAddress>;
	}

	public keys(): string[] {
		return this.#data.keys();
	}

	public values(): ContactAddress[] {
		return this.#data.values();
	}

	public async create(data: ContactAddressInput): Promise<ContactAddress> {
		const id: string = uuidv4();

		const address: ContactAddress = await ContactAddress.make({ id, ...data }, this.#profile);

		this.#data.set(id, address);

		return address;
	}

	public async fill(addresses: any[]): Promise<void> {
		for (const address of addresses) {
			this.#data.set(address.id, await ContactAddress.make(address, this.#profile));
		}
	}

	public findById(id: string): ContactAddress {
		const contact: ContactAddress | undefined = this.#data.get(id);

		if (!contact) {
			throw new Error(`Failed to find an address for [${id}].`);
		}

		return contact;
	}

	public findByAddress(value: string): ContactAddress[] {
		return this.findByColumn("address", value);
	}

	public findByCoin(value: string): ContactAddress[] {
		return this.findByColumn("coin", value);
	}

	public findByNetwork(value: string): ContactAddress[] {
		return this.findByColumn("network", value);
	}

	private findByColumn(column: string, value: string): ContactAddress[] {
		const result: ContactAddress[] = [];

		for (const contact of Object.values(this.all())) {
			const match: ContactAddress | undefined = this.values().find(
				(address: ContactAddress) => address[column]() === value,
			);

			if (match) {
				result.push(match);
			}
		}

		return result;
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
		return this.#data.count();
	}

	public toArray(): object[] {
		const result: object[] = [];

		for (const address of this.values()) {
			result.push(address.toObject());
		}

		return result;
	}
}
