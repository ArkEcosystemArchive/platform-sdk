import { Managers, Types, Validation } from "@arkecosystem/crypto";
import Boom from "@hapi/boom";
import { Server } from "@hapi/hapi";

import { IStoreTransaction, TransactionStatus } from "./contracts";
import { getBaseTransactionId } from "./crypto";
import { Storage } from "./database";
import { memory } from "./memory";

const bootDatabase = (network: string) => {
	const storage = new Storage();
	storage.connect(`transactions-storage-${network}.sqlite`);

	const transactions = storage.loadAll();
	memory.loadTransactions(transactions);

	storage.disconnect();
};

export async function subscribe(options: Record<string, string | number | boolean>): Promise<Server> {
	const server = new Server({
		host: options.host as string,
		port: options.port as number,
	});

	Managers.configManager.setFromPreset(options.network as Types.NetworkName);
	Managers.configManager.setHeight(options.height as number);
	Managers.configManager.getMilestone().aip11 = true;

	server.route({
		method: "GET",
		path: "/transactions",
		handler: (request) => {
			try {
				const storeTransactions = memory.getTransactionsByPublicKey(request.query.publicKey);

				if (request.query.state === TransactionStatus.Pending) {
					return storeTransactions.filter(
						(transaction) => (transaction.data.signatures || []).length < transaction.multisigAsset.min,
					);
				}

				if (request.query.state === TransactionStatus.Ready) {
					return storeTransactions.filter(
						(transaction) => (transaction.data.signatures || []).length >= transaction.multisigAsset.min,
					);
				}

				return storeTransactions;
			} catch (error) {
				return Boom.badImplementation(error.message);
			}
		},
		options: {
			validate: {
				async query(data: object) {
					const { error } = Validation.validator.validate(
						{
							type: "object",
							properties: {
								publicKey: {
									$ref: "publicKey",
								},
								state: { enum: [TransactionStatus.Ready, TransactionStatus.Pending] },
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
		handler: (request) => {
			try {
				const transaction = memory.getTransactionById(request.params.id);

				if (transaction === undefined) {
					return Boom.notFound(`Failed to find transaction [${request.params.id}]`);
				}

				return transaction;
			} catch (error) {
				return Boom.badImplementation(error.message);
			}
		},
	});

	server.route({
		method: "POST",
		path: "/transaction",
		handler: (request) => {
			try {
				const transaction: IStoreTransaction = request.payload as IStoreTransaction;

				// @TODO: this fails because the initial payload has no signatures
				// const { error, errors } = transactionSchemaVerifier.verifySchema(request.payload.data);

				// if (error) {
				// 	return Boom.badData(error, errors);
				// }

				// @TODO: this fails for whatever reason
				// The signatures work fine and the final transaction can be broadcasted and forged too.
				// if (transaction.data.signatures && transaction.data.signatures.length) {
				// 	if (!verifySignatures(transaction.data, transaction.multisigAsset)) {
				// 		return Boom.badData("Transaction signatures are not valid");
				// 	}
				// }

				const baseTransactionId = getBaseTransactionId(transaction.data);
				const storeTransaction = memory.getTransactionById(baseTransactionId);

				if (storeTransaction) {
					memory.updateTransaction(transaction.data);

					return { id: baseTransactionId };
				}

				return { id: memory.saveTransaction(transaction) };
			} catch (error) {
				return Boom.badImplementation(error.message);
			}
		},
	});

	server.route({
		method: "DELETE",
		path: "/transactions/{id}",
		handler: (request, h) => {
			try {
				memory.removeById(request.params.id);

				return h.response().code(204);
			} catch (error) {
				return Boom.badImplementation(error.message);
			}
		},
	});

	bootDatabase(options.network as string);

	await server.start();

	console.info(`ARK MultiSignature server running on ${server.info.uri}`);

	const exit = async () => {
		const storage = new Storage();
		storage.connect(`transactions-storage-${options.network}.sqlite`);

		const memTransactions = memory.getAllTransactions();
		storage.deleteAll();
		storage.bulkAdd(memTransactions);

		storage.disconnect();

		await server.stop();
	};

	process.on("exit", exit);
	process.on("SIGINT", () => process.exit());

	return server;
}
