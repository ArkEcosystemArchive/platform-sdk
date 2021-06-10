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
var _TransactionAggregate_instances,
	_TransactionAggregate_profile,
	_TransactionAggregate_history,
	_TransactionAggregate_aggregate,
	_TransactionAggregate_getWallet,
	_TransactionAggregate_getWallets;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionAggregate = void 0;
const dto_1 = require("../../../../dto");
const transaction_mapper_1 = require("../../../../dto/transaction-mapper");
const promise_1 = require("../../../../helpers/promise");
class TransactionAggregate {
	constructor(profile) {
		_TransactionAggregate_instances.add(this);
		_TransactionAggregate_profile.set(this, void 0);
		_TransactionAggregate_history.set(this, {});
		__classPrivateFieldSet(this, _TransactionAggregate_profile, profile, "f");
	}
	/** {@inheritDoc ITransactionAggregate.all} */
	async all(query = {}) {
		return __classPrivateFieldGet(this, _TransactionAggregate_instances, "m", _TransactionAggregate_aggregate).call(
			this,
			"all",
			query,
		);
	}
	/** {@inheritDoc ITransactionAggregate.sent} */
	async sent(query = {}) {
		return __classPrivateFieldGet(this, _TransactionAggregate_instances, "m", _TransactionAggregate_aggregate).call(
			this,
			"sent",
			query,
		);
	}
	/** {@inheritDoc ITransactionAggregate.received} */
	async received(query = {}) {
		return __classPrivateFieldGet(this, _TransactionAggregate_instances, "m", _TransactionAggregate_aggregate).call(
			this,
			"received",
			query,
		);
	}
	/** {@inheritDoc ITransactionAggregate.hasMore} */
	hasMore(method) {
		return Object.values(__classPrivateFieldGet(this, _TransactionAggregate_history, "f")[method] || {})
			.map((response) => response.hasMorePages())
			.includes(true);
	}
	/** {@inheritDoc ITransactionAggregate.flush} */
	flush(method) {
		if (method) {
			__classPrivateFieldGet(this, _TransactionAggregate_history, "f")[method] = {};
			return;
		}
		__classPrivateFieldSet(this, _TransactionAggregate_history, {}, "f");
	}
}
exports.TransactionAggregate = TransactionAggregate;
(_TransactionAggregate_profile = new WeakMap()),
	(_TransactionAggregate_history = new WeakMap()),
	(_TransactionAggregate_instances = new WeakSet()),
	(_TransactionAggregate_aggregate = async function _TransactionAggregate_aggregate(method, query) {
		if (!__classPrivateFieldGet(this, _TransactionAggregate_history, "f")[method]) {
			__classPrivateFieldGet(this, _TransactionAggregate_history, "f")[method] = {};
		}
		const syncedWallets = __classPrivateFieldGet(
			this,
			_TransactionAggregate_instances,
			"m",
			_TransactionAggregate_getWallets,
		).call(this, query.addresses);
		const requests = {};
		for (const syncedWallet of syncedWallets) {
			requests[syncedWallet.id()] = new Promise((resolve, reject) => {
				const lastResponse = __classPrivateFieldGet(this, _TransactionAggregate_history, "f")[method][
					syncedWallet.id()
				];
				if (lastResponse && !lastResponse.hasMorePages()) {
					return reject(
						`Fetched all transactions for ${syncedWallet.id()}. Call [#flush] if you want to reset the history.`,
					);
				}
				if (lastResponse && lastResponse.hasMorePages()) {
					return resolve(
						syncedWallet.transactionIndex()[method]({ cursor: lastResponse.nextPage(), ...query }),
					);
				}
				return resolve(syncedWallet.transactionIndex()[method](query));
			});
		}
		const responses = await promise_1.promiseAllSettledByKey(requests);
		const result = [];
		for (const [id, request] of Object.entries(responses || {})) {
			if (request.status === "rejected" || request.value instanceof Error) {
				continue;
			}
			if (request.value.isEmpty()) {
				continue;
			}
			for (const transaction of request.value.items()) {
				// @ts-ignore - @TODO
				result.push(
					transaction_mapper_1.transformTransactionData(
						__classPrivateFieldGet(
							this,
							_TransactionAggregate_instances,
							"m",
							_TransactionAggregate_getWallet,
						).call(this, id),
						transaction,
					),
				);
			}
			__classPrivateFieldGet(this, _TransactionAggregate_history, "f")[method][id] = request.value;
		}
		return new dto_1.ExtendedTransactionDataCollection(result, {
			prev: undefined,
			self: undefined,
			next: Number(this.hasMore(method)),
			last: undefined,
		});
	}),
	(_TransactionAggregate_getWallet = function _TransactionAggregate_getWallet(id) {
		return __classPrivateFieldGet(this, _TransactionAggregate_profile, "f").wallets().findById(id);
	}),
	(_TransactionAggregate_getWallets = function _TransactionAggregate_getWallets(addresses = []) {
		return __classPrivateFieldGet(this, _TransactionAggregate_profile, "f")
			.wallets()
			.values()
			.filter((wallet) => {
				const matchesAddress = addresses.length > 0 ? addresses.includes(wallet.address()) : true;
				return matchesAddress && wallet.hasSyncedWithNetwork();
			});
	});
//# sourceMappingURL=transaction-aggregate.js.map
