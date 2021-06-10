"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.explorer = exports.featureFlags = exports.importMethods = exports.transactions = void 0;
exports.transactions = {
	expirationType: "height",
	types: ["transfer"],
	fees: {
		type: "weight",
		ticker: "DOT",
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
	Client: ["wallet", "broadcast"],
	Identity: [
		"address.mnemonic.bip39",
		"address.validate",
		"keyPair.mnemonic.bip39",
		"privateKey.mnemonic.bip39",
		"publicKey.mnemonic.bip39",
		"wif.mnemonic.bip39",
	],
	Link: ["block", "transaction", "wallet"],
	Message: ["sign", "verify"],
	Transaction: ["transfer"],
};
exports.explorer = {
	block: "block/{0}",
	transaction: "tx/{0}",
	wallet: "address/{0}",
};
//# sourceMappingURL=shared.js.map
