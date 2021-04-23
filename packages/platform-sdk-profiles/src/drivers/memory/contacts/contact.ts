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

	/** {@inheritDoc IWalletFactory.generate} */
	public constructor({ id, name, starred }: IContactData) {
		this.#id = id;
		this.#name = name;
		this.#starred = starred;

		this.#avatar = Avatar.make(name);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public async restore(addresses: object[]): Promise<void> {
		await this.#addresses.fill(addresses);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public id(): string {
		return this.#id;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public name(): string {
		return this.#name;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public addresses(): IContactAddressRepository {
		return this.#addresses;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public isStarred(): boolean {
		return this.#starred;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public toggleStarred(): void {
		this.#starred = !this.isStarred();

		emitProfileChanged();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public setAvatar(value: string): void {
		this.#avatar = value;

		emitProfileChanged();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public setName(name: string): void {
		this.#name = name;

		this.setAvatar(Avatar.make(name));
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public async setAddresses(addresses: IContactAddressInput[]): Promise<void> {
		this.#addresses.flush();

		await pqueue(addresses.map((address: IContactAddressInput) => () => this.#addresses.create(address)));

		emitProfileChanged();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public avatar(): string {
		return this.#avatar;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public toObject(): IContactData {
		return {
			id: this.id(),
			name: this.name(),
			starred: this.isStarred(),
			addresses: this.addresses().toArray(),
		};
	}
}
