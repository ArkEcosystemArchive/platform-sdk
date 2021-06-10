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
var _MultiSignature_wallet;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiSignature = void 0;
const read_only_wallet_1 = require("../read-only-wallet");
const contracts_1 = require("../../../../contracts");
class MultiSignature {
	constructor(wallet) {
		_MultiSignature_wallet.set(this, void 0);
		__classPrivateFieldSet(this, _MultiSignature_wallet, wallet, "f");
	}
	/** {@inheritDoc IMultiSignature.all} */
	all() {
		if (!__classPrivateFieldGet(this, _MultiSignature_wallet, "f").getAttributes().get("wallet")) {
			throw new Error(
				"This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.",
			);
		}
		return __classPrivateFieldGet(this, _MultiSignature_wallet, "f").getAttributes().get("wallet").multiSignature();
	}
	/** {@inheritDoc IMultiSignature.participants} */
	participants() {
		const participants = __classPrivateFieldGet(this, _MultiSignature_wallet, "f")
			.data()
			.get(contracts_1.WalletData.MultiSignatureParticipants);
		if (!participants) {
			throw new Error(
				"This Multi-Signature has not been synchronized yet. Please call [synchroniser().multiSignature()] before using it.",
			);
		}
		return this.all().publicKeys.map((publicKey) => new read_only_wallet_1.ReadOnlyWallet(participants[publicKey]));
	}
}
exports.MultiSignature = MultiSignature;
_MultiSignature_wallet = new WeakMap();
//# sourceMappingURL=multi-signature.js.map
