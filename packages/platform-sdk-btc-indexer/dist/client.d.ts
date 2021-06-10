import { Flags } from "./types";
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
	 * @param {Flags} flags
	 * @param {Logger} logger
	 * @param {Database} database
	 * @memberof Client
	 */
	constructor(flags: Flags);
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
	 * @param {number} id
	 * @returns {Promise<Record<string, any>>}
	 * @memberof Client
	 */
	blockWithTransactions(id: number): Promise<Record<string, any>>;
}
