import PQueue from "p-queue";
import pWaitFor from "p-wait-for";

import { useClient, useDatabase, useLogger } from "./helpers";
import { Logger } from "./logger";
import { Flags } from "./types";

/**
 * Launch the indexer and subscribe to updates for new data.
 *
 * @param {Flags} flags
 * @returns {Promise<void>}
 */
export const subscribe = async (flags: Flags): Promise<void> => {
	const logger: Logger = useLogger();
	const database = useDatabase(flags, logger);
	const client = useClient(flags);
	const step: number = flags.batchSize;

	const fetchingQueue = new PQueue({concurrency: step});
	const toBeProcessed: object = {};

	// Get the last block we stored in the database and grab the latest block
	// on the network so that we can sync the missing blocks to complete our
	// copy of the blockchain to avoid holes in the historical data of users.
	const [localHeight, remoteHeight] = [await database.lastBlockNumber(), await client.height()];

	// Load initial batch of size = {step}
	for (let i = localHeight; i <= Math.min(localHeight + step, remoteHeight); i++) {
		logger.info(`adding block ${i} to queue`);
		fetchingQueue.add(async () => toBeProcessed[i] = await client.blockWithTransactions(i));
	}

	// Process sequential, in order and with no gaps
	for (let i = localHeight; i <= remoteHeight; i++) {
		logger.info(`processing block ${i}`);
		await pWaitFor(() => toBeProcessed[i] !== undefined)
		await database.storeBlockWithTransactions(toBeProcessed[i]);

		// Schedule fetching of next block (if still not done)
		const nextBlock: number = i + step + 1;
		if (nextBlock < remoteHeight) {
			fetchingQueue.add(async () => toBeProcessed[nextBlock] = await client.blockWithTransactions(nextBlock))
		}
	}
};
