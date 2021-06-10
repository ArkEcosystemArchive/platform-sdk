import { TransactionObj, TxBlockObj } from "@zilliqa-js/core";
/**
 * Implements a JSON-RPC client for bitcoind.
 *
 * @export
 * @class Client
 */
export declare class Client {
	#private;
	/**
	 * Creates an instance of Client.
	 *
	 * @param {string} host
	 * @memberof Client
	 */
	constructor(host: string);
	/**
	 * Returns the latest height / block number.
	 *
	 * @returns {Promise<number>}
	 * @memberof Client
	 */
	height(): Promise<number>;
	/**
	 * Returns the block data for the given ID, including transactions.
	 *
	 * @param {number} height
	 * @returns {Promise<TxBlockObj>}
	 * @memberof Client
	 */
	block(height: number): Promise<TxBlockObj>;
	/**
	 * Returns the block data for the given ID, including transactions.
	 *
	 * @param {number} height
	 * @returns {Promise<TransactionObj[]>}
	 * @memberof Client
	 */
	transactions(height: number): Promise<TransactionObj[]>;
}
