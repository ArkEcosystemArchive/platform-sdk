import { BigNumber } from "@arkecosystem/utils";

import { Prisma, PrismaClient } from "../prisma/generated";
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
			take: 5000,
			orderBy: {
				height: "asc",
			},
		});
	}

	public async storePendingBlock(block: any): Promise<void> {
		try {
			await this.#prisma.pendingBlock.create({
				data: {
					height: block.height,
					payload: block,
				},
			});
		} catch (error) {
			if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== "P2002") throw error;
		}
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

	public async deleteBlock(height: number): Promise<void> {
		const block = await this.#prisma.block.findUnique({
			where: { height },
			include: {
				transactions: {
					include: {
						transaction_parts: true,
					},
				},
			},
		});

		for (const transaction of block!.transactions) {
			await this.#prisma.transaction.update({
				where: { hash: transaction.hash },
				data: {
					transaction_parts: {
						deleteMany: {},
					},
				},
			});
			await this.#prisma.transaction.delete({
				where: { hash: transaction.hash },
			});
		}
		await this.#prisma.block.update({
			where: { height: height },
			data: {
				transactions: {
					deleteMany: {},
				},
			},
		});
		await this.#prisma.block.delete({
			where: { height: height },
		});
	}

	public async alreadyDownloadedBlocks(min: number, max: number): Promise<{ height: number }[]> {
		return this.#prisma.pendingBlock.findMany({
			where: {
				height: {
					gte: min,
					lte: max,
				},
			},
			select: { height: true },
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
		// await this.#prisma.$executeRaw`INSERT INTO "public"."Block" (height, hash) VALUES (${block.height}, ${block.hash}) ON CONFLICT DO NOTHING;`;

		try {
			await this.#prisma.block.create({
				data: {
					hash: block.hash,
					height: block.height,
				},
			});
		} catch (error) {
			if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== "P2002") throw error;
		}
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
			await this.#prisma.transaction.create({
				data: {
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
			});
		} catch (e) {
			if (!(e instanceof Prisma.PrismaClientKnownRequestError) || e.code !== "P2002") {
				// If there's an error, we don't want to proceed, as this will affect future utxos
				// It means there's a programming error and we need to fix it
				throw e;
			}
		}

		await this.#prisma.$transaction(utxoUpdates);
	}
}
