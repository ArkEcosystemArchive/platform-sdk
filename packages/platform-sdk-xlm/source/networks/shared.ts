import { Networks } from "@arkecosystem/platform-sdk";

export const transactions: Networks.NetworkManifestTransactions = {
	expirationType: "height",
	types: ["transfer"],
	fees: {
		type: "static",
		ticker: "XLM",
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
	Client: ["transaction", "transactions", "wallet", "broadcast"],
	Address: [
		"mnemonic.bip39",
		"validate",
	],
	KeyPair: [
		"mnemonic.bip39",
		"privateKey",
	],
	PrivateKey: [
		"mnemonic.bip39",
	],
	PublicKey: [
		"mnemonic.bip39",
	],
	WIF: [
		"mnemonic.bip39",
	],
	Message: ["sign", "verify"],
	Transaction: ["transfer"],
};

export const explorer: Networks.NetworkManifestExplorer = {
	block: "ledger/{0}",
	transaction: "tx/{0}",
	wallet: "account/{0}",
};
