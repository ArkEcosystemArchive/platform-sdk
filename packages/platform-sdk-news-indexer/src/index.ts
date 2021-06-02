import execa from "execa";
import path from "path";

import { COINS } from "./constants";
import { useClient, useDatabase, useLogger } from "./helpers";
import { Logger } from "./logger";
import { Flags } from "./types";

/**
 * Launch the indexer and subscribe to updates for new data.
 *
 * @param {Flags} flags
 * @returns {Promise<void>}
 */
export const subscribe = async (flags: Flags): Promise<void> => {
	await runMigrations();

	const logger: Logger = useLogger();
	const database = useDatabase();
	const client = useClient(flags);

	// Index Teams
	for (const [symbol, alias] of Object.entries(COINS)) {
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

const runMigrations = async (): Promise<void> => {
	const { stdout } = await execa("npx", [
		"prisma",
		"migrate",
		"deploy",
		"--schema",
		path.resolve(__dirname, "../prisma/schema.prisma"),
	]);
	console.log(stdout);
};
