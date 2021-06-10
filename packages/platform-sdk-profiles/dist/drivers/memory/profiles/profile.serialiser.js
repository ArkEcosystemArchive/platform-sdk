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
var _ProfileSerialiser_profile;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileSerialiser = void 0;
class ProfileSerialiser {
	constructor(profile) {
		_ProfileSerialiser_profile.set(this, void 0);
		__classPrivateFieldSet(this, _ProfileSerialiser_profile, profile, "f");
	}
	/** {@inheritDoc IProfileSerialiser.toJSON} */
	toJSON(
		options = {
			excludeEmptyWallets: false,
			excludeLedgerWallets: false,
			addNetworkInformation: true,
			saveGeneralSettings: true,
		},
	) {
		if (!options.saveGeneralSettings) {
			throw Error("This is not implemented yet");
		}
		return {
			id: __classPrivateFieldGet(this, _ProfileSerialiser_profile, "f").id(),
			contacts: __classPrivateFieldGet(this, _ProfileSerialiser_profile, "f").contacts().toObject(),
			data: __classPrivateFieldGet(this, _ProfileSerialiser_profile, "f").data().all(),
			notifications: __classPrivateFieldGet(this, _ProfileSerialiser_profile, "f").notifications().all(),
			peers: __classPrivateFieldGet(this, _ProfileSerialiser_profile, "f").peers().toObject(),
			plugins: __classPrivateFieldGet(this, _ProfileSerialiser_profile, "f").plugins().all(),
			settings: __classPrivateFieldGet(this, _ProfileSerialiser_profile, "f").settings().all(),
			wallets: __classPrivateFieldGet(this, _ProfileSerialiser_profile, "f").wallets().toObject(options),
		};
	}
}
exports.ProfileSerialiser = ProfileSerialiser;
_ProfileSerialiser_profile = new WeakMap();
//# sourceMappingURL=profile.serialiser.js.map
