import PQueue from "p-queue";

import { processPendingBlocks } from "./blocks";
import { useClient, useDatabase, useLogger } from "./factories";
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

	await database.runMigrations();

	const downloadQueue = new PQueue({ concurrency: flags.batchSize });

	const [localHeight, remoteHeight] = [await database.lastBlockNumber(), await client.height()];

	logger.info(`Starting at block height ${localHeight}.`);
	await database.deleteBlock(localHeight); // at start we always delete the last stored one as it can be incomplete

	const alreadyDownloaded: Set<number> = new Set();
	(await database.alreadyDownloadedBlocks(localHeight, remoteHeight)).forEach((downloaded) =>
		alreadyDownloaded.add(downloaded.height),
	);

	const range = [...Array(remoteHeight + 1).keys()]
		.filter((value) => remoteHeight >= value && localHeight <= value)
		.filter((value) => !alreadyDownloaded.has(value));

	for (const blockHeight of range) {
		void downloadQueue.add(async () => database.storePendingBlock(await client.blockWithTransactions(blockHeight)));
	}

	let busy = false;
	setInterval(async () => {
		if (!busy) {
			busy = true;
			await processPendingBlocks(logger, database);
			busy = false;
		}
	}, 5000); // Every 5 seconds
};
