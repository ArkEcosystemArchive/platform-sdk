import { delete as del, get, has, set } from "dot-prop";

export class AttributeBag<T> {
	/**
	 * The raw object of attributes.
	 *
	 * @memberof AttributeBag
	 */
	#attributes: Partial<T> = {} as T;

	/**
	 * Creates an instance of AttributeBag.
	 * @param {T} [attributes]
	 * @memberof AttributeBag
	 */
	public constructor(attributes?: Partial<T>) {
		if (attributes) {
			this.#attributes = attributes;
		}
	}

	/**
	 * Get all of the items in the attribute object.
	 *
	 * @return {*}  {Partial<T>}
	 * @memberof AttributeBag
	 */
	public all(): Partial<T> {
		return this.#attributes;
	}

	/**
	 * Get a given attribute from the attribute object.
	 *
	 * @template U
	 * @param {keyof T} key
	 * @param {U} [defaultValue]
	 * @return {*}  {T}
	 * @memberof AttributeBag
	 */
	public get<U = any>(key: keyof T, defaultValue?: U): U {
		return get(this.#attributes, key as string, defaultValue) as U;
	}

	/**
	 * Set a given attribute in the attribute object.
	 *
	 * @template T
	 * @param {keyof T} key
	 * @param {U} value
	 * @memberof AttributeBag
	 */
	public set<U>(key: keyof T | string, value: U): void {
		set(this.#attributes, key as string, value);
	}

	/**
	 * Set many given attributes in the attribute object.
	 *
	 * @param {object} value
	 * @memberof AttributeBag
	 */
	public setMany(value: object): void {
		for (const [k, v] of Object.entries(value)) {
			this.set(k, v);
		}
	}

	/**
	 * Determine if a given attribute exists in the attribute object.
	 *
	 * @param {keyof T} key
	 * @return {*}  {boolean}
	 * @memberof AttributeBag
	 */
	public has(key: keyof T): boolean {
		return has(this.#attributes, key as string);
	}

	/**
	 * Determine if a given attribute exists in the attribute object
	 * and is not `undefined` or `null` which equal missing contents.
	 *
	 * @param {keyof T} key
	 * @return {*}  {boolean}
	 * @memberof AttributeBag
	 */
	public hasStrict(key: keyof T): boolean {
		return get(this.#attributes, key as string) !== undefined;
	}

	/**
	 * Determine if a given attribute is missing in the attribute object.
	 *
	 * @param {keyof T} key
	 * @return {*}  {boolean}
	 * @memberof AttributeBag
	 */
	public missing(key: keyof T): boolean {
		return !this.has(key);
	}

	/**
	 * Remove an item from the attributes.
	 *
	 * @param {keyof T} key
	 * @memberof AttributeBag
	 */
	public forget(key: keyof T): void {
		del(this.#attributes, key as string);
	}

	/**
	 * Remove all items from the attributes.
	 *
	 * @memberof AttributeBag
	 */
	public flush(): void {
		this.#attributes = {};
	}

	/**
	 * Only include the given attribute from the attribute object.
	 *
	 * @param {(keyof T)[]} keys
	 * @return {*}  {Record<string, any>}
	 * @memberof AttributeBag
	 */
	public only(keys: (keyof T)[]): Record<string, any> {
		const result: object = {};

		for (const [key, value] of Object.entries(this.#attributes)) {
			if (keys.includes(key as keyof T)) {
				result[key] = value;
			}
		}

		return result;
	}

	/**
	 * Exclude the given attribute from the attribute object.
	 *
	 * @param {(keyof T)[]} keys
	 * @return {*}  {Record<string, any>}
	 * @memberof AttributeBag
	 */
	public except(keys: (keyof T)[]): Record<string, any> {
		const result: object = {};

		for (const [key, value] of Object.entries(this.#attributes)) {
			if (!keys.includes(key as keyof T)) {
				result[key] = value;
			}
		}

		return result;
	}
}
