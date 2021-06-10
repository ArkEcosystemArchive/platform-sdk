import { Buffoon } from "@arkecosystem/platform-sdk-crypto";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { secp256k1 } from "bcrypto";

import { HashAlgorithms } from "./hash";

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

export const createSignedTransactionData = (stdSignMsg, keyPair) => {
	const privateKey: Buffer = Buffoon.fromHex(privateKey);

	return {
		msg: stdSignMsg.msgs,
		fee: stdSignMsg.fee,
		signatures: [
			{
				signature: secp256k1
					.sign(HashAlgorithms.sha256(JSON.stringify(sortObject(stdSignMsg))), privateKey)
					.toString("base64"),
				account_number: stdSignMsg.account_number,
				sequence: stdSignMsg.sequence,
				pub_key: {
					type: "tendermint/PubKeySecp256k1",
					value: Buffoon.toBase64(secp256k1.publicKeyCreate(privateKey)),
				},
			},
		],
		memo: stdSignMsg.memo,
		timestamp: DateTime.make(),
	};
};
