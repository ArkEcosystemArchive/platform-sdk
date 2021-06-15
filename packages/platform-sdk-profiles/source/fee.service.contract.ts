import { Services } from "@arkecosystem/platform-sdk";
import { IProfile } from "./contracts";

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
	 * @param {string} coin
	 * @param {string} network
	 * @return {Services.TransactionFees}
	 * @memberof IFeeService
	 */
	all(coin: string, network: string): Services.TransactionFees;

	/**
	 * Get fees for the given coin, network and type.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @param {string} type
	 * @return {Services.TransactionFee}
	 * @memberof IFeeService
	 */
	findByType(coin: string, network: string, type: string): Services.TransactionFee;

	/**
	 * Synchronise fees for the given coin and network.
	 *
	 * @param {IProfile} profile
	 * @param {string} coin
	 * @param {string} network
	 * @return {Promise<void>}
	 * @memberof IFeeService
	 */
	sync(profile: IProfile, coin: string, network: string): Promise<void>;

	/**
	 * Synchronise fees for all coins and networks.
	 *
	 * @param {IProfile} profile
	 * @return {Promise<void>}
	 * @memberof IFeeService
	 */
	syncAll(profile: IProfile): Promise<void>;
}
