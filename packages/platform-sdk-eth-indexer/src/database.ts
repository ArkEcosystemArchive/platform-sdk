import Logger from "@ptkdev/logger";
import sqlite3 from "better-sqlite3";
import envPaths from "env-paths";
import { ensureFileSync } from "fs-extra";

export class Database {
	readonly #database: sqlite3.Database;
	readonly #logger: Logger;

	public constructor(flags: Record<string, string>, logger: Logger) {
		const databaseFile =
			flags.database || `${envPaths(require("../package.json").name).data}/${flags.coin}/${flags.network}.db`;
		ensureFileSync(databaseFile);

		logger.debug(`Using [${databaseFile}] as database`);

		this.#database = sqlite3(databaseFile);
		this.#logger = logger;

		this.migrate();
	}

	public lastBlockNumber(): number {
		const lastBlock = this.#database.prepare("SELECT number FROM blocks ORDER BY number DESC LIMIT 1").get();

		if (lastBlock === undefined) {
			return 1;
		}

		return lastBlock.number;
	}

	public storeBlockWithTransactions(block: { hash: string; transactions: { hash: string }[] }): void {
		this.#logger.info(`Storing block [${block.hash}] with [${block.transactions.length}] transaction(s)`);

		this.storeBlock(block);

		if (block.transactions.length) {
			for (const transaction of block.transactions) {
				this.#logger.info(`Storing transaction [${transaction.hash}]`);

				this.storeTransaction(transaction);
			}
		}
	}

	private storeBlock(block): void {
		this.#database.prepare(`INSERT OR IGNORE INTO blocks (hash, number) VALUES (:hash, :number)`).run({
			hash: block.hash,
			number: block.number,
		});
	}

	private storeTransaction(transaction): void {
		this.#database
			.prepare(
				`INSERT OR IGNORE INTO transactions (hash, sender, recipient, amount, gas, gasPrice, input, nonce) VALUES (:hash, :sender, :recipient, :amount, :gas, :gasPrice, :input, :nonce)`,
			)
			.run({
				hash: transaction.hash,
				sender: transaction.from,
				recipient: transaction.to,
				amount: transaction.value,
				gas: transaction.gas,
				gasPrice: transaction.gasPrice,
				input: transaction.input,
				nonce: transaction.nonce,
			});
	}

	private migrate(): void {
		this.#database.exec(`
			PRAGMA journal_mode = WAL;

			CREATE TABLE IF NOT EXISTS blocks(
				hash     VARCHAR(66)   PRIMARY KEY,
				number   INTEGER       NOT NULL,
			);

			CREATE UNIQUE INDEX IF NOT EXISTS blocks_hash ON blocks (hash);
			CREATE UNIQUE INDEX IF NOT EXISTS blocks_number ON blocks (number);

			CREATE TABLE IF NOT EXISTS transactions(
				hash        VARCHAR(66)   PRIMARY KEY,
				sender      VARCHAR(66)   NOT NULL,
				recipient   VARCHAR(66)   NOT NULL,
				amount      INTEGER       NOT NULL,
				gas         INTEGER       NOT NULL,
				gasPrice    INTEGER       NOT NULL,
				input       VARCHAR(66)   NOT NULL,
				nonce       INTEGER       NOT NULL,
			);

			CREATE UNIQUE INDEX IF NOT EXISTS transactions_hash ON transactions (hash);
			CREATE INDEX IF NOT EXISTS transactions_sender ON transactions ("sender");
			CREATE INDEX IF NOT EXISTS transactions_recipient ON transactions ("recipient");
		`);
	}
}
