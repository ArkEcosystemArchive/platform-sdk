import { IContactAddress, IContactAddressInput } from "../contacts/contact-address";

export interface IContactAddressRepository {
	all(): Record<string, IContactAddress>;
	first(): IContactAddress;
	last(): IContactAddress;
	keys(): string[];
	values(): IContactAddress[];
	create(data: IContactAddressInput): Promise<IContactAddress>;
	fill(addresses: any[]): Promise<void>;
	findById(id: string): IContactAddress;
	findByAddress(value: string): IContactAddress[];
	findByCoin(value: string): IContactAddress[];
	findByNetwork(value: string): IContactAddress[];
	update(id: string, data: Record<string, string>): void;
	forget(id: string): void;
	flush(): void;
	count(): number;
	toArray(): object[];
}
