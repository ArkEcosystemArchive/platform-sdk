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
var _AbstractValueSignatory_signingKey, _AbstractValueSignatory_address, _AbstractValueSignatory_publicKey;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractValueSignatory = void 0;
class AbstractValueSignatory {
	constructor({ signingKey, address, publicKey }) {
		_AbstractValueSignatory_signingKey.set(this, void 0);
		_AbstractValueSignatory_address.set(this, void 0);
		_AbstractValueSignatory_publicKey.set(this, void 0);
		__classPrivateFieldSet(this, _AbstractValueSignatory_signingKey, signingKey.normalize("NFD"), "f");
		__classPrivateFieldSet(this, _AbstractValueSignatory_address, address, "f");
		__classPrivateFieldSet(this, _AbstractValueSignatory_publicKey, publicKey, "f");
	}
	signingKey() {
		return __classPrivateFieldGet(this, _AbstractValueSignatory_signingKey, "f");
	}
	address() {
		return __classPrivateFieldGet(this, _AbstractValueSignatory_address, "f");
	}
	publicKey() {
		return __classPrivateFieldGet(this, _AbstractValueSignatory_publicKey, "f");
	}
}
exports.AbstractValueSignatory = AbstractValueSignatory;
(_AbstractValueSignatory_signingKey = new WeakMap()),
	(_AbstractValueSignatory_address = new WeakMap()),
	(_AbstractValueSignatory_publicKey = new WeakMap());
//# sourceMappingURL=abstract-value-signatory.js.map
