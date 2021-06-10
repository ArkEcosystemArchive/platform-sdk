"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AES = void 0;
const node_forge_1 = __importDefault(require("node-forge"));
/**
 *
 *
 * @export
 * @class AES
 */
class AES {
	static encrypt(message, password, salt, iv) {
		const derivedKey = node_forge_1.default.pkcs5.pbkdf2(password, salt, 5000, 32);
		const cipher = node_forge_1.default.cipher.createCipher("AES-CBC", derivedKey);
		cipher.start({ iv: node_forge_1.default.util.decode64(iv) });
		cipher.update(node_forge_1.default.util.createBuffer(message));
		cipher.finish();
		return node_forge_1.default.util.encode64(cipher.output.getBytes());
	}
	/**
	 *
	 *
	 * @static
	 * @param {string} cipherText
	 * @param {string} password
	 * @param {string} salt
	 * @param {string} iv
	 * @returns {string}
	 * @memberof AES
	 */
	static decrypt(cipherText, password, salt, iv) {
		const derivedKey = node_forge_1.default.pkcs5.pbkdf2(password, salt, 5000, 32);
		const decipher = node_forge_1.default.cipher.createDecipher("AES-CBC", derivedKey);
		decipher.start({ iv: node_forge_1.default.util.decode64(iv) });
		decipher.update(node_forge_1.default.util.createBuffer(node_forge_1.default.util.decode64(cipherText)));
		decipher.finish();
		return decipher.output.toString();
	}
}
exports.AES = AES;
//# sourceMappingURL=aes.js.map
