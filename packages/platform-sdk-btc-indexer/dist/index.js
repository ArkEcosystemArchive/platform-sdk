"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribe = void 0;
const execa_1 = __importDefault(require("execa"));
const p_queue_1 = __importDefault(require("p-queue"));
const path_1 = __importDefault(require("path"));
const helpers_1 = require("./helpers");
/**
 * Launch the indexer and subscribe to updates for new data.
 *
 * @param {Flags} flags
 * @returns {Promise<void>}
 */
const subscribe = async (flags) => {
	await runMigrations();
	const logger = helpers_1.useLogger();
	const database = helpers_1.useDatabase(flags, logger);
	const client = helpers_1.useClient(flags);
	const downloadQueue = new p_queue_1.default({ concurrency: flags.batchSize });
	const [localHeight, remoteHeight] = [await database.lastBlockNumber(), await client.height()];
	logger.info(`Starting at block height ${localHeight}.`);
	const alreadyDownloaded = new Set();
	(await database.alreadyDownloadedBlocks(localHeight, remoteHeight)).forEach((downloaded) =>
		alreadyDownloaded.add(downloaded.height),
	);
	const range = [...Array(remoteHeight + 1).keys()]
		.filter((value) => remoteHeight >= value && localHeight <= value)
		.filter((value) => !alreadyDownloaded.has(value));
	for (const blockHeight of range) {
		void downloadQueue.add(async () => database.storePendingBlock(await client.blockWithTransactions(blockHeight)));
	}
	let busy = false;
	setInterval(async () => {
		if (!busy) {
			busy = true;
			await helpers_1.processPendingBlocks(logger, database);
			busy = false;
		}
	}, 10000); // Every 10 seconds
};
exports.subscribe = subscribe;
const runMigrations = async () => {
	const { stdout } = await execa_1.default("npx", [
		"prisma",
		"migrate",
		"deploy",
		"--schema",
		path_1.default.resolve(__dirname, "../prisma/schema.prisma"),
	]);
	console.log(stdout);
};
//# sourceMappingURL=index.js.map
