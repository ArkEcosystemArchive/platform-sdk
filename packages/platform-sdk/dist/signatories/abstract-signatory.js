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
var _AbstractSignatory_signingKey,
	_AbstractSignatory_address,
	_AbstractSignatory_publicKey,
	_AbstractSignatory_privateKey;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractSignatory = void 0;
class AbstractSignatory {
	constructor({ signingKey, address, publicKey, privateKey }) {
		_AbstractSignatory_signingKey.set(this, void 0);
		_AbstractSignatory_address.set(this, void 0);
		_AbstractSignatory_publicKey.set(this, void 0);
		_AbstractSignatory_privateKey.set(this, void 0);
		__classPrivateFieldSet(this, _AbstractSignatory_signingKey, signingKey.normalize("NFD"), "f");
		__classPrivateFieldSet(this, _AbstractSignatory_address, address, "f");
		__classPrivateFieldSet(this, _AbstractSignatory_publicKey, publicKey, "f");
		__classPrivateFieldSet(this, _AbstractSignatory_privateKey, privateKey, "f");
	}
	signingKey() {
		return __classPrivateFieldGet(this, _AbstractSignatory_signingKey, "f");
	}
	address() {
		return __classPrivateFieldGet(this, _AbstractSignatory_address, "f");
	}
	publicKey() {
		return __classPrivateFieldGet(this, _AbstractSignatory_publicKey, "f");
	}
	privateKey() {
		return __classPrivateFieldGet(this, _AbstractSignatory_privateKey, "f");
	}
}
exports.AbstractSignatory = AbstractSignatory;
(_AbstractSignatory_signingKey = new WeakMap()),
	(_AbstractSignatory_address = new WeakMap()),
	(_AbstractSignatory_publicKey = new WeakMap()),
	(_AbstractSignatory_privateKey = new WeakMap());
//# sourceMappingURL=abstract-signatory.js.map
