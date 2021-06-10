/**
 * A helper to abstract away common interactions with arrays.
 *
 * @export
 * @class Arr
 */
export declare class Arr {
	/**
	 * Get a random value from the given dataset.
	 *
	 * @static
	 * @template T
	 * @param {T[]} items
	 * @returns {T}
	 * @memberof Arr
	 */
	static randomElement<T>(items: T[]): T;
}
