import { IContactAddress, IContactAddressInput } from "./contracts";

/**
 * Defines the implementation contract for the contact address repository.
 *
 * @export
 * @interface IContactAddressRepository
 */
export interface IContactAddressRepository {
	/**
	 * Get all keys and values.
	 *
	 * @returns {Record<string, IContactAddress>}
	 * @memberof IContactAddressRepository
	 */
	all(): Record<string, IContactAddress>;

	/**
	 * Get the first entry.
	 *
	 * @returns {IContactAddress}
	 * @memberof IContactAddressRepository
	 */
	first(): IContactAddress;

	/**
	 * Get the last entry.
	 *
	 * @returns {IContactAddress}
	 * @memberof IContactAddressRepository
	 */
	last(): IContactAddress;

	/**
	 * Get all keys.
	 *
	 * @returns {string[]}
	 * @memberof IContactAddressRepository
	 */
	keys(): string[];

	/**
	 * Get all values.
	 *
	 * @returns {IContactAddress[]}
	 * @memberof IContactAddressRepository
	 */
	values(): IContactAddress[];

	/**
	 * Create a new contact address.
	 *
	 * @param {IContactAddressInput} data
	 * @returns {Promise<IContactAddress>}
	 * @memberof IContactAddressRepository
	 */
	create(data: IContactAddressInput): Promise<IContactAddress>;

	/**
	 * Fill a dump of contact addresses into the storage.
	 *
	 * @param {any[]} addresses
	 * @returns {Promise<void>}
	 * @memberof IContactAddressRepository
	 */
	fill(addresses: any[]): Promise<void>;

	/**
	 * Find a contact address by its id.
	 *
	 * @param {string} id
	 * @returns {IContactAddress}
	 * @memberof IContactAddressRepository
	 */
	findById(id: string): IContactAddress;

	/**
	 * Find many contact addresses by their address.
	 *
	 * @param {string} value
	 * @returns {IContactAddress[]}
	 * @memberof IContactAddressRepository
	 */
	findByAddress(value: string): IContactAddress[];

	/**
	 * Find many contact addresses by their coin.
	 *
	 * @param {string} value
	 * @returns {IContactAddress[]}
	 * @memberof IContactAddressRepository
	 */
	findByCoin(value: string): IContactAddress[];

	/**
	 * Find many contact addresses by their network.
	 *
	 * @param {string} value
	 * @returns {IContactAddress[]}
	 * @memberof IContactAddressRepository
	 */
	findByNetwork(value: string): IContactAddress[];

	/**
	 * Update a contact address by its id.
	 *
	 * @param {string} id
	 * @param {Record<string, string>} data
	 * @memberof IContactAddressRepository
	 */
	update(id: string, data: Record<string, string>): void;

	/**
	 * Delete a contact address by its id.
	 *
	 * @param {string} id
	 * @memberof IContactAddressRepository
	 */
	forget(id: string): void;

	/**
	 * Delete all contact addresses.
	 *
	 * @memberof IContactAddressRepository
	 */
	flush(): void;

	/**
	 * Count how many contact addresses there are.
	 *
	 * @returns {number}
	 * @memberof IContactAddressRepository
	 */
	count(): number;

	/**
	 * Return all contact addresses as normalised objects.
	 *
	 * @returns {object[]}
	 * @memberof IContactAddressRepository
	 */
	toArray(): object[];
}
