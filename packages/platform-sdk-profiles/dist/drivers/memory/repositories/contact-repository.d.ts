import { IContact, IContactAddressInput, IContactRepository, IProfile } from "../../../contracts";
export declare class ContactRepository implements IContactRepository {
	#private;
	constructor(profile: IProfile);
	/** {@inheritDoc IContactRepository.all} */
	all(): Record<string, IContact>;
	/** {@inheritDoc IContactRepository.first} */
	first(): IContact;
	/** {@inheritDoc IContactRepository.last} */
	last(): IContact;
	/** {@inheritDoc IContactRepository.keys} */
	keys(): string[];
	/** {@inheritDoc IContactRepository.values} */
	values(): IContact[];
	/** {@inheritDoc IContactRepository.create} */
	create(name: string): IContact;
	/** {@inheritDoc IContactRepository.findById} */
	findById(id: string): IContact;
	/** {@inheritDoc IContactRepository.update} */
	update(
		id: string,
		data: {
			name?: string;
			addresses?: IContactAddressInput[];
		},
	): Promise<void>;
	/** {@inheritDoc IContactRepository.forget} */
	forget(id: string): void;
	/** {@inheritDoc IContactRepository.flush} */
	flush(): void;
	/** {@inheritDoc IContactRepository.count} */
	count(): number;
	/** {@inheritDoc IContactRepository.findByAddress} */
	findByAddress(value: string): IContact[];
	/** {@inheritDoc IContactRepository.findByCoin} */
	findByCoin(value: string): IContact[];
	/** {@inheritDoc IContactRepository.findByNetwork} */
	findByNetwork(value: string): IContact[];
	/** {@inheritDoc IContactRepository.toObject} */
	toObject(): Record<string, object>;
	/** {@inheritDoc IContactRepository.fill} */
	fill(contacts: object): void;
	/** {@inheritDoc IContactRepository.restore} */
	restore(): Promise<void>;
}
