import { IProfile, IProfileExportOptions, IProfileInput } from "../profiles/profile";

/**
 * Defines the implementation contract for the profile repository.
 *
 * @export
 * @interface IProfileRepository
 */
export interface IProfileRepository {
	/**
	 * Fill the storage with profile data.
	 *
	 * @param {object} profiles
	 * @memberof IProfileRepository
	 */
	fill(profiles: object): void;

	/**
	 * Get all keys and values.
	 *
	 * @returns {Record<string, IProfile>}
	 * @memberof IProfileRepository
	 */
	all(): Record<string, IProfile>;

	/**
	 * Get the first profile.
	 *
	 * @returns {IProfile}
	 * @memberof IProfileRepository
	 */
	first(): IProfile;

	/**
	 * Get the last profile.
	 *
	 * @returns {IProfile}
	 * @memberof IProfileRepository
	 */
	last(): IProfile;

	/**
	 * Get all keys.
	 *
	 * @returns {string[]}
	 * @memberof IProfileRepository
	 */
	keys(): string[];

	/**
	 * Get all values.
	 *
	 * @returns {IProfile[]}
	 * @memberof IProfileRepository
	 */
	values(): IProfile[];

	/**
	 * Find a profile by its ID.
	 *
	 * @param {string} id
	 * @returns {IProfile}
	 * @memberof IProfileRepository
	 */
	findById(id: string): IProfile;

	/**
	 * Find a profile by its name.
	 *
	 * @param {string} name
	 * @returns {(IProfile | undefined)}
	 * @memberof IProfileRepository
	 */
	findByName(name: string): IProfile | undefined;

	/**
	 * Store a new profile instance using its unique ID.
	 *
	 * @param {IProfile} profile
	 * @memberof WalletRepository
	 */
	push(profile: IProfile): void;

	/**
	 * Create a new profile
	 *
	 * @param {string} name
	 * @returns {IProfile}
	 * @memberof IProfileRepository
	 */
	create(name: string): IProfile;

	/**
	 * Import a profile from its data.
	 *
	 * @param {string} data
	 * @param {string} [password]
	 * @returns {Promise<IProfile>}
	 * @memberof IProfileRepository
	 */
	import(data: string, password?: string): Promise<IProfile>;

	/**
	 * Export the data of a profile.
	 *
	 * @param {IProfile} profile
	 * @param {IProfileExportOptions} [options]
	 * @param {string} [password]
	 * @returns {string}
	 * @memberof IProfileRepository
	 */
	export(profile: IProfile, options?: IProfileExportOptions, password?: string): string;

	/**
	 * Restore a profile from its data.
	 *
	 * @param {IProfile} profile
	 * @param {string} [password]
	 * @returns {Promise<void>}
	 * @memberof IProfileRepository
	 */
	restore(profile: IProfile, password?: string): Promise<void>;

	/**
	 * Dump the profile data.
	 *
	 * @param {IProfile} profile
	 * @return {*}  {IProfileInput}
	 * @memberof IProfile
	 */
	dump(profile: IProfile): IProfileInput;

	/**
	 * Determine if a profile for the given ID exists.
	 *
	 * @param {string} id
	 * @returns {boolean}
	 * @memberof IProfileRepository
	 */
	has(id: string): boolean;

	/**
	 * Remove the profile for the given ID.
	 *
	 * @param {string} id
	 * @memberof IProfileRepository
	 */
	forget(id: string): void;

	/**
	 * Remove all profiles.
	 *
	 * @memberof IProfileRepository
	 */
	flush(): void;

	/**
	 * Count how many profiles there are.
	 *
	 * @returns {number}
	 * @memberof IProfileRepository
	 */
	count(): number;

	/**
	 * Tap the profile for the given ID.
	 *
	 * @param {string} id
	 * @param {Function} callback
	 * @memberof IProfileRepository
	 */
	tap(id: string, callback: Function): void;

	/**
	 * Turn the profiles into a normalised object.
	 *
	 * @returns {Record<string, object>}
	 * @memberof IProfileRepository
	 */
	toObject(): Record<string, object>;
}
