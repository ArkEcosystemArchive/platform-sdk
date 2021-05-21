import { BigNumber } from "@arkecosystem/utils";
import { PrismaClient } from "@prisma/client";
import envPaths from "env-paths";
import { ensureFileSync } from "fs-extra";

import { Logger } from "./logger";
import { getAmount, getFees, getVIns, getVOuts } from "./tx-parsing-helpers";
import { Flags, VIn, VOut } from "./types";

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
			log: ["query", "info", `warn`, `error`],
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

		return (lastBlockHeight["_max"]?.height as number) || 1;
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

		const transactions = [this.storeBlock(block)];

		for (const tx of block.tx || []) {
			for (const transaction of await this.storeTransaction(tx)) {
				transactions.push(transaction);
			}
		}

		this.#prisma.$transaction(transactions);
	}

	/**
	 * Stores a block with only the absolute minimum of data.
	 *
	 * @private
	 * @param {*} block
	 * @memberof Database
	 */
	private storeBlock(block): any {
		return this.#prisma.block.create({
			data: {
				hash: block.hash,
				height: block.height,
			},
		});
	}

	/**
	 * Stores a transaction with only the absolute minimum of data.
	 *
	 * @private
	 * @param {*} transaction
	 * @memberof Database
	 */
	private async storeTransaction(transaction): Promise<any[]> {
		const amount: BigNumber = getAmount(transaction);
		const vouts: VOut[] = getVOuts(transaction);
		const vIns = getVIns(transaction);
		const hashes: string[] = vIns.map((u: VIn) => u.txid);
		let voutsByTransactionHashAndIdx = {};
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

				voutsByTransactionHashAndIdx = byHashAndIdx(read);
			}
		}

		const fee: BigNumber = getFees(transaction, voutsByTransactionHashAndIdx);

		const updates = vIns.map((vIn, i) =>
			this.#prisma.transactionPart.update({
				where: {
					output_hash_output_idx: {
						output_hash: vIn.txid,
						output_idx: vIn.vout,
					},
				},
				data: {
					input_hash: transaction.txid,
					input_idx: i,
				},
			}),
		);

		return [
			this.#prisma.transaction.create({
				data: {
					hash: transaction.txid,
					time: transaction.time,
					amount: amount.toString(),
					fee: fee.toString(),
					transaction_parts: {
						create: vouts.map((vout) => ({
							output_idx: vout.idx,
							amount: vout.amount.toString(),
							address: JSON.stringify(vout.addresses),
						})),
					},
				},
			}),
			...updates,
		];
	}
}
