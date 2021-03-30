import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

/** @inheritdoc */
export class MultiSignatureService implements Contracts.MultiSignatureService {
	/**
	 * Creates an instance of MultiSignatureService.
	 *
	 * @static
	 * @param {Coins.Config} config
	 * @returns {Promise<MultiSignatureService>}
	 * @memberof MultiSignatureService
	 */
	public static async __construct(config: Coins.Config): Promise<MultiSignatureService> {
		return new MultiSignatureService();
	}

	/** @inheritdoc */
	public async __destruct(): Promise<void> {
		//
	}

	/** @inheritdoc */
	public async allWithPendingState(publicKey: string): Promise<Contracts.MultiSignatureTransaction[]> {
		throw new Exceptions.NotImplemented(this.constructor.name, "allWithPendingState");
	}

	/** @inheritdoc */
	public async allWithReadyState(publicKey: string): Promise<Contracts.MultiSignatureTransaction[]> {
		throw new Exceptions.NotImplemented(this.constructor.name, "allWithReadyState");
	}

	/** @inheritdoc */
	public async findById(id: string): Promise<Contracts.MultiSignatureTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "findById");
	}

	/** @inheritdoc */
	public async broadcast(transaction: Contracts.MultiSignatureTransaction): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "broadcast");
	}

	/** @inheritdoc */
	public isMultiSignatureReady(transaction: Contracts.SignedTransactionData, excludeFinal?: boolean): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "isMultiSignatureReady");
	}

	/** @inheritdoc */
	public needsSignatures(transaction: Contracts.SignedTransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "needsSignatures");
	}

	/** @inheritdoc */
	public needsAllSignatures(transaction: Contracts.SignedTransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "needsAllSignatures");
	}

	/** @inheritdoc */
	public needsWalletSignature(transaction: Contracts.SignedTransactionData, publicKey: string): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "needsWalletSignature");
	}

	/** @inheritdoc */
	public needsFinalSignature(transaction: Contracts.SignedTransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "needsFinalSignature");
	}

	/** @inheritdoc */
	public getValidMultiSignatures(transaction: Contracts.SignedTransactionData): string[] {
		throw new Exceptions.NotImplemented(this.constructor.name, "getValidMultiSignatures");
	}

	/** @inheritdoc */
	public remainingSignatureCount(transaction: Contracts.SignedTransactionData): number {
		throw new Exceptions.NotImplemented(this.constructor.name, "remainingSignatureCount");
	}
}
