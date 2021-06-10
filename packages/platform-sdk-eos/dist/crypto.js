"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.sign = exports.privateToPublic = void 0;
const eosjs_jssig_1 = require("eosjs/dist/eosjs-jssig");
const privateToPublic = (mnemonic) => eosjs_jssig_1.PrivateKey.fromString(mnemonic).getPublicKey().toLegacyString();
exports.privateToPublic = privateToPublic;
const sign = (data, privateKey) => eosjs_jssig_1.PrivateKey.fromString(privateKey).sign(data, true, "utf8").toString();
exports.sign = sign;
const verify = (signature, data, publicKey) =>
	eosjs_jssig_1.Signature.fromString(signature).verify(
		data,
		eosjs_jssig_1.PublicKey.fromString(publicKey),
		true,
		"utf8",
	);
exports.verify = verify;
//# sourceMappingURL=crypto.js.map
