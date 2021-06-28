import { Networks } from "@arkecosystem/platform-sdk";

export const transactions: Networks.NetworkManifestTransactions = {
	expirationType: "height",
	types: [
		"delegate-registration",
		"delegate-resignation",
		"htlc-claim",
		"htlc-lock",
		"htlc-refund",
		"ipfs",
		"multi-payment",
		"multi-signature",
		"second-signature",
		"transfer",
		"vote",
	],
	fees: {
		type: "dynamic",
		ticker: "ARK",
	},
	memo: true,
	multiPaymentRecipients: 64,
};

export const importMethods: Networks.NetworkManifestImportMethods = {
	address: {
		default: false,
		permissions: ["read"],
	},
	bip39: {
		default: true,
		permissions: ["read", "write"],
		canBeEncrypted: true,
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
		"broadcast",
	],
	Fee: ["all"],
	Address: ["mnemonic.bip39", "multiSignature", "privateKey", "publicKey", "validate", "wif"],
	KeyPair: ["mnemonic.bip39", "privateKey", "wif"],
	PrivateKey: ["mnemonic.bip39", "wif"],
	PublicKey: ["mnemonic.bip39", "multiSignature", "wif"],
	WIF: ["mnemonic.bip39"],
	Ledger: ["getVersion", "getPublicKey", "signTransaction", "signMessage"],
	Message: ["sign", "verify"],
	Transaction: [
		"delegateRegistration",
		"delegateResignation",
		"htlcClaim",
		"htlcLock",
		"htlcRefund",
		"ipfs",
		"multiPayment",
		"multiSignature",
		"secondSignature",
		"transfer",
		"vote",
		"estimateExpiration",
	],
};

export const explorer: Networks.NetworkManifestExplorer = {
	block: "block/{0}",
	transaction: "transaction/{0}",
	wallet: "wallets/{0}",
};
