import { Coins } from "@arkecosystem/platform-sdk";

// @TODO: type
export const constants: any = {
	slip44: 1815,
};

export const transactions: Coins.NetworkManifestTransactions = {
	expirationType: "height",
	types: ["transfer"],
	fees: {
		type: "static",
		ticker: "ADA",
	},
	utxo: true,
};

export const importMethods: Coins.NetworkManifestImportMethods = {
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

export const featureFlags: Coins.NetworkManifestFeatureFlags = {
	Client: ["transactions", "wallet", "broadcast"],
	Fee: ["all"],
	Identity: [
		"address.mnemonic.bip44",
		"address.publicKey",
		"address.validate",
		"keyPair.mnemonic.bip44",
		"privateKey.mnemonic.bip44",
		"publicKey.mnemonic.bip44",
	],
	Link: ["block", "transaction", "wallet"],
	Message: ["sign", "verify"],
	Transaction: ["transfer"],
};
