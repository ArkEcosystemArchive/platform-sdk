/**
 * Defines the implementation contract for the wallet synchroniser.
 *
 * @export
 * @interface IWalletSynchroniser
 */
export interface IWalletSynchroniser {
	/**
	 * Synchronise the wallet.
	 *
	 * @param {{ resetCoin: boolean; }} [options]
	 * @return {*}  {Promise<void>}
	 * @memberof IReadWriteWallet
	 */
	 sync(options?: { resetCoin: boolean; }): Promise<void>;

	 /**
	  * Synchronise the identity.
	  *
	  * @return {*}  {Promise<void>}
	  * @memberof IReadWriteWallet
	  */
	 identity(): Promise<void>;

	 /**
	  * Synchronise the multi signature.
	  *
	  * @return {*}  {Promise<void>}
	  * @memberof IReadWriteWallet
	  */
	 multiSignature(): Promise<void>;

	 /**
	  * Synchronise the votes.
	  *
	  * @return {*}  {Promise<void>}
	  * @memberof IReadWriteWallet
	  */
	 votes(): Promise<void>;
}
