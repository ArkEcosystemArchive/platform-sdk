import { Contracts } from "@arkecosystem/platform-sdk";

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
	 * @return {*}  {Contracts.TransactionFees}
	 * @memberof IFeeService
	 */
	all(coin: string, network: string): Contracts.TransactionFees;

	/**
	 * Get fees for the given coin, network and type.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @param {string} type
	 * @return {*}  {Contracts.TransactionFee}
	 * @memberof IFeeService
	 */
	findByType(coin: string, network: string, type: string): Contracts.TransactionFee;

	/**
	 * Synchronise fees for the given coin and network.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @return {*}  {Promise<void>}
	 * @memberof IFeeService
	 */
	sync(coin: string, network: string): Promise<void>;

	/**
	 * Synchronise fees for all coins and networks.
	 *
	 * @return {*}  {Promise<void>}
	 * @memberof IFeeService
	 */
	syncAll(): Promise<void>;
}
