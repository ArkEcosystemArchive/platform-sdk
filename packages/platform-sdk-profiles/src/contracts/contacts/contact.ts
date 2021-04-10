import { IContactAddressInput } from "./contact-address";
import { IContactAddressRepository } from "../repositories/contact-address-repository";

export interface IContact {
	restore(addresses: object[]): Promise<void>;
	id(): string;
	name(): string;
	addresses(): IContactAddressRepository;
	isStarred(): boolean;
	toggleStarred(): void;
	setAvatar(value: string): void;
	setName(name: string): void;
	setAddresses(addresses: IContactAddressInput[]): Promise<void>;
	avatar(): string;
	toObject(): IContactStruct;
}

export interface IContactStruct {
	id: string;
	name: string;
	addresses?: object;
	starred: boolean;
}
