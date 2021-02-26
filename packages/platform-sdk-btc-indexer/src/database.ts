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
			flags['database'] || `${envPaths(require("../package.json").name).data}/${flags['coin']}/${flags['network']}.db`;
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
				`INSERT OR IGNORE INTO blocks (
	hash,
	confirmations,
	strippedsize,
	size,
	weight,
	height,
	version,
	versionHex,
	merkleroot,
	tx,
	time,
	mediantime,
	nonce,
	bits,
	difficulty,
	chainwork,
	nTx,
	previousblockhash,
	nextblockhash
) VALUES (
	:hash,
	:confirmations,
	:strippedsize,
	:size,
	:weight,
	:height,
	:version,
	:versionHex,
	:merkleroot,
	:tx,
	:time,
	:mediantime,
	:nonce,
	:bits,
	:difficulty,
	:chainwork,
	:nTx,
	:previousblockhash,
	:nextblockhash
)`,
			)
			.run({
				hash: block.hash,
				confirmations: block.confirmations,
				strippedsize: block.strippedsize,
				size: block.size,
				weight: block.weight,
				height: block.height,
				version: block.version,
				versionHex: block.versionHex,
				merkleroot: block.merkleroot,
				tx: JSON.stringify(block.tx),
				time: block.time,
				mediantime: block.mediantime,
				nonce: block.nonce,
				bits: block.bits,
				difficulty: block.difficulty,
				chainwork: block.chainwork,
				nTx: block.nTx,
				previousblockhash: block.previousblockhash,
				nextblockhash: block.nextblockhash,
			});
	}

	private storeTransaction(transaction): void {
		this.#database
			.prepare(
				`INSERT OR IGNORE INTO transactions (
	txid,
	hash,
	version,
	size,
	vsize,
	weight,
	locktime,
	vin,
	vout,
	hex,
	blockhash,
	confirmations,
	time,
	blocktime
) VALUES (
	:txid,
	:hash,
	:version,
	:size,
	:vsize,
	:weight,
	:locktime,
	:vin,
	:vout,
	:hex,
	:blockhash,
	:confirmations,
	:time,
	:blocktime
)`,
			)
			.run({
				txid: transaction.txid,
				hash: transaction.hash,
				version: transaction.version,
				size: transaction.size,
				vsize: transaction.vsize,
				weight: transaction.weight,
				locktime: transaction.locktime,
				vin: JSON.stringify(transaction.vin),
				vout: JSON.stringify(transaction.vout),
				hex: transaction.hex,
				blockhash: transaction.blockhash,
				confirmations: transaction.confirmations,
				time: transaction.time,
				blocktime: transaction.blocktime,
			});
	}

	private migrate(): void {
		this.#database.exec(`
			PRAGMA journal_mode = WAL;

			CREATE TABLE IF NOT EXISTS blocks(
				hash                VARCHAR(64)   PRIMARY KEY,
				confirmations       INTEGER       NOT NULL,
				strippedsize        INTEGER       NOT NULL,
				size                INTEGER       NOT NULL,
				weight              INTEGER       NOT NULL,
				height              INTEGER       NOT NULL,
				version             INTEGER       NOT NULL,
				versionHex          VARCHAR(64)   NOT NULL,
				merkleroot          VARCHAR(64)   NOT NULL,
				tx                  TEXT          NOT NULL,
				time                INTEGER       NOT NULL,
				mediantime          INTEGER       NOT NULL,
				nonce               INTEGER       NOT NULL,
				bits                VARCHAR(64)   NOT NULL,
				difficulty          INTEGER       NOT NULL,
				chainwork           VARCHAR(64)   NOT NULL,
				nTx                 INTEGER       NOT NULL,
				previousblockhash   VARCHAR(64)   NOT NULL,
				nextblockhash       VARCHAR(64)   NOT NULL
			);

			CREATE UNIQUE INDEX IF NOT EXISTS blocks_hash ON blocks (hash);

			CREATE TABLE IF NOT EXISTS transactions(
				txid            VARCHAR(64)   PRIMARY KEY,
				hash            VARCHAR(64)   NOT NULL,
				version         INTEGER       NOT NULL,
				size            INTEGER       NOT NULL,
				vsize           INTEGER       NOT NULL,
				weight          INTEGER       NOT NULL,
				locktime        INTEGER       NOT NULL,
				vin             TEXT          NOT NULL,
				vout            TEXT          NOT NULL,
				hex             TEXT          NOT NULL,
				blockhash       VARCHAR(64)   NOT NULL,
				confirmations   INTEGER       NOT NULL,
				time            INTEGER       NOT NULL,
				blocktime       INTEGER       NOT NULL
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
