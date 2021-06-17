type NetworkType = "live" | "test";

/**
 * Defines the implementation contract for the wallet aggregate.
 *
 * @export
 * @interface IWalletAggregate
 */
export interface IWalletAggregate {
	/**
	 * Aggregate the balance for all wallets of the currently selected profile.
	 *
	 * @param {NetworkType} [networkType]
	 * @return {number}
	 * @memberof IWalletAggregate
	 */
	balance(networkType?: NetworkType): number;

	/**
	 * Aggregate the converted balance for all wallets of the currently selected profile.
	 *
	 * @return {number}
	 * @memberof IWalletAggregate
	 */
	convertedBalance(): number;
}
