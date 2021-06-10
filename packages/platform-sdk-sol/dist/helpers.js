"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.derivePublicKey = exports.derivePrivateKey = void 0;
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const ed25519_hd_key_1 = require("ed25519-hd-key");
const derivePrivateKey = (mnemonic, account, index, slip44) =>
	ed25519_hd_key_1.derivePath(
		`m/44'/${slip44}'/${account}'/${index}'`,
		platform_sdk_crypto_1.BIP39.toSeed(mnemonic).toString("hex"),
	).key;
exports.derivePrivateKey = derivePrivateKey;
const derivePublicKey = (privateKey) => ed25519_hd_key_1.getPublicKey(privateKey, false);
exports.derivePublicKey = derivePublicKey;
//# sourceMappingURL=helpers.js.map
