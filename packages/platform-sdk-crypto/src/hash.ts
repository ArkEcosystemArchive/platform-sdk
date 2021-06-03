import { Hash160, Hash256, RIPEMD160, SHA1, SHA256 } from "bcrypto";

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
export class Hash {
	/**
	 * Hashes the given value using the RIPEMD160 algorithm.
	 *
	 * @static
	 * @param {(Buffer | string)} buffer
	 * @returns {Buffer}
	 * @memberof Hash
	 */
	public static ripemd160(buffer: Buffer | string): Buffer {
		return RIPEMD160.digest(Hash.#bufferize(buffer));
	}

	/**
	 * Hashes the given value using the SHA1 algorithm.
	 *
	 * @static
	 * @param {(Buffer | string)} buffer
	 * @returns {Buffer}
	 * @memberof Hash
	 */
	public static sha1(buffer: Buffer | string): Buffer {
		return SHA1.digest(Hash.#bufferize(buffer));
	}

	/**
	 * Hashes the given value using the SHA256 algorithm.
	 *
	 * @static
	 * @param {(Buffer | string | Buffer[])} buffer
	 * @returns {Buffer}
	 * @memberof Hash
	 */
	public static sha256(buffer: Buffer | string | Buffer[]): Buffer {
		if (Array.isArray(buffer)) {
			let sha256 = SHA256.ctx;

			sha256.init();

			for (const element of buffer) {
				sha256 = sha256.update(element);
			}

			return sha256.final();
		}

		return SHA256.digest(Hash.#bufferize(buffer));
	}

	/**
	 * Hashes the given value using the HASH160 algorithm.
	 *
	 * @static
	 * @param {(Buffer | string)} buffer
	 * @returns {Buffer}
	 * @memberof Hash
	 */
	public static hash160(buffer: Buffer | string): Buffer {
		return Hash160.digest(Hash.#bufferize(buffer));
	}

	/**
	 * Hashes the given value using the HASH256 algorithm.
	 *
	 * @static
	 * @param {(Buffer | string)} buffer
	 * @returns {Buffer}
	 * @memberof Hash
	 */
	public static hash256(buffer: Buffer | string): Buffer {
		return Hash256.digest(Hash.#bufferize(buffer));
	}

	/**
	 * Ensures that we are always working with a Buffer before hashing.
	 *
	 * @private
	 * @static
	 * @param {(Buffer | string)} buffer
	 * @returns
	 * @memberof Hash
	 */
	static #bufferize(buffer: Buffer | string) {
		return buffer instanceof Buffer ? buffer : Buffer.from(buffer);
	}
}
