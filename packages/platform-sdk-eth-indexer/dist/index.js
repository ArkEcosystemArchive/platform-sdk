"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribe = void 0;
const p_retry_1 = __importDefault(require("p-retry"));
const helpers_1 = require("./helpers");
/**
 * Launch the indexer and subscribe to updates for new data.
 *
 * @param {{
 * 	coin: string;
 * 	network: string;
 * 	rpc: string;
 * 	wss: string;
 * 	database: string;
 * }} flags
 * @returns {Promise<void>}
 */
const subscribe = async (flags) => {
	const logger = helpers_1.useLogger();
	const queue = helpers_1.useQueue();
	const database = helpers_1.useDatabase(flags, logger);
	const { rpc, wss } = helpers_1.useClient(flags.rpc, flags.wss);
	// Listen for new block headers and retrieve the full block with transactions
	wss.eth
		.subscribe("newBlockHeaders")
		.on("data", async (blockHeader) =>
			database.storeBlockWithTransactions(await rpc.eth.getBlock(blockHeader.number, true)),
		)
		.on("error", (error) => logger.error(error.message));
	// Get the last block we stored in the database and grab the latest block
	// on the network so that we can sync the missing blocks to complete our
	// copy of the blockchain to avoid holes in the historical data of users.
	const [localHeight, remoteHeight] = [database.lastBlockNumber(), await rpc.eth.getBlockNumber()];
	for (let i = localHeight; i <= remoteHeight; i++) {
		try {
			if (queue.size === 1000) {
				logger.info("Draining Queue...");
				await queue.start().onIdle();
				queue.pause();
				logger.info("Drained Queue...");
			}
			// @ts-ignore
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			queue.add(() =>
				p_retry_1.default(
					async () => {
						database.storeBlockWithTransactions(await rpc.eth.getBlock(i, true));
					},
					{
						onFailedAttempt: (error) => {
							logger.error(
								`Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`,
							);
						},
						retries: 5,
					},
				),
			);
		} catch (error) {
			logger.error(error);
			process.exit();
		}
	}
};
exports.subscribe = subscribe;
//# sourceMappingURL=index.js.map
