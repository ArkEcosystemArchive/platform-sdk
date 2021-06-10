/**
 * Defines the implementation contract for the read-only wallets.
 *
 * @export
 * @interface IReadOnlyWallet
 */
export interface IReadOnlyWallet {
	/**
	 * Get the address.
	 *
	 * @returns {string}
	 * @memberof IReadOnlyWallet
	 */
	address(): string;
	/**
	 * Get the public key.
	 *
	 * @returns {(string | undefined)}
	 * @memberof IReadOnlyWallet
	 */
	publicKey(): string | undefined;
	/**
	 * Get the address.
	 *
	 * @returns {(string | undefined)}
	 * @memberof IReadOnlyWallet
	 */
	username(): string | undefined;
	/**
	 * Get the rank.
	 *
	 * @returns {(number | undefined)}
	 * @memberof IReadOnlyWallet
	 */
	rank(): number | undefined;
	/**
	 * Get the avatar.
	 *
	 * @returns {string}
	 * @memberof IReadOnlyWallet
	 */
	avatar(): string;
	/**
	 * Get the explorer link.
	 *
	 * @returns {string}
	 * @memberof IReadOnlyWallet
	 */
	explorerLink(): string;
	/**
	 * Determine if the wallet is a delegate.
	 *
	 * @returns {boolean}
	 * @memberof IReadOnlyWallet
	 */
	isDelegate(): boolean;
	/**
	 * Determine if the wallet is a resigned delegate.
	 *
	 * @returns {boolean}
	 * @memberof IReadOnlyWallet
	 */
	isResignedDelegate(): boolean;
}
