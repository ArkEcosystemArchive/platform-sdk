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
var _ProfileDumper_profile;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileDumper = void 0;
class ProfileDumper {
	constructor(profile) {
		_ProfileDumper_profile.set(this, void 0);
		__classPrivateFieldSet(this, _ProfileDumper_profile, profile, "f");
	}
	/** {@inheritDoc IProfileDumper.dump} */
	dump() {
		if (!__classPrivateFieldGet(this, _ProfileDumper_profile, "f").getAttributes().get("data")) {
			throw new Error(
				`The profile [${__classPrivateFieldGet(
					this,
					_ProfileDumper_profile,
					"f",
				).name()}] has not been encoded or encrypted. Please call [save] before dumping.`,
			);
		}
		return {
			id: __classPrivateFieldGet(this, _ProfileDumper_profile, "f").id(),
			name: __classPrivateFieldGet(this, _ProfileDumper_profile, "f").name(),
			avatar: __classPrivateFieldGet(this, _ProfileDumper_profile, "f").avatar(),
			theme: __classPrivateFieldGet(this, _ProfileDumper_profile, "f").theme(),
			password: __classPrivateFieldGet(this, _ProfileDumper_profile, "f").getAttributes().get("password"),
			data: __classPrivateFieldGet(this, _ProfileDumper_profile, "f").getAttributes().get("data"),
		};
	}
}
exports.ProfileDumper = ProfileDumper;
_ProfileDumper_profile = new WeakMap();
//# sourceMappingURL=profile.dumper.js.map
