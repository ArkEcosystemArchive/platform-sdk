"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribe = void 0;
const hapi_1 = __importDefault(require("@hapi/hapi"));
const joi_1 = __importDefault(require("joi"));
const uuid_1 = require("uuid");
const helpers_1 = require("./helpers");
const subscribe = async (flags) => {
	const logger = helpers_1.useLogger();
	const database = helpers_1.useDatabase(flags);
	const client = helpers_1.useClient(flags.rpc);
	const server = hapi_1.default.server({
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
			const height = (
				await client.post("/", {
					jsonrpc: "1.0",
					id: uuid_1.v4(),
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
				params: joi_1.default
					.object({
						block: [joi_1.default.number().integer(), joi_1.default.string().length(64)],
					})
					.options({ stripUnknown: true }),
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
				payload: joi_1.default
					.object({
						transaction: joi_1.default.string().max(1024),
					})
					.options({ stripUnknown: true }),
			},
		},
		handler: async (request) =>
			(
				await client.post("/", {
					jsonrpc: "1.0",
					id: uuid_1.v4(),
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
				params: joi_1.default
					.object({
						transaction: joi_1.default.string().length(64),
					})
					.options({ stripUnknown: true }),
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
	server.route({
		method: "GET",
		path: "/wallets/{wallet}/transactions",
		handler: (request) =>
			database
				.prepare(
					`SELECT *
					 FROM transactions
					 WHERE hash IN (
						 SELECT output_hash
						 FROM transaction_parts
						 WHERE address = '${JSON.stringify([request.params.wallet])}'
					 )
							OR hash IN (
						 SELECT input_hash
						 FROM transaction_parts
						 WHERE address = '${JSON.stringify([request.params.wallet])}'
					 );`,
				)
				.all(),
	});
	server.route({
		method: "GET",
		path: "/wallets/{wallet}/transactions/unspent",
		options: {
			validate: {
				params: joi_1.default
					.object({
						wallet: joi_1.default.string(), //.length(42),
					})
					.options({ stripUnknown: true }),
			},
		},
		handler: async (request) => {
			// @TODO: rate limit or cache
			return (
				await client.post("/", {
					jsonrpc: "1.0",
					id: uuid_1.v4(),
					method: "qn_addressBalance",
					params: [request.params.wallet],
				})
			).json();
		},
	});
	await server.start();
	logger.info(`Server running on ${server.info.uri}`);
};
exports.subscribe = subscribe;
//# sourceMappingURL=index.js.map
