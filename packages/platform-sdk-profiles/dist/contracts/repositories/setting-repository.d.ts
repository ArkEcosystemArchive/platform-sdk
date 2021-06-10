/**
 * Defines the implementation contract for the setting repository.
 *
 * @export
 * @interface ISettingRepository
 */
export interface ISettingRepository {
	/**
	 * Get all keys and values.
	 *
	 * @returns {object}
	 * @memberof ISettingRepository
	 */
	all(): object;
	/**
	 * Get all keys.
	 *
	 * @returns {object}
	 * @memberof ISettingRepository
	 */
	keys(): object;
	/**
	 * Get the given key.
	 *
	 * @template T
	 * @param {string} key
	 * @param {T} [defaultValue]
	 * @returns {(T | undefined)}
	 * @memberof ISettingRepository
	 */
	get<T>(key: string, defaultValue?: T): T | undefined;
	/**
	 * Set the given key.
	 *
	 * @param {string} key
	 * @param {(string | number | boolean | object)} value
	 * @memberof ISettingRepository
	 */
	set(key: string, value: string | number | boolean | object): void;
	/**
	 * Fill the storage with settings data.
	 *
	 * @param {object} entries
	 * @memberof ISettingRepository
	 */
	fill(entries: object): void;
	/**
	 * Determine if the given key exists.
	 *
	 * @param {string} key
	 * @returns {boolean}
	 * @memberof ISettingRepository
	 */
	has(key: string): boolean;
	/**
	 * Determine if the given key is missing.
	 *
	 * @param {string} key
	 * @returns {boolean}
	 * @memberof ISettingRepository
	 */
	missing(key: string): boolean;
	/**
	 * Remove the given key.
	 *
	 * @param {string} key
	 * @memberof ISettingRepository
	 */
	forget(key: string): void;
	/**
	 * Remove all keys.
	 *
	 * @memberof ISettingRepository
	 */
	flush(): void;
}
