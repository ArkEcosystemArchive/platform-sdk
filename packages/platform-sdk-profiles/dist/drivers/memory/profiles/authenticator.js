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
var _Authenticator_profile;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticator = void 0;
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const contracts_1 = require("../../../contracts");
class Authenticator {
	constructor(profile) {
		_Authenticator_profile.set(this, void 0);
		__classPrivateFieldSet(this, _Authenticator_profile, profile, "f");
	}
	/** {@inheritDoc IAuthenticator.setPassword} */
	setPassword(password) {
		const encrypted = platform_sdk_crypto_1.Bcrypt.hash(password);
		__classPrivateFieldGet(this, _Authenticator_profile, "f")
			.settings()
			.set(contracts_1.ProfileSetting.Password, encrypted);
		// This is needed for new profiles because they are initialised
		// without any data besides their ID and name which means the
		// password will be omitted and we won't know to use it.
		__classPrivateFieldGet(this, _Authenticator_profile, "f").getAttributes().set("password", encrypted);
		// We'll need the password for future use in plain-text
		// during the lifetime of this profile session.
		__classPrivateFieldGet(this, _Authenticator_profile, "f").password().set(password);
		__classPrivateFieldGet(this, _Authenticator_profile, "f").status().markAsDirty();
	}
	/** {@inheritDoc IAuthenticator.verifyPassword} */
	verifyPassword(password) {
		if (!__classPrivateFieldGet(this, _Authenticator_profile, "f").usesPassword()) {
			throw new Error("No password is set.");
		}
		return platform_sdk_crypto_1.Bcrypt.verify(
			__classPrivateFieldGet(this, _Authenticator_profile, "f").getAttributes().get("password"),
			password,
		);
	}
	/** {@inheritDoc IAuthenticator.changePassword} */
	changePassword(oldPassword, newPassword) {
		const currentPassword = __classPrivateFieldGet(this, _Authenticator_profile, "f")
			.settings()
			.get(contracts_1.ProfileSetting.Password);
		if (!currentPassword) {
			throw new Error("No password is set. Call [setPassword] instead.");
		}
		if (!platform_sdk_crypto_1.Bcrypt.verify(currentPassword, oldPassword)) {
			throw new Error("The current password does not match.");
		}
		this.setPassword(newPassword);
	}
}
exports.Authenticator = Authenticator;
_Authenticator_profile = new WeakMap();
//# sourceMappingURL=authenticator.js.map
