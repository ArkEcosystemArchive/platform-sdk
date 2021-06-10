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
const helpers_1 = require("./helpers");
const PAGE_SIZE = 25;
const subscribe = async (flags) => {
	const logger = helpers_1.useLogger();
	const database = helpers_1.useDatabase(flags, logger);
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
				params: joi_1.default
					.object({
						block: [joi_1.default.number().integer(), joi_1.default.string().length(66)],
					})
					.options({ stripUnknown: true }),
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
				payload: joi_1.default
					.object({
						transaction: joi_1.default.string().max(1024),
					})
					.options({ stripUnknown: true }),
			},
		},
		handler: async (request) => client.eth.sendSignedTransaction(request.payload.transaction),
	});
	server.route({
		method: "GET",
		path: "/transactions/{transaction}",
		options: {
			validate: {
				params: joi_1.default
					.object({
						transaction: joi_1.default.string().length(66),
					})
					.options({ stripUnknown: true }),
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
				params: joi_1.default
					.object({
						wallet: joi_1.default.string().length(42),
					})
					.options({ stripUnknown: true }),
			},
		},
		handler: async (request) => {
			const address = request.params.wallet;
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
				params: joi_1.default
					.object({
						wallet: joi_1.default.string().length(42),
					})
					.options({ stripUnknown: true }),
				query: joi_1.default
					.object({
						page: joi_1.default.number().optional().min(1).default(1),
					})
					.options({ stripUnknown: true }),
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
exports.subscribe = subscribe;
//# sourceMappingURL=index.js.map
