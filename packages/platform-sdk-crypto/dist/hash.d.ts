/// <reference types="node" />
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
export declare class Hash {
	#private;
	/**
	 * Hashes the given value using the RIPEMD160 algorithm.
	 *
	 * @static
	 * @param {(Buffer | string)} buffer
	 * @returns {Buffer}
	 * @memberof Hash
	 */
	static ripemd160(buffer: Buffer | string): Buffer;
	/**
	 * Hashes the given value using the SHA1 algorithm.
	 *
	 * @static
	 * @param {(Buffer | string)} buffer
	 * @returns {Buffer}
	 * @memberof Hash
	 */
	static sha1(buffer: Buffer | string): Buffer;
	/**
	 * Hashes the given value using the SHA256 algorithm.
	 *
	 * @static
	 * @param {(Buffer | string | Buffer[])} buffer
	 * @returns {Buffer}
	 * @memberof Hash
	 */
	static sha256(buffer: Buffer | string | Buffer[]): Buffer;
	/**
	 * Hashes the given value using the HASH160 algorithm.
	 *
	 * @static
	 * @param {(Buffer | string)} buffer
	 * @returns {Buffer}
	 * @memberof Hash
	 */
	static hash160(buffer: Buffer | string): Buffer;
	/**
	 * Hashes the given value using the HASH256 algorithm.
	 *
	 * @static
	 * @param {(Buffer | string)} buffer
	 * @returns {Buffer}
	 * @memberof Hash
	 */
	static hash256(buffer: Buffer | string): Buffer;
}
