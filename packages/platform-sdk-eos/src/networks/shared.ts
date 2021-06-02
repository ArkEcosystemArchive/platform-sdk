import { Coins } from "@arkecosystem/platform-sdk";

export const transactions: Coins.NetworkManifestTransactions = {
	expirationType: "height",
	types: ["transfer"],
	fees: {
		type: "free",
		ticker: "EOS",
	},
	memo: true,
};

export const importMethods: Coins.NetworkManifestImportMethods = {
	address: {
		default: false,
		permissions: ["read"],
	},
	bip39: {
		default: true,
		permissions: ["read", "write"],
	},
	publicKey: {
		default: false,
		permissions: ["read"],
	},
};

export const featureFlags: Coins.NetworkManifestFeatureFlags = {
	Client: ["wallet", "broadcast"],
	Identity: ["publicKey.mnemonic.bip39"],
	Link: ["block", "transaction", "wallet"],
	Message: ["sign", "verify"],
	Transaction: ["transfer"],
};
