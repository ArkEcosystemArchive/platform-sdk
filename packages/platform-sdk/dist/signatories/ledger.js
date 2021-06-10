"use strict";
/* istanbul ignore file */
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
var _LedgerSignatory_signingKey;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerSignatory = void 0;
class LedgerSignatory {
	constructor(signingKey) {
		_LedgerSignatory_signingKey.set(this, void 0);
		__classPrivateFieldSet(this, _LedgerSignatory_signingKey, signingKey, "f");
	}
	signingKey() {
		return __classPrivateFieldGet(this, _LedgerSignatory_signingKey, "f");
	}
}
exports.LedgerSignatory = LedgerSignatory;
_LedgerSignatory_signingKey = new WeakMap();
//# sourceMappingURL=ledger.js.map
