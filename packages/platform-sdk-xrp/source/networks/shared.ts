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
	Address: [
		"address.mnemonic.bip44",
		"address.publicKey",
		"address.secret",
		"address.validate",
	],
	KeyPair: [
		"keyPair.mnemonic.bip44",
		"keyPair.secret",
	],
	PrivateKey: [
		"privateKey.mnemonic.bip44",
		"privateKey.secret",
	],
	PublicKey: [
		"publicKey.mnemonic.bip44",
		"publicKey.secret",
	],
	WIF: [
		"wif.mnemonic.bip44",
		"wif.secret",
	],
	Message: ["sign", "verify"],
	Transaction: ["transfer"],
};

export const explorer: Networks.NetworkManifestExplorer = {
	block: "ledgers/{0}",
	transaction: "transactions/{0}",
	wallet: "accounts/{0}",
};
