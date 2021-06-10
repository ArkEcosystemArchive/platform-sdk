"use strict";
var __classPrivateFieldSet =
	(this && this.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
		if (kind === "m") throw new TypeError("Private method is not writable");
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot write private member to an object whose class did not declare it");
		return kind === "a" ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
	};
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _Database_instances, _Database_prisma, _Database_logger, _Database_storeBlock, _Database_storeTransaction;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const utils_1 = require("@arkecosystem/utils");
const generated_1 = require("../prisma/generated");
const tx_parsing_helpers_1 = require("./tx-parsing-helpers");
/**
 * Implements a database storage with SQLite.
 *
 * @export
 * @class Database
 */
class Database {
	/**
	 * Creates an instance of Database.
	 *
	 * @param {Flags} flags
	 * @param {Logger} logger
	 * @memberof Database
	 */
	constructor(flags, logger) {
		_Database_instances.add(this);
		_Database_prisma.set(this, void 0);
		/**
		 * The logger instance.
		 *
		 * @type {Logger}
		 * @memberof Database
		 */
		_Database_logger.set(this, void 0);
		__classPrivateFieldSet(
			this,
			_Database_prisma,
			new generated_1.PrismaClient({
				log: ["info", "warn", "error"],
			}),
			"f",
		);
		__classPrivateFieldSet(this, _Database_logger, logger, "f");
	}
	/**
	 * Returns the height of the last block stored.
	 *
	 * @returns {number}
	 * @memberof Database
	 */
	async lastBlockNumber() {
		var _a;
		const lastBlockHeight = await __classPrivateFieldGet(this, _Database_prisma, "f").block.aggregate({
			_max: {
				height: true,
			},
		});
		return ((_a = lastBlockHeight["_max"]) === null || _a === void 0 ? void 0 : _a.height) || 1;
	}
	async allPendingBlocks() {
		return __classPrivateFieldGet(this, _Database_prisma, "f").pendingBlock.findMany({
			skip: 0,
			take: 10000,
			orderBy: {
				height: "asc",
			},
		});
	}
	async storePendingBlock(block) {
		await __classPrivateFieldGet(this, _Database_prisma, "f").pendingBlock.upsert({
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
	async deletePendingBlock(height) {
		try {
			await __classPrivateFieldGet(this, _Database_prisma, "f").pendingBlock.delete({
				where: { height },
			});
		} catch {
			// If we end up here the record is most likely already gone.
		}
	}
	async alreadyDownloadedBlocks(min, max) {
		return __classPrivateFieldGet(this, _Database_prisma, "f").pendingBlock.findMany({
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
	async storeBlockWithTransactions(block) {
		__classPrivateFieldGet(this, _Database_logger, "f").info(
			`Storing block [${block.hash}] height ${block.height} with [${block.tx.length}] transaction(s)`,
		);
		await __classPrivateFieldGet(this, _Database_instances, "m", _Database_storeBlock).call(this, block);
		if (block.tx) {
			for (const transaction of block.tx) {
				__classPrivateFieldGet(this, _Database_logger, "f").info(`Storing transaction [${transaction.txid}]`);
				await __classPrivateFieldGet(this, _Database_instances, "m", _Database_storeTransaction).call(
					this,
					block.height,
					transaction,
				);
			}
		}
	}
}
exports.Database = Database;
(_Database_prisma = new WeakMap()),
	(_Database_logger = new WeakMap()),
	(_Database_instances = new WeakSet()),
	(_Database_storeBlock =
		/**
		 * Stores a block with only the absolute minimum of data.
		 *
		 * @private
		 * @param {*} block
		 * @memberof Database
		 */
		async function _Database_storeBlock(block) {
			await __classPrivateFieldGet(this, _Database_prisma, "f").block.upsert({
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
		}),
	(_Database_storeTransaction =
		/**
		 * Stores a transaction with only the absolute minimum of data.
		 *
		 * @private
		 * @param blockId
		 * @param {*} transaction
		 * @memberof Database
		 */
		async function _Database_storeTransaction(blockId, transaction) {
			const amount = tx_parsing_helpers_1.getAmount(transaction);
			const outputs = tx_parsing_helpers_1.getOutputs(transaction);
			const inputs = tx_parsing_helpers_1.getInputs(transaction);
			const hashes = inputs.map((u) => u.txid);
			let outputsByTransactionHashAndIdx = {};
			if (hashes.length > 0) {
				const read = await __classPrivateFieldGet(this, _Database_prisma, "f").transactionPart.findMany({
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
							carry[element["output_hash"] + element["output_idx"]] = utils_1.BigNumber.make(
								element["amount"],
							);
							return carry;
						}, {});
					outputsByTransactionHashAndIdx = byHashAndIdx(read);
				}
			}
			const fee = tx_parsing_helpers_1.getFees(transaction, outputsByTransactionHashAndIdx);
			const utxoUpdates = inputs.map((input, i) =>
				__classPrivateFieldGet(this, _Database_prisma, "f").transactionPart.update({
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
				await __classPrivateFieldGet(this, _Database_prisma, "f").transaction.upsert({
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
				if (e instanceof generated_1.Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
					// Unique contraint validation. Ignore, there's nothing to update if already exists
					// We could query for existence before creation, but it doesn't really make sense
					__classPrivateFieldGet(this, _Database_logger, "f").info(
						`Ignoring transaction ${transaction.txid} from block ${blockId} as it already exists`,
					);
				} else {
					// If there's an error, we don't want to proceed, as this will affect future utxos
					// It means there's a programming error and we need to fix it
					throw e;
				}
			}
			await __classPrivateFieldGet(this, _Database_prisma, "f").$transaction(utxoUpdates);
		});
//# sourceMappingURL=database.js.map
