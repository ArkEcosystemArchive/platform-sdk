import { Job, Queue, QueueEvents, Worker } from "bullmq";
import { Flags } from "./types";
import { Logger } from "./logger";
import { Client } from "./client";

const createRange = (start: number, size: number) => Array.from({ length: size }, (_, i) => i + size * start);

export class DownloadWorker {
	readonly #logger: Logger;
	readonly #client: Client;
	readonly #flags: any;

	readonly #queue: Queue;

	public constructor(flags: Flags, logger: Logger, client: Client) {
		this.#flags = flags;
		this.#logger = logger;
		this.#client = client;

		this.#queue = new Queue("block-processing", {
			defaultJobOptions: {
				attempts: 1000,
				// it will retry after 2 ^ attempts * delay milliseconds
				backoff: {
					type: "exponential",
					delay: 10,
				},
				removeOnComplete: true,
			},
		});

		const downloadQueueEvents = new QueueEvents("block-downloads");
		downloadQueueEvents.on("completed", (jobId) => {
			this.#logger.info(`done downloading`, jobId);
		});
		downloadQueueEvents.on("failed", (jobId, err) => {
			this.#logger.error("error downloading", err);
		});
		downloadQueueEvents.on("drained", (job: Job) => {
			this.#logger.info(`downloading queue is drained, no more jobs left`);
		});

		new Worker(
			"block-downloads",
			async (job) => {
				if (job.name === "download-request") {
					const downloaded = await client.blockWithTransactions(job.data.height);
					await this.#queue.add("processing-request", downloaded, {
						priority: job.data.height,
					});
					return job.data.height;
				}
			},
			{ concurrency: this.#flags.concurrentDownloads },
		);
	}

	public async seedJobs() {
		const downloadQueue: Queue = new Queue("block-downloads", {
			defaultJobOptions: {
				removeOnComplete: true,
			},
		});

		this.#logger.info(`enqueuing jobs`);

		const blocks = createRange(1, 1000).map((blockId) => ({
			name: "download-request",
			data: {
				height: blockId,
			},
		}));
		await downloadQueue.addBulk(blocks);
	}
}
