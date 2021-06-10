"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySignatures = exports.getBaseTransactionId = void 0;
const crypto_1 = require("@arkecosystem/crypto");
// Get base transaction id without signatures
const getBaseTransactionId = (transaction) =>
	crypto_1.Transactions.Utils.getId({
		...transaction,
		signature: undefined,
		signatures: [],
	});
exports.getBaseTransactionId = getBaseTransactionId;
// Verifies that all signatures are valid
const verifySignatures = (transaction, multiSignature) => {
	const { publicKeys } = multiSignature;
	const { signatures } = transaction;
	if (!signatures || !signatures.length) {
		return false;
	}
	const hash = crypto_1.Transactions.Utils.toHash(transaction, {
		excludeSignature: true,
		excludeSecondSignature: true,
		excludeMultiSignature: true,
	});
	for (const signature of signatures) {
		const publicKeyIndex = parseInt(signature.slice(0, 2), 16);
		const partialSignature = signature.slice(2, 130);
		const publicKey = publicKeys[publicKeyIndex];
		if (!crypto_1.Crypto.Hash.verifySchnorr(hash, partialSignature, publicKey)) {
			return false;
		}
	}
	return true;
};
exports.verifySignatures = verifySignatures;
//# sourceMappingURL=crypto.js.map
