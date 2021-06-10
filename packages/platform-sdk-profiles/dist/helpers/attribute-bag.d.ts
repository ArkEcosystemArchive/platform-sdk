export declare class AttributeBag<T> {
	#private;
	/**
	 * Creates an instance of AttributeBag.
	 * @param {T} [attributes]
	 * @memberof AttributeBag
	 */
	constructor(attributes?: Partial<T>);
	/**
	 * Get all of the items in the attribute object.
	 *
	 * @return {Partial<T>}
	 * @memberof AttributeBag
	 */
	all(): Partial<T>;
	/**
	 * Get a given attribute from the attribute object.
	 *
	 * @template U
	 * @param {(keyof T | string)} key
	 * @param {U} [defaultValue]
	 * @return {T}
	 * @memberof AttributeBag
	 */
	get<U = any>(key: keyof T | string, defaultValue?: U): U;
	/**
	 * Set a given attribute in the attribute object.
	 *
	 * @template T
	 * @param {(keyof T | string)} key
	 * @param {U} value
	 * @memberof AttributeBag
	 */
	set<U>(key: keyof T | string, value: U): void;
	/**
	 * Set many given attributes in the attribute object.
	 *
	 * @param {object} value
	 * @memberof AttributeBag
	 */
	setMany(value: object): void;
	/**
	 * Determine if a given attribute exists in the attribute object.
	 *
	 * @param {keyof T} key
	 * @return {boolean}
	 * @memberof AttributeBag
	 */
	has(key: keyof T): boolean;
	/**
	 * Determine if a given attribute exists in the attribute object
	 * and is not `undefined` or `null` which equal missing contents.
	 *
	 * @param {keyof T} key
	 * @return {boolean}
	 * @memberof AttributeBag
	 */
	hasStrict(key: keyof T | string): boolean;
	/**
	 * Determine if a given attribute is missing in the attribute object.
	 *
	 * @param {keyof T} key
	 * @return {boolean}
	 * @memberof AttributeBag
	 */
	missing(key: keyof T): boolean;
	/**
	 * Remove an item from the attributes.
	 *
	 * @param {keyof T} key
	 * @memberof AttributeBag
	 */
	forget(key: keyof T): void;
	/**
	 * Remove all items from the attributes.
	 *
	 * @memberof AttributeBag
	 */
	flush(): void;
	/**
	 * Only include the given attribute from the attribute object.
	 *
	 * @param {(keyof T)[]} keys
	 * @return {Record<string, any>}
	 * @memberof AttributeBag
	 */
	only(keys: (keyof T)[]): Record<string, any>;
	/**
	 * Exclude the given attribute from the attribute object.
	 *
	 * @param {(keyof T)[]} keys
	 * @return {Record<string, any>}
	 * @memberof AttributeBag
	 */
	except(keys: (keyof T)[]): Record<string, any>;
}
