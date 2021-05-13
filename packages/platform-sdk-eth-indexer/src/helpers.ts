import PQueue from "p-queue";
import Web3 from "web3";

import { Database } from "./database";
import { Logger } from "./logger";

/**
 * Creates a new database instance.
 *
 * @param {*} flags
 * @param {*} logger
 * @returns {Database}
 */
export const useDatabase = (flags, logger): Database => new Database(flags, logger);

/**
 * Creates a new logger instance.
 *
 * @returns {Logger}
 */
export const useLogger = (): Logger => new Logger();

/**
 * Creates a new queue instance.
 *
 * @returns {PQueue}
 */
export const useQueue = (): PQueue => {
	const queue = new PQueue({ autoStart: false, concurrency: 10 });
	// queue.on("active", () => logger.debug(`Size: ${queue.size}  Pending: ${queue.pending}`));
	// queue.on("idle", () => logger.debug(`Queue is idle. Size: ${queue.size} | Pending: ${queue.pending}`));
	// queue.on("add", () => logger.debug(`Task is added. Size: ${queue.size} | Pending: ${queue.pending}`));
	// queue.on("next", () => logger.debug(`Task is completed. Size: ${queue.size} | Pending: ${queue.pending}`));

	return queue;
};

/**
 * Creates a new API client instance.
 *
 * @param {string} rpc
 * @param {string} wss
 * @returns {{ rpc: Web3; wss: Web3 }}
 */
export const useClient = (rpc: string, wss: string): { rpc: Web3; wss: Web3 } => ({
	wss: new Web3(new Web3.providers.WebsocketProvider(wss)),
	rpc: new Web3(rpc),
});
