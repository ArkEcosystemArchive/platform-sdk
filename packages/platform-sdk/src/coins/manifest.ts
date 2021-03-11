import { get } from "dot-prop";

/**
 *
 *
 * @export
 * @class Manifest
 */
export class Manifest {
	/**
	 *
	 *
	 * @type {object}
	 * @memberof Manifest
	 */
	readonly #manifest: object;

	/**
	 *Creates an instance of Manifest.
	 * @param {object} manifest
	 * @memberof Manifest
	 */
	public constructor(manifest: object) {
		this.#manifest = manifest;
	}

	/**
	 *
	 *
	 * @returns {object}
	 * @memberof Manifest
	 */
	public all(): object {
		return this.#manifest;
	}

	/**
	 *
	 *
	 * @template T
	 * @param {string} name
	 * @returns {T}
	 * @memberof Manifest
	 */
	public get<T>(name: string): T {
		const result: T | undefined = get(this.#manifest, name);

		if (result === undefined) {
			throw new Error(`The [${name}] key does not exist in the manifest.`);
		}

		return result;
	}
}
