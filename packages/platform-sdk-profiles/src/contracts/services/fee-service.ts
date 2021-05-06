import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { IProfile } from "../profiles";

/**
 * Defines the implementation contract for the fee service.
 *
 * @export
 * @interface IFeeService
 */
export interface IFeeService {
	/**
	 * Get all fees for the given coin and network.
	 *
	 * @param {Coins.Coin} coin
	 * @return {Contracts.TransactionFees}
	 * @memberof IFeeService
	 */
	all(coin: Coins.Coin): Contracts.TransactionFees;

	/**
	 * Get fees for the given coin, network and type.
	 *
	 * @param {Coins.Coin} coin
	 * @param {string} type
	 * @return {Contracts.TransactionFee}
	 * @memberof IFeeService
	 */
	findByType(coin: Coins.Coin, type: string): Contracts.TransactionFee;

	/**
	 * Synchronise fees for the given coin and network.
	 *
	 * @param {Coins.Coin} coin
	 * @return {Promise<void>}
	 * @memberof IFeeService
	 */
	sync(coin: Coins.Coin): Promise<void>;

	/**
	 * Synchronise fees for all coins and networks.
	 *
	 * @param {IProfile} profile
	 * @return {Promise<void>}
	 * @memberof IFeeService
	 */
	syncAll(profile: IProfile): Promise<void>;
}
