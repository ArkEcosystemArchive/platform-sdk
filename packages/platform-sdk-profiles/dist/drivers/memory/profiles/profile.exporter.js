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
var _ProfileExporter_profile;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileExporter = void 0;
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const profile_encrypter_1 = require("./profile.encrypter");
const profile_serialiser_1 = require("./profile.serialiser");
class ProfileExporter {
	constructor(profile) {
		_ProfileExporter_profile.set(this, void 0);
		__classPrivateFieldSet(this, _ProfileExporter_profile, profile, "f");
	}
	/** {@inheritDoc IProfileExporter.export} */
	export(
		password,
		options = {
			excludeEmptyWallets: false,
			excludeLedgerWallets: false,
			addNetworkInformation: true,
			saveGeneralSettings: true,
		},
	) {
		const data = new profile_serialiser_1.ProfileSerialiser(
			__classPrivateFieldGet(this, _ProfileExporter_profile, "f"),
		).toJSON(options);
		if (__classPrivateFieldGet(this, _ProfileExporter_profile, "f").usesPassword()) {
			return platform_sdk_crypto_1.Base64.encode(
				new profile_encrypter_1.ProfileEncrypter(
					__classPrivateFieldGet(this, _ProfileExporter_profile, "f"),
				).encrypt(
					JSON.stringify({
						id: __classPrivateFieldGet(this, _ProfileExporter_profile, "f").id(),
						name: __classPrivateFieldGet(this, _ProfileExporter_profile, "f").name(),
						avatar: __classPrivateFieldGet(this, _ProfileExporter_profile, "f").avatar(),
						password: __classPrivateFieldGet(this, _ProfileExporter_profile, "f")
							.getAttributes()
							.get("password"),
						data,
					}),
					password,
				),
			);
		}
		return platform_sdk_crypto_1.Base64.encode(JSON.stringify(data));
	}
}
exports.ProfileExporter = ProfileExporter;
_ProfileExporter_profile = new WeakMap();
//# sourceMappingURL=profile.exporter.js.map
