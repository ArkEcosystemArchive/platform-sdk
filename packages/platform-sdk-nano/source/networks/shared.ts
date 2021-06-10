import { Networks } from "@arkecosystem/platform-sdk";

export const transactions: Networks.NetworkManifestTransactions = {
	expirationType: "height",
	types: ["transfer"],
	fees: {
		type: "free",
		ticker: "NANO",
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
	Client: [
		"transaction",
		"transactions",
		"wallet",
		"wallets",
		"delegate",
		"delegates",
		"votes",
		"voters",
		"fees",
		"broadcast",
	],
	Address: ["mnemonic.bip44", "privateKey", "publicKey", "validate"],
	KeyPair: ["mnemonic.bip44"],
	PrivateKey: ["mnemonic.bip44"],
	PublicKey: ["mnemonic.bip44"],
	WIF: ["mnemonic.bip44"],
	Message: ["sign", "verify"],
	Transaction: ["transfer"],
};

export const explorer: Networks.NetworkManifestExplorer = {
	block: "explorer/block/{0}",
	transaction: "explorer/block/{0}",
	wallet: "explorer/account/{0}",
};
