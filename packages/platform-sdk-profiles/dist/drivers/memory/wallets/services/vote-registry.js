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
var _VoteRegistry_wallet;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteRegistry = void 0;
const container_1 = require("../../../../environment/container");
const container_models_1 = require("../../../../environment/container.models");
const contracts_1 = require("../../../../contracts");
class VoteRegistry {
	constructor(wallet) {
		_VoteRegistry_wallet.set(this, void 0);
		__classPrivateFieldSet(this, _VoteRegistry_wallet, wallet, "f");
	}
	/** {@inheritDoc IVoteRegistry.current} */
	current() {
		const votes = __classPrivateFieldGet(this, _VoteRegistry_wallet, "f").data().get(contracts_1.WalletData.Votes);
		if (votes === undefined) {
			throw new Error(
				"The voting data has not been synced. Please call [synchroniser().votes()] before accessing votes.",
			);
		}
		return container_1.container
			.get(container_models_1.Identifiers.DelegateService)
			.map(__classPrivateFieldGet(this, _VoteRegistry_wallet, "f"), votes);
	}
	/** {@inheritDoc IVoteRegistry.available} */
	available() {
		const result = __classPrivateFieldGet(this, _VoteRegistry_wallet, "f")
			.data()
			.get(contracts_1.WalletData.VotesAvailable);
		if (result === undefined) {
			throw new Error(
				"The voting data has not been synced. Please call [synchroniser().votes()] before accessing votes.",
			);
		}
		return result;
	}
	/** {@inheritDoc IVoteRegistry.used} */
	used() {
		const result = __classPrivateFieldGet(this, _VoteRegistry_wallet, "f")
			.data()
			.get(contracts_1.WalletData.VotesUsed);
		if (result === undefined) {
			throw new Error(
				"The voting data has not been synced. Please call [synchroniser().votes()] before accessing votes.",
			);
		}
		return result;
	}
}
exports.VoteRegistry = VoteRegistry;
_VoteRegistry_wallet = new WeakMap();
//# sourceMappingURL=vote-registry.js.map
