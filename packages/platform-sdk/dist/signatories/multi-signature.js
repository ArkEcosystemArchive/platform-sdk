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
var _MultiSignatureSignatory_signature, _MultiSignatureSignatory_identifier;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiSignatureSignatory = void 0;
class MultiSignatureSignatory {
	constructor(signature, identifier) {
		_MultiSignatureSignatory_signature.set(this, void 0);
		_MultiSignatureSignatory_identifier.set(this, void 0);
		__classPrivateFieldSet(this, _MultiSignatureSignatory_signature, signature, "f");
		__classPrivateFieldSet(this, _MultiSignatureSignatory_identifier, identifier, "f");
	}
	signingList() {
		return __classPrivateFieldGet(this, _MultiSignatureSignatory_signature, "f");
	}
	identifier() {
		return __classPrivateFieldGet(this, _MultiSignatureSignatory_identifier, "f");
	}
}
exports.MultiSignatureSignatory = MultiSignatureSignatory;
(_MultiSignatureSignatory_signature = new WeakMap()), (_MultiSignatureSignatory_identifier = new WeakMap());
//# sourceMappingURL=multi-signature.js.map
