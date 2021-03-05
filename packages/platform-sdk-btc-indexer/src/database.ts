import Logger from "@ptkdev/logger";
import sqlite3 from "better-sqlite3";
import envPaths from "env-paths";
import { ensureFileSync } from "fs-extra";

import { Flags } from "./types";

export class Database {
	readonly #database: sqlite3.Database;
	readonly #logger: Logger;

	public constructor(flags: Flags, logger: Logger) {
		const databaseFile =
			flags.database || `${envPaths(require("../package.json").name).data}/${flags.coin}/${flags.network}.db`;
		ensureFileSync(databaseFile);

		logger.debug(`Using [${databaseFile}] as database`);

		this.#database = sqlite3(databaseFile);
		this.#logger = logger;

		this.migrate();
	}

	public lastBlockNumber(): number {
		const lastBlock = this.#database.prepare("SELECT height FROM blocks ORDER BY height DESC LIMIT 1").get();

		if (lastBlock === undefined) {
			return 1;
		}

		return lastBlock.height;
	}

	public storeBlockWithTransactions(block: any): void {
		this.#logger.info(`Storing block [${block.hash}] with [${block.tx.length}] transaction(s)`);

		this.storeBlock(block);

		if (block.transactions) {
			for (const transaction of block.transactions) {
				this.#logger.info(`Storing transaction [${transaction.hash}]`);

				this.storeTransaction(transaction);
			}
		}
	}

	public storeError(type: string, hash: string, body: string): void {
		this.#database
			.prepare(`INSERT INTO errors (type, hash, body) VALUES (:type, :hash, :body)`)
			.run({ type, hash, body });
	}

	private storeBlock(block): void {
		this.#database
			.prepare(
				`INSERT OR IGNORE INTO blocks (hash, number) VALUES (:hash, :number)`,
			)
			.run({
				hash: block.hash,
				number: block.height,
			});
	}

	private storeTransaction(transaction): void {
		this.#database
			.prepare(`INSERT OR IGNORE INTO transactions (hash, inputs, outputs, time) VALUES (:hash, :inputs, :outputs, :time)`)
			.run({
				hash: transaction.hash,
				inputs: JSON.stringify(transaction.vin),
				outputs: JSON.stringify(transaction.vout),
				time: transaction.time,
			});
	}

	private migrate(): void {
		this.#database.exec(`
			PRAGMA journal_mode = WAL;

			CREATE TABLE IF NOT EXISTS blocks(
				hash     VARCHAR(64)   PRIMARY KEY,
				height   INTEGER       NOT NULL,
			);

			CREATE UNIQUE INDEX IF NOT EXISTS blocks_hash ON blocks (hash);
			CREATE UNIQUE INDEX IF NOT EXISTS blocks_number ON blocks (number);

			CREATE TABLE IF NOT EXISTS transactions(
				hash     VARCHAR(64)   PRIMARY KEY,
				inputs   TEXT          NOT NULL,
				output   TEXT          NOT NULL,
				time     INTEGER       NOT NULL
			);

			CREATE UNIQUE INDEX IF NOT EXISTS transactions_hash ON transactions (hash);

			CREATE TABLE IF NOT EXISTS errors(
				id     INTEGER        PRIMARY KEY AUTOINCREMENT,
				type   VARCHAR(64)    NOT NULL,
				hash   VARCHAR(64)    NOT NULL,
				body   TEXT           NOT NULL
			);
		`);
	}
}
