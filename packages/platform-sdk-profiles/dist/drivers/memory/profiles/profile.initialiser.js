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
var _ProfileInitialiser_profile;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileInitialiser = void 0;
const contracts_1 = require("../../../contracts");
class ProfileInitialiser {
	constructor(profile) {
		_ProfileInitialiser_profile.set(this, void 0);
		__classPrivateFieldSet(this, _ProfileInitialiser_profile, profile, "f");
	}
	/** {@inheritDoc IProfileInitialiser.initialise} */
	initialise(name) {
		// Flush services
		__classPrivateFieldGet(this, _ProfileInitialiser_profile, "f").contacts().flush();
		__classPrivateFieldGet(this, _ProfileInitialiser_profile, "f").data().flush();
		__classPrivateFieldGet(this, _ProfileInitialiser_profile, "f").notifications().flush();
		__classPrivateFieldGet(this, _ProfileInitialiser_profile, "f").plugins().flush();
		__classPrivateFieldGet(this, _ProfileInitialiser_profile, "f").settings().flush();
		__classPrivateFieldGet(this, _ProfileInitialiser_profile, "f").wallets().flush();
		// Default Settings
		this.initialiseSettings(name);
	}
	/** {@inheritDoc IProfileInitialiser.initialiseSettings} */
	initialiseSettings(name) {
		__classPrivateFieldGet(this, _ProfileInitialiser_profile, "f")
			.settings()
			.set(contracts_1.ProfileSetting.Name, name);
		__classPrivateFieldGet(this, _ProfileInitialiser_profile, "f")
			.settings()
			.set(contracts_1.ProfileSetting.AdvancedMode, false);
		__classPrivateFieldGet(this, _ProfileInitialiser_profile, "f")
			.settings()
			.set(contracts_1.ProfileSetting.AutomaticSignOutPeriod, 15);
		__classPrivateFieldGet(this, _ProfileInitialiser_profile, "f")
			.settings()
			.set(contracts_1.ProfileSetting.Bip39Locale, "english");
		__classPrivateFieldGet(this, _ProfileInitialiser_profile, "f")
			.settings()
			.set(contracts_1.ProfileSetting.ExchangeCurrency, "BTC");
		__classPrivateFieldGet(this, _ProfileInitialiser_profile, "f")
			.settings()
			.set(contracts_1.ProfileSetting.LedgerUpdateMethod, false);
		__classPrivateFieldGet(this, _ProfileInitialiser_profile, "f")
			.settings()
			.set(contracts_1.ProfileSetting.Locale, "en-US");
		__classPrivateFieldGet(this, _ProfileInitialiser_profile, "f")
			.settings()
			.set(contracts_1.ProfileSetting.MarketProvider, "cryptocompare");
		__classPrivateFieldGet(this, _ProfileInitialiser_profile, "f")
			.settings()
			.set(contracts_1.ProfileSetting.ScreenshotProtection, true);
		__classPrivateFieldGet(this, _ProfileInitialiser_profile, "f")
			.settings()
			.set(contracts_1.ProfileSetting.Theme, "light");
		__classPrivateFieldGet(this, _ProfileInitialiser_profile, "f")
			.settings()
			.set(contracts_1.ProfileSetting.TimeFormat, "h:mm A");
		__classPrivateFieldGet(this, _ProfileInitialiser_profile, "f")
			.settings()
			.set(contracts_1.ProfileSetting.UseTestNetworks, false);
		__classPrivateFieldGet(this, _ProfileInitialiser_profile, "f").status().markAsDirty();
	}
}
exports.ProfileInitialiser = ProfileInitialiser;
_ProfileInitialiser_profile = new WeakMap();
//# sourceMappingURL=profile.initialiser.js.map
