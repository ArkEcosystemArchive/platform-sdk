import { Contracts, Services } from "@arkecosystem/platform-sdk";
export declare class MultiSignatureService extends Services.AbstractMultiSignatureService {
	#private;
	private readonly configRepository;
	private readonly httpClient;
	/** @inheritdoc */
	allWithPendingState(publicKey: string): Promise<Services.MultiSignatureTransaction[]>;
	/** @inheritdoc */
	allWithReadyState(publicKey: string): Promise<Services.MultiSignatureTransaction[]>;
	/** @inheritdoc */
	findById(id: string): Promise<Services.MultiSignatureTransaction>;
	/** @inheritdoc */
	broadcast(transaction: Services.MultiSignatureTransaction): Promise<string>;
	/** @inheritdoc */
	flush(): Promise<Services.MultiSignatureTransaction>;
	/** @inheritdoc */
	isMultiSignatureReady(transaction: Contracts.SignedTransactionData, excludeFinal?: boolean): boolean;
	/** @inheritdoc */
	needsSignatures(transaction: Contracts.SignedTransactionData): boolean;
	/** @inheritdoc */
	needsAllSignatures(transaction: Contracts.SignedTransactionData): boolean;
	/** @inheritdoc */
	needsWalletSignature(transaction: Contracts.SignedTransactionData, publicKey: string): boolean;
	/** @inheritdoc */
	needsFinalSignature(transaction: Contracts.SignedTransactionData): boolean;
	/** @inheritdoc */
	getValidMultiSignatures(transaction: Contracts.SignedTransactionData): string[];
	/** @inheritdoc */
	remainingSignatureCount(transaction: Contracts.SignedTransactionData): number;
}
