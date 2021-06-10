import { deletePassword, getPassword, setPassword } from "keytar";

/**
 *
 *
 * @export
 * @class Keychain
 */
export class Keychain {
	/**
	 *
	 *
	 * @static
	 * @param {string} service
	 * @param {string} account
	 * @returns {(Promise<string | undefined>)}
	 * @memberof Keychain
	 */
	public static async get(service: string, account: string): Promise<string | undefined> {
		return (await getPassword(service, account)) || undefined;
	}

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
	public static async set(service: string, account: string, password: string): Promise<void> {
		return setPassword(service, account, password);
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} service
	 * @param {string} account
	 * @returns {Promise<boolean>}
	 * @memberof Keychain
	 */
	public static async forget(service: string, account: string): Promise<boolean> {
		return deletePassword(service, account);
	}
}
