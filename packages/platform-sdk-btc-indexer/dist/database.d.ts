import { Logger } from "./logger";
import { Flags } from "./types";
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
	 * @param {Flags} flags
	 * @param {Logger} logger
	 * @memberof Database
	 */
	constructor(flags: Flags, logger: Logger);
	/**
	 * Returns the height of the last block stored.
	 *
	 * @returns {number}
	 * @memberof Database
	 */
	lastBlockNumber(): Promise<number>;
	allPendingBlocks(): Promise<any[]>;
	storePendingBlock(block: any): Promise<void>;
	deletePendingBlock(height: number): Promise<void>;
	alreadyDownloadedBlocks(
		min: number,
		max: number,
	): Promise<
		{
			height: number;
		}[]
	>;
	/**
	 * Stores a block and all of its transactions.
	 *
	 * @param {*} block
	 * @memberof Database
	 */
	storeBlockWithTransactions(block: any): Promise<void>;
}
