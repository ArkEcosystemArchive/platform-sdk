import { Job, Queue, QueueEvents, QueueScheduler, Worker } from "bullmq";
import { Flags } from "./types";
import { Logger } from "./logger";
import { Client } from "./client";
import fs from "fs";
import path from "path";

const createRange = (start: number, size: number) => Array.from({ length: size }, (_, i) => i + size * start);

export class DownloadWorker {
	readonly #logger: Logger;
	readonly #client: Client;
	readonly #flags: any;

	readonly #processingQueue: Queue;
	readonly #downloadingQueue: Queue;

	public constructor(flags: Flags, logger: Logger, client: Client) {
		this.#flags = flags;
		this.#logger = logger;
		this.#client = client;

		this.ensureStateFile();

		this.#processingQueue = new Queue("block-processing", {
			defaultJobOptions: {
				attempts: 1000,
				// it will retry after 2 ^ attempts * delay milliseconds
				// backoff: {
				// 	type: "exponential",
				// 	delay: 10,
				// },
				removeOnComplete: true,
			},
		});

		this.#downloadingQueue = new Queue("block-downloads", {
			defaultJobOptions: {
				removeOnComplete: true,
				attempts: 1000,
				// it will retry after 2 ^ attempts * delay milliseconds
				// backoff: {
				// 	type: "exponential",
				// 	delay: 10,
				// },
			},
		});

		const queueScheduler = new QueueScheduler('block-downloads');
		queueScheduler.on('stalled', (jobId: string, prev: string) => {
			this.#logger.info("stalled", jobId, prev);
		});
		queueScheduler.on('failed', (jobId: string, failedReason: Error, prev: string) => {
			this.#logger.info("failed", jobId, failedReason, prev);
		});

		const downloadQueueEvents = new QueueEvents("block-downloads");
		downloadQueueEvents.on('completed', (jobId) => {
			this.#logger.error("finished downloading", jobId.jobId);
		});
		downloadQueueEvents.on("failed", (jobId, err) => {
			this.#logger.error("error downloading", err);
		});
		downloadQueueEvents.on("drained", async (job: Job) => {
			this.#logger.info(`downloading queue is drained, adding more download jobs`);
			await this.seedJobs();
		});

		new Worker(
			"block-downloads",
			async (job) => {
				if (job.name === "download-request") {
					const downloaded = await client.blockWithTransactions(job.data.height);
					await this.#processingQueue.add("processing-request", downloaded, {
						priority: job.data.height, // Adding with priority is expensive: O(n) on queue size
						jobId: `processing-request-${job.data.height}`,
					});
					return job.data.height;
				}
			},
			{ concurrency: this.#flags.concurrentDownloads },
		);
	}

	public async seedJobs() {
		if (await this.#downloadingQueue.count() > 2000) {
			return;
		}

		const lastDownloaded: number = this.lastDownloaded();
		const lastRemote: number = await this.#client.height();

		const start: number = lastDownloaded + 1;
		const end: number = Math.min(lastDownloaded + 1000, lastRemote);
		console.error("start", start, "end", end);
		const blocks = createRange(start, end).map((blockId) => ({
			name: "download-request",
			data: {
				height: blockId,
			},
			opts: {
				jobId: `download-request-${blockId}`,
			}
		}));
		await this.#downloadingQueue.addBulk(blocks);
		this.storeLastDownloaded(end);
	}

	readonly #STATE_FILE_CONTENT = { last_downloaded: 0 };

	private stateFile() {
		return path.resolve(process.cwd(), "state.json");
	}

	private lastDownloaded(): number {
		const filePath = this.stateFile();
		return JSON.parse(fs.readFileSync(filePath, "utf8")).last_downloaded;
	}

	private storeLastDownloaded(lastDownloaded: number): void {
		const filePath = this.stateFile();
		fs.writeFileSync(filePath, JSON.stringify({ last_downloaded: lastDownloaded }, null, 4));
	}

	private ensureStateFile(): void {
		const filePath = this.stateFile();
		if (!fs.existsSync(filePath)) {
			fs.writeFileSync(filePath, JSON.stringify(this.#STATE_FILE_CONTENT, null, 4));
		}
	}
}
