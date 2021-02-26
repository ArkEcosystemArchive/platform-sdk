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
		const item = items[Math.floor(Math.random() * items.length)];

		if (item === undefined) {
			throw new Error("Trying to access element with an illegal index.");
		}

		return item;
	}
}
