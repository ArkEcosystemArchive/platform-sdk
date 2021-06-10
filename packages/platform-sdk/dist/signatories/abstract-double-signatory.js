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
var _AbstractDoubleSignatory_signingKey,
	_AbstractDoubleSignatory_confirmKey,
	_AbstractDoubleSignatory_address,
	_AbstractDoubleSignatory_publicKey,
	_AbstractDoubleSignatory_privateKey;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractDoubleSignatory = void 0;
class AbstractDoubleSignatory {
	constructor({ signingKey, confirmKey, address, publicKey, privateKey }) {
		_AbstractDoubleSignatory_signingKey.set(this, void 0);
		_AbstractDoubleSignatory_confirmKey.set(this, void 0);
		_AbstractDoubleSignatory_address.set(this, void 0);
		_AbstractDoubleSignatory_publicKey.set(this, void 0);
		_AbstractDoubleSignatory_privateKey.set(this, void 0);
		__classPrivateFieldSet(this, _AbstractDoubleSignatory_signingKey, signingKey.normalize("NFD"), "f");
		__classPrivateFieldSet(this, _AbstractDoubleSignatory_confirmKey, confirmKey.normalize("NFD"), "f");
		__classPrivateFieldSet(this, _AbstractDoubleSignatory_address, address, "f");
		__classPrivateFieldSet(this, _AbstractDoubleSignatory_publicKey, publicKey, "f");
		__classPrivateFieldSet(this, _AbstractDoubleSignatory_privateKey, privateKey, "f");
	}
	signingKey() {
		return __classPrivateFieldGet(this, _AbstractDoubleSignatory_signingKey, "f");
	}
	confirmKey() {
		return __classPrivateFieldGet(this, _AbstractDoubleSignatory_confirmKey, "f");
	}
	address() {
		return __classPrivateFieldGet(this, _AbstractDoubleSignatory_address, "f");
	}
	publicKey() {
		return __classPrivateFieldGet(this, _AbstractDoubleSignatory_publicKey, "f");
	}
	privateKey() {
		return __classPrivateFieldGet(this, _AbstractDoubleSignatory_privateKey, "f");
	}
}
exports.AbstractDoubleSignatory = AbstractDoubleSignatory;
(_AbstractDoubleSignatory_signingKey = new WeakMap()),
	(_AbstractDoubleSignatory_confirmKey = new WeakMap()),
	(_AbstractDoubleSignatory_address = new WeakMap()),
	(_AbstractDoubleSignatory_publicKey = new WeakMap()),
	(_AbstractDoubleSignatory_privateKey = new WeakMap());
//# sourceMappingURL=abstract-double-signatory.js.map
