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
	Identity: [
		"address.mnemonic.bip44",
		"address.multiSignature",
		"address.privateKey",
		"address.publicKey",
		"address.validate",
		"address.wif",
		"keyPair.mnemonic.bip44",
		"keyPair.privateKey",
		"keyPair.wif",
		"privateKey.mnemonic.bip44",
		"privateKey.wif",
		"publicKey.mnemonic.bip44",
		"publicKey.multiSignature",
		"publicKey.wif",
		"wif.mnemonic.bip44",
	],
	Link: ["block", "transaction", "wallet"],
	Message: ["sign", "verify"],
	Transaction: ["transfer"],
};

export const explorer: Networks.NetworkManifestExplorer = {
	block: "block/{0}",
	transaction: "transaction/{0}",
	wallet: "address/{0}",
};
