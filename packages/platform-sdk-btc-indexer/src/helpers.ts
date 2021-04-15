import Logger from "@ptkdev/logger";
import PQueue from "p-queue";

import { Client } from "./client";
import { Database } from "./database";
import { Flags } from "./types";

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
 * Creates a new queue instance.
 *
 * @param {boolean} [options={ autoStart: false, concurrency: 10 }]
 * @returns {PQueue}
 */
export const useQueue = (options = { autoStart: false, concurrency: 10 }): PQueue => {
	const queue = new PQueue(options);
	// queue.on("active", () => logger.debug(`Size: ${queue.size}  Pending: ${queue.pending}`));
	// queue.on("idle", () => logger.debug(`Queue is idle. Size: ${queue.size} | Pending: ${queue.pending}`));
	// queue.on("add", () => logger.debug(`Task is added. Size: ${queue.size} | Pending: ${queue.pending}`));
	// queue.on("next", () => logger.debug(`Task is completed. Size: ${queue.size} | Pending: ${queue.pending}`));

	return queue;
};

/**
 * Creates a new API client instance.
 *
 * @param {Flags} flags
 * @param {Logger} logger
 * @param {Database} database
 * @returns {Client}
 */
export const useClient = (flags: Flags): Client => new Client(flags);
