import sqlite3 from "better-sqlite3";
import envPaths from "env-paths";
import { ensureFileSync } from "fs-extra";
import PQueue from "p-queue";
import retry from "p-retry";
import pino from "pino";
import Web3 from "web3";

import { storeBlock, storeTransaction } from "./database";

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

	logger.debug(`Using [${databaseFile}] as database`);

	const database = sqlite3(databaseFile, { verbose: console.log });
	database.exec(`
		PRAGMA journal_mode = WAL;

		CREATE TABLE IF NOT EXISTS blocks(
			hash               VARCHAR(66)   PRIMARY KEY,
			difficulty         INTEGER       NOT NULL,
			extraData          VARCHAR(66)   NOT NULL,
			gasLimit           INTEGER       NOT NULL,
			gasUsed            INTEGER       NOT NULL,
			logsBloom          TEXT          NOT NULL,
			miner              VARCHAR(66)   NOT NULL,
			mixHash            VARCHAR(66)   NOT NULL,
			nonce              VARCHAR(66)   NOT NULL,
			number             INTEGER       NOT NULL,
			parentHash         VARCHAR(66)   NOT NULL,
			receiptsRoot       VARCHAR(66)   NOT NULL,
			sha3Uncles         VARCHAR(66)   NOT NULL,
			size               INTEGER       NOT NULL,
			stateRoot          VARCHAR(66)   NOT NULL,
			timestamp          INTEGER       NOT NULL,
			totalDifficulty    INTEGER       NOT NULL,
			transactionsRoot   VARCHAR(66)   NOT NULL,
			uncles             TEXT          NOT NULL
		);

		CREATE TABLE IF NOT EXISTS transactions(
			hash               VARCHAR(66)   PRIMARY KEY,
			blockHash          VARCHAR(66)   NOT NULL,
			blockNumber        INTEGER       NOT NULL,
			"from"             VARCHAR(66)   NOT NULL,
			gas                INTEGER       NOT NULL,
			gasPrice           INTEGER       NOT NULL,
			input              VARCHAR(66)   NOT NULL,
			nonce              INTEGER       NOT NULL,
			r                  VARCHAR(66)   NOT NULL,
			s                  VARCHAR(66)   NOT NULL,
			"to"               VARCHAR(66)   NOT NULL,
			transactionIndex   INTEGER       NOT NULL,
			v                  VARCHAR(66)   NOT NULL,
			value              VARCHAR(66)   NOT NULL
		);

		CREATE UNIQUE INDEX IF NOT EXISTS blocks_hash ON blocks (hash);
		CREATE UNIQUE INDEX IF NOT EXISTS transactions_hash ON transactions (hash);
	`);

	// API - @TODO: get this value from the CLI
	const web3 = new Web3(flags.host);

	// Get the last block we stored in the database and grab the latest block
	// on the network so that we can sync the missing blocks to complete our
	// copy of the blockchain to avoid holes in the historical data of users.
	const blockHeights = { local: 1, remote: await web3.eth.getBlockNumber() };
	const lastBlock = database.prepare("SELECT number FROM blocks ORDER BY number DESC LIMIT 1").get();

	if (lastBlock !== undefined) {
		blockHeights.local = lastBlock.number;
	}

	for (let i = blockHeights.local; i <= blockHeights.remote; i++) {
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
				retry(async () => {
                    const block = await web3.eth.getBlock(i, true);

					storeBlock(database, block);

                    if (block.transactions.length) {
						for (const transaction of block.transactions) {
							storeTransaction(database, transaction);
						}
                    }
                }, {
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
