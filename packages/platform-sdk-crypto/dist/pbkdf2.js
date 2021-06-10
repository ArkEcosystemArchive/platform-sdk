"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PBKDF2 = void 0;
const string_crypto_1 = __importDefault(require("string-crypto"));
/**
 * Implements all functionality that is required to work with the PBKDF2
 * key derivation and password hashing algorithm as defined by the specs.
 *
 * @see {@link https://en.wikipedia.org/wiki/PBKDF2}
 *
 * @export
 * @class PBKDF2
 */
class PBKDF2 {
	/**
	 * Encrypts the value with the given password.
	 *
	 * @static
	 * @param {string} value
	 * @param {string} password
	 * @returns {string}
	 * @memberof PBKDF2
	 */
	static encrypt(value, password) {
		return new string_crypto_1.default().encryptString(value, password);
	}
	/**
	 * Decrypts the value with the given password.
	 *
	 * @remarks
	 * This function will throw an exception if the password doesn't match
	 * the hash because it won't be able to make sense of the data.
	 *
	 * @static
	 * @param {string} hash
	 * @param {string} password
	 * @returns {string}
	 * @memberof PBKDF2
	 */
	static decrypt(hash, password) {
		return new string_crypto_1.default().decryptString(hash, password);
	}
	/**
	 * Verifies that the given hash and password match.
	 *
	 * @remarks
	 * A match in the has and password should be interpreted as ownership
	 * of whatever resource is protected by the given hash and password.
	 *
	 * @static
	 * @param {string} hash
	 * @param {string} password
	 * @returns {boolean}
	 * @memberof PBKDF2
	 */
	static verify(hash, password) {
		try {
			this.decrypt(hash, password);
			return true;
		} catch {
			return false;
		}
	}
}
exports.PBKDF2 = PBKDF2;
//# sourceMappingURL=pbkdf2.js.map
