import { BigNumber } from "@arkecosystem/platform-sdk-support";
declare type NetworkType = "live" | "test";
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
	 * @return {BigNumber}
	 * @memberof IWalletAggregate
	 */
	balance(networkType?: NetworkType): BigNumber;
	/**
	 * Aggregate the converted balance for all wallets of the currently selected profile.
	 *
	 * @return {BigNumber}
	 * @memberof IWalletAggregate
	 */
	convertedBalance(): BigNumber;
}
export {};
