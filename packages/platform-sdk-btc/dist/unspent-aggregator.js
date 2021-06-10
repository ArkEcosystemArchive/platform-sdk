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
var _UnspentAggregator_http, _UnspentAggregator_peer;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnspentAggregator = void 0;
class UnspentAggregator {
	constructor({ http, peer }) {
		_UnspentAggregator_http.set(this, void 0);
		_UnspentAggregator_peer.set(this, void 0);
		__classPrivateFieldSet(this, _UnspentAggregator_http, http, "f");
		__classPrivateFieldSet(this, _UnspentAggregator_peer, peer, "f");
	}
	async aggregate(address, amount) {
		const response = (
			await __classPrivateFieldGet(this, _UnspentAggregator_http, "f").get(
				`${__classPrivateFieldGet(this, _UnspentAggregator_peer, "f")}/wallets/${address}/transactions/unspent`,
			)
		).json();
		return response.map((transaction) => ({
			address: transaction.address,
			txId: transaction.mintTxid,
			outputIndex: transaction.mintIndex,
			script: transaction.script,
			satoshis: transaction.value,
		}));
	}
}
exports.UnspentAggregator = UnspentAggregator;
(_UnspentAggregator_http = new WeakMap()), (_UnspentAggregator_peer = new WeakMap());
//# sourceMappingURL=unspent-aggregator.js.map
