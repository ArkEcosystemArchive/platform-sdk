import { Crypto, Interfaces, Transactions } from "@arkecosystem/crypto";

// Get base transaction id without signatures
export const getBaseTransactionId = (transaction: Interfaces.ITransactionData): string => Transactions.Utils.getId({
	...transaction,
	signature: undefined,
	signatures: [],
});

// Verifies that all signatures are valid
export const verifySignatures = (
	transaction: Interfaces.ITransactionData,
	multiSignature: Interfaces.IMultiSignatureAsset,
): boolean => {
	const { publicKeys }: Interfaces.IMultiSignatureAsset = multiSignature;
	const { signatures }: Interfaces.ITransactionData = transaction;

	if (!signatures || !signatures.length) {
		return false;
	}

	const hash: Buffer = Transactions.Utils.toHash(transaction, {
		excludeSignature: true,
		excludeSecondSignature: true,
		excludeMultiSignature: true,
	});

	for (const signature of signatures) {
		const publicKeyIndex: number = parseInt(signature.slice(0, 2), 16);
		const partialSignature: string = signature.slice(2, 130);
		const publicKey: string = publicKeys[publicKeyIndex];

		if (!Crypto.Hash.verifySchnorr(hash, partialSignature, publicKey)) {
			return false;
		}
	}

	return true;
};
