import pEachSeries from "p-each-series";

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

	// Get the last block we stored in the database and grab the latest block
	// on the network so that we can sync the missing blocks to complete our
	// copy of the blockchain to avoid holes in the historical data of users.
	const [localHeight, remoteHeight] = [await database.lastBlockNumber(), await client.height()];

	for (let i = localHeight; i <= remoteHeight; i += step) {
		const batch: Promise<Record<string, any>>[] = [];
		for (let j = i; j < i + step; j++) {
			batch.push(client.blockWithTransactions(j));
		}
		await pEachSeries(batch, (block) => database.storeBlockWithTransactions(block));
	}
};
