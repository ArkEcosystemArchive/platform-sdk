import { IContact } from "../contacts/contact";
import { IContactAddressInput } from "../contacts/contact-address";

export interface IContactRepository {
	all(): Record<string, IContact>;
	first(): IContact;
	last(): IContact;
	keys(): string[];
	values(): IContact[];
	create(name: string): IContact;
	fill(contacts: object): Promise<void>;
	findById(id: string): IContact;
	update(id: string, data: { name?: string; addresses?: IContactAddressInput[] }): Promise<void>;
	forget(id: string): void;
	flush(): void;
	count(): number;
	findByAddress(value: string): IContact[];
	findByCoin(value: string): IContact[];
	findByNetwork(value: string): IContact[];
	toObject(): Record<string, object>;
}
