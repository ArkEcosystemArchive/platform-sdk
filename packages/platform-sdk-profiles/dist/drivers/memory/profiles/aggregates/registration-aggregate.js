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
var _RegistrationAggregate_profile;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationAggregate = void 0;
class RegistrationAggregate {
	constructor(profile) {
		_RegistrationAggregate_profile.set(this, void 0);
		__classPrivateFieldSet(this, _RegistrationAggregate_profile, profile, "f");
	}
	/** {@inheritDoc RegistrationAggregate.delegates} */
	delegates() {
		return __classPrivateFieldGet(this, _RegistrationAggregate_profile, "f")
			.wallets()
			.values()
			.filter((wallet) => wallet.hasSyncedWithNetwork() && wallet.isDelegate());
	}
}
exports.RegistrationAggregate = RegistrationAggregate;
_RegistrationAggregate_profile = new WeakMap();
//# sourceMappingURL=registration-aggregate.js.map
