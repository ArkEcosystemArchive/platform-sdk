import sqlite3 from "better-sqlite3";
import envPaths from "env-paths";
import { ensureFileSync } from "fs-extra";
import pino from "pino";

export class Database {
	readonly #database: sqlite3.Database;
	readonly #logger: pino.Logger;

	public constructor(flags: Record<string, string>, logger: pino.Logger) {
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
		this.#database
			.prepare(
				`INSERT OR IGNORE INTO blocks (
	hash,
	difficulty,
	extraData,
	gasLimit,
	gasUsed,
	logsBloom,
	miner,
	mixHash,
	nonce,
	number,
	parentHash,
	receiptsRoot,
	sha3Uncles,
	size,
	stateRoot,
	timestamp,
	totalDifficulty,
	transactionsRoot,
	uncles
) VALUES (
	:hash,
	:difficulty,
	:extraData,
	:gasLimit,
	:gasUsed,
	:logsBloom,
	:miner,
	:mixHash,
	:nonce,
	:number,
	:parentHash,
	:receiptsRoot,
	:sha3Uncles,
	:size,
	:stateRoot,
	:timestamp,
	:totalDifficulty,
	:transactionsRoot,
	:uncles
)`,
			)
			.run({
				hash: block.hash,
				difficulty: block.difficulty,
				extraData: block.extraData,
				gasLimit: block.gasLimit,
				gasUsed: block.gasUsed,
				logsBloom: block.logsBloom,
				miner: block.miner,
				// @ts-ignore - This property exists but the typings are wrong.
				mixHash: block.mixHash,
				nonce: block.nonce,
				number: block.number,
				parentHash: block.parentHash,
				// @ts-ignore - This property exists but the typings are wrong.
				receiptsRoot: block.receiptsRoot,
				sha3Uncles: block.sha3Uncles,
				size: block.size,
				stateRoot: block.stateRoot,
				timestamp: block.timestamp,
				totalDifficulty: block.totalDifficulty,
				// @ts-ignore - This property exists but the typings are wrong.
				transactionsRoot: block.transactionsRoot,
				uncles: JSON.stringify(block.uncles),
			});
	}

	private storeTransaction(transaction): void {
		this.#database
			.prepare(
				`INSERT OR IGNORE INTO transactions (
	hash,
	blockHash,
	blockNumber,
	"from",
	gas,
	gasPrice,
	input,
	nonce,
	r,
	s,
	"to",
	transactionIndex,
	v,
	value
) VALUES (
	:hash,
	:blockHash,
	:blockNumber,
	:from,
	:gas,
	:gasPrice,
	:input,
	:nonce,
	:r,
	:s,
	:to,
	:transactionIndex,
	:v,
	:value
)`,
			)
			.run({
				hash: transaction.hash,
				blockHash: transaction.blockHash,
				blockNumber: transaction.blockNumber,
				from: transaction.from,
				gas: transaction.gas,
				gasPrice: transaction.gasPrice,
				input: transaction.input,
				nonce: transaction.nonce,
				r: transaction.r,
				s: transaction.s,
				to: transaction.to,
				transactionIndex: transaction.transactionIndex,
				v: transaction.v,
				value: transaction.value,
			});
	}

	private migrate(): void {
		this.#database.exec(`
			PRAGMA journal_mode = WAL;

			CREATE TABLE IF NOT EXISTS blocks(
				id                 VARCHAR(66)   PRIMARY KEY,
				digest             JSON          NOT NULL,
				extrinsicsRoot     VARCHAR(66)   NOT NULL,
				number             INTEGER       NOT NULL,
				parentHash         VARCHAR(66)   NOT NULL,
				stateRoot          VARCHAR(66)   NOT NULL
			);

			CREATE UNIQUE INDEX IF NOT EXISTS blocks_hash ON blocks (parentHash);

			CREATE TABLE IF NOT EXISTS transactions(
				id                 VARCHAR(66)   PRIMARY KEY,
				era                JSON          NOT NULL,
				isSigned           BOOLEAN       NOT NULL,
				method             JSON          NOT NULL,
				nonce              VARCHAR(255)  NOT NULL,
				blockNumber        INTEGER       NOT NULL,
				signature          VARCHAR(255)  NOT NULL,
				signer             VARCHAR(255)  NOT NULL,
				tip                VARCHAR(255)  NOT NULL
			);

			-- CREATE UNIQUE INDEX IF NOT EXISTS transactions_hash ON transactions (hash);
			-- CREATE INDEX IF NOT EXISTS transactions_from ON transactions ("from");
			-- CREATE INDEX IF NOT EXISTS transactions_to ON transactions ("to");
		`);
	}
}
