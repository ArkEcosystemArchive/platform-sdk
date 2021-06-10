"use strict";
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _a, _Hash_bufferize;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hash = void 0;
const bcrypto_1 = require("bcrypto");
/**
 * Implements a variety of hashing functions that are required to work with
 * most blockchains, especially ones that follow the Bitcoin security and
 * hashing model for blocks and transactions.
 *
 * @see {@link https://github.com/bcoin-org/bcrypto}
 *
 * @export
 * @class Hash
 */
class Hash {
	/**
	 * Hashes the given value using the RIPEMD160 algorithm.
	 *
	 * @static
	 * @param {(Buffer | string)} buffer
	 * @returns {Buffer}
	 * @memberof Hash
	 */
	static ripemd160(buffer) {
		return bcrypto_1.RIPEMD160.digest(__classPrivateFieldGet(Hash, _a, "m", _Hash_bufferize).call(Hash, buffer));
	}
	/**
	 * Hashes the given value using the SHA1 algorithm.
	 *
	 * @static
	 * @param {(Buffer | string)} buffer
	 * @returns {Buffer}
	 * @memberof Hash
	 */
	static sha1(buffer) {
		return bcrypto_1.SHA1.digest(__classPrivateFieldGet(Hash, _a, "m", _Hash_bufferize).call(Hash, buffer));
	}
	/**
	 * Hashes the given value using the SHA256 algorithm.
	 *
	 * @static
	 * @param {(Buffer | string | Buffer[])} buffer
	 * @returns {Buffer}
	 * @memberof Hash
	 */
	static sha256(buffer) {
		if (Array.isArray(buffer)) {
			let sha256 = bcrypto_1.SHA256.ctx;
			sha256.init();
			for (const element of buffer) {
				sha256 = sha256.update(element);
			}
			return sha256.final();
		}
		return bcrypto_1.SHA256.digest(__classPrivateFieldGet(Hash, _a, "m", _Hash_bufferize).call(Hash, buffer));
	}
	/**
	 * Hashes the given value using the HASH160 algorithm.
	 *
	 * @static
	 * @param {(Buffer | string)} buffer
	 * @returns {Buffer}
	 * @memberof Hash
	 */
	static hash160(buffer) {
		return bcrypto_1.Hash160.digest(__classPrivateFieldGet(Hash, _a, "m", _Hash_bufferize).call(Hash, buffer));
	}
	/**
	 * Hashes the given value using the HASH256 algorithm.
	 *
	 * @static
	 * @param {(Buffer | string)} buffer
	 * @returns {Buffer}
	 * @memberof Hash
	 */
	static hash256(buffer) {
		return bcrypto_1.Hash256.digest(__classPrivateFieldGet(Hash, _a, "m", _Hash_bufferize).call(Hash, buffer));
	}
}
exports.Hash = Hash;
(_a = Hash),
	(_Hash_bufferize = function _Hash_bufferize(buffer) {
		return buffer instanceof Buffer ? buffer : Buffer.from(buffer);
	});
//# sourceMappingURL=hash.js.map
