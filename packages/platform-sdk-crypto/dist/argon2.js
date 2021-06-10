"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Argon2 = void 0;
const argon2_browser_1 = __importDefault(require("argon2-browser"));
/**
 * Implements all functionality that is required to work with the Argon2
 * key derivation and password hashing algorithm as defined by the specs.
 *
 * @see {@link https://en.wikipedia.org/wiki/Argon2}
 *
 * @export
 * @class Argon2
 */
class Argon2 {
	/**
	 * Hashes the given value with a random salt.
	 *
	 * @static
	 * @param {string} value
	 * @returns {Promise<string>}
	 * @memberof Argon2
	 */
	static async hash(value) {
		return (await argon2_browser_1.default.hash({ pass: value, salt: Math.random().toString(10) })).encoded;
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
	 * @returns {Promise<boolean>}
	 * @memberof Argon2
	 */
	static async verify(hash, password) {
		try {
			await argon2_browser_1.default.verify({ pass: password, encoded: hash });
			return true;
		} catch {
			return false;
		}
	}
}
exports.Argon2 = Argon2;
//# sourceMappingURL=argon2.js.map
