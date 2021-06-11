import Hapi from "@hapi/hapi";
import Joi from "joi";

import { useClient, useDatabase, useLogger } from "./factories";

const PAGE_SIZE = 25;

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
		path: "/",
		handler: async () => {
			const [height, syncing] = await Promise.all([client.eth.getBlockNumber(), client.eth.isSyncing()]);

			return {
				height,
				syncing,
			};
		},
	});

	server.route({
		method: "GET",
		path: "/blocks/{block}",
		options: {
			validate: {
				params: Joi.object({
					block: [Joi.number().integer(), Joi.string().length(66)],
				}).options({ stripUnknown: true }),
			},
		},
		handler: (request) =>
			database
				.prepare(
					`SELECT * FROM blocks WHERE hash = '${request.params.block}' OR number = '${request.params.block}';`,
				)
				.get(),
	});

	server.route({
		method: "POST",
		path: "/transactions",
		options: {
			validate: {
				payload: Joi.object({
					transaction: Joi.string().max(1024),
				}).options({ stripUnknown: true }),
			},
		},
		handler: async (request) => client.eth.sendSignedTransaction(request.payload.transaction),
	});

	server.route({
		method: "GET",
		path: "/transactions/{transaction}",
		options: {
			validate: {
				params: Joi.object({
					transaction: Joi.string().length(66),
				}).options({ stripUnknown: true }),
			},
		},
		handler: (request) =>
			database.prepare(`SELECT * FROM transactions WHERE hash = '${request.params.transaction}';`).get(),
	});

	server.route({
		method: "GET",
		path: "/wallets/{wallet}",
		options: {
			validate: {
				params: Joi.object({
					wallet: Joi.string().length(42),
				}).options({ stripUnknown: true }),
			},
		},
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
		options: {
			validate: {
				params: Joi.object({
					wallet: Joi.string().length(42),
				}).options({ stripUnknown: true }),
				query: Joi.object({
					page: Joi.number().optional().min(1).default(1),
				}).options({ stripUnknown: true }),
			},
		},
		handler: (request) => {
			const offset = (request.query.page - 1) * PAGE_SIZE;
			return database
				.prepare(
					`SELECT * FROM transactions WHERE sender = '${request.params.wallet}' OR recipient = '${request.params.wallet}' ORDER BY nonce LIMIT ${PAGE_SIZE} OFFSET ${offset};`,
				)
				.all();
		},
	});

	await server.start();

	logger.info(`Server running on ${server.info.uri}`);
};
