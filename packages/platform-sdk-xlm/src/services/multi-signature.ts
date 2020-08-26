import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class MultiSignatureService implements Contracts.MultiSignatureService {
	readonly #config: Coins.Config;
	readonly #http: Contracts.HttpClient;

	private constructor(config: Coins.Config) {
		this.#config = config;
		this.#http = config.get<Contracts.HttpClient>("httpClient");
	}

	public static async construct(config: Coins.Config): Promise<MultiSignatureService> {
		return new MultiSignatureService(config);
	}

	public async destruct(): Promise<void> {
		//
	}

	public async allWithPendingState(publicKey: string): Promise<Contracts.MultiSignatureTransaction[]> {
		throw new Exceptions.NotImplemented(this.constructor.name, "allWithPendingState");
	}

	public async allWithReadyState(publicKey: string): Promise<Contracts.MultiSignatureTransaction[]> {
		throw new Exceptions.NotImplemented(this.constructor.name, "allWithReadyState");
	}

	public async findById(id: string): Promise<Contracts.MultiSignatureTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "findById");
	}

	public async broadcast(transaction: Contracts.MultiSignatureTransaction): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "broadcast");
	}

	public isMultiSignatureReady(transaction: Contracts.SignedTransactionData, excludeFinal?: boolean): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "isMultiSignatureReady");
	}

	public needsSignatures(transaction: Contracts.SignedTransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "needsSignatures");
	}

	public needsAllSignatures(transaction: Contracts.SignedTransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "needsAllSignatures");
	}

	public needsWalletSignature(transaction: Contracts.SignedTransactionData, publicKey: string): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "needsWalletSignature");
	}

	public needsFinalSignature(transaction: Contracts.SignedTransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "needsFinalSignature");
	}

	public getValidMultiSignatures(transaction: Contracts.SignedTransactionData): string[] {
		throw new Exceptions.NotImplemented(this.constructor.name, "getValidMultiSignatures");
	}

	public remainingSignatureCount(transaction: Contracts.SignedTransactionData): number {
		throw new Exceptions.NotImplemented(this.constructor.name, "remainingSignatureCount");
	}
}
