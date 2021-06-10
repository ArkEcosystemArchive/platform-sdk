"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keychain = void 0;
const keytar_1 = require("keytar");
/**
 *
 *
 * @export
 * @class Keychain
 */
class Keychain {
	/**
	 *
	 *
	 * @static
	 * @param {string} service
	 * @param {string} account
	 * @returns {(Promise<string | undefined>)}
	 * @memberof Keychain
	 */
	static async get(service, account) {
		return (await keytar_1.getPassword(service, account)) || undefined;
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
	static async set(service, account, password) {
		return keytar_1.setPassword(service, account, password);
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
	static async forget(service, account) {
		return keytar_1.deletePassword(service, account);
	}
}
exports.Keychain = Keychain;
//# sourceMappingURL=keychain.js.map
