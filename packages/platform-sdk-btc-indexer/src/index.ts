import execa from "execa";
import PQueue from "p-queue";
import path from "path";

import { processPendingBlocks, useClient, useDatabase, useLogger } from "./helpers";
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

	const downloadQueue = new PQueue({ concurrency: flags.batchSize });

	const [localHeight, remoteHeight] = [await database.lastBlockNumber(), await client.height()];

	for (const blockHeight of [...Array(Math.abs(localHeight - (remoteHeight + 1))).keys()]) {
		downloadQueue.add(async () => database.storePendingBlock(await client.blockWithTransactions(blockHeight)));
	}

	setInterval(async () => processPendingBlocks(logger, database), 60000); // Every 60 seconds
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
