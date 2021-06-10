"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKeyring = exports.createApiPromise = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const api_1 = require("@polkadot/api");
const keyring_1 = require("@polkadot/keyring");
const rpc_provider_1 = require("@polkadot/rpc-provider");
const createApiPromise = async (config) => {
	const provider = new rpc_provider_1.HttpProvider(platform_sdk_1.Helpers.randomHostFromConfig(config));
	const api = await api_1.ApiPromise.create({ provider });
	await api.isReady;
	return api;
};
exports.createApiPromise = createApiPromise;
const createKeyring = (config) => {
	const keyring = new keyring_1.Keyring({ type: "sr25519" });
	keyring.setSS58Format(config.get("network.meta.networkId"));
	return keyring;
};
exports.createKeyring = createKeyring;
//# sourceMappingURL=helpers.js.map
