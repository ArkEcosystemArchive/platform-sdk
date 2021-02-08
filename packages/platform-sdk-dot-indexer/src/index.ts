import PQueue from "p-queue";
import retry from "p-retry";
import pino from "pino";

import { indexBlock, indexNewBlocks, useElasticSearch, usePolkadot } from "./helpers";

export const subscribe = async (flags: Record<string, string>): Promise<void> => {
	// Logging
	const logger = pino({ name: "@arkecosystem/platform-sdk-dot-indexer", level: "debug" });

	// Queue
	const queue = new PQueue({ autoStart: false, concurrency: 10 });
	// queue.on("active", () => logger.debug(`Size: ${queue.size}  Pending: ${queue.pending}`));
	// queue.on("idle", () => logger.debug(`Queue is idle. Size: ${queue.size} | Pending: ${queue.pending}`));
	// queue.on("add", () => logger.debug(`Task is added. Size: ${queue.size} | Pending: ${queue.pending}`));
	// queue.on("next", () => logger.debug(`Task is completed. Size: ${queue.size} | Pending: ${queue.pending}`));

	// Storage
	const elastic = useElasticSearch(flags.elasticsearch);

	// API
	let polkadot = await usePolkadot(flags.polkadot);

	// @TODO: get last block stored in elasticsearch and set `i` to that value to prevent full reindexing
	const latestBlockHeight = parseInt((await polkadot.derive.chain.bestNumberFinalized()).toString());

	for (let i = 1; i <= latestBlockHeight; i++) {
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
				retry(() => indexBlock(i, polkadot, elastic, logger), {
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

			polkadot = await usePolkadot(flags.polkadot);

			if (i > 500) {
				i -= 500;
			} else {
				i = 1;
			}
		}
	}

	// Once we have indexed all blocks we will listen for new blocks
	await indexNewBlocks(polkadot, elastic, logger);
};
