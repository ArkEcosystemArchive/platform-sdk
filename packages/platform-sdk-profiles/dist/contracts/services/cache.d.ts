import { DateTime } from "@arkecosystem/platform-sdk-intl";
declare type CacheStore = Record<
	string,
	{
		expires_at: DateTime;
		value: unknown;
	}
>;
/**
 * Defines the implementation contract for the cache service.
 *
 * @export
 * @interface ICache
 */
export interface ICache {
	/**
	 * Get all entries from the storage.
	 *
	 * @return {CacheStore}
	 * @memberof ICache
	 */
	all(): CacheStore;
	/**
	 * Get a list of all keys from the storage.
	 *
	 * @return {string[]}
	 * @memberof ICache
	 */
	keys(): string[];
	/**
	 * Get the given key from the storage.
	 *
	 * @template T
	 * @param {string} key
	 * @return {T}
	 * @memberof ICache
	 */
	get<T>(key: string): T;
	/**
	 * Set the given key in the storage.
	 *
	 * @param {string} key
	 * @param {unknown} value
	 * @param {number} ttl
	 * @memberof ICache
	 */
	set(key: string, value: unknown, ttl: number): void;
	/**
	 * Check if the given key exists in the storage.
	 *
	 * @param {string} key
	 * @return {boolean}
	 * @memberof ICache
	 */
	has(key: string): boolean;
	/**
	 * Remove the given key from the storage.
	 *
	 * @param {string} key
	 * @memberof ICache
	 */
	forget(key: string): void;
	/**
	 * Remove all keys from the storage.
	 *
	 * @memberof ICache
	 */
	flush(): void;
}
export {};
