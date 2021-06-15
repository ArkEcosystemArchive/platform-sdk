import { useClient, useDatabase, useDownloader, useLogger, useProcessor } from "./factories";
import { Logger } from "./logger";
import { Flags } from "./types";
import { Database } from "./database";
import { Client } from "./client";

/**
 * Launch the indexer and subscribe to updates for new data.
 *
 * @param {Flags} flags
 * @returns {Promise<void>}
 */
export const subscribe = async (flags: Flags): Promise<void> => {
	const logger: Logger = useLogger();

	const database: Database = useDatabase(flags, logger);
	await database.runMigrations();

	const client: Client = useClient(flags, logger);
	const downloader = useDownloader(flags, logger, client);
	await downloader.seedJobs();

	useProcessor(flags, logger, database);
};
