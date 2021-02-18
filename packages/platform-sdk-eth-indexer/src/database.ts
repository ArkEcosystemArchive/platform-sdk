import Logger from "@ptkdev/logger";
import sqlite3 from "better-sqlite3";

const storeBlock = (database, block) =>
	database
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

const storeTransaction = (database, transaction) =>
	database
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

export const storeBlockWithTransactions = ({
	block,
	database,
	logger,
}: {
	block: { hash: string; transactions: { hash: string }[] };
	database: sqlite3.Database;
	logger: Logger;
}) => {
	logger.info(`Storing block [${block.hash}] with [${block.transactions.length}] transaction(s)`);

	storeBlock(database, block);

	if (block.transactions.length) {
		for (const transaction of block.transactions) {
			logger.info(`Storing transaction [${transaction.hash}]`);

			storeTransaction(database, transaction);
		}
	}
};
