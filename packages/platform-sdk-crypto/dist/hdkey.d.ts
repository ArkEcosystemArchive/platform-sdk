/// <reference types="node" />
import Base from "hdkey";
/**
 *
 *
 * @export
 * @class HDKey
 */
export declare class HDKey {
	/**
	 *
	 *
	 * @static
	 * @param {(string | Buffer)} seed
	 * @returns {Base}
	 * @memberof HDKey
	 */
	static fromSeed(seed: string | Buffer): Base;
	/**
	 *
	 *
	 * @static
	 * @param {string} publicKey
	 * @returns {Base}
	 * @memberof HDKey
	 */
	static fromExtendedPublicKey(publicKey: string): Base;
	/**
	 *
	 *
	 * @static
	 * @param {string} privateKey
	 * @returns {Base}
	 * @memberof HDKey
	 */
	static fromExtendedPrivateKey(privateKey: string): Base;
	/**
	 *
	 *
	 * @static
	 * @param {string} publicKey
	 * @param {{ depth: number; childNumber: number }} [options={ depth: 0, childNumber: 2147483648 }]
	 * @returns {Base}
	 * @memberof HDKey
	 */
	static fromCompressedPublicKey(
		publicKey: string,
		options?: {
			depth: number;
			childNumber: number;
		},
	): Base;
}
