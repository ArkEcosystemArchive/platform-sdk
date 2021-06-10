"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeTimestamp = void 0;
const platform_sdk_intl_1 = require("@arkecosystem/platform-sdk-intl");
const normalizeTimestamp = (input) => {
	// TODO: use a genesis timestamp that matches the network
	return platform_sdk_intl_1.DateTime.make("2016-05-24T17:00:00.000Z").addSeconds(input);
};
exports.normalizeTimestamp = normalizeTimestamp;
//# sourceMappingURL=timestamps.js.map
