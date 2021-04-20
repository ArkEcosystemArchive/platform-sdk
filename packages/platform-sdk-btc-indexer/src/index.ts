import Logger from "@ptkdev/logger";
import retry from "p-retry";

import { useClient, useDatabase, useLogger, useQueue } from "./helpers";
import { Flags } from "./types";

/**
 * Launch the indexer and subscribe to updates for new data.
 *
 * @param {Flags} flags
 * @returns {Promise<void>}
 */
export const subscribe = async (flags: Flags): Promise<void> => {
	const logger: Logger = useLogger();
	const queue = useQueue();
	const database = useDatabase(flags, logger);
	const client = useClient(flags);

	// Get the last block we stored in the database and grab the latest block
	// on the network so that we can sync the missing blocks to complete our
	// copy of the blockchain to avoid holes in the historical data of users.
	const [localHeight, remoteHeight] = [database.lastBlockNumber(), await client.height()];

	for (let i = localHeight; i <= remoteHeight; i++) {
		try {
			if (queue.size === 1000) {
				// TODO We can prefetch as many as we wont, but we need to process them in sequential order
				logger.info("Draining Queue...");

				await queue.start().onIdle();
				queue.pause();

				logger.info("Drained Queue...");
			}

			// @ts-ignore
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			queue.add(() =>
				retry(
					async () => {
						logger.info(`Processing block [${i}]`);

						database.storeBlockWithTransactions(await client.blockWithTransactions(i));
					},
					{
						onFailedAttempt: (error) => {
							database.storeError("block", i.toString(), error.message);

							logger.error(
								`Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`,
							);
						},
						retries: 10,
					},
				),
			);
		} catch (error) {
			logger.error(error);
		}
	}
};
