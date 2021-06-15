import { useClient, useDatabase, useDownloader, useLogger, useProcessor } from "./factories";
import { Logger } from "./logger";
import { Flags } from "./types";
import { Database } from "./database";
import { Client } from "./client";

/**
 * Start a downloader daemon
 *
 * @param {Flags} flags
 * @returns {Promise<void>}
 */
export const startDownloaderDaemon = async (flags: Flags): Promise<void> => {
	const logger: Logger = useLogger();
	logger.info("Starting downloader daemon");
	const client: Client = useClient(flags, logger);
	const downloader = useDownloader(flags, logger, client);
	await downloader.seedJobs();
};

/**
 * Start a downloader daemon
 *
 * @param {Flags} flags
 * @returns {Promise<void>}
 */
export const startProcessingDaemon = async (flags: Flags): Promise<void> => {
	const logger: Logger = useLogger();
	logger.info("Starting processing daemon");

	const database: Database = useDatabase(flags, logger);
	await database.runMigrations();

	useProcessor(flags, logger, database);
};
