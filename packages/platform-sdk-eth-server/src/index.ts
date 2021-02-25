import Hapi from "@hapi/hapi";

import { useClient, useDatabase, useLogger } from "./helpers";

export const subscribe = async (flags: {
	coin: string;
	network: string;
	host: string;
	port: string;
	database: string;
	// JSON-RPC
	rpc: string;
	// Rate Limit
	points: string;
	duration: string;
	whitelist: string;
	blacklist: string;
}): Promise<void> => {
	const logger = useLogger();
	const database = useDatabase(flags, logger);
	const client = useClient(flags.rpc);

	const server = Hapi.server({
		host: flags.host || "0.0.0.0",
		port: flags.port || 3000,
	});

	await server.register({
		plugin: require("@konceiver/hapi-rate-limiter-flexible"),
		options: {
			enabled: true,
			points: flags.points,
			duration: flags.duration,
			whitelist: flags.whitelist.split(",").filter(Boolean),
			blacklist: flags.blacklist.split(",").filter(Boolean),
		},
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
		path: "/wallets/{wallet}",
		handler: async (request) => {
			const address: string = request.params.wallet;

			const [balance, nonce, code] = await Promise.all([
				client.eth.getBalance(address),
				client.eth.getTransactionCount(address),
				client.eth.getCode(address),
			]);

			return {
				address,
				balance,
				nonce,
				code,
			};
		},
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
