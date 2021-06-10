"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribe = void 0;
const crypto_1 = require("@arkecosystem/crypto");
const boom_1 = __importDefault(require("@hapi/boom"));
const hapi_1 = require("@hapi/hapi");
const contracts_1 = require("./contracts");
const crypto_2 = require("./crypto");
const database_1 = require("./database");
const memory_1 = require("./memory");
const transaction_schema_verifier_1 = require("./transaction-schema-verifier");
const bootDatabase = (network) => {
	const storage = new database_1.Storage();
	storage.connect(`transactions-storage-${network}.sqlite`);
	const transactions = storage.loadAll();
	memory_1.memory.loadTransactions(transactions);
	storage.disconnect();
};
async function subscribe(options) {
	const server = new hapi_1.Server({
		host: options.host,
		port: options.port,
	});
	crypto_1.Managers.configManager.setFromPreset(options.network);
	crypto_1.Managers.configManager.setHeight(options.height);
	crypto_1.Managers.configManager.getMilestone().aip11 = true;
	server.route({
		method: "GET",
		path: "/transactions",
		handler: (request, h) => {
			try {
				const storeTransactions = memory_1.memory.getTransactionsByPublicKey(request.query.publicKey);
				if (request.query.state === contracts_1.TransactionStatus.Pending) {
					return storeTransactions.filter(
						(transaction) => (transaction.data.signatures || []).length < transaction.multisigAsset.min,
					);
				}
				if (request.query.state === contracts_1.TransactionStatus.Ready) {
					return storeTransactions.filter(
						(transaction) => (transaction.data.signatures || []).length >= transaction.multisigAsset.min,
					);
				}
				return storeTransactions;
			} catch (error) {
				return boom_1.default.badImplementation(error.message);
			}
		},
		options: {
			validate: {
				// @ts-ignore
				async query(data, options) {
					const { error } = crypto_1.Validation.validator.validate(
						{
							type: "object",
							properties: {
								publicKey: {
									$ref: "publicKey",
								},
								state: {
									enum: [contracts_1.TransactionStatus.Ready, contracts_1.TransactionStatus.Pending],
								},
							},
						},
						data,
					);
					if (error) {
						throw new Error(error);
					}
				},
			},
		},
	});
	server.route({
		method: "GET",
		path: "/transaction/{id}",
		handler: (request, h) => {
			try {
				const transaction = memory_1.memory.getTransactionById(request.params.id);
				if (transaction === undefined) {
					return boom_1.default.notFound(`Failed to find transaction [${request.params.id}]`);
				}
				return transaction;
			} catch (error) {
				return boom_1.default.badImplementation(error.message);
			}
		},
	});
	server.route({
		method: "POST",
		path: "/transaction",
		handler: (request, h) => {
			try {
				const transaction = request.payload;
				if (transaction.data.signatures && transaction.data.signatures.length) {
					if (!crypto_2.verifySignatures(transaction.data, transaction.multisigAsset)) {
						return boom_1.default.badData("Transaction signatures are not valid");
					}
				}
				const baseTransactionId = crypto_2.getBaseTransactionId(transaction.data);
				const storeTransaction = memory_1.memory.getTransactionById(baseTransactionId);
				if (storeTransaction) {
					memory_1.memory.updateTransaction(transaction.data);
					return { id: baseTransactionId };
				}
				return { id: memory_1.memory.saveTransaction(transaction) };
			} catch (error) {
				return boom_1.default.badImplementation(error.message);
			}
		},
		options: {
			validate: {
				async payload(data) {
					transaction_schema_verifier_1.transactionSchemaVerifier.verifySchema(data.data);
				},
			},
		},
	});
	server.route({
		method: "DELETE",
		path: "/transactions/{id}",
		handler: (request, h) => {
			try {
				memory_1.memory.removeById(request.params.id);
				return h.response().code(204);
			} catch (error) {
				return boom_1.default.badImplementation(error.message);
			}
		},
	});
	bootDatabase(options.network);
	await server.start();
	console.info(`ARK MultiSignature server running on ${server.info.uri}`);
	const exit = async () => {
		const storage = new database_1.Storage();
		storage.connect(`transactions-storage-${options.network}.sqlite`);
		const memTransactions = memory_1.memory.getAllTransactions();
		storage.deleteAll();
		storage.bulkAdd(memTransactions);
		storage.disconnect();
		await server.stop();
	};
	process.on("exit", exit);
	process.on("SIGINT", () => process.exit());
	return server;
}
exports.subscribe = subscribe;
//# sourceMappingURL=index.js.map
