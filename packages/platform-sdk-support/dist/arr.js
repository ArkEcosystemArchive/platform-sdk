"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arr = void 0;
/**
 * A helper to abstract away common interactions with arrays.
 *
 * @export
 * @class Arr
 */
class Arr {
	/**
	 * Get a random value from the given dataset.
	 *
	 * @static
	 * @template T
	 * @param {T[]} items
	 * @returns {T}
	 * @memberof Arr
	 */
	static randomElement(items) {
		return items[Math.floor(Math.random() * items.length)];
	}
}
exports.Arr = Arr;
//# sourceMappingURL=arr.js.map
