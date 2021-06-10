"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.explorer = exports.featureFlags = exports.importMethods = exports.transactions = void 0;
exports.transactions = {
	expirationType: "height",
	types: ["transfer"],
	fees: {
		type: "free",
		ticker: "XRP",
	},
};
exports.importMethods = {
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
exports.featureFlags = {
	Client: ["transaction", "transactions", "wallet", "broadcast"],
	Identity: [
		"address.mnemonic.bip44",
		"address.publicKey",
		"address.secret",
		"address.validate",
		"keyPair.mnemonic.bip44",
		"keyPair.secret",
		"privateKey.mnemonic.bip44",
		"privateKey.secret",
		"publicKey.mnemonic.bip44",
		"publicKey.secret",
		"wif.mnemonic.bip44",
		"wif.secret",
	],
	Link: ["block", "transaction", "wallet"],
	Message: ["sign", "verify"],
	Transaction: ["transfer"],
};
exports.explorer = {
	block: "ledgers/{0}",
	transaction: "transactions/{0}",
	wallet: "accounts/{0}",
};
//# sourceMappingURL=shared.js.map
