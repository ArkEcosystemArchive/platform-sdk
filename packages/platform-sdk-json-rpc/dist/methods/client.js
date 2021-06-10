"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerClient = void 0;
const joi_1 = __importDefault(require("joi"));
const helpers_1 = require("../helpers");
const registerClient = () => [
	{
		name: "client.transaction",
		async method({ coin, network, id }) {
			return (await (await helpers_1.makeCoin({ coin, network })).client().transaction(id)).toObject();
		},
		schema: joi_1.default
			.object({
				...helpers_1.baseSchema,
				id: joi_1.default.string().required(),
			})
			.required(),
	},
	{
		name: "client.transactions",
		async method(input) {
			const coin = await helpers_1.makeCoin(input);
			const transactions = await coin.client().transactions(input);
			return {
				meta: {
					prev: transactions.previousPage(),
					self: transactions.currentPage(),
					next: transactions.nextPage(),
					last: transactions.lastPage(),
				},
				data: transactions.items().map((transaction) => transaction.toObject()),
			};
		},
		schema: joi_1.default
			.object({
				...helpers_1.baseSchema,
				// Pagination
				cursor: joi_1.default.string(),
				limit: joi_1.default.number().positive(),
				orderBy: joi_1.default.string(),
				// Data
				address: joi_1.default.string(),
				addresses: joi_1.default.array().items(joi_1.default.string()),
				senderId: joi_1.default.string(),
				recipientId: joi_1.default.string(),
				walletId: joi_1.default.string(),
				senderPublicKey: joi_1.default.string(),
				recipientPublicKey: joi_1.default.string(),
				asset: joi_1.default.object(),
				type: joi_1.default.number(),
				typeGroup: joi_1.default.number(),
			})
			.required(),
	},
	{
		name: "client.wallet",
		async method({ coin, network, id }) {
			return (await (await helpers_1.makeCoin({ coin, network })).client().wallet(id)).toObject();
		},
		schema: joi_1.default
			.object({
				...helpers_1.baseSchema,
				id: joi_1.default.string().required(),
			})
			.required(),
	},
	{
		name: "client.delegate",
		async method({ coin, network, id }) {
			return (await (await helpers_1.makeCoin({ coin, network })).client().delegate(id)).toObject();
		},
		schema: joi_1.default
			.object({
				...helpers_1.baseSchema,
				id: joi_1.default.string().required(),
			})
			.required(),
	},
	{
		name: "client.broadcast",
		async method({ coin, network, id, data }) {
			return (await helpers_1.makeCoin({ coin, network })).client().broadcast([
				// @ts-ignore
				{
					id: () => id,
					toBroadcast: () => data,
				},
			]);
		},
		schema: joi_1.default
			.object({
				...helpers_1.baseSchema,
				id: joi_1.default.string().required(),
				data: joi_1.default.any().required(),
			})
			.required(),
	},
];
exports.registerClient = registerClient;
//# sourceMappingURL=client.js.map
