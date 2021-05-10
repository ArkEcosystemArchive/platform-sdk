import { BigNumber } from "@arkecosystem/utils";
import sqlite3 from "better-sqlite3";
import envPaths from "env-paths";
import { ensureFileSync } from "fs-extra";

import Logger from "./logger";
import { getAmount, getFees, getVIns, getVOuts } from "./tx-parsing-helpers";
import { Flags, VIn, VOut } from "./types";

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
			flags.database || `${envPaths(require("../package.json").name).data}/btc/${flags.network}.db`;

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

		this.#database.transaction((block) => {
			this.storeBlock(block);

			if (block.tx) {
				for (const transaction of block.tx) {
					this.#logger.info(`Storing transaction [${transaction.txid}]`);

					this.storeTransaction(transaction);
				}
			}
		})(block);
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
		const vouts: VOut[] = getVOuts(transaction);
		const vIns = getVIns(transaction);
		const hashes: string[] = vIns.map((u: VIn) => u.txid);
		let voutsByTransactionHashAndIdx = {};
		if (hashes.length > 0) {
			const read = this.#database
				.prepare(
					`SELECT output_hash, output_idx, amount
					 FROM transaction_parts
					 WHERE output_hash IN (${"?,".repeat(hashes.length).slice(0, -1)})`,
				)
				.all(hashes);

			if (read) {
				const byHashAndIdx = (readElements) =>
					readElements.reduce((carry, element) => {
						carry[element["output_hash"] + element["output_idx"]] = BigNumber.make(element["amount"]);
						return carry;
					}, {});

				voutsByTransactionHashAndIdx = byHashAndIdx(read);
			}
		}

		const fee: BigNumber = getFees(transaction, voutsByTransactionHashAndIdx);

		this.#database
			.prepare(
				`INSERT OR IGNORE INTO transactions (hash, time, amount, fee)
				 VALUES (:hash, :time, :amount, :fee)`,
			)
			.run({
				hash: transaction.txid,
				time: transaction.time,
				amount: amount.toString(),
				fee: fee.toString(),
			});

		const statement = this.#database
			.prepare(`INSERT OR IGNORE INTO transaction_parts (output_hash, output_idx, amount, address)
								VALUES (:output_hash, :output_idx, :amount, :address)`);
		for (const vout of vouts) {
			statement.run({
				output_hash: transaction.txid,
				output_idx: vout.idx,
				amount: vout.amount,
				address: JSON.stringify(vout.addresses),
			});
		}

		const updateStatement = this.#database.prepare(`UPDATE transaction_parts
								SET input_hash = :input_hash,
										input_idx  = :input_idx
								WHERE output_hash = :output_hash
									AND output_idx = :output_idx`);
		for (let i = 0; i < vIns.length; i++) {
			const vIn = vIns[i];
			updateStatement.run({
				input_hash: transaction.txid,
				input_idx: i,
				output_hash: vIn.txid,
				output_idx: vIn.vout,
			});
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
			PRAGMA foreign_keys = ON;


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
				fee      INTEGER       NOT NULL
			);
			CREATE UNIQUE INDEX IF NOT EXISTS transactions_hash ON transactions (hash);


			CREATE TABLE IF NOT EXISTS transaction_parts(
				output_hash       VARCHAR(64)   NOT NULL,
				output_idx        INTEGER       NOT NULL,
				input_hash        VARCHAR(64),
				input_idx         INTEGER,
				amount            INTEGER       NOT NULL,
				address           VARCHAR(64),
				PRIMARY KEY (output_hash, output_idx),
				FOREIGN KEY (output_hash) REFERENCES transactions(hash)
			);
			CREATE UNIQUE INDEX IF NOT EXISTS transaction_output_hash_index ON transaction_parts (output_hash, output_idx);
			CREATE UNIQUE INDEX IF NOT EXISTS transaction_input_hash_index ON transaction_parts (input_hash, input_idx);


			CREATE TABLE IF NOT EXISTS errors(
				id     INTEGER       PRIMARY KEY AUTOINCREMENT,
				type   VARCHAR(64)   NOT NULL,
				hash   VARCHAR(64)   NOT NULL,
				body   TEXT          NOT NULL
			);
		`);
	}
}
