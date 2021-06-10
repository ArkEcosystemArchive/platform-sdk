"use strict";
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _WalletDataCollection_instances, _WalletDataCollection_find;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletDataCollection = void 0;
const paginator_1 = require("./paginator");
class WalletDataCollection extends paginator_1.Paginator {
	constructor() {
		super(...arguments);
		_WalletDataCollection_instances.add(this);
	}
	findByAddress(address) {
		return __classPrivateFieldGet(this, _WalletDataCollection_instances, "m", _WalletDataCollection_find).call(
			this,
			"address",
			address,
		);
	}
	findByPublicKey(publicKey) {
		return __classPrivateFieldGet(this, _WalletDataCollection_instances, "m", _WalletDataCollection_find).call(
			this,
			"publicKey",
			publicKey,
		);
	}
	findByUsername(username) {
		return __classPrivateFieldGet(this, _WalletDataCollection_instances, "m", _WalletDataCollection_find).call(
			this,
			"username",
			username,
		);
	}
}
exports.WalletDataCollection = WalletDataCollection;
(_WalletDataCollection_instances = new WeakSet()),
	(_WalletDataCollection_find = function _WalletDataCollection_find(key, value) {
		return this.items().find((wallet) => wallet[key]() === value);
	});
//# sourceMappingURL=wallets.js.map
