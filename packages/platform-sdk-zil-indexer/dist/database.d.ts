import { TransactionObj, TxBlockObj } from "@zilliqa-js/core";
import { Logger } from "./logger";
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
	 * @param {Logger} logger
	 * @memberof Database
	 */
	constructor(flags: Record<string, string>, logger: Logger);
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
	 * @param TxBlockObj block
	 * @param TransactionObj[] block
	 * @memberof Database
	 */
	storeBlockWithTransactions(block: TxBlockObj, transactions: TransactionObj[]): void;
}
