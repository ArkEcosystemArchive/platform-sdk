import { Networks } from "@arkecosystem/platform-sdk";

export const transactions: Networks.NetworkManifestTransactions = {
	expirationType: "height",
	types: ["transfer", "vote"],
	fees: {
		type: "static",
		ticker: "AVAX",
	},
	utxo: true,
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
	Client: ["transactions", "wallet", "broadcast"],
	Identity: [
		"address.mnemonic.bip44",
		"address.privateKey",
		"address.validate",
		"keyPair.mnemonic.bip44",
		"keyPair.privateKey",
		"privateKey.mnemonic.bip44",
		"publicKey.mnemonic.bip44",
	],
	Message: ["sign", "verify"],
	Transaction: ["transfer", "vote"],
};

export const explorer: Networks.NetworkManifestExplorer = {
	block: "block/{0}",
	transaction: "tx/{0}",
	wallet: "address/{0}",
};
