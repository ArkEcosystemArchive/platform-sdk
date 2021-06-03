import { Networks } from "@arkecosystem/platform-sdk";

export const transactions: Networks.NetworkManifestTransactions = {
	expirationType: "height",
	types: ["transfer"],
	fees: {
		type: "free",
		ticker: "XRP",
	},
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
	secret: {
		default: true,
		permissions: ["read", "write"],
	},
};

export const featureFlags: Networks.NetworkManifestFeatureFlags = {
	Client: ["transaction", "transactions", "wallet", "broadcast"],
	Identity: [
		"address.mnemonic.bip44",
		"address.publicKey",
		"address.secret",
		"address.validate",
		"keyPair.mnemonic.bip44",
		"keyPair.secret",
		"privateKey.mnemonic.bip44",
		"privateKey.secret",
		"publicKey.mnemonic.bip44",
		"publicKey.secret",
		"wif.mnemonic.bip44",
		"wif.secret",
	],
	Link: ["block", "transaction", "wallet"],
	Message: ["sign", "verify"],
	Transaction: ["transfer"],
};
