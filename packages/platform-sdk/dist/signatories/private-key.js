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
var _PrivateKeySignatory_signingKey, _PrivateKeySignatory_address;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateKeySignatory = void 0;
class PrivateKeySignatory {
	constructor({ signingKey, address }) {
		_PrivateKeySignatory_signingKey.set(this, void 0);
		_PrivateKeySignatory_address.set(this, void 0);
		__classPrivateFieldSet(this, _PrivateKeySignatory_signingKey, signingKey, "f");
		__classPrivateFieldSet(this, _PrivateKeySignatory_address, address, "f");
	}
	signingKey() {
		return __classPrivateFieldGet(this, _PrivateKeySignatory_signingKey, "f");
	}
	address() {
		return __classPrivateFieldGet(this, _PrivateKeySignatory_address, "f");
	}
	privateKey() {
		return __classPrivateFieldGet(this, _PrivateKeySignatory_signingKey, "f");
	}
}
exports.PrivateKeySignatory = PrivateKeySignatory;
(_PrivateKeySignatory_signingKey = new WeakMap()), (_PrivateKeySignatory_address = new WeakMap());
//# sourceMappingURL=private-key.js.map
