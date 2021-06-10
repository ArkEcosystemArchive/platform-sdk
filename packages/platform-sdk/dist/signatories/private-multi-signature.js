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
var _PrivateMultiSignatureSignatory_signingKey, _PrivateMultiSignatureSignatory_signingKeys;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateMultiSignatureSignatory = void 0;
class PrivateMultiSignatureSignatory {
	constructor(signingKey, signingKeys) {
		_PrivateMultiSignatureSignatory_signingKey.set(this, void 0);
		_PrivateMultiSignatureSignatory_signingKeys.set(this, void 0);
		__classPrivateFieldSet(this, _PrivateMultiSignatureSignatory_signingKey, signingKey, "f");
		__classPrivateFieldSet(this, _PrivateMultiSignatureSignatory_signingKeys, signingKeys, "f");
	}
	signingKey() {
		return __classPrivateFieldGet(this, _PrivateMultiSignatureSignatory_signingKey, "f");
	}
	signingKeys() {
		return __classPrivateFieldGet(this, _PrivateMultiSignatureSignatory_signingKeys, "f");
	}
}
exports.PrivateMultiSignatureSignatory = PrivateMultiSignatureSignatory;
(_PrivateMultiSignatureSignatory_signingKey = new WeakMap()),
	(_PrivateMultiSignatureSignatory_signingKeys = new WeakMap());
//# sourceMappingURL=private-multi-signature.js.map
