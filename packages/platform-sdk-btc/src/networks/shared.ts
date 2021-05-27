import { Coins } from "@arkecosystem/platform-sdk";

export const transactions: Coins.NetworkManifestTransactions = {
	expirationType: "height",
	types: ["transfer"],
	fees: {
		type: "dynamic",
		ticker: "BTC",
	},
	utxo: true,
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
	bip44: {
		default: true,
		permissions: ["read", "write"],
	},
	bip49: {
		default: true,
		permissions: ["read", "write"],
	},
	bip84: {
		default: true,
		permissions: ["read", "write"],
	},
	publicKey: {
		default: false,
		permissions: ["read"],
	},
};

export const featureFlags: Coins.NetworkManifestFeatureFlags = {
	Client: ["transaction", "wallet", "broadcast"],
	Fee: ["all"],
	Identity: [
		"address.mnemonic.bip39",
		"address.mnemonic.bip44",
		"address.mnemonic.bip49",
		"address.mnemonic.bip84",
		"address.privateKey",
		"address.publicKey",
		"address.validate",
		"address.wif",
		"keyPair.mnemonic.bip39",
		"keyPair.mnemonic.bip44",
		"keyPair.mnemonic.bip49",
		"keyPair.mnemonic.bip84",
		"keyPair.privateKey",
		"keyPair.wif",
		"privateKey.mnemonic.bip39",
		"privateKey.mnemonic.bip44",
		"privateKey.mnemonic.bip49",
		"privateKey.mnemonic.bip84",
		"privateKey.wif",
		"publicKey.mnemonic.bip39",
		"publicKey.mnemonic.bip44",
		"publicKey.mnemonic.bip49",
		"publicKey.mnemonic.bip84",
		"publicKey.wif",
		"wif.mnemonic.bip39",
		"wif.mnemonic.bip44",
		"wif.mnemonic.bip49",
		"wif.mnemonic.bip84",
	],
	Link: ["block", "transaction", "wallet"],
	Message: ["sign", "verify"],
	Transaction: ["transfer"],
};
