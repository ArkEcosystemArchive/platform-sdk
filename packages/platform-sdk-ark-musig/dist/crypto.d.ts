import { Interfaces } from "@arkecosystem/crypto";
export declare const getBaseTransactionId: (transaction: Interfaces.ITransactionData) => string;
export declare const verifySignatures: (
	transaction: Interfaces.ITransactionData,
	multiSignature: Interfaces.IMultiSignatureAsset,
) => boolean;
