"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribe = void 0;
const zilliqa_1 = require("@zilliqa-js/zilliqa");
const p_retry_1 = __importDefault(require("p-retry"));
const helpers_1 = require("./helpers");
/**
 * Launch the indexer and subscribe to updates for new data.
 *
 * @param {{
 * 	network: string;
 * 	host: string;
 * 	database: string;
 * }} flags
 * @returns {Promise<void>}
 */
const subscribe = async (flags) => {
	const logger = helpers_1.useLogger();
	const queue = helpers_1.useQueue();
	const database = helpers_1.useDatabase(flags, logger);
	const zilliqa = helpers_1.useClient(flags.host);
	// Get the last block we stored in the database and grab the latest block
	// on the network so that we can sync the missing blocks to complete our
	// copy of the blockchain to avoid holes in the historical data of users.
	const [localHeight, remoteHeight] = [
		database.lastBlockNumber(),
		new zilliqa_1.BN(await zilliqa.height()).toNumber() - 1,
	];
	for (let height = localHeight; height <= remoteHeight; height++) {
		try {
			if (queue.size === 1000) {
				logger.info("Draining Queue...");
				await queue.start().onIdle();
				queue.pause();
				logger.info("Drained Queue...");
			}
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			queue.add(() =>
				p_retry_1.default(
					async () => {
						const block = await zilliqa.block(height);
						if (block === undefined) {
							throw new Error(`Failed to fetch block at height ${height}`);
						}
						database.storeBlockWithTransactions(
							block,
							block.header.NumTxns > 0 ? await zilliqa.transactions(height) : [],
						);
					},
					{
						onFailedAttempt: (error) => {
							console.log(error);
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
