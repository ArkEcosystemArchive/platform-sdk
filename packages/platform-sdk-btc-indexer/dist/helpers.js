"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processPendingBlocks = exports.useClient = exports.useLogger = exports.useDatabase = void 0;
const client_1 = require("./client");
const database_1 = require("./database");
const logger_1 = require("./logger");
/**
 * Creates a new database instance.
 *
 * @param {Flags} flags
 * @param {Logger} logger
 * @returns {Database}
 */
const useDatabase = (flags, logger) => new database_1.Database(flags, logger);
exports.useDatabase = useDatabase;
/**
 * Creates a new logger instance.
 *
 * @returns {Logger}
 */
const useLogger = () => new logger_1.Logger();
exports.useLogger = useLogger;
/**
 * Creates a new API client instance.
 *
 * @param {Flags} flags
 * @param {Logger} logger
 * @param {Database} database
 * @returns {Client}
 */
const useClient = (flags) => new client_1.Client(flags);
exports.useClient = useClient;
const processPendingBlocks = async (logger, database) => {
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
exports.processPendingBlocks = processPendingBlocks;
//# sourceMappingURL=helpers.js.map
