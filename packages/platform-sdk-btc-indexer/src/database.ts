import { BigNumber } from "@arkecosystem/utils";
import Logger from "@ptkdev/logger";
import sqlite3 from "better-sqlite3";
import envPaths from "env-paths";
import { ensureFileSync } from "fs-extra";

import { getAmount, getVins, getVouts } from "./tx-parsing-helpers";
import { Flags } from "./types";

/**
 * Implements a database storage with SQLite.
 *
 * @export
 * @class Database
 */
export class Database {
	/**
	 * The database instance.
	 *
	 * @type {sqlite3.Database}
	 * @memberof Database
	 */
	readonly #database: sqlite3.Database;

	/**
	 * The logger instance.
	 *
	 * @type {Logger}
	 * @memberof Database
	 */
	readonly #logger: Logger;

	/**
	 * Creates an instance of Database.
	 *
	 * @param {Flags} flags
	 * @param {Logger} logger
	 * @memberof Database
	 */
	public constructor(flags: Flags, logger: Logger) {
		const databaseFile =
			flags.database || `${envPaths(require("../package.json").name).data}/${flags.coin}/${flags.network}.db`;

		ensureFileSync(databaseFile);

		logger.debug(`Using [${databaseFile}] as database`);

		this.#database = sqlite3(databaseFile);
		this.#logger = logger;

		this.migrate();
	}

	/**
	 * Returns the height of the last block stored.
	 *
	 * @returns {number}
	 * @memberof Database
	 */
	public lastBlockNumber(): number {
		const lastBlock = this.#database.prepare("SELECT height FROM blocks ORDER BY height DESC LIMIT 1").get();

		if (lastBlock === undefined) {
			return 1;
		}

		return lastBlock.height;
	}

	/**
	 * Stores a block and all of its transactions.
	 *
	 * @param {*} block
	 * @memberof Database
	 */
	public storeBlockWithTransactions(block: any): void {
		this.#logger.info(
			`Storing block [${block.hash}] height ${block.height} with [${block.tx.length}] transaction(s)`,
		);

		this.storeBlock(block);

		if (block.tx) {
			for (const transaction of block.tx) {
				this.#logger.info(`Storing transaction [${transaction.hash}]`);

				this.storeTransaction(transaction);
			}
		}
	}

	/**
	 * Stores an error with all of its details.
	 *
	 * @param {string} type
	 * @param {string} hash
	 * @param {string} body
	 * @memberof Database
	 */
	public storeError(type: string, hash: string, body: string): void {
		this.#database
			.prepare(
				`INSERT INTO errors (type, hash, body)
								VALUES (:type, :hash, :body)`,
			)
			.run({ type, hash, body });
	}

	/**
	 * Stores a block with only the absolute minimum of data.
	 *
	 * @private
	 * @param {*} block
	 * @memberof Database
	 */
	private storeBlock(block): void {
		this.#database
			.prepare(
				`INSERT OR IGNORE INTO blocks (hash, height)
														VALUES (:hash, :height)`,
			)
			.run({
				hash: block.hash,
				height: block.height,
			});
	}

	/**
	 * Stores a transaction with only the absolute minimum of data.
	 *
	 * @private
	 * @param {*} transaction
	 * @memberof Database
	 */
	private storeTransaction(transaction): void {
		const amount: BigNumber = getAmount(transaction);
		const vouts: BigNumber[] = getVouts(transaction);
		try {
			const vins = getVins(transaction);
			const hashes = vins.map((u) => u.txid);
			let voutsByTransactionHash = {};
			if (hashes.length > 0) {
				const read = this.#database
					.prepare(
						`SELECT hash, vouts
											 FROM transactions
											 WHERE hash IN (${"?,".repeat(hashes.length).slice(0, -1)})`,
					)
					.all(hashes);

				// console.log("hashes", hashes, "read", read);

				if (read) {
					const indexByHash = (xs) =>
						xs.reduce((rv, x) => {
							rv[x["hash"]] = JSON.parse(x["vouts"]).map((amount) => BigNumber.make(amount));
							return rv;
						}, {});

					voutsByTransactionHash = indexByHash(read);
				}
			}

			console.log("indexed", voutsByTransactionHash);
			// const fee: BigNumber = getFees(transaction, voutsByTransactionHash);

			this.#database
				.prepare(
					`INSERT OR IGNORE INTO transactions (hash, time, amount, fee, sender, vouts)
					 VALUES (:hash, :time, :amount, :fee, :sender, :vouts)`,
				)
				.run({
					// @TODO: sender
					hash: transaction.hash,
					time: transaction.time,
					amount: amount.toString(),
					fee: "",
					sender: "address-of-sender",
					vouts: JSON.stringify(vouts),
				});
		} catch (error) {
			console.error(error);
			Process.exit(20);
			// throw error;
		}
	}

	/**
	 * Migrates the database to prepare it for use.
	 *
	 * @private
	 * @memberof Database
	 */
	private migrate(): void {
		this.#database.exec(`
			PRAGMA journal_mode = WAL;

			CREATE TABLE IF NOT EXISTS blocks(
				hash     VARCHAR(64)   PRIMARY KEY,
				height   INTEGER       NOT NULL
			);

			CREATE UNIQUE INDEX IF NOT EXISTS blocks_hash ON blocks (hash);
			CREATE UNIQUE INDEX IF NOT EXISTS blocks_height ON blocks (height);

			CREATE TABLE IF NOT EXISTS transactions(
				hash     VARCHAR(64)   PRIMARY KEY,
				time     INTEGER       NOT NULL,
				amount   INTEGER       NOT NULL,
				fee      INTEGER       NOT NULL,
				sender   VARCHAR(64)   NOT NULL,
				vouts    JSON          NOT NULL
			);

			CREATE UNIQUE INDEX IF NOT EXISTS transactions_hash ON transactions (hash);

			CREATE TABLE IF NOT EXISTS errors(
				id     INTEGER       PRIMARY KEY AUTOINCREMENT,
				type   VARCHAR(64)   NOT NULL,
				hash   VARCHAR(64)   NOT NULL,
				body   TEXT          NOT NULL
			);
		`);
	}
}
