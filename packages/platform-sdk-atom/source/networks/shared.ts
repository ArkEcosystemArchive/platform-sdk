import { Networks } from "@arkecosystem/platform-sdk";

export const transactions: Networks.NetworkManifestTransactions = {
	expirationType: "height",
	types: ["transfer"],
	fees: {
		type: "static",
		ticker: "ATOM",
	},
	memo: true,
};

export const importMethods: Networks.NetworkManifestImportMethods = {
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

export const featureFlags: Networks.NetworkManifestFeatureFlags = {
	Client: ["transaction", "transactions", "wallet", "syncing", "broadcast"],
	Identity: [
		"address.mnemonic.bip44",
		"address.validate",
		"keyPair.mnemonic.bip44",
		"privateKey.mnemonic.bip44",
		"publicKey.mnemonic.bip44",
	],
	Message: ["sign", "verify"],
	Transaction: ["transfer"],
};

export const explorer: Networks.NetworkManifestExplorer = {
	block: "blocks/{0}",
	transaction: "transactions/{0}",
	wallet: "account/{0}",
};
