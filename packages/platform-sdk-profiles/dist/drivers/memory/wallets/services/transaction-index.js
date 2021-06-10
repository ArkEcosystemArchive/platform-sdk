"use strict";
var __classPrivateFieldSet =
	(this && this.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
		if (kind === "m") throw new TypeError("Private method is not writable");
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot write private member to an object whose class did not declare it");
		return kind === "a" ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
	};
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _TransactionIndex_instances, _TransactionIndex_wallet, _TransactionIndex_fetch;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionIndex = void 0;
const transaction_mapper_1 = require("../../../../dto/transaction-mapper");
class TransactionIndex {
	constructor(wallet) {
		_TransactionIndex_instances.add(this);
		_TransactionIndex_wallet.set(this, void 0);
		__classPrivateFieldSet(this, _TransactionIndex_wallet, wallet, "f");
	}
	/** {@inheritDoc ITransactionIndex.all} */
	async all(query = {}) {
		return __classPrivateFieldGet(this, _TransactionIndex_instances, "m", _TransactionIndex_fetch).call(this, {
			...query,
			addresses: [__classPrivateFieldGet(this, _TransactionIndex_wallet, "f").address()],
		});
	}
	/** {@inheritDoc ITransactionIndex.sent} */
	async sent(query = {}) {
		return __classPrivateFieldGet(this, _TransactionIndex_instances, "m", _TransactionIndex_fetch).call(this, {
			...query,
			senderId: __classPrivateFieldGet(this, _TransactionIndex_wallet, "f").address(),
		});
	}
	/** {@inheritDoc ITransactionIndex.received} */
	async received(query = {}) {
		return __classPrivateFieldGet(this, _TransactionIndex_instances, "m", _TransactionIndex_fetch).call(this, {
			...query,
			recipientId: __classPrivateFieldGet(this, _TransactionIndex_wallet, "f").address(),
		});
	}
	/** {@inheritDoc ITransactionIndex.findById} */
	async findById(id) {
		return transaction_mapper_1.transformTransactionData(
			__classPrivateFieldGet(this, _TransactionIndex_wallet, "f"),
			await __classPrivateFieldGet(this, _TransactionIndex_wallet, "f")
				.getAttributes()
				.get("coin")
				.client()
				.transaction(id),
		);
	}
	/** {@inheritDoc ITransactionIndex.findByIds} */
	async findByIds(ids) {
		return Promise.all(ids.map((id) => this.findById(id)));
	}
}
exports.TransactionIndex = TransactionIndex;
(_TransactionIndex_wallet = new WeakMap()),
	(_TransactionIndex_instances = new WeakSet()),
	(_TransactionIndex_fetch = async function _TransactionIndex_fetch(query) {
		const result = await __classPrivateFieldGet(this, _TransactionIndex_wallet, "f")
			.getAttributes()
			.get("coin")
			.client()
			.transactions(query);
		for (const transaction of result.items()) {
			transaction.setMeta("address", __classPrivateFieldGet(this, _TransactionIndex_wallet, "f").address());
			transaction.setMeta("publicKey", __classPrivateFieldGet(this, _TransactionIndex_wallet, "f").publicKey());
		}
		return transaction_mapper_1.transformTransactionDataCollection(
			__classPrivateFieldGet(this, _TransactionIndex_wallet, "f"),
			result,
		);
	});
//# sourceMappingURL=transaction-index.js.map
