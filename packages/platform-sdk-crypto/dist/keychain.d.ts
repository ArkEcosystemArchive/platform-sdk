/**
 *
 *
 * @export
 * @class Keychain
 */
export declare class Keychain {
	/**
	 *
	 *
	 * @static
	 * @param {string} service
	 * @param {string} account
	 * @returns {(Promise<string | undefined>)}
	 * @memberof Keychain
	 */
	static get(service: string, account: string): Promise<string | undefined>;
	/**
	 *
	 *
	 * @static
	 * @param {string} service
	 * @param {string} account
	 * @param {string} password
	 * @returns {Promise<void>}
	 * @memberof Keychain
	 */
	static set(service: string, account: string, password: string): Promise<void>;
	/**
	 *
	 *
	 * @static
	 * @param {string} service
	 * @param {string} account
	 * @returns {Promise<boolean>}
	 * @memberof Keychain
	 */
	static forget(service: string, account: string): Promise<boolean>;
}
