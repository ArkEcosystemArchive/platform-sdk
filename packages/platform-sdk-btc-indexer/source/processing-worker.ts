import { Job, QueueEvents, Worker } from "bullmq";
import { Flags } from "./types";
import { Logger } from "./logger";
import { Database } from "./database";

export class ProcessingWorker {
	readonly #logger: Logger;
	readonly #database: Database;
	readonly #flags: any;

	public constructor(flags: Flags, logger: Logger, database: Database) {
		this.#flags = flags;
		this.#logger = logger;
		this.#database = database;

		const processingQueueEvents = new QueueEvents("block-processing");
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
