"use strict";
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var __classPrivateFieldSet =
	(this && this.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
		if (kind === "m") throw new TypeError("Private method is not writable");
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot write private member to an object whose class did not declare it");
		return kind === "a" ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
	};
var _PasswordManager_password;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordManager = void 0;
class PasswordManager {
	constructor() {
		_PasswordManager_password.set(this, void 0);
	}
	/** {@inheritDoc IPasswordManager.get} */
	get() {
		if (__classPrivateFieldGet(this, _PasswordManager_password, "f") === undefined) {
			throw new Error("Failed to find a password for the given profile.");
		}
		return __classPrivateFieldGet(this, _PasswordManager_password, "f");
	}
	/** {@inheritDoc IPasswordManager.set} */
	set(password) {
		__classPrivateFieldSet(this, _PasswordManager_password, password, "f");
	}
	/** {@inheritDoc IPasswordManager.exists} */
	exists() {
		return __classPrivateFieldGet(this, _PasswordManager_password, "f") !== undefined;
	}
	/** {@inheritDoc IPasswordManager.forget} */
	forget() {
		__classPrivateFieldSet(this, _PasswordManager_password, undefined, "f");
	}
}
exports.PasswordManager = PasswordManager;
_PasswordManager_password = new WeakMap();
//# sourceMappingURL=password.js.map
