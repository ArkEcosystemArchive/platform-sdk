"use strict";
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _ExtendedTransactionDataCollection_instances, _ExtendedTransactionDataCollection_find;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedTransactionDataCollection = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
class ExtendedTransactionDataCollection extends platform_sdk_1.Collections.Paginator {
	constructor() {
		super(...arguments);
		_ExtendedTransactionDataCollection_instances.add(this);
	}
	findById(id) {
		return __classPrivateFieldGet(
			this,
			_ExtendedTransactionDataCollection_instances,
			"m",
			_ExtendedTransactionDataCollection_find,
		).call(this, "id", id);
	}
	findByType(type) {
		return __classPrivateFieldGet(
			this,
			_ExtendedTransactionDataCollection_instances,
			"m",
			_ExtendedTransactionDataCollection_find,
		).call(this, "type", type);
	}
	findByTimestamp(timestamp) {
		return __classPrivateFieldGet(
			this,
			_ExtendedTransactionDataCollection_instances,
			"m",
			_ExtendedTransactionDataCollection_find,
		).call(this, "timestamp", timestamp);
	}
	findBySender(sender) {
		return __classPrivateFieldGet(
			this,
			_ExtendedTransactionDataCollection_instances,
			"m",
			_ExtendedTransactionDataCollection_find,
		).call(this, "sender", sender);
	}
	findByRecipient(recipient) {
		return __classPrivateFieldGet(
			this,
			_ExtendedTransactionDataCollection_instances,
			"m",
			_ExtendedTransactionDataCollection_find,
		).call(this, "recipient", recipient);
	}
}
exports.ExtendedTransactionDataCollection = ExtendedTransactionDataCollection;
(_ExtendedTransactionDataCollection_instances = new WeakSet()),
	(_ExtendedTransactionDataCollection_find = function _ExtendedTransactionDataCollection_find(key, value) {
		return this.items().find((transaction) => transaction[key]() === value);
	});
//# sourceMappingURL=transaction-collection.js.map
