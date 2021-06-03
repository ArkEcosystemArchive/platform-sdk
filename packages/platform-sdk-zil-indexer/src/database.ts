import { TransactionObj, TxBlockObj } from "@zilliqa-js/core";
import sqlite3 from "better-sqlite3";
import envPaths from "env-paths";
import { ensureFileSync } from "fs-extra";

import { Logger } from "./logger";

/**
 * Implements a database storage with SQLite.
 *
 * @export
 * @class Database
 */
export class Database {
	readonly #database: sqlite3.Database;
	readonly #logger: Logger;

	/**
	 * Creates an instance of Database.
	 *
	 * @param {Record<string, string>} flags
	 * @param {Logger} logger
	 * @memberof Database
	 */
	public constructor(flags: Record<string, string>, logger: Logger) {
		const databaseFile =
			flags.database || `${envPaths(require("../package.json").name).data}/zil/${flags.network}.db`;
		ensureFileSync(databaseFile);

		logger.debug(`Using [${databaseFile}] as database`);

		this.#database = sqlite3(databaseFile);
		this.#logger = logger;

		this.#migrate();
	}

	/**
	 * Returns the height of the last block stored.
	 *
	 * @returns {number}
	 * @memberof Database
	 */
	public lastBlockNumber(): number {
		const lastBlock = this.#database.prepare("SELECT number FROM blocks ORDER BY number DESC LIMIT 1").get();

		if (lastBlock === undefined) {
			return 0;
		}

		return lastBlock.number;
	}

	/**
	 * Stores a block and all of its transactions.
	 *
	 * @param TxBlockObj block
	 * @param TransactionObj[] block
	 * @memberof Database
	 */
	public storeBlockWithTransactions(block: TxBlockObj, transactions: TransactionObj[]): void {
		const hash = block.body.BlockHash;
		const number = block.header.BlockNum;

		this.#logger.info(`Storing block #${number} [${hash}] with ${transactions.length} transaction(s)`);

		this.#storeBlock({ hash, number });

		for (const transaction of transactions) {
			this.#logger.info(`Storing transaction [${transaction.ID}]`);

			this.#storeTransaction(transaction);
		}
	}

	/**
	 * Stores a block with only the absolute minimum of data.
	 *
	 * @private
	 * @param {hash: string, number: string} block
	 * @memberof Database
	 */
	#storeBlock(block: { hash: string; number: string }): void {
		this.#database.prepare(`INSERT OR IGNORE INTO blocks (hash, number) VALUES (:hash, :number)`).run(block);
	}

	/**
	 * Stores a transaction with only the absolute minimum of data.
	 *
	 * @private
	 * @param TransactionObj transaction
	 * @memberof Database
	 */
	#storeTransaction(transaction: TransactionObj): void {
		this.#database
			.prepare(
				`INSERT OR IGNORE INTO transactions (hash, sender, recipient, amount, gas, gasLimit, gasPrice, nonce) VALUES (:hash, :sender, :recipient, :amount, :gas, :gasLimit, :gasPrice, :nonce)`,
			)
			.run({
				hash: transaction.ID,
				sender: transaction.senderPubKey,
				recipient: transaction.toAddr,
				amount: transaction.amount,
				gas: transaction.receipt.cumulative_gas,
				gasLimit: transaction.gasLimit,
				gasPrice: transaction.gasPrice,
				nonce: transaction.nonce,
			});
	}

	/**
	 * Migrates the database to prepare it for use.
	 *
	 * @private
	 * @memberof Database
	 */
	#migrate(): void {
		this.#database.exec(`
			PRAGMA journal_mode = WAL;

			CREATE TABLE IF NOT EXISTS blocks(
				hash     VARCHAR(64)   PRIMARY KEY,
				number   INTEGER       NOT NULL
			);

			CREATE UNIQUE INDEX IF NOT EXISTS blocks_hash ON blocks (hash);
			CREATE UNIQUE INDEX IF NOT EXISTS blocks_number ON blocks (number);

			CREATE TABLE IF NOT EXISTS transactions(
				hash        VARCHAR(64)   PRIMARY KEY,
				sender      VARCHAR(68)   NOT NULL,
				recipient   VARCHAR(40)   NOT NULL,
				amount      INTEGER       NOT NULL,
				gas         INTEGER       NOT NULL,
				gasLimit    INTEGER       NOT NULL,
				gasPrice    INTEGER       NOT NULL,
				nonce       INTEGER       NOT NULL
			);

			CREATE UNIQUE INDEX IF NOT EXISTS transactions_hash ON transactions (hash);
			CREATE INDEX IF NOT EXISTS transactions_sender ON transactions (sender);
			CREATE INDEX IF NOT EXISTS transactions_recipient ON transactions (recipient);
		`);
	}
}
