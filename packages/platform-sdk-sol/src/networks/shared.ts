import { Networks } from "@arkecosystem/platform-sdk";

export const transactions: Networks.NetworkManifestTransactions = {
	expirationType: "height",
	types: ["transfer"],
	fees: {
		type: "dynamic",
		ticker: "SOL",
	},
	memo: true,
};

export const importMethods: Networks.NetworkManifestImportMethods = {
	address: {
		default: false,
		permissions: ["read"],
	},
	bip44: {
		default: true,
		permissions: ["read", "write"],
	},
	publicKey: {
		default: false,
		permissions: ["read"],
	},
};

export const featureFlags: Networks.NetworkManifestFeatureFlags = {
	Client: ["wallet", "broadcast"],
	Identity: [
		"address.mnemonic.bip44",
		"address.privateKey",
		"address.publicKey",
		"address.validate",
		"keyPair.mnemonic.bip44",
		"keyPair.privateKey",
		"privateKey.mnemonic.bip44",
		"publicKey.mnemonic.bip44",
	],
	Link: ["block", "transaction", "wallet"],
	Transaction: ["transfer"],
};
