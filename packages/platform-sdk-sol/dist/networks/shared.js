"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.explorer = exports.featureFlags = exports.importMethods = exports.transactions = void 0;
exports.transactions = {
	expirationType: "height",
	types: ["transfer"],
	fees: {
		type: "dynamic",
		ticker: "SOL",
	},
	memo: true,
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
};
exports.featureFlags = {
	Client: ["wallet", "broadcast"],
	Identity: [
		"address.mnemonic.bip44",
		"address.privateKey",
		"address.publicKey",
		"address.validate",
		"keyPair.mnemonic.bip44",
		"keyPair.privateKey",
		"privateKey.mnemonic.bip44",
		"publicKey.mnemonic.bip44",
	],
	Link: ["block", "transaction", "wallet"],
	Transaction: ["transfer"],
};
exports.explorer = {
	block: "block/{0}",
	transaction: "tx/{0}",
	wallet: "address/{0}",
};
//# sourceMappingURL=shared.js.map
