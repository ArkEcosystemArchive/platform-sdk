"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bcrypt = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 *
 *
 * @export
 * @class Bcrypt
 */
class Bcrypt {
	/**
	 *
	 *
	 * @static
	 * @param {string} value
	 * @returns {string}
	 * @memberof Bcrypt
	 */
	static hash(value) {
		return bcryptjs_1.default.hashSync(value);
	}
	/**
	 *
	 *
	 * @static
	 * @param {string} hash
	 * @param {string} password
	 * @returns {boolean}
	 * @memberof Bcrypt
	 */
	static verify(hash, password) {
		return bcryptjs_1.default.compareSync(password, hash);
	}
}
exports.Bcrypt = Bcrypt;
//# sourceMappingURL=bcrypt.js.map
