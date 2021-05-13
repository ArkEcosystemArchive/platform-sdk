import { v4 as uuidv4 } from "uuid";
import { IContactAddress, IContactAddressInput, IContactAddressRepository, IProfile } from "../../../contracts";
import { ContactAddress } from "../contacts/contact-address";
import { injectable } from "inversify";

import { DataRepository } from "../../../repositories/data-repository";
import { emitProfileChanged } from "../helpers";
import { Coins } from "@arkecosystem/platform-sdk";
import { CoinFactory } from "../profiles/services/coin.factory";

@injectable()
export class ContactAddressRepository implements IContactAddressRepository {
	readonly #profile: IProfile;
	readonly #data: DataRepository = new DataRepository();

	public constructor(profile: IProfile) {
		this.#profile = profile;
	}

	/** {@inheritDoc IContactAddressRepository.all} */
	public all(): Record<string, IContactAddress> {
		return this.#data.all() as Record<string, IContactAddress>;
	}

	/** {@inheritDoc IContactAddressRepository.first} */
	public first(): IContactAddress {
		return this.#data.first();
	}

	/** {@inheritDoc IContactAddressRepository.last} */
	public last(): IContactAddress {
		return this.#data.last();
	}

	/** {@inheritDoc IContactAddressRepository.keys} */
	public keys(): string[] {
		return this.#data.keys();
	}

	/** {@inheritDoc IContactAddressRepository.values} */
	public values(): IContactAddress[] {
		return this.#data.values();
	}

	/** {@inheritDoc IContactAddressRepository.create} */
	public async create(data: IContactAddressInput): Promise<IContactAddress> {
		const id: string = uuidv4();

		const address: IContactAddress = await this.createAddress({ id, ...data });
		await address.syncIdentity();

		this.#data.set(id, address);

		emitProfileChanged(this.#profile);

		return address;
	}

	/** {@inheritDoc IContactAddressRepository.fill} */
	public async fill(addresses: any[]): Promise<void> {
		for (const address of addresses) {
			const result = await this.createAddress(address);
			await result.syncIdentity();

			this.#data.set(address.id, result);
		}
	}

	/** {@inheritDoc IContactAddressRepository.findById} */
	public findById(id: string): IContactAddress {
		const contact: IContactAddress | undefined = this.#data.get(id);

		if (!contact) {
			throw new Error(`Failed to find an address for [${id}].`);
		}

		return contact;
	}

	/** {@inheritDoc IContactAddressRepository.findByAddress} */
	public findByAddress(value: string): IContactAddress[] {
		return this.findByColumn("address", value);
	}

	/** {@inheritDoc IContactAddressRepository.findByCoin} */
	public findByCoin(value: string): IContactAddress[] {
		return this.findByColumn("coin", value);
	}

	/** {@inheritDoc IContactAddressRepository.findByNetwork} */
	public findByNetwork(value: string): IContactAddress[] {
		return this.findByColumn("network", value);
	}

	/** {@inheritDoc IContactAddressRepository.update} */
	public update(id: string, data: Record<string, string>): void {
		const address = this.findById(id);

		if (data.name) {
			address.setName(data.name);
		}

		if (data.address) {
			address.setAddress(data.address);
		}

		this.#data.set(id, address);

		emitProfileChanged(this.#profile);
	}

	/** {@inheritDoc IContactAddressRepository.forget} */
	public forget(id: string): void {
		this.findById(id);

		this.#data.forget(id);

		emitProfileChanged(this.#profile);
	}

	/** {@inheritDoc IContactAddressRepository.flush} */
	public flush(): void {
		this.#data.flush();

		emitProfileChanged(this.#profile);
	}

	/** {@inheritDoc IContactAddressRepository.count} */
	public count(): number {
		return this.#data.count();
	}

	/** {@inheritDoc IContactAddressRepository.toArray} */
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

	private async createAddress(data): Promise<ContactAddress> {
		const instance: Coins.Coin = this.#profile.coins().get(data.coin, data.network);

		if (!instance.hasBeenSynchronized()) {
			await instance.__construct();
		}

		return new ContactAddress(data, instance, this.#profile);
	}
}
