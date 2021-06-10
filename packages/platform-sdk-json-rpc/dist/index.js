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
const client_1 = require("./methods/client");
const address_1 = require("./methods/identity/address");
const keys_1 = require("./methods/identity/keys");
const private_key_1 = require("./methods/identity/private-key");
const public_key_1 = require("./methods/identity/public-key");
const wif_1 = require("./methods/identity/wif");
const message_1 = require("./methods/message");
const transaction_1 = require("./methods/transaction");
const wallet_1 = require("./methods/wallet");
const subscribe = async (flags) => {
	const logger = helpers_1.useLogger();
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
	await server.register({
		plugin: require("@konceiver/hapi-json-rpc"),
		options: {
			methods: [
				// Client Service
				...client_1.registerClient(),
				// Identity Service
				...address_1.registerAddress(),
				...keys_1.registerKeys(),
				...private_key_1.registerPrivateKey(),
				...public_key_1.registerPublicKey(),
				...wif_1.registerWIF(),
				// Message Service
				...message_1.registerMessage(),
				// Transaction Service
				...transaction_1.registerTransaction(),
				// Wallet Service
				...wallet_1.registerWallet(),
			],
			processor: {
				schema: joi_1.default.object({
					id: joi_1.default.alternatives().try(joi_1.default.number(), joi_1.default.string()).required(),
					jsonrpc: joi_1.default.string().allow("2.0").required(),
					method: joi_1.default.string().required(),
					params: joi_1.default.object(),
				}),
				validate: (data, schema) => schema.validate(data),
			},
		},
	});
	await server.start();
	logger.info(`Server running on ${server.info.uri}`);
};
exports.subscribe = subscribe;
//# sourceMappingURL=index.js.map
