import { Client } from "@elastic/elasticsearch";
import { ApiPromise, WsProvider } from "@polkadot/api";
import pino from "pino";
import { v4 as uuidv4 } from "uuid";

const persistBlock = async (blockHash, block, elastic: Client, logger: pino.Logger): Promise<void> => {
	await elastic.update({
		index: "blocks",
		id: blockHash,
		body: {
			doc: JSON.parse(JSON.stringify(block.header)),
			doc_as_upsert: true,
		},
	});

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

		try {
			await elastic.update({
				index: "transactions",
				id: uuidv4(),
				body: {
					doc: body,
					doc_as_upsert: true,
				},
			});
		} catch (error) {
			// @TODO: remove everything below this line
			console.log(body);
			console.log(error.meta.body.error);
			process.exit();
		}
	}

	logger.info(`Processed Block [${block.header.number}]...`);
};

const getBlockHash = async (height: number, polkadot: ApiPromise, logger: pino.Logger): Promise<string | undefined> => {
	const blockHashResponse = await polkadot.rpc.chain.getBlockHash(height);

	if (blockHashResponse === undefined) {
		logger.error(`Failed to get hash for height [${height}]...`);

		return;
	}

	return blockHashResponse.toHex();
};

export const indexBlock = async (
	height: number,
	polkadot: ApiPromise,
	elastic: Client,
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

	await persistBlock(blockHash, blockResponse.toHuman().block, elastic, logger);
};

export const indexNewBlocks = async (polkadot: ApiPromise, elastic: Client, logger: pino.Logger): Promise<void> => {
	await polkadot.derive.chain.subscribeNewBlocks(async ({ block }) => {
		const blockHash = await getBlockHash(block.header.number.toNumber(), polkadot, logger);

		if (blockHash === undefined) {
			return;
		}

		await persistBlock(blockHash, block, elastic, logger);
	});
};

export const usePolkadot = async (host: string): Promise<ApiPromise> =>
	ApiPromise.create({ provider: new WsProvider(host) });

export const useElasticSearch = (host: string): Client => new Client({ node: host });
