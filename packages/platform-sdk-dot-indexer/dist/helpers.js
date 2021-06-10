"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDatabase = exports.usePolkadot = exports.indexNewBlocks = exports.indexBlock = void 0;
const api_1 = require("@polkadot/api");
const uuid_1 = require("uuid");
const database_1 = require("./database");
/**
 * Stores a block and all of its transactions.
 *
 * @param {*} blockHash
 * @param {*} block
 * @param {Database} database
 * @param {pino.Logger} logger
 * @returns {Promise<void>}
 */
const persistBlock = async (blockHash, block, database, logger) => {
	const transactions = [];
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
			id: uuid_1.v4(),
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
const getBlockHash = async (height, polkadot, logger) => {
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
const indexBlock = async (height, polkadot, database, logger) => {
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
exports.indexBlock = indexBlock;
/**
 * Listens for new blocks and stores them.
 *
 * @param {ApiPromise} polkadot
 * @param {Database} database
 * @param {pino.Logger} logger
 * @returns {Promise<void>}
 */
const indexNewBlocks = async (polkadot, database, logger) => {
	await polkadot.derive.chain.subscribeNewBlocks(async ({ block }) => {
		const blockHash = await getBlockHash(block.header.number.toNumber(), polkadot, logger);
		if (blockHash === undefined) {
			return;
		}
		await persistBlock(blockHash, block, database, logger);
	});
};
exports.indexNewBlocks = indexNewBlocks;
/**
 * Creates a new API client instance.
 *
 * @param {string} host
 * @returns {Promise<ApiPromise>}
 */
const usePolkadot = async (host) => api_1.ApiPromise.create({ provider: new api_1.WsProvider(host) });
exports.usePolkadot = usePolkadot;
/**
 * Creates a new database instance.
 *
 * @param {*} flags
 * @param {*} logger
 * @returns {Database}
 */
const useDatabase = (flags, logger) => new database_1.Database(flags, logger);
exports.useDatabase = useDatabase;
//# sourceMappingURL=helpers.js.map
