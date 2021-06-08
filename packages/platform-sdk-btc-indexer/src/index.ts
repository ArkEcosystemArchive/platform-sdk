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

	logger.info(`Starting at block height ${localHeight}.`);

	const alreadyDownloaded: Set<number> = new Set();
	(await database.alreadyDownloadedBlocks(localHeight, remoteHeight)).forEach((downloaded) =>
		alreadyDownloaded.add(downloaded.height),
	);

	const range = [...Array(remoteHeight + 1).keys()]
		.filter((value) => remoteHeight >= value && localHeight <= value)
		.filter((value) => !alreadyDownloaded.has(value));

	for (const blockHeight of range) {
		downloadQueue.add(async () => database.storePendingBlock(await client.blockWithTransactions(blockHeight)));
	}

	let busy = false;
	setInterval(async () => {
		if (!busy) {
			busy = true;
			await processPendingBlocks(logger, database);
			busy = false;
		}
	}, 10000); // Every 10 seconds
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
