/**
 * Defines the implementation contract for the wallet synchroniser.
 *
 * @export
 * @interface IWalletSynchroniser
 */
export interface IWalletSynchroniser {
	/**
	 * Synchronise the coin.
	 *
	 * @return {Promise<void>}
	 * @memberof IReadWriteWallet
	 */
	coin(): Promise<void>;

	/**
	 * Synchronise the identity.
	 *
	 * @return {Promise<void>}
	 * @memberof IReadWriteWallet
	 */
	identity(): Promise<void>;

	/**
	 * Synchronise the multi signature.
	 *
	 * @return {Promise<void>}
	 * @memberof IReadWriteWallet
	 */
	multiSignature(): Promise<void>;

	/**
	 * Synchronise the votes.
	 *
	 * @return {Promise<void>}
	 * @memberof IReadWriteWallet
	 */
	votes(): Promise<void>;
}
