import { Networks } from "@arkecosystem/platform-sdk";

export const transactions: Networks.NetworkManifestTransactions = {
	expirationType: "height",
	types: ["delegate-registration", "second-signature", "transfer", "vote"],
	fees: {
		type: "static",
		ticker: "LSK",
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
	Client: ["transaction", "transactions", "wallet", "wallets", "delegate", "delegates", "broadcast"],
	Fee: ["all"],
	Identity: [
		"address.mnemonic.bip39",
		"address.publicKey",
		"address.validate",
		"keyPair.mnemonic.bip39",
		"privateKey.mnemonic.bip39",
		"publicKey.mnemonic.bip39",
	],
	Ledger: ["getVersion", "getPublicKey", "signTransaction", "signMessage"],
	Link: ["block", "transaction", "wallet"],
	Message: ["sign", "verify"],
	Transaction: [
		"delegateRegistration",
		"multiSignature",
		"secondSignature",
		"transfer.ledgerS",
		"transfer.ledgerX",
		"transfer",
		"vote",
	],
};

export const explorer: Networks.NetworkManifestExplorer = {
	block: "block/{0}",
	transaction: "tx/{0}",
	wallet: "address/{0}",
};
