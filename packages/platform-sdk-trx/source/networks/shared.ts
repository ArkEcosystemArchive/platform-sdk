import { Networks } from "@arkecosystem/platform-sdk";

export const transactions: Networks.NetworkManifestTransactions = {
	expirationType: "height",
	types: ["transfer"],
	fees: {
		type: "free",
		ticker: "TRX",
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
	Client: ["transaction", "wallet", "broadcast"],
	Address: [
		"mnemonic.bip44",
		"address.multiSignature",
		"privateKey",
		"publicKey",
		"validate",
		"wif",
	],
	KeyPair: [
		"mnemonic.bip44",
		"privateKey",
		"wif",
	],
	PrivateKey: [
		"mnemonic.bip44",
		"wif",
	],
	PublicKey: [
		"mnemonic.bip44",
		"publicKey.multiSignature",
		"wif",
	],
	WIF: [
		"mnemonic.bip44",
	],
	Message: ["sign", "verify"],
	Transaction: ["transfer"],
};

export const explorer: Networks.NetworkManifestExplorer = {
	block: "block/{0}",
	transaction: "transaction/{0}",
	wallet: "address/{0}",
};
