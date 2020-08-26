import { SignedTransactionData } from "./data";

export type MultiSignatureTransaction = Record<string, any>;

export interface MultiSignatureService {
	destruct(): Promise<void>;

	all(publicKey: string, state?: string): Promise<any[]>;

	findById(id: string): Promise<MultiSignatureTransaction>;

	broadcast(transaction: MultiSignatureTransaction): Promise<string>;

	// Offline

	isMultiSignatureReady(transaction: SignedTransactionData, excludeFinal?: boolean): boolean;

	needsSignatures(transaction: SignedTransactionData): boolean;

	needsAllSignatures(transaction: SignedTransactionData): boolean;

	needsWalletSignature(transaction: SignedTransactionData, publicKey: string): boolean;

	needsFinalSignature(transaction: SignedTransactionData): boolean;

	getValidMultiSignatures(transaction: SignedTransactionData): string[];

	remainingSignatureCount(transaction: SignedTransactionData): number;
}
