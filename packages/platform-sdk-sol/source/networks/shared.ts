import { Networks } from "@arkecosystem/platform-sdk";

export const transactions: Networks.NetworkManifestTransactions = {
	expirationType: "height",
	types: ["transfer"],
	fees: {
		type: "dynamic",
		ticker: "SOL",
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
	Client: ["wallet", "broadcast"],
	Address: [
		"address.mnemonic.bip44",
		"address.privateKey",
		"address.publicKey",
		"address.validate",
	],
	KeyPair: [
		"keyPair.mnemonic.bip44",
		"keyPair.privateKey",
	],
	PrivateKey: [
		"privateKey.mnemonic.bip44",
	],
	PublicKey: [
		"publicKey.mnemonic.bip44",
	],
	Transaction: ["transfer"],
};

export const explorer: Networks.NetworkManifestExplorer = {
	block: "block/{0}",
	transaction: "tx/{0}",
	wallet: "address/{0}",
};
