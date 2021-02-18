import sqlite3 from "better-sqlite3";
import envPaths from "env-paths";
import { ensureFileSync } from "fs-extra";
import PQueue from "p-queue";
import retry from "p-retry";
import pino from "pino";
import Web3 from "web3";

export const subscribe = async (
	flags: { coin: string; host: string },
	input: Record<string, string>,
): Promise<void> => {
	const { name } = require("../package.json");

	// Logging
	const logger = pino({ name, level: "debug" });

	// Queue
	const queue = new PQueue({ autoStart: false, concurrency: 10 });
	// queue.on("active", () => logger.debug(`Size: ${queue.size}  Pending: ${queue.pending}`));
	// queue.on("idle", () => logger.debug(`Queue is idle. Size: ${queue.size} | Pending: ${queue.pending}`));
	// queue.on("add", () => logger.debug(`Task is added. Size: ${queue.size} | Pending: ${queue.pending}`));
	// queue.on("next", () => logger.debug(`Task is completed. Size: ${queue.size} | Pending: ${queue.pending}`));

	// Storage
	const databaseFile = `${envPaths(name).data}/peth/${flags.coin}.db`;
	ensureFileSync(databaseFile);
	const database = sqlite3(databaseFile);

	// @TODO: create database tables for blocks and transactions

	// API - @TODO: get this value from the CLI
	const web3 = new Web3(flags.host);

	const latestBlockHeight = await web3.eth.getBlockNumber();

	// @TODO: we need to set `i` to the latest block in the database
	for (let i = 1; i <= latestBlockHeight; i++) {
		try {
			if (queue.size === 250) {
				logger.info("Draining Queue...");

				await queue.start().onIdle();
				queue.pause();

				logger.info("Drained Queue...");
			}

			// @ts-ignore
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			queue.add(() =>
				retry(async () => console.log(await web3.eth.getBlock(i, true)), {
					onFailedAttempt: (error) => {
						console.log(error);
						logger.error(
							`Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`,
						);
					},
					retries: 5,
				}),
			);
		} catch (error) {
			logger.log(error);

			process.exit();
		}
	}

	// @TODO: Once we have indexed all blocks we will listen for new blocks
};
