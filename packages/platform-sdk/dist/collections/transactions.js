"use strict";
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _TransactionDataCollection_instances, _TransactionDataCollection_find;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionDataCollection = void 0;
const paginator_1 = require("./paginator");
class TransactionDataCollection extends paginator_1.Paginator {
	constructor() {
		super(...arguments);
		_TransactionDataCollection_instances.add(this);
	}
	findById(id) {
		return __classPrivateFieldGet(
			this,
			_TransactionDataCollection_instances,
			"m",
			_TransactionDataCollection_find,
		).call(this, "id", id);
	}
	findByType(type) {
		return __classPrivateFieldGet(
			this,
			_TransactionDataCollection_instances,
			"m",
			_TransactionDataCollection_find,
		).call(this, "type", type);
	}
	findByTimestamp(timestamp) {
		return __classPrivateFieldGet(
			this,
			_TransactionDataCollection_instances,
			"m",
			_TransactionDataCollection_find,
		).call(this, "timestamp", timestamp);
	}
	findBySender(sender) {
		return __classPrivateFieldGet(
			this,
			_TransactionDataCollection_instances,
			"m",
			_TransactionDataCollection_find,
		).call(this, "sender", sender);
	}
	findByRecipient(recipient) {
		return __classPrivateFieldGet(
			this,
			_TransactionDataCollection_instances,
			"m",
			_TransactionDataCollection_find,
		).call(this, "recipient", recipient);
	}
}
exports.TransactionDataCollection = TransactionDataCollection;
(_TransactionDataCollection_instances = new WeakSet()),
	(_TransactionDataCollection_find = function _TransactionDataCollection_find(key, value) {
		return this.items().find((transaction) => transaction[key]() === value);
	});
//# sourceMappingURL=transactions.js.map
