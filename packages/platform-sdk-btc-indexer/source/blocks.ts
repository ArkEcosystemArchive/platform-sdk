import { Database } from "./database";
import { Logger } from "./logger";

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
