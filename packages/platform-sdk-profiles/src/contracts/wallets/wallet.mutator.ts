/**
 * Defines the implementation contract for the wallet mutator.
 *
 * @export
 * @interface IWalletMutator
 */
export interface IWalletMutator {
	/**
	 * Set the coin and network that should be communicated with.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @param {{ sync: boolean }} [options]
	 * @return {Promise<void>}
	 * @memberof void
	 */
	coin(coin: string, network: string, options?: { sync: boolean }): Promise<void>;

	/**
	 * Set the identity based on a mnemonic.
	 *
	 * @param {string} mnemonic
	 * @return {Promise<void>}
	 * @memberof void
	 */
	identity(mnemonic: string): Promise<void>;

	/**
	 * Set the address and optionally synchronise the wallet.
	 *
	 * @param {string} address
	 * @param {{ syncIdentity: boolean; validate: boolean }} [options]
	 * @return {Promise<void>}
	 * @memberof void
	 */
	address(address: string, options?: { syncIdentity: boolean; validate: boolean }): Promise<void>;

	/**
	 * Set the avatar.
	 *
	 * @param {string} value
	 * @return {void}
	 * @memberof void
	 */
	avatar(value: string): void;

	/**
	 * Set the alias.
	 *
	 * @param {string} alias
	 * @return {void}
	 * @memberof void
	 */
	alias(alias: string): void;
}
