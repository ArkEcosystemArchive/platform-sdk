import execa from "execa";
import PQueue from "p-queue";
import PWaitFor from "p-wait-for";
import path from "path";

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
	await runMigrations();

	const logger: Logger = useLogger();
	const database = useDatabase(flags, logger);
	const client = useClient(flags);
	const step: number = flags.batchSize;

	const fetchingQueue = new PQueue({ concurrency: step });
	const toBeProcessed: object = {};

	// Get the last block we stored in the database and grab the latest block
	// on the network so that we can sync the missing blocks to complete our
	// copy of the blockchain to avoid holes in the historical data of users.
	const [localHeight, remoteHeight] = [await database.lastBlockNumber(), await client.height()];

	const addBlock = (blockHeight) =>
		fetchingQueue.add(async () => (toBeProcessed[blockHeight] = await client.blockWithTransactions(blockHeight)));
	// Load initial batch of size = {step}
	for (let i = localHeight; i < Math.min(localHeight + step, remoteHeight); i++) {
		logger.info(`adding block ${i} to queue`);
		void addBlock(i);
	}

	// Process sequential, in order and with no gaps
	for (let j = localHeight; j <= remoteHeight; j++) {
		logger.info(`processing block ${j}`);
		await PWaitFor(() => toBeProcessed[j] !== undefined);
		await database.storeBlockWithTransactions(toBeProcessed[j]);

		// Schedule fetching of next block (if still not done)
		const nextBlock: number = j + step;
		if (nextBlock < remoteHeight) {
			void addBlock(nextBlock);
		}
	}
};

const runMigrations = async (): Promise<void> => {
	const { stdout } = await execa("npx", [
		"prisma",
		"migrate",
		"deploy",
		"--schema",
		path.resolve(__dirname, "../prisma/schema.prisma"),
	]);
	console.log(stdout);
};
