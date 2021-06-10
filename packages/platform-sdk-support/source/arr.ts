/**
 * A helper to abstract away common interactions with arrays.
 *
 * @export
 * @class Arr
 */
export class Arr {
	/**
	 * Get a random value from the given dataset.
	 *
	 * @static
	 * @template T
	 * @param {T[]} items
	 * @returns {T}
	 * @memberof Arr
	 */
	public static randomElement<T>(items: T[]): T {
		return items[Math.floor(Math.random() * items.length)];
	}
}
