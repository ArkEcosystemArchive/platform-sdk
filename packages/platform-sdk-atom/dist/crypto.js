"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSignedTransactionData = void 0;
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const platform_sdk_intl_1 = require("@arkecosystem/platform-sdk-intl");
const bcrypto_1 = require("bcrypto");
const hash_1 = require("./hash");
const sortObject = (obj) => {
	if (obj === null) {
		return null;
	}
	if (typeof obj !== "object") {
		return obj;
	}
	if (Array.isArray(obj)) {
		return obj.map(sortObject);
	}
	const sortedKeys = Object.keys(obj).sort();
	const result = {};
	for (const key of sortedKeys) {
		result[key] = sortObject(obj[key]);
	}
	return result;
};
const createSignedTransactionData = (stdSignMsg, keyPair) => {
	const privateKey = platform_sdk_crypto_1.Buffoon.fromHex(keyPair.privateKey);
	return {
		msg: stdSignMsg.msgs,
		fee: stdSignMsg.fee,
		signatures: [
			{
				signature: bcrypto_1.secp256k1
					.sign(hash_1.HashAlgorithms.sha256(JSON.stringify(sortObject(stdSignMsg))), privateKey)
					.toString("base64"),
				account_number: stdSignMsg.account_number,
				sequence: stdSignMsg.sequence,
				pub_key: {
					type: "tendermint/PubKeySecp256k1",
					value: platform_sdk_crypto_1.Buffoon.toBase64(bcrypto_1.secp256k1.publicKeyCreate(privateKey)),
				},
			},
		],
		memo: stdSignMsg.memo,
		timestamp: platform_sdk_intl_1.DateTime.make(),
	};
};
exports.createSignedTransactionData = createSignedTransactionData;
//# sourceMappingURL=crypto.js.map
