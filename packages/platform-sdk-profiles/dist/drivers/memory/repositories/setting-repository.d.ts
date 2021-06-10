import { IProfile, ISettingRepository } from "../../../contracts";
export declare class SettingRepository implements ISettingRepository {
	#private;
	constructor(profile: IProfile, allowedKeys: string[]);
	/** {@inheritDoc ISettingRepository.all} */
	all(): object;
	/** {@inheritDoc ISettingRepository.keys} */
	keys(): object;
	/** {@inheritDoc ISettingRepository.get} */
	get<T>(key: string, defaultValue?: T): T | undefined;
	/** {@inheritDoc ISettingRepository.set} */
	set(key: string, value: string | number | boolean | object): void;
	/** {@inheritDoc ISettingRepository.fill} */
	fill(entries: object): void;
	/** {@inheritDoc ISettingRepository.has} */
	has(key: string): boolean;
	/** {@inheritDoc ISettingRepository.missing} */
	missing(key: string): boolean;
	/** {@inheritDoc ISettingRepository.forget} */
	forget(key: string): void;
	/** {@inheritDoc ISettingRepository.flush} */
	flush(): void;
}
