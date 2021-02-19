import Logger from "@ptkdev/logger";
import PQueue from "p-queue";
import Web3 from "web3";

import { SQLite } from "./drivers/sqlite";

export const useSQLite = (flags, logger): SQLite => new SQLite(flags, logger);

export const useLogger = (): Logger => new Logger();

export const usePQueue = (): PQueue => {
	const queue = new PQueue({ autoStart: false, concurrency: 10 });
	// queue.on("active", () => logger.debug(`Size: ${queue.size}  Pending: ${queue.pending}`));
	// queue.on("idle", () => logger.debug(`Queue is idle. Size: ${queue.size} | Pending: ${queue.pending}`));
	// queue.on("add", () => logger.debug(`Task is added. Size: ${queue.size} | Pending: ${queue.pending}`));
	// queue.on("next", () => logger.debug(`Task is completed. Size: ${queue.size} | Pending: ${queue.pending}`));

	return queue;
};

export const useWeb3 = (rpc: string, wss: string): { rpc: Web3, wss: Web3 } => ({
	wss: new Web3(new Web3.providers.WebsocketProvider(wss)),
	rpc: new Web3(rpc),
})
