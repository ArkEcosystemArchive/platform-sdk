import { IContact, IContactAddressInput, IContactAddressRepository, IContactData, IProfile } from "./contracts";
import { pqueue } from "./helpers/queue";
import { ContactAddressRepository } from "./contact-address.repository";
import { Avatar } from "./helpers/avatar";

export class Contact implements IContact {
	readonly #profile: IProfile;
	readonly #id: string;
	#name: string;
	#addresses: ContactAddressRepository;
	#starred: boolean;

	#avatar: string;

	public constructor({ id, name, starred }: IContactData, profile: IProfile) {
		this.#profile = profile;
		this.#id = id;
		this.#name = name;
		this.#starred = starred;
		this.#avatar = Avatar.make(name);
		this.#addresses = new ContactAddressRepository(profile);
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

		this.#profile.status().markAsDirty();
	}

	/** {@inheritDoc IContact.setAvatar} */
	public setAvatar(value: string): void {
		this.#avatar = value;

		this.#profile.status().markAsDirty();
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

		this.#profile.status().markAsDirty();
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
