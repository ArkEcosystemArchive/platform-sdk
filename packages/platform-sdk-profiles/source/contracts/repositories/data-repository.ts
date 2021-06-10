/**
 * Defines the implementation contract for the data repository.
 *
 * @export
 * @interface IDataRepository
 */
export interface IDataRepository {
	/**
	 * Get all keys and values.
	 *
	 * @returns {object}
	 * @memberof IDataRepository
	 */
	all(): object;

	/**
	 * Get the first value.
	 *
	 * @template T
	 * @returns {T}
	 * @memberof IDataRepository
	 */
	first<T>(): T;

	/**
	 * Get the last value.
	 *
	 * @template T
	 * @returns {T}
	 * @memberof IDataRepository
	 */
	last<T>(): T;

	/**
	 * Get all keys.
	 *
	 * @returns {string[]}
	 * @memberof IDataRepository
	 */
	keys(): string[];

	/**
	 * Get all values.
	 *
	 * @template T
	 * @returns {T[]}
	 * @memberof IDataRepository
	 */
	values<T>(): T[];

	/**
	 * Get the given key.
	 *
	 * @template T
	 * @param {string} key
	 * @param {(T | undefined)} [defaultValue]
	 * @returns {(T | undefined)}
	 * @memberof IDataRepository
	 */
	get<T>(key: string, defaultValue?: T | undefined): T | undefined;

	/**
	 * Set the given key.
	 *
	 * @param {string} key
	 * @param {unknown} value
	 * @memberof IDataRepository
	 */
	set(key: string, value: unknown): void;

	/**
	 * Fill the storage with data.
	 *
	 * @param {object} entries
	 * @memberof IDataRepository
	 */
	fill(entries: object): void;

	/**
	 * Determine if the given key is exists.
	 *
	 * @param {string} key
	 * @returns {boolean}
	 * @memberof IDataRepository
	 */
	has(key: string): boolean;

	/**
	 * Determine if the given key is missing.
	 *
	 * @param {string} key
	 * @returns {boolean}
	 * @memberof IDataRepository
	 */
	missing(key: string): boolean;

	/**
	 * Remove the given key.
	 *
	 * @param {string} key
	 * @memberof IDataRepository
	 */
	forget(key: string): void;

	/**
	 * Remove the given index from the value of the key.
	 *
	 * @param {string} key
	 * @param {number} index
	 * @memberof IDataRepository
	 */
	forgetIndex(key: string, index: number): void;

	/**
	 * Remove all keys.
	 *
	 * @memberof IDataRepository
	 */
	flush(): void;

	/**
	 * Count how many keys there are.
	 *
	 * @returns {number}
	 * @memberof IDataRepository
	 */
	count(): number;

	/**
	 * Take a snapshot.
	 *
	 * @memberof IDataRepository
	 */
	snapshot(): void;

	/**
	 * Restore a snapshot.
	 *
	 * @memberof IDataRepository
	 */
	restore(): void;

	/**
	 * Turn the data into a normalised object.
	 *
	 * @returns {string}
	 * @memberof IDataRepository
	 */
	toJSON(): string;
}
