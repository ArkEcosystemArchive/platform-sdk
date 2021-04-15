import { IContact, IContactAddressInput, IContactAddressRepository, IContactStruct } from "../../../contracts";
import { pqueue } from "../../../helpers/queue";
import { ContactAddressRepository } from "../repositories/contact-address-repository";
import { Avatar } from "../../../helpers/avatar";

export class Contact implements IContact {
	readonly #id: string;
	#name: string;
	#addresses: ContactAddressRepository = new ContactAddressRepository();
	#starred: boolean;

	#avatar: string;

	public constructor({ id, name, starred }: IContactStruct) {
		this.#id = id;
		this.#name = name;
		this.#starred = starred;

		this.#avatar = Avatar.make(name);
	}

	public async restore(addresses: object[]): Promise<void> {
		await this.#addresses.fill(addresses);
	}

	public id(): string {
		return this.#id;
	}

	public name(): string {
		return this.#name;
	}

	public addresses(): IContactAddressRepository {
		return this.#addresses;
	}

	public isStarred(): boolean {
		return this.#starred;
	}

	public toggleStarred(): void {
		this.#starred = !this.isStarred();
	}

	public setAvatar(value: string): void {
		this.#avatar = value;
	}

	public setName(name: string): void {
		this.#name = name;

		this.setAvatar(Avatar.make(name));
	}

	public async setAddresses(addresses: IContactAddressInput[]): Promise<void> {
		this.#addresses.flush();

		await pqueue(addresses.map((address: IContactAddressInput) => () => this.#addresses.create(address)));
	}

	public avatar(): string {
		return this.#avatar;
	}

	public toObject(): IContactStruct {
		return {
			id: this.id(),
			name: this.name(),
			starred: this.isStarred(),
			addresses: this.addresses().toArray(),
		};
	}
}
