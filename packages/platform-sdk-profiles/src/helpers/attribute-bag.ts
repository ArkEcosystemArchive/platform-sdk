import { delete as del, get, has, set } from "dot-prop";

export class AttributeBag<T>
{
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
	public constructor(attributes?: Partial<T>)
    {
		if (attributes) {
			this.#attributes = attributes;
		}
    }

    /**
	 * Get a given attribute from the attribute object.
	 *
	 * @template T
	 * @param {keyof T} key
	 * @param {T} [defaultValue]
	 * @return {*}  {T}
	 * @memberof AttributeBag
	 */
	public get<T>(key: keyof T, defaultValue?: T): T
    {
        return get(this.#attributes, key as string, defaultValue) as T;
    }

	/**
	 * Set a given attribute in the attribute object.
	 *
	 * @template T
	 * @param {string} key
	 * @param {T} value
	 * @memberof AttributeBag
	 */
	public set<T>(key: string, value: T): void
    {
        set(this.#attributes, key, value);
    }

    /**
	 * Determine if a given attribute exists in the attribute object.
	 *
	 * @param {keyof T} key
	 * @return {*}  {boolean}
	 * @memberof AttributeBag
	 */
	public has(key: keyof T): boolean
    {
        return has(this.#attributes, key as string);
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
	 public flush(): void
	 {
		this.#attributes = {};
	 }

    /**
	 * Only include the given attribute from the attribute object.
	 *
	 * @param {(keyof T)[]} keys
	 * @return {*}  {Record<string, any>}
	 * @memberof AttributeBag
	 */
	public only(keys: (keyof T)[]): Record<string, any>
    {
		const result: object = {};

        for(const [key, value] of Object.entries(this.#attributes)) {
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
	public except(keys: (keyof T)[]): Record<string, any>
    {
		const result: object = {};

        for(const [key, value] of Object.entries(this.#attributes)) {
			if (! keys.includes(key as keyof T)) {
				result[key] = value;
			}
		}

        return result;
    }
}
