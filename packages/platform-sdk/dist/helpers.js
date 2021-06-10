"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRawUnit = exports.pluckAddress = exports.randomHostFromConfig = exports.randomNetworkHostFromConfig = exports.filterHostsFromConfig = exports.randomHost = exports.filterHosts = void 0;
const platform_sdk_support_1 = require("@arkecosystem/platform-sdk-support");
const platform_sdk_support_2 = require("@arkecosystem/platform-sdk-support");
const filterHosts = (hosts, type) => hosts.filter((host) => host.type === type);
exports.filterHosts = filterHosts;
const randomHost = (hosts, type) => platform_sdk_support_1.Arr.randomElement(exports.filterHosts(hosts, type));
exports.randomHost = randomHost;
// DRY helpers for coin implementations
const filterHostsFromConfig = (config, type) => exports.filterHosts(config.get("network.hosts"), type);
exports.filterHostsFromConfig = filterHostsFromConfig;
const randomNetworkHostFromConfig = (config, type = "full") => exports.randomHost(config.get("network.hosts"), type);
exports.randomNetworkHostFromConfig = randomNetworkHostFromConfig;
const randomHostFromConfig = (config, type = "full") => exports.randomNetworkHostFromConfig(config, type).host;
exports.randomHostFromConfig = randomHostFromConfig;
const pluckAddress = (query) => {
	if (query.senderId) {
		return query.senderId;
	}
	if (query.recipientId) {
		return query.recipientId;
	}
	if (query.address) {
		return query.address;
	}
	if (Array.isArray(query.addresses) && query.addresses[0]) {
		return query.addresses[0];
	}
	throw new Error("Failed to pluck any address.");
};
exports.pluckAddress = pluckAddress;
const toRawUnit = (value, config) => {
	const decimals = config.get("network.currency.decimals");
	const denomination = platform_sdk_support_2.BigNumber.make(`1${"0".repeat(decimals)}`); // poor man's bigint exponentiation
	return denomination.times(value);
};
exports.toRawUnit = toRawUnit;
//# sourceMappingURL=helpers.js.map
