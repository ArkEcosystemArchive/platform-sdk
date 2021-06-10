import { Networks } from "@arkecosystem/platform-sdk";

export const transactions: Networks.NetworkManifestTransactions = {
	expirationType: "height",
	types: ["transfer"],
	fees: {
		type: "weight",
		ticker: "DOT",
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
	Client: ["wallet", "broadcast"],
	Identity: [
		"address.mnemonic.bip39",
		"address.validate",
		"keyPair.mnemonic.bip39",
		"privateKey.mnemonic.bip39",
		"publicKey.mnemonic.bip39",
		"wif.mnemonic.bip39",
	],
	Message: ["sign", "verify"],
	Transaction: ["transfer"],
};

export const explorer: Networks.NetworkManifestExplorer = {
	block: "block/{0}",
	transaction: "tx/{0}",
	wallet: "address/{0}",
};
