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
	Address: ["mnemonic.bip39", "publicKey", "validate"],
	KeyPair: ["mnemonic.bip39"],
	PrivateKey: ["mnemonic.bip39"],
	PublicKey: ["mnemonic.bip39"],
	Ledger: ["getVersion", "getPublicKey", "signTransaction", "signMessage"],
	Message: ["sign", "verify"],
	Transaction: [
		"delegateRegistration",
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
