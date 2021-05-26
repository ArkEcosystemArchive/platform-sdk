import { PrismaClient } from "@prisma/client";
import envPaths from "env-paths";
import { ensureFileSync } from "fs-extra";

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
			log: ["query", "info", "warn", "error"],
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

		if (lastBlockHeight === undefined) {
			return 1;
		}

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

		const blockForCreation = await this.storeBlock(block);
		const blockWithUtxos = [blockForCreation.create, ...blockForCreation.utxoUpdates];
		this.#prisma.$transaction(blockWithUtxos);
	}

	/**
	 * Stores a block with only the absolute minimum of data.
	 *
	 * @private
	 * @param {*} block
	 * @memberof Database
	 */
	private async storeBlock(block): Promise<any> {
		const transactions: any[] = [];
		const utxoUpdates: any[] = [];
		for (const transaction of block.tx || []) {
			const storeTransaction = await this.storeTransaction(transaction);
			transactions.push(storeTransaction.create);
			utxoUpdates.push(...storeTransaction.utxoUpdates);
		}
		return {
			create: this.#prisma.block.create({
				data: {
					hash: block.hash,
					height: block.height,
					transactions: {
						create: transactions,
					},
				},
			}),
			utxoUpdates,
		};
	}

	/**
	 * Stores a transaction with only the absolute minimum of data.
	 *
	 * @private
	 * @param {*} transaction
	 * @memberof Database
	 */
	private async storeTransaction(transaction): Promise<any> {
		const amount: bigint = getAmount(transaction);
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
						carry[element["output_hash"] + element["output_idx"]] = BigInt(element["amount"]);
						return carry;
					}, {});

				outputsByTransactionHashAndIdx = byHashAndIdx(read);
			}
		}

		const fee: bigint = getFees(transaction, outputsByTransactionHashAndIdx);

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

		return {
			create: {
				hash: transaction.txid,
				time: transaction.time,
				amount: amount,
				fee: fee,
				transaction_parts: {
					create: outputs.map((output) => ({
						output_idx: output.idx,
							amount: output.amount,
						address: JSON.stringify(output.addresses),
					})),
				},
			},
			utxoUpdates,
		};
	}
}
