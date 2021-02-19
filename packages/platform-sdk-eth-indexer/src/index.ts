import Logger from "@ptkdev/logger";
import retry from "p-retry";

import { useLogger, useQueue, useSQLite, useClient } from "./helpers";

export const subscribe = async (flags: { coin: string; network: string; rpc: string; wss: string; database: string }): Promise<void> => {
	const logger: Logger = useLogger();
	const queue = useQueue();
	const database = useSQLite(flags, logger);
	const { rpc, wss } = useClient(flags.rpc, flags.wss);

	// Listen for new block headers and retrieve the full block with transactions
	wss.eth
		.subscribe("newBlockHeaders")
		.on("data", async (blockHeader) =>
			database.storeBlockWithTransactions(await rpc.eth.getBlock(blockHeader.number, true)),
		)
		.on("error", (error: Error) => logger.error(error.message));

	// Get the last block we stored in the database and grab the latest block
	// on the network so that we can sync the missing blocks to complete our
	// copy of the blockchain to avoid holes in the historical data of users.
	const blockHeights = { local: database.lastBlockNumber() || 1, remote: await rpc.eth.getBlockNumber() };

	for (let i = blockHeights.local; i <= blockHeights.remote; i++) {
		try {
			if (queue.size === 1000) {
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
						database.storeBlockWithTransactions(await rpc.eth.getBlock(i, true));
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
