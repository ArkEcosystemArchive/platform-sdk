import { BigNumber } from "@arkecosystem/utils";
import fs from "fs";
import path from "path";
import { Logger } from "./logger";
import { getAmount, getFees, getInputs, getOutputs } from "./transactions";
import { Flags, Input, Output } from "./types";

import pgp from "pg-promise";

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

	/**
	 * Creates an instance of Database.
	 *
	 * @param {Flags} flags
	 * @param {Logger} logger
	 * @memberof Database
	 */
	public constructor(flags: Flags, logger: Logger) {
		this.#database = pgp({
			query(e) {
				// console.log('QUERY:', e.query);
			},
			error(err, e) {
				if (e.cn) {
					// this is a connection-related error
					// cn = safe connection details passed into the library:
					//      if password is present, it is masked by #
				}

				if (e.query) {
					console.log("Failing query:", e.query, e.params);

					// query string is available
					if (e.params) {
						// query parameters are available
					}
				}

				if (e.ctx) {
					// occurred inside a task or transaction
					console.log("Failing tx:", e.ctx);
				}
			},
		})({
			connectionString: process.env.DATABASE_URL,
			max: 30,
		});

		this.#logger = logger;
	}

	/**
	 * Returns the height of the last block stored.
	 *
	 * @returns {number}
	 * @memberof Database
	 */
	public async lastBlockNumber(): Promise<number> {
		const lastBlockHeight = await this.#database.any(
			`SELECT MAX(height) AS height
       FROM block`,
		);
		console.log(lastBlockHeight);
		return lastBlockHeight?.height || 1;
	}

	public async allPendingBlocks(): Promise<any[]> {
		return await this.#database.any(
			`SELECT *
       FROM pending_block
       ORDER BY height
       LIMIT $1`,
			[5000],
		);
	}

	public async storePendingBlock(block: any): Promise<void> {
		await this.#database.any(
			`INSERT INTO pending_block (height, payload)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
			[block.height, block],
		);
	}

	public async deletePendingBlock(height: number): Promise<void> {
		await this.#database.any(
			`DELETE FROM pending_block
       WHERE	height = $1`,
			[height],
		);
	}

	public async deleteBlock(height: number): Promise<void> {
		await this.#database.any(
			`DELETE FROM block
       WHERE	height = $1`,
			[height],
		);
	}

	public async alreadyDownloadedBlocks(min: number, max: number): Promise<{ height: number }[]> {
		return await this.#database.any(
			`SELECT height
			 FROM pending_block
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

			await this.deletePendingBlock(block.height);
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
			`INSERT INTO block (height, hash)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
			[block.height, block.hash],
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
				 FROM transaction_part
				 WHERE output_hash IN (${(hashes.map((h, i) => `$${i + 1}`).join(","))})`,
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
				`INSERT INTO transaction (block_id, hash, time, amount, fee)
			   VALUES ($1, $2, $3, $4, $5)
			   ON CONFLICT DO NOTHING`,
				[blockId, transaction.txid, transaction.time, BigInt(amount.toString()), BigInt(fee.toString())],
			);

			for (const output of outputs) {
				await this.#database.none(
					`INSERT INTO transaction_part (output_hash, output_idx, amount, address)
					 VALUES ($1, $2, $3, $4)
					 ON CONFLICT DO NOTHING`,
					[transaction.txid, output.idx, BigInt(amount.toString()), JSON.stringify(output.addresses)],
				);
			}

			let i = 0;
			for (const input of inputs) {
				await this.#database.none(
					`UPDATE transaction_part
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
		await this.#database.any(fs.readFileSync(path.join(__dirname, "..", "migrations", "create_initial_tables.sql"), "utf8"));
	}
}
