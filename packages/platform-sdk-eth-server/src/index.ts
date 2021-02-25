import Hapi from "@hapi/hapi";

import { useDatabase, useLogger } from "./helpers";

export const subscribe = async (flags: {
	coin: string;
	network: string;
	host: string;
	port: string;
	database: string;
}): Promise<void> => {
	const logger = useLogger();
	const database = useDatabase(flags, logger);

	const server = Hapi.server({
		host: flags.host || "0.0.0.0",
		port: flags.port || 3000,
	});

	server.route({
		method: "GET",
		path: "/blocks/{block}",
		handler: (request) =>
			database
				.prepare(
					`SELECT * FROM blocks WHERE hash = '${request.params.block}' OR number = '${request.params.block}';`,
				)
				.get(),
	});

	server.route({
		method: "GET",
		path: "/transactions/{transaction}",
		handler: (request) =>
			database.prepare(`SELECT * FROM transactions WHERE hash = '${request.params.transaction}';`).get(),
	});

	server.route({
		method: "GET",
		path: "/wallets/{wallet}/transactions",
		handler: (request) =>
			database
				.prepare(
					`SELECT * FROM transactions WHERE sender = '${request.params.wallet}' OR recipient = '${request.params.wallet}';`,
				)
				.all(),
	});

	await server.start();

	logger.info(`Server running on ${server.info.uri}`);
};
