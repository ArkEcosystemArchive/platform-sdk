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
var _ProfileStatus_isRestored, _ProfileStatus_isDirty;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileStatus = void 0;
class ProfileStatus {
	constructor() {
		_ProfileStatus_isRestored.set(this, void 0);
		_ProfileStatus_isDirty.set(this, void 0);
		__classPrivateFieldSet(this, _ProfileStatus_isRestored, false, "f");
		__classPrivateFieldSet(this, _ProfileStatus_isDirty, false, "f");
	}
	/** {@inheritDoc IAuthenticator.markAsDirty} */
	markAsDirty() {
		__classPrivateFieldSet(this, _ProfileStatus_isDirty, true, "f");
	}
	/** {@inheritDoc IAuthenticator.isDirty} */
	isDirty() {
		return __classPrivateFieldGet(this, _ProfileStatus_isDirty, "f");
	}
	/** {@inheritDoc IAuthenticator.markAsRestored} */
	markAsRestored() {
		__classPrivateFieldSet(this, _ProfileStatus_isRestored, true, "f");
	}
	/** {@inheritDoc IAuthenticator.isRestored} */
	isRestored() {
		return __classPrivateFieldGet(this, _ProfileStatus_isRestored, "f");
	}
	/** {@inheritDoc IAuthenticator.reset} */
	reset() {
		__classPrivateFieldSet(this, _ProfileStatus_isRestored, false, "f");
		__classPrivateFieldSet(this, _ProfileStatus_isDirty, false, "f");
	}
	/** {@inheritDoc IAuthenticator.markAsClean} */
	markAsClean() {
		__classPrivateFieldSet(this, _ProfileStatus_isDirty, false, "f");
	}
}
exports.ProfileStatus = ProfileStatus;
(_ProfileStatus_isRestored = new WeakMap()), (_ProfileStatus_isDirty = new WeakMap());
//# sourceMappingURL=profile.status.js.map
