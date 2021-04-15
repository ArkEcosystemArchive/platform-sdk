import { Contracts } from "@arkecosystem/platform-sdk";
import Hapi from "@hapi/hapi";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";

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
	const database = useDatabase(flags);
	const client: Contracts.HttpClient = useClient(flags.rpc);

	const server = Hapi.server({
		host: flags.host || "0.0.0.0",
		port: flags.port || 3000,
	});

	// await server.register({
	// 	plugin: require("@konceiver/hapi-rate-limiter-flexible"),
	// 	options: {
	// 		enabled: true,
	// 		points: flags.points,
	// 		duration: flags.duration,
	// 		whitelist: flags.whitelist.split(",").filter(Boolean),
	// 		blacklist: flags.blacklist.split(",").filter(Boolean),
	// 	},
	// });

	server.route({
		method: "GET",
		path: "/",
		handler: async () => {
			const height = (
				await client.post("/", {
					jsonrpc: "1.0",
					id: uuidv4(),
					method: "getblockcount",
				})
			).json().result;

			const indexedHeight = database.prepare("SELECT height FROM blocks ORDER BY height DESC LIMIT 1").get();

			return {
				height,
				syncing: height !== indexedHeight,
			};
		},
	});

	server.route({
		method: "GET",
		path: "/blocks/{block}",
		options: {
			validate: {
				params: Joi.object({
					block: [Joi.number().integer(), Joi.string().length(64)],
				}).options({ stripUnknown: true }),
			},
		},
		handler: (request) =>
			database
				.prepare(
					`SELECT * FROM blocks WHERE hash = '${request.params.block}' OR height = '${request.params.block}';`,
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
		handler: async (request) =>
			(
				await client.post("/", {
					jsonrpc: "1.0",
					id: uuidv4(),
					method: "sendrawtransaction",
					params: [`${request.params.transaction}`],
				})
			).json().result,
	});

	server.route({
		method: "GET",
		path: "/transactions/{transaction}",
		options: {
			validate: {
				params: Joi.object({
					transaction: Joi.string().length(64),
				}).options({ stripUnknown: true }),
			},
		},
		handler: (request) => {
			const tx = database
				.prepare(`SELECT * FROM transactions WHERE hash = '${request.params.transaction}';`)
				.get();
			return {
				...tx,
				vin: JSON.parse(tx.vin),
				vout: JSON.parse(tx.vout),
			};
		},
	});

	// server.route({
	// 	method: "GET",
	// 	path: "/wallets/{wallet}",
	// 	options: {
	// 		validate: {
	// 			params: Joi.object({
	// 				wallet: Joi.string().length(42),
	// 			}).options({ stripUnknown: true }),
	// 		},
	// 	},
	// 	handler: async (request) => {
	// 		const address: string = request.params.wallet;
	//
	// 		const [balance, nonce, code] = await Promise.all([
	// 			client.btc.getBalance(address),
	// 			client.btc.getTransactionCount(address),
	// 			client.btc.getCode(address),
	// 		]);
	//
	// 		return {
	// 			address,
	// 			balance,
	// 			nonce,
	// 			code,
	// 		};
	// 	},
	// });

	// server.route({
	// 	method: "GET",
	// 	path: "/wallets/{wallet}/transactions",
	// 	handler: (request) =>
	// 		database
	// 			.prepare(
	// 				`SELECT * FROM transactions WHERE sender = '${request.params.wallet}' OR recipient = '${request.params.wallet}';`,
	// 			)
	// 			.all(),
	// });

	server.route({
		method: "GET",
		path: "/wallets/{wallet}/transactions/unspent",
		options: {
			validate: {
				params: Joi.object({
					wallet: Joi.string().length(42),
				}).options({ stripUnknown: true }),
			},
		},
		handler: async (request) => {
			// @TODO: rate limit or cache
			return (await client.post('/', {
				jsonrpc: '1.0',
				id: uuidv4(),
				method: 'qn_addressBalance',
				params: [request.params.wallet]
			})).json();
		},
	});


	await server.start();

	logger.info(`Server running on ${server.info.uri}`);
};
