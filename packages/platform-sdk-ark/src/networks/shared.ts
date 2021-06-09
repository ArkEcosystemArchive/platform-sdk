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
	Client: [
		"transaction",
		"transactions",
		"wallet",
		"wallets",
		"delegate",
		"delegates",
		"votes",
		"voters",
		"configuration",
		"fees",
		"syncing",
		"broadcast",
	],
	Fee: ["all"],
	Identity: [
		"address.mnemonic.bip39",
		"address.multiSignature",
		"address.privateKey",
		"address.publicKey",
		"address.validate",
		"address.wif",
		"keyPair.mnemonic.bip39",
		"keyPair.privateKey",
		"keyPair.wif",
		"privateKey.mnemonic.bip39",
		"privateKey.wif",
		"publicKey.mnemonic.bip39",
		"publicKey.multiSignature",
		"publicKey.wif",
		"wif.mnemonic.bip39",
	],
	Ledger: ["getVersion", "getPublicKey", "signTransaction", "signMessage"],
	Link: ["block", "transaction", "wallet"],
	Message: ["sign", "verify"],
	Transaction: [
		"delegateRegistration",
		"delegateResignation",
		"ipfs.ledgerS",
		"ipfs.ledgerX",
		"ipfs.musig",
		"ipfs",
		"multiPayment.ledgerS",
		"multiPayment.ledgerX",
		"multiPayment.musig",
		"multiPayment",
		"multiSignature.ledgerS",
		"multiSignature.ledgerX",
		"multiSignature.musig",
		"multiSignature",
		"secondSignature",
		"transfer.ledgerS",
		"transfer.ledgerX",
		"transfer.musig",
		"transfer",
		"vote.ledgerS",
		"vote.ledgerX",
		"vote.musig",
		"vote",
	],
};

export const explorer: Networks.NetworkManifestExplorer = {
	block: "block/{0}",
	transaction: "transaction/{0}",
	wallet: "wallets/{0}",
};
