import { ApiPromise } from "@polkadot/api";
import pino from "pino";
import { v4 as uuidv4 } from "uuid";

import { Database } from "./database";

/**
 * Stores a block and all of its transactions.
 *
 * @param {*} blockHash
 * @param {*} block
 * @param {Database} database
 * @param {pino.Logger} logger
 * @returns {Promise<void>}
 */
const persistBlock = async (blockHash, block, database: Database, logger: pino.Logger): Promise<void> => {
	const transactions: Array<any> = [];
	for (const extrinsic of block.extrinsics) {
		let body;

		if (extrinsic.registry === undefined) {
			body = JSON.parse(JSON.stringify(extrinsic));
		} else {
			body = JSON.parse(extrinsic.toString());
		}

		// This property can be string[] and object[] which will mess up
		// mappings in ElasticSearch so we force it to be string[] for now.
		body.method.args = JSON.stringify(body.method.args);

		// This property can be an object or a string which will mess up
		// mappings in ElasticSearch so we force it to be a string for now.
		body.method.signature = JSON.stringify(body.method.signature);

		transactions.push({
			id: uuidv4(),
			...body,
		});
	}

	database.storeBlockWithTransactions({
		hash: blockHash,
		...block.header,
		transactions,
	});

	logger.info(`Processed Block [${block.header.number}]...`);
};

/**
 * Returns the hash of a block for a given height.
 *
 * @param {number} height
 * @param {ApiPromise} polkadot
 * @param {pino.Logger} logger
 * @returns {(Promise<string | undefined>)}
 */
const getBlockHash = async (height: number, polkadot: ApiPromise, logger: pino.Logger): Promise<string | undefined> => {
	const blockHashResponse = await polkadot.rpc.chain.getBlockHash(height);

	if (blockHashResponse === undefined) {
		logger.error(`Failed to get hash for height [${height}]...`);

		return;
	}

	return blockHashResponse.toHex();
};

/**
 * Gets a block with all of its transactions and stores it.
 *
 * @param {number} height
 * @param {ApiPromise} polkadot
 * @param {Database} database
 * @param {pino.Logger} logger
 * @returns {Promise<void>}
 */
export const indexBlock = async (
	height: number,
	polkadot: ApiPromise,
	database: Database,
	logger: pino.Logger,
): Promise<void> => {
	// Get hash for the given height
	const blockHash = await getBlockHash(height, polkadot, logger);

	if (blockHash === undefined) {
		return;
	}

	// Get data for the given hash
	const blockResponse = await polkadot.derive.chain.getBlock(blockHash);

	if (blockResponse === undefined) {
		logger.error(`Failed to get data for hash [${blockHash}]...`);

		return;
	}

	await persistBlock(blockHash, blockResponse.toHuman().block, database, logger);
};

/**
 * Listens for new blocks and stores them.
 *
 * @param {ApiPromise} polkadot
 * @param {Database} database
 * @param {pino.Logger} logger
 * @returns {Promise<void>}
 */
export const indexNewBlocks = async (polkadot: ApiPromise, database: Database, logger: pino.Logger): Promise<void> => {
	await polkadot.derive.chain.subscribeNewBlocks(async ({ block }) => {
		const blockHash = await getBlockHash(block.header.number.toNumber(), polkadot, logger);

		if (blockHash === undefined) {
			return;
		}

		await persistBlock(blockHash, block, database, logger);
	});
};