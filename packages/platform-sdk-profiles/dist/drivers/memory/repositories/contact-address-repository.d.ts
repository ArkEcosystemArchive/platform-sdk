import { IContactAddress, IContactAddressInput, IContactAddressRepository, IProfile } from "../../../contracts";
export declare class ContactAddressRepository implements IContactAddressRepository {
	#private;
	constructor(profile: IProfile);
	/** {@inheritDoc IContactAddressRepository.all} */
	all(): Record<string, IContactAddress>;
	/** {@inheritDoc IContactAddressRepository.first} */
	first(): IContactAddress;
	/** {@inheritDoc IContactAddressRepository.last} */
	last(): IContactAddress;
	/** {@inheritDoc IContactAddressRepository.keys} */
	keys(): string[];
	/** {@inheritDoc IContactAddressRepository.values} */
	values(): IContactAddress[];
	/** {@inheritDoc IContactAddressRepository.create} */
	create(data: IContactAddressInput): Promise<IContactAddress>;
	/** {@inheritDoc IContactAddressRepository.fill} */
	fill(addresses: any[]): Promise<void>;
	/** {@inheritDoc IContactAddressRepository.findById} */
	findById(id: string): IContactAddress;
	/** {@inheritDoc IContactAddressRepository.findByAddress} */
	findByAddress(value: string): IContactAddress[];
	/** {@inheritDoc IContactAddressRepository.findByCoin} */
	findByCoin(value: string): IContactAddress[];
	/** {@inheritDoc IContactAddressRepository.findByNetwork} */
	findByNetwork(value: string): IContactAddress[];
	/** {@inheritDoc IContactAddressRepository.update} */
	update(id: string, data: Record<string, string>): void;
	/** {@inheritDoc IContactAddressRepository.forget} */
	forget(id: string): void;
	/** {@inheritDoc IContactAddressRepository.flush} */
	flush(): void;
	/** {@inheritDoc IContactAddressRepository.count} */
	count(): number;
	/** {@inheritDoc IContactAddressRepository.toArray} */
	toArray(): object[];
}
