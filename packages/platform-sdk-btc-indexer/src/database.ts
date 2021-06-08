import { BigNumber } from "@arkecosystem/utils";

import { Prisma, PrismaClient } from "../prisma/generated";
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

	public async allPendingBlocks(): Promise<any[]> {
		return this.#prisma.pendingBlock.findMany({
			skip: 0,
			take: 10000,
			orderBy: {
				height: "asc",
			},
		});
	}

	public async storePendingBlock(block: any): Promise<void> {
		await this.#prisma.pendingBlock.upsert({
			where: {
				height: block.height,
			},
			create: {
				height: block.height,
				payload: block,
			},
			update: {
				payload: block.payload,
			},
		});
	}

	public async deletePendingBlock(height: number): Promise<void> {
		try {
			await this.#prisma.pendingBlock.delete({
				where: { height },
			});
		} catch {
			// If we end up here the record is most likely already gone.
		}
	}

	public async alreadyDownloadedBlocks(min: number, max: number): Promise<{ height: number }[]> {
		return this.#prisma.pendingBlock.findMany({
			where: {
				height: {
					gte: min,
					lte: max,
				},
			},
			select: { height: true},
		});
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

		try {
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
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
				// Unique contraint validation. Ignore, there's nothing to update if already exists
				// We could query for existence before creation, but it doesn't really make sense
				this.#logger.info(
					`Ignoring transaction ${transaction.txid} from block ${blockId} as it already exists`,
				);
			} else {
				// If there's an error, we don't want to proceed, as this will affect future utxos
				// It means there's a programming error and we need to fix it
				throw e;
			}
		}

		await this.#prisma.$transaction(utxoUpdates);
	}
}
