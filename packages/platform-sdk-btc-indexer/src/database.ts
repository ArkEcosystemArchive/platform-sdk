import { BigNumber } from "@arkecosystem/utils";
import envPaths from "env-paths";
import { ensureFileSync } from "fs-extra";

import { PrismaClient } from "../prisma/generated";
import { Logger } from "./logger";
import { getAmount, getFees, getInputs, getOutputs } from "./tx-parsing-helpers";
import { Flags, Input, Output } from "./types";

/**
 * Implements a database storage with SQLite.
 *
 * @export
 * @class Database
 */
export class Database {
	readonly #prisma: PrismaClient;

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

		this.#prisma = new PrismaClient({
			log: ["info", "warn", "error"],
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
		const lastBlockHeight = await this.#prisma.block.aggregate({
			_max: {
				height: true,
			},
		});

		return lastBlockHeight["_max"]?.height || 1;
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

		await this.#storeBlock(block);

		if (block.tx) {
			for (const transaction of block.tx) {
				this.#logger.info(`Storing transaction [${transaction.txid}]`);
				await this.#storeTransaction(block.height, transaction);
			}
		}
	}

	/**
	 * Stores a block with only the absolute minimum of data.
	 *
	 * @private
	 * @param {*} block
	 * @memberof Database
	 */
	async #storeBlock(block): Promise<void> {
		await this.#prisma.block.upsert({
			where: {
				height: block.height,
			},
			create: {
				hash: block.hash,
				height: block.height,
			},
			update: {
				hash: block.hash,
			},
		});
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
			const read = await this.#prisma.transactionPart.findMany({
				where: {
					output_hash: {
						in: hashes,
					},
				},
				select: {
					output_hash: true,
					output_idx: true,
					amount: true,
				},
			});

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

		const utxoUpdates = inputs.map((input, i) =>
			this.#prisma.transactionPart.update({
				where: {
					output_hash_output_idx: {
						output_hash: input.txid,
						output_idx: input.vout,
					},
				},
				data: {
					input_hash: transaction.txid,
					input_idx: i,
				},
			}),
		);

		await this.#prisma.transaction.upsert({
			where: {
				hash: transaction.txid,
			},
			create: {
				block_id: blockId,
				hash: transaction.txid,
				time: transaction.time,
				amount: BigInt(amount.toString()),
				fee: BigInt(fee.toString()),
				transaction_parts: {
					create: outputs.map((output) => ({
						output_idx: output.idx,
						amount: BigInt(output.amount.toString()),
						address: JSON.stringify(output.addresses),
					})),
				},
			},
			update: {
				block_id: blockId,
				hash: transaction.txid,
				time: transaction.time,
				amount: BigInt(amount.toString()),
				fee: BigInt(fee.toString()),
				transaction_parts: {
					upsert: outputs.map((output) => {
						const outputData = {
							output_idx: output.idx,
							amount: BigInt(output.amount.toString()),
							address: JSON.stringify(output.addresses),
						};
						return {
							where: {
								output_hash_output_idx: {
									output_hash: transaction.txid,
									output_idx: output.idx,
								},
							},
							create: outputData,
							update: outputData,
						};
					}),
				},
			},
		});

		await this.#prisma.$transaction(utxoUpdates);
	}
}
