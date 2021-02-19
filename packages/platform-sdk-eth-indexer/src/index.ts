import Logger from "@ptkdev/logger";
import PQueue from "p-queue";
import retry from "p-retry";
import Web3 from "web3";

import { SQLite } from "./drivers/sqlite";

export const subscribe = async (flags: { coin: string; network: string; rpc: string; wss: string; database: string }): Promise<void> => {
	const { name } = require("../package.json");

	// Logging
	const logger: Logger = new Logger();

	// Queue
	const queue = new PQueue({ autoStart: false, concurrency: 10 });
	// queue.on("active", () => logger.debug(`Size: ${queue.size}  Pending: ${queue.pending}`));
	// queue.on("idle", () => logger.debug(`Queue is idle. Size: ${queue.size} | Pending: ${queue.pending}`));
	// queue.on("add", () => logger.debug(`Task is added. Size: ${queue.size} | Pending: ${queue.pending}`));
	// queue.on("next", () => logger.debug(`Task is completed. Size: ${queue.size} | Pending: ${queue.pending}`));

	// Storage
	const database = new SQLite(flags, logger);

	// API
	const wss = new Web3(new Web3.providers.WebsocketProvider(flags.wss));
	const rpc = new Web3(flags.rpc);

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
	const blockHeights = { local: 1, remote: await rpc.eth.getBlockNumber() };
	const lastBlock = database.lastBlock();

	if (lastBlock !== undefined) {
		blockHeights.local = lastBlock.number;
	}

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
