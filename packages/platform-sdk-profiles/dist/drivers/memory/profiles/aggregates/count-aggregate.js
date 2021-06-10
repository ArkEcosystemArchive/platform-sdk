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
var _CountAggregate_profile;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountAggregate = void 0;
class CountAggregate {
	constructor(profile) {
		_CountAggregate_profile.set(this, void 0);
		__classPrivateFieldSet(this, _CountAggregate_profile, profile, "f");
	}
	/** {@inheritDoc CountAggregate.contacts} */
	contacts() {
		return __classPrivateFieldGet(this, _CountAggregate_profile, "f").contacts().count();
	}
	/** {@inheritDoc CountAggregate.notifications} */
	notifications() {
		return __classPrivateFieldGet(this, _CountAggregate_profile, "f").notifications().count();
	}
	/** {@inheritDoc CountAggregate.wallets} */
	wallets() {
		return __classPrivateFieldGet(this, _CountAggregate_profile, "f").wallets().count();
	}
}
exports.CountAggregate = CountAggregate;
_CountAggregate_profile = new WeakMap();
//# sourceMappingURL=count-aggregate.js.map
