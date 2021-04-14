import sqlite3 from "better-sqlite3";
import envPaths from "env-paths";
import { ensureFileSync } from "fs-extra";
import pino from "pino";

/**
 * Implements a database storage with SQLite.
 *
 * @export
 * @class Database
 */
export class Database {
	/**
	 * The sqlite storage instance.
	 *
	 * @type {sqlite3.Database}
	 * @memberof Database
	 */
	readonly #database: sqlite3.Database;

	/**
	 * The logger instance.
	 *
	 * @type {pino.Logger}
	 * @memberof Database
	 */
	readonly #logger: pino.Logger;

	/**
	 * Creates an instance of Database.
	 *
	 * @param {Record<string, string>} flags
	 * @param {pino.Logger} logger
	 * @memberof Database
	 */
	public constructor(flags: Record<string, string>, logger: pino.Logger) {
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
		const lastBlock = this.#database.prepare("SELECT number FROM blocks ORDER BY number DESC LIMIT 1").get();

		if (lastBlock === undefined) {
			return 1;
		}

		return lastBlock.number;
	}

	/**
	 * Stores a block and all of its transactions.
	 *
	 * @param {{ hash: string; transactions: { id: string }[] }} block
	 * @memberof Database
	 */
	public storeBlockWithTransactions(block: { hash: string; transactions: { id: string }[] }): void {
		this.#logger.info(`Storing block [${block.hash}] with [${block.transactions.length}] transaction(s)`);
		this.storeBlock(block);

		for (const transaction of block.transactions) {
			this.#logger.info(`Storing transaction [${transaction.id}]`);
			this.storeTransaction(block, transaction);
		}
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
				`INSERT OR IGNORE INTO blocks (
					id,
					digest,
					extrinsicsRoot,
					number,
					parentHash,
					stateRoot
				) VALUES (
					:id,
					:digest,
					:extrinsicsRoot,
					:number,
					:parentHash,
					:stateRoot
				 )`,
			)
			.run({
				id: block.id,
				digest: JSON.stringify(block.digest),
				extrinsicsRoot: block.extrinsicsRoot,
				number: block.number,
				parentHash: block.parentHash,
				stateRoot: block.stateRoot,
			});
	}

	/**
	 * Stores a transaction with only the absolute minimum of data.
	 *
	 * @private
	 * @param {*} block
	 * @param {*} transaction
	 * @memberof Database
	 */
	private storeTransaction(block, transaction): void {
		this.#database
			.prepare(
				`INSERT INTO transactions (
					id,
					eraPeriod,
					eraPhase,
					isSigned,
					"method",
					blockNumber
				) VALUES (
					:id,
					:eraPeriod,
					:eraPhase,
					:isSigned,
					:method,
					:blockNumber
				)`,
			)
			.run({
				id: transaction.id,
				eraPeriod: transaction.era?.period,
				eraPhase: transaction.era?.phase,
				isSigned: transaction.isSigned ? 1 : 0,
				method: JSON.stringify(transaction.method),
				blockNumber: block.number,
			});
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
				id                 VARCHAR(66)   PRIMARY KEY,
				digest             TEXT          NOT NULL,
				extrinsicsRoot     VARCHAR(66)   NOT NULL,
				number             INTEGER       NOT NULL,
				parentHash         VARCHAR(66)   NOT NULL,
				stateRoot          VARCHAR(66)   NOT NULL
			);

			CREATE UNIQUE INDEX IF NOT EXISTS blocks_hash ON blocks (parentHash);

			CREATE TABLE IF NOT EXISTS transactions(
				id                 VARCHAR(66)   PRIMARY KEY,
				eraPeriod          VARCHAR(255),
				eraPhase           VARCHAR(255),
				isSigned           BOOLEAN       NOT NULL,
				"method"           TEXT,
				blockNumber        INTEGER       NOT NULL
			);

			CREATE INDEX IF NOT EXISTS transactions_block_number ON transactions (blockNumber);
		`);
	}
}
