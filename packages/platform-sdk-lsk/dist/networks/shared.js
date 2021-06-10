"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.explorer = exports.featureFlags = exports.importMethods = exports.transactions = void 0;
exports.transactions = {
	expirationType: "height",
	types: ["delegate-registration", "second-signature", "transfer", "vote"],
	fees: {
		type: "static",
		ticker: "LSK",
	},
	memo: true,
};
exports.importMethods = {
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
exports.featureFlags = {
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
	Ledger: ["getVersion", "getPublicKey"],
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
exports.explorer = {
	block: "block/{0}",
	transaction: "tx/{0}",
	wallet: "address/{0}",
};
//# sourceMappingURL=shared.js.map
