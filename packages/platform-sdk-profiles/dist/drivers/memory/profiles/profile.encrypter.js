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
var _ProfileEncrypter_profile;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileEncrypter = void 0;
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
class ProfileEncrypter {
	constructor(profile) {
		_ProfileEncrypter_profile.set(this, void 0);
		__classPrivateFieldSet(this, _ProfileEncrypter_profile, profile, "f");
	}
	/** {@inheritDoc IProfileEncrypter.encrypt} */
	encrypt(unencrypted, password) {
		if (typeof password !== "string") {
			password = __classPrivateFieldGet(this, _ProfileEncrypter_profile, "f").password().get();
		}
		if (!__classPrivateFieldGet(this, _ProfileEncrypter_profile, "f").auth().verifyPassword(password)) {
			throw new Error("The password did not match our records.");
		}
		return platform_sdk_crypto_1.PBKDF2.encrypt(unencrypted, password);
	}
	/** {@inheritDoc IProfileEncrypter.decrypt} */
	decrypt(password) {
		if (!__classPrivateFieldGet(this, _ProfileEncrypter_profile, "f").usesPassword()) {
			throw new Error("This profile does not use a password but password was passed for decryption");
		}
		const { id, data } = JSON.parse(
			platform_sdk_crypto_1.PBKDF2.decrypt(
				platform_sdk_crypto_1.Base64.decode(
					__classPrivateFieldGet(this, _ProfileEncrypter_profile, "f").getAttributes().get("data"),
				),
				password,
			),
		);
		return { id, ...data };
	}
}
exports.ProfileEncrypter = ProfileEncrypter;
_ProfileEncrypter_profile = new WeakMap();
//# sourceMappingURL=profile.encrypter.js.map
