"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribe = void 0;
const execa_1 = __importDefault(require("execa"));
const path_1 = __importDefault(require("path"));
const constants_1 = require("./constants");
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
	const database = helpers_1.useDatabase();
	const client = helpers_1.useClient(flags);
	// Index Teams
	for (const [symbol, alias] of Object.entries(constants_1.COINS)) {
		const teams = await client.teams(alias);
		for (const team of teams) {
			const coinModel = await database.storeCoin({ alias, symbol, coin: team.coin });
			logger.info(`Stored COIN [${team.coin.name}] with ID [${coinModel.id}]`);
			const teamModel = await database.storeTeam({ coin: coinModel, symbol, team });
			logger.info(`Stored TEAM [${teamModel.name}] with ID [${teamModel.id}]`);
			// Index Signals
			const initialResponse = await client.signals(teamModel.uuid);
			let signals = initialResponse.results;
			let hasMore = initialResponse.cursor.next !== undefined;
			while (hasMore) {
				const { results, cursor } = await client.signals(team.uuid, initialResponse.cursor.next);
				hasMore = cursor.next !== undefined;
				signals = signals.concat(results);
			}
			for (const signal of signals) {
				const signalModel = await database.storeSignal({ team: teamModel, signal });
				logger.info(`Stored SIGNAL [${signalModel.uuid}] with ID [${signalModel.id}]`);
			}
		}
	}
	logger.info("Completed indexing. Terminating...");
	process.exit();
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
