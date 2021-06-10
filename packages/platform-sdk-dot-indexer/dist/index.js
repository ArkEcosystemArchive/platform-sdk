"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribe = void 0;
const p_queue_1 = __importDefault(require("p-queue"));
const p_retry_1 = __importDefault(require("p-retry"));
const pino_1 = __importDefault(require("pino"));
const helpers_1 = require("./helpers");
/**
 * Launch the indexer and subscribe to updates for new data.
 *
 * @param {Record<string, string>} flags
 * @returns {Promise<void>}
 */
const subscribe = async (flags) => {
	// Logging
	const logger = pino_1.default({ name: "@arkecosystem/platform-sdk-dot-indexer", level: "debug" });
	// Queue
	const queue = new p_queue_1.default({ autoStart: false, concurrency: 10 });
	// queue.on("active", () => logger.debug(`Size: ${queue.size}  Pending: ${queue.pending}`));
	// queue.on("idle", () => logger.debug(`Queue is idle. Size: ${queue.size} | Pending: ${queue.pending}`));
	// queue.on("add", () => logger.debug(`Task is added. Size: ${queue.size} | Pending: ${queue.pending}`));
	// queue.on("next", () => logger.debug(`Task is completed. Size: ${queue.size} | Pending: ${queue.pending}`));
	// Storage
	const database = helpers_1.useDatabase(flags, logger);
	// API
	let polkadot = await helpers_1.usePolkadot(flags.polkadot);
	const localHeight = database.lastBlockNumber();
	const latestBlockHeight = parseInt((await polkadot.derive.chain.bestNumberFinalized()).toString());
	logger.debug(`Start indexing from block ${localHeight}`);
	for (let i = localHeight; i <= latestBlockHeight; i++) {
		try {
			if (queue.size === 250) {
				logger.info("Draining Queue...");
				await queue.start().onIdle();
				queue.pause();
				logger.info("Drained Queue...");
			}
			// @ts-ignore
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			queue.add(() =>
				p_retry_1.default(() => helpers_1.indexBlock(i, polkadot, database, logger), {
					onFailedAttempt: (error) => {
						console.log(error);
						logger.error(
							`Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`,
						);
					},
					retries: 5,
				}),
			);
		} catch (error) {
			logger.log(error);
			// Connections can randomly be dropped so we should try to reconnect but
			// also terminate when the connection drops too often which means a human
			// should probably take a look at this or we should halt polling of data.
			logger.info("Disconnecting...");
			await polkadot.disconnect();
			logger.info("Reconnecting...");
			polkadot = await helpers_1.usePolkadot(flags.polkadot);
			if (i > 500) {
				i -= 500;
			} else {
				i = 1;
			}
		}
	}
	// Once we have indexed all blocks we will listen for new blocks
	await helpers_1.indexNewBlocks(polkadot, database, logger);
};
exports.subscribe = subscribe;
//# sourceMappingURL=index.js.map
