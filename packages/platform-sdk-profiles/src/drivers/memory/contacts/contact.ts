import { IContact, IContactAddressInput, IContactAddressRepository, IContactData } from "../../../contracts";
import { pqueue } from "../../../helpers/queue";
import { ContactAddressRepository } from "../repositories/contact-address-repository";
import { Avatar } from "../../../helpers/avatar";
import { emitProfileChanged } from "../helpers";

export class Contact implements IContact {
	readonly #id: string;
	#name: string;
	#addresses: ContactAddressRepository = new ContactAddressRepository();
	#starred: boolean;

	#avatar: string;

	public constructor({ id, name, starred }: IContactData) {
		this.#id = id;
		this.#name = name;
		this.#starred = starred;

		this.#avatar = Avatar.make(name);
	}

	/** {@inheritDoc IContact.restore} */
	public async restore(addresses: object[]): Promise<void> {
		await this.#addresses.fill(addresses);
	}

	/** {@inheritDoc IContact.id} */
	public id(): string {
		return this.#id;
	}

	/** {@inheritDoc IContact.name} */
	public name(): string {
		return this.#name;
	}

	/** {@inheritDoc IContact.addresses} */
	public addresses(): IContactAddressRepository {
		return this.#addresses;
	}

	/** {@inheritDoc IContact.isStarred} */
	public isStarred(): boolean {
		return this.#starred;
	}

	/** {@inheritDoc IContact.toggleStarred} */
	public toggleStarred(): void {
		this.#starred = !this.isStarred();

		emitProfileChanged();
	}

	/** {@inheritDoc IContact.setAvatar} */
	public setAvatar(value: string): void {
		this.#avatar = value;

		emitProfileChanged();
	}

	/** {@inheritDoc IContact.setName} */
	public setName(name: string): void {
		this.#name = name;

		this.setAvatar(Avatar.make(name));
	}

	/** {@inheritDoc IContact.setAddresses} */
	public async setAddresses(addresses: IContactAddressInput[]): Promise<void> {
		this.#addresses.flush();

		await pqueue(addresses.map((address: IContactAddressInput) => () => this.#addresses.create(address)));

		emitProfileChanged();
	}

	/** {@inheritDoc IContact.avatar} */
	public avatar(): string {
		return this.#avatar;
	}

	/** {@inheritDoc IContact.toObject} */
	public toObject(): IContactData {
		return {
			id: this.id(),
			name: this.name(),
			starred: this.isStarred(),
			addresses: this.addresses().toArray(),
		};
	}
}
