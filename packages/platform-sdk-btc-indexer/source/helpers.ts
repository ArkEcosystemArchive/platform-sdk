import { Client } from "./client";
import { Database } from "./database";
import { Logger } from "./logger";
import { Flags } from "./types";

/**
 * Creates a new database instance.
 *
 * @param {Flags} flags
 * @param {Logger} logger
 * @returns {Database}
 */
export const useDatabase = (flags: Flags, logger: Logger): Database => new Database(flags, logger);

/**
 * Creates a new logger instance.
 *
 * @returns {Logger}
 */
export const useLogger = (): Logger => new Logger();

/**
 * Creates a new API client instance.
 *
 * @param {Flags} flags
 * @param {Logger} logger
 * @param {Database} database
 * @returns {Client}
 */
export const useClient = (flags: Flags): Client => new Client(flags);

export const processPendingBlocks = async (logger: Logger, database: Database): Promise<void> => {
	logger.info("Checking for pending blocks...");

	const blocks = await database.allPendingBlocks();

	for (const block of blocks) {
		try {
			await database.storeBlockWithTransactions(block.payload);

			await database.deletePendingBlock(block.height);
		} catch (error) {
			logger.info(`[FAILURE] Block #${block.height} failed to be upserted: ${error.message}`);
		}
	}

	if (blocks.length) {
		logger.info(`Processed ${blocks.length} blocks 🎉`);
	}
};
