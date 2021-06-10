"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileFactory = void 0;
const uuid_1 = require("uuid");
const profile_1 = require("./profile");
class ProfileFactory {
	/** {@inheritDoc IProfileFactory.fromName} */
	static fromName(name) {
		return new profile_1.Profile({ id: uuid_1.v4(), name, data: "" });
	}
}
exports.ProfileFactory = ProfileFactory;
//# sourceMappingURL=profile.factory.js.map
