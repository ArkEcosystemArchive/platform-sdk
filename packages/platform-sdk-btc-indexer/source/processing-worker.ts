import { QueueEvents, QueueScheduler, Worker } from "bullmq";

import { Database } from "./database";
import { Logger } from "./logger";
import { Flags } from "./types";

export class ProcessingWorker {
	readonly #logger: Logger;
	readonly #database: Database;
	readonly #flags: any;

	public constructor(flags: Flags, logger: Logger, database: Database) {
		this.#flags = flags;
		this.#logger = logger;
		this.#database = database;

		const queueScheduler = new QueueScheduler("block-processing");
		queueScheduler.on("stalled", (jobId: string, prev: string) => {
			this.#logger.info("stalled", jobId, prev);
		});
		queueScheduler.on("failed", (jobId: string, failedReason: Error, prev: string) => {
			this.#logger.info("failed", jobId, failedReason, prev);
		});

		const processingQueueEvents = new QueueEvents("block-processing");
		// processingQueueEvents.on('completed', (jobId) => {
		// 	this.#logger.error("finished processing", jobId.jobId);
		// });
		processingQueueEvents.on("failed", (jobId, err) => {
			this.#logger.error("error processing", err);
		});

		new Worker(
			"block-processing",
			async (job) => {
				if (job.name === "processing-request") {
					const block: object = job.data;
					await this.#database.storeBlockWithTransactions(block);
				}
			},
			{ concurrency: this.#flags.batchSize },
		);
	}
}
