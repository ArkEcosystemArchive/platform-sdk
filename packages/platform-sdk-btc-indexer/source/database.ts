import { BigNumber } from "@arkecosystem/utils";
import fs from "fs";
import path from "path";
import pgp from "pg-promise";

import { Logger } from "./logger";
import { getAmount, getFees, getInputs, getOutputs } from "./transactions";
import { Flags, Input, Output } from "./types";

/**
 * Implements a database storage with SQLite.
 *
 * @export
 * @class Database
 */
export class Database {
	readonly #database;

	/**
	 * The logger instance.
	 *
	 * @type {Logger}
	 * @memberof Database
	 */
	readonly #logger: Logger;
	readonly #flags: any;

	/**
	 * Creates an instance of Database.
	 *
	 * @param {Flags} flags
	 * @param {Logger} logger
	 * @memberof Database
	 */
	public constructor(flags: Flags, logger: Logger) {
		this.#flags = flags;

		this.#logger = logger;

		this.#database = pgp({
			query(e) {
				// logger.debug('QUERY:', e.query);
			},
			error(err, e) {
				if (e.query) {
					logger.error("Failing query:", e.query, e.params);
				}

				if (e.ctx) {
					logger.error("Failing tx:", e.ctx);
				}
			},
		})({
			connectionString: process.env.DATABASE_URL,
			max: 30,
		});
	}

	/**
	 * Returns the height of the last block stored.
	 *
	 * @returns {number}
	 * @memberof Database
	 */
	public async lastBlockNumber(): Promise<number> {
		const lastBlockHeight = await this.#database.one(
			`SELECT MAX(height) AS height
       FROM blocks`,
		);
		return lastBlockHeight?.height || 1;
	}

	public async allPendingBlocks(): Promise<any[]> {
		return await this.#database.any(
			`SELECT *
       FROM pending_blocks
       ORDER BY height
       LIMIT $1`,
			[this.#flags.batchSize],
		);
	}

	public async storePendingBlock(block: any): Promise<void> {
		await this.#database.any(
			`INSERT INTO pending_blocks (height, payload)
       VALUES ($1, $2)`,
			[block.height, block],
		);
	}

	public async alreadyDownloadedBlocks(min: number, max: number): Promise<{ height: number }[]> {
		return await this.#database.any(
			`SELECT height
			 FROM pending_blocks
       WHERE (height >= $1 AND height <= $2)
			 ORDER BY HEIGHT`,
			[min, max],
		);
	}

	/**
	 * Stores a block and all of its transactions.
	 *
	 * @param {*} block
	 * @memberof Database
	 */
	public async storeBlockWithTransactions(block: any): Promise<void> {
		this.#logger.info(
			`Storing block [${block.hash}] height ${block.height} with [${block.tx.length}] transaction(s)`,
		);

		await this.#database.tx("my-transaction", async () => {
			await this.#storeBlock(block);

			if (block.tx) {
				for (const transaction of block.tx) {
					this.#logger.info(`Storing transaction [${transaction.txid}]`);
					await this.#storeTransaction(block.height, transaction);
				}
			}

			await this.#deletePendingBlock(block.height);
		});
	}

	/**
	 * Stores a block with only the absolute minimum of data.
	 *
	 * @private
	 * @param {*} block
	 * @memberof Database
	 */
	async #storeBlock(block): Promise<void> {
		await this.#database.any(
			`INSERT INTO blocks (height, hash)
       VALUES ($1, $2)`,
			[block.height, block.hash],
		);
	}

	async #deletePendingBlock(height: number): Promise<void> {
		await this.#database.any(
			`DELETE FROM pending_blocks
       WHERE	height = $1`,
			[height],
		);
	}

	/**
	 * Stores a transaction with only the absolute minimum of data.
	 *
	 * @private
	 * @param blockId
	 * @param {*} transaction
	 * @memberof Database
	 */
	async #storeTransaction(blockId: number, transaction): Promise<void> {
		const amount: BigNumber = getAmount(transaction);
		const outputs: Output[] = getOutputs(transaction);
		const inputs = getInputs(transaction);
		const hashes: string[] = inputs.map((u: Input) => u.txid);
		let outputsByTransactionHashAndIdx = {};
		if (hashes.length > 0) {
			const read = await this.#database.any(
				`SELECT output_hash, output_idx, amount
				 FROM transaction_parts
				 WHERE output_hash IN (${hashes.map((h, i) => `$${i + 1}`).join(",")})`,
				hashes,
			);

			if (read) {
				const byHashAndIdx = (readElements) =>
					readElements.reduce((carry, element) => {
						carry[element["output_hash"] + element["output_idx"]] = BigNumber.make(element["amount"]);
						return carry;
					}, {});

				outputsByTransactionHashAndIdx = byHashAndIdx(read);
			}
		}

		const fee: BigNumber = getFees(transaction, outputsByTransactionHashAndIdx);

		await this.#database.none(
			`INSERT INTO transactions (block_id, hash, time, amount, fee)
			   VALUES ($1, $2, $3, $4, $5)`,
			[blockId, transaction.txid, transaction.time, BigInt(amount.toString()), BigInt(fee.toString())],
		);

		for (const output of outputs) {
			await this.#database.none(
				`INSERT INTO transaction_parts (output_hash, output_idx, amount, address)
					 VALUES ($1, $2, $3, $4)`,
				[transaction.txid, output.idx, BigInt(amount.toString()), JSON.stringify(output.addresses)],
			);
		}

		let i = 0;
		for (const input of inputs) {
			await this.#database.none(
				`UPDATE transaction_parts
					 SET input_hash = $1,
					 input_idx = $2
				   WHERE output_hash = $3
           AND output_idx = $4`,
				[transaction.txid, i++, input.txid, input.vout],
			);
		}
	}

	async runMigrations() {
		// TODO properly reference migration file
		await this.#database.any(
			fs.readFileSync(path.resolve(__dirname, "../migrations/create_initial_tables.sql"), "utf8"),
		);
	}
}
