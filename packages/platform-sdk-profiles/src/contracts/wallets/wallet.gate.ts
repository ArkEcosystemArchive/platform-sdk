import { IReadWriteWallet } from ".";

/**
 * Defines the implementation contract for the wallet authorisation gate.
 *
 * @export
 * @interface IWalletGate
 */
export interface IWalletGate {
	/**
	 * Determine if the given ability should be granted for the current wallet.
	 *
	 * @param {string} ability
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	allows(ability: string): boolean;

	/**
	 * Determine if the given ability should be denied for the current wallet.
	 *
	 * @param {string} ability
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	denies(ability: string): boolean;

	/**
	 * Determine if any one of the given abilities should be granted for the current wallet.
	 *
	 * @param {string[]} abilities
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	any(abilities: string[]): boolean;

	/**
	 * Determine if all one of the given abilities should be granted for the current wallet.
	 *
	 * @param {string[]} abilities
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	all(abilities: string[]): boolean;
}
