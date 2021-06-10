import { IContact, IContactAddressInput, IContactAddressRepository, IContactData, IProfile } from "../../../contracts";
export declare class Contact implements IContact {
	#private;
	constructor({ id, name, starred }: IContactData, profile: IProfile);
	/** {@inheritDoc IContact.restore} */
	restore(addresses: object[]): Promise<void>;
	/** {@inheritDoc IContact.id} */
	id(): string;
	/** {@inheritDoc IContact.name} */
	name(): string;
	/** {@inheritDoc IContact.addresses} */
	addresses(): IContactAddressRepository;
	/** {@inheritDoc IContact.isStarred} */
	isStarred(): boolean;
	/** {@inheritDoc IContact.toggleStarred} */
	toggleStarred(): void;
	/** {@inheritDoc IContact.setAvatar} */
	setAvatar(value: string): void;
	/** {@inheritDoc IContact.setName} */
	setName(name: string): void;
	/** {@inheritDoc IContact.setAddresses} */
	setAddresses(addresses: IContactAddressInput[]): Promise<void>;
	/** {@inheritDoc IContact.avatar} */
	avatar(): string;
	/** {@inheritDoc IContact.toObject} */
	toObject(): IContactData;
}
