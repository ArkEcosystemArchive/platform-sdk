import { IProfileRepository, IProfileExportOptions, IProfile, IProfileInput } from "../../../contracts";
import { Profile } from "../profiles/profile";
export declare class ProfileRepository implements IProfileRepository {
	#private;
	constructor();
	/** {@inheritDoc IProfileRepository.fill} */
	fill(profiles: object): void;
	/** {@inheritDoc IProfileRepository.all} */
	all(): Record<string, IProfile>;
	/** {@inheritDoc IProfileRepository.first} */
	first(): IProfile;
	/** {@inheritDoc IProfileRepository.last} */
	last(): IProfile;
	/** {@inheritDoc IProfileRepository.keys} */
	keys(): string[];
	/** {@inheritDoc IProfileRepository.values} */
	values(): IProfile[];
	/** {@inheritDoc IProfileRepository.findById} */
	findById(id: string): IProfile;
	/** {@inheritDoc IProfileRepository.findByName} */
	findByName(name: string): IProfile | undefined;
	/** {@inheritDoc IProfileRepository.create} */
	push(profile: IProfile): void;
	/** {@inheritDoc IProfileRepository.create} */
	create(name: string): IProfile;
	/** {@inheritDoc IProfileRepository.import} */
	import(data: string, password?: string): Promise<Profile>;
	/** {@inheritDoc IProfileRepository.export} */
	export(profile: IProfile, options: IProfileExportOptions, password?: string): string;
	/** {@inheritDoc IProfileRepository.restore} */
	restore(profile: IProfile, password?: string): Promise<void>;
	/** {@inheritDoc IProfileRepository.dump} */
	dump(profile: IProfile): IProfileInput;
	/** {@inheritDoc IProfileRepository.persist} */
	persist(profile: IProfile): void;
	/** {@inheritDoc IProfileRepository.has} */
	has(id: string): boolean;
	/** {@inheritDoc IProfileRepository.forget} */
	forget(id: string): void;
	/** {@inheritDoc IProfileRepository.flush} */
	flush(): void;
	/** {@inheritDoc IProfileRepository.count} */
	count(): number;
	/** {@inheritDoc IProfileRepository.toObject} */
	toObject(): Record<string, object>;
}
