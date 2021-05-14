import { BN } from "@zilliqa-js/zilliqa";
import retry from "p-retry";

import { useClient, useDatabase, useLogger, useQueue } from "./helpers";

/**
 * Launch the indexer and subscribe to updates for new data.
 *
 * @param {{
 * 	network: string;
 * 	host: string;
 * 	database: string;
 * }} flags
 * @returns {Promise<void>}
 */
export const subscribe = async (flags: { network: string; host: string; database: string }): Promise<void> => {
	const logger = useLogger();
	const queue = useQueue();
	const database = useDatabase(flags, logger);
	const zilliqa = useClient(flags.host);

	// Get the last block we stored in the database and grab the latest block
	// on the network so that we can sync the missing blocks to complete our
	// copy of the blockchain to avoid holes in the historical data of users.
	const [localHeight, remoteHeight] = [database.lastBlockNumber(), new BN(await zilliqa.height()).toNumber() - 1];

	for (let height = localHeight; height <= remoteHeight; height++) {
		try {
			if (queue.size === 1000) {
				logger.info("Draining Queue...");

				await queue.start().onIdle();
				queue.pause();

				logger.info("Drained Queue...");
			}

			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			queue.add(() =>
				retry(
					async () => {
						const block = await zilliqa.block(height);

						if (block === undefined) {
							throw new Error(`Failed to fetch block at height ${height}`);
						}

						database.storeBlockWithTransactions(
							block,
							block.header.NumTxns > 0 ? await zilliqa.transactions(height) : [],
						);
					},
					{
						onFailedAttempt: (error) => {
							console.log(error);

							logger.error(
								`Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`,
							);
						},
						retries: 5,
					},
				),
			);
		} catch (error) {
			logger.error(error);

			process.exit();
		}
	}
};
