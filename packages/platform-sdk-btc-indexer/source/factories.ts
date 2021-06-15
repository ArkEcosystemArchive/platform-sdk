import { Client } from "./client";
import { Database } from "./database";
import { Logger } from "./logger";
import { Flags } from "./types";
import { DownloadWorker } from "./download-worker";
import { ProcessingWorker } from "./processing-worker";

/**
 * Creates a new database instance.
 *
 * @param {Flags} flags
 * @param {Logger} logger
 * @returns {Database}
 */
export const useDatabase = (flags: Flags, logger: Logger): Database => new Database(flags, logger);

/**
 * Creates a new logger instance.
 *
 * @returns {Logger}
 */
export const useLogger = (): Logger => new Logger();

/**
 * Creates a new API client instance.
 *
 * @param {Flags} flags
 * @param {Logger} logger
 * @param {Database} database
 * @returns {Client}
 */
export const useClient = (flags: Flags, logger: Logger): Client => new Client(flags, logger);

export const useDownloader = (flags: Flags, logger: Logger, client: Client): DownloadWorker => new DownloadWorker(flags, logger, client);

export const useProcessor = (flags: Flags, logger: Logger, database: Database): ProcessingWorker => new ProcessingWorker (flags, logger, database);
