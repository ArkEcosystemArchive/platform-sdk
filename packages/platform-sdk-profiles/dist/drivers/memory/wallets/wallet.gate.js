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
var _WalletGate_wallet;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletGate = void 0;
class WalletGate {
	constructor(wallet) {
		_WalletGate_wallet.set(this, void 0);
		__classPrivateFieldSet(this, _WalletGate_wallet, wallet, "f");
	}
	/** {@inheritDoc IWalletGate.allows} */
	allows(feature) {
		return __classPrivateFieldGet(this, _WalletGate_wallet, "f").network().allows(feature);
	}
	/** {@inheritDoc IWalletGate.denies} */
	denies(feature) {
		return __classPrivateFieldGet(this, _WalletGate_wallet, "f").network().denies(feature);
	}
	/** {@inheritDoc IWalletGate.any} */
	any(features) {
		for (const feature of features) {
			if (this.allows(feature)) {
				return true;
			}
		}
		return false;
	}
	/** {@inheritDoc IWalletGate.all} */
	all(features) {
		for (const feature of features) {
			if (this.denies(feature)) {
				return false;
			}
		}
		return true;
	}
}
exports.WalletGate = WalletGate;
_WalletGate_wallet = new WeakMap();
//# sourceMappingURL=wallet.gate.js.map
