import pino from "pino";
/**
 * Implements a database storage with SQLite.
 *
 * @export
 * @class Database
 */
export declare class Database {
	#private;
	/**
	 * Creates an instance of Database.
	 *
	 * @param {Record<string, string>} flags
	 * @param {pino.Logger} logger
	 * @memberof Database
	 */
	constructor(flags: Record<string, string>, logger: pino.Logger);
	/**
	 * Returns the height of the last block stored.
	 *
	 * @returns {number}
	 * @memberof Database
	 */
	lastBlockNumber(): number;
	/**
	 * Stores a block and all of its transactions.
	 *
	 * @param {{ hash: string; transactions: { id: string }[] }} block
	 * @memberof Database
	 */
	storeBlockWithTransactions(block: {
		hash: string;
		transactions: {
			id: string;
		}[];
	}): void;
}
