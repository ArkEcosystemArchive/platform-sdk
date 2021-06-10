import { Networks } from "@arkecosystem/platform-sdk";

export const transactions: Networks.NetworkManifestTransactions = {
	expirationType: "height",
	types: ["transfer"],
	fees: {
		type: "gas",
		ticker: "EGLD",
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
	],
	PrivateKey: [
		"mnemonic.bip39",
	],
	PublicKey: [
		"mnemonic.bip39",
	],
	Message: ["sign", "verify"],
	Transaction: ["transfer"],
};

export const explorer: Networks.NetworkManifestExplorer = {
	block: "miniblocks/{0}",
	transaction: "transactions/{0}",
	wallet: "accounts/{0}",
};
