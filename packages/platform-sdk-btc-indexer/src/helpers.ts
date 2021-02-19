import Logger from "@ptkdev/logger";
import PQueue from "p-queue";

import { Client } from "./client";
import { Database } from "./database";
import { Flags } from "./types";

export const useDatabase = (flags: Flags, logger: Logger): Database => new Database(flags, logger);

export const useLogger = (): Logger => new Logger();

export const useQueue = (): PQueue => {
	const queue = new PQueue({ autoStart: false, concurrency: 100 });
	// queue.on("active", () => logger.debug(`Size: ${queue.size}  Pending: ${queue.pending}`));
	// queue.on("idle", () => logger.debug(`Queue is idle. Size: ${queue.size} | Pending: ${queue.pending}`));
	// queue.on("add", () => logger.debug(`Task is added. Size: ${queue.size} | Pending: ${queue.pending}`));
	// queue.on("next", () => logger.debug(`Task is completed. Size: ${queue.size} | Pending: ${queue.pending}`));

	return queue;
};

export const useClient = (flags: Flags): Client => new Client(flags);
