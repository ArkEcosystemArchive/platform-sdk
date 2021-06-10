"use strict";
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _Memory_instances,
	_Memory_transactions,
	_Memory_transactionIdsBySender,
	_Memory_transactionIdsByPublicKey,
	_Memory_purgeExpiredTransactions,
	_Memory_hasRemainingTransactionSlots;
Object.defineProperty(exports, "__esModule", { value: true });
exports.memory = void 0;
const crypto_1 = require("@arkecosystem/crypto");
const crypto_2 = require("./crypto");
class Memory {
	constructor() {
		_Memory_instances.add(this);
		_Memory_transactions.set(this, {});
		_Memory_transactionIdsBySender.set(this, {});
		_Memory_transactionIdsByPublicKey.set(this, {});
		setInterval(
			() => __classPrivateFieldGet(this, _Memory_instances, "m", _Memory_purgeExpiredTransactions).call(this),
			15 * 60 * 1000,
		);
	}
	saveTransaction(transaction) {
		__classPrivateFieldGet(this, _Memory_instances, "m", _Memory_hasRemainingTransactionSlots).call(
			this,
			transaction.data.senderPublicKey,
		);
		transaction.timestampReceived = Date.now();
		transaction.id = crypto_2.getBaseTransactionId(transaction.data);
		__classPrivateFieldGet(this, _Memory_transactions, "f")[transaction.id] = transaction;
		__classPrivateFieldGet(this, _Memory_transactionIdsBySender, "f")[transaction.data.senderPublicKey] =
			__classPrivateFieldGet(this, _Memory_transactionIdsBySender, "f")[transaction.data.senderPublicKey] || [];
		__classPrivateFieldGet(this, _Memory_transactionIdsBySender, "f")[transaction.data.senderPublicKey].push(
			transaction.id,
		);
		for (const publicKey of transaction.multisigAsset.publicKeys) {
			__classPrivateFieldGet(this, _Memory_transactionIdsByPublicKey, "f")[publicKey] =
				__classPrivateFieldGet(this, _Memory_transactionIdsByPublicKey, "f")[publicKey] || [];
			__classPrivateFieldGet(this, _Memory_transactionIdsByPublicKey, "f")[publicKey].push(transaction.id);
		}
		return transaction.id;
	}
	updateTransaction(transaction) {
		const storeId = crypto_2.getBaseTransactionId(transaction);
		const storeTxToUpdate = __classPrivateFieldGet(this, _Memory_transactions, "f")[storeId];
		if (!storeTxToUpdate) {
			throw new Error(`No transaction found for store ID ${storeId}`);
		}
		if (transaction.signatures === undefined) {
			throw new Error(`Transaction [${storeId}] has no signatures.`);
		}
		for (let signatureIndex = 0; signatureIndex < transaction.signatures.length; signatureIndex++) {
			if (storeTxToUpdate.data.signatures === undefined) {
				storeTxToUpdate.data.signatures = [];
			}
			storeTxToUpdate.data.signatures[signatureIndex] = transaction.signatures[signatureIndex];
		}
		if (transaction.signature) {
			storeTxToUpdate.data.signature = transaction.signature;
		}
		__classPrivateFieldGet(this, _Memory_transactions, "f")[storeId].data.id = crypto_1.Transactions.Utils.getId(
			storeTxToUpdate.data,
		);
	}
	getTransactionById(storeId) {
		return __classPrivateFieldGet(this, _Memory_transactions, "f")[storeId];
	}
	getTransactionsByPublicKey(publicKey) {
		const storeIdsBySender = __classPrivateFieldGet(this, _Memory_transactionIdsBySender, "f")[publicKey] || [];
		const storeIdsByPublicKey =
			__classPrivateFieldGet(this, _Memory_transactionIdsByPublicKey, "f")[publicKey] || [];
		const allById = {};
		for (const id of storeIdsBySender.concat(storeIdsByPublicKey)) {
			allById[id] = this.getTransactionById(id);
		}
		return Object.values(allById);
	}
	getAllTransactions() {
		return Object.values(__classPrivateFieldGet(this, _Memory_transactions, "f"));
	}
	deleteAllTransactions() {
		for (const id of Object.keys(__classPrivateFieldGet(this, _Memory_transactions, "f"))) {
			this.removeById(id);
		}
	}
	loadTransactions(transactions) {
		for (const transaction of transactions) {
			this.saveTransaction(transaction);
		}
	}
	removeById(storeId) {
		const { data, multisigAsset } = __classPrivateFieldGet(this, _Memory_transactions, "f")[storeId];
		// removes indexes
		__classPrivateFieldGet(this, _Memory_transactionIdsBySender, "f")[
			data.senderPublicKey
		] = __classPrivateFieldGet(this, _Memory_transactionIdsBySender, "f")[data.senderPublicKey].filter(
			(id) => id !== storeId,
		);
		for (const publicKey of multisigAsset.publicKeys) {
			__classPrivateFieldGet(this, _Memory_transactionIdsByPublicKey, "f")[publicKey] = __classPrivateFieldGet(
				this,
				_Memory_transactionIdsByPublicKey,
				"f",
			)[publicKey].filter((id) => id !== storeId);
		}
		// remove actual transaction
		delete __classPrivateFieldGet(this, _Memory_transactions, "f")[storeId];
	}
}
(_Memory_transactions = new WeakMap()),
	(_Memory_transactionIdsBySender = new WeakMap()),
	(_Memory_transactionIdsByPublicKey = new WeakMap()),
	(_Memory_instances = new WeakSet()),
	(_Memory_purgeExpiredTransactions = function _Memory_purgeExpiredTransactions() {
		for (const id of Object.keys(__classPrivateFieldGet(this, _Memory_transactions, "f"))) {
			const transaction = __classPrivateFieldGet(this, _Memory_transactions, "f")[id];
			if (!transaction || !(transaction === null || transaction === void 0 ? void 0 : transaction.timestamp)) {
				throw new Error(`Transaction [${id}] could not be found.`);
			}
			if (Date.now() - transaction.timestampReceived > 24 * 60 * 60 * 1000) {
				this.removeById(id);
			}
		}
	}),
	(_Memory_hasRemainingTransactionSlots = function _Memory_hasRemainingTransactionSlots(publicKey) {
		const pendingCount = (__classPrivateFieldGet(this, _Memory_transactionIdsBySender, "f")[publicKey] || [])
			.length;
		if (pendingCount >= 3) {
			throw new Error(`The public key [${publicKey}] has reached its maximum of 3 pending transactions.`);
		}
	});
exports.memory = new Memory();
//# sourceMappingURL=memory.js.map
