export interface LedgerOptions {
	transport: LedgerTransport;
}

export interface LedgerTransport {
	getVersion(): Promise<string>;

	getPublicKey(path: string): Promise<string>;

	signTransaction(path: string, payload: Buffer): Promise<string>;

	signTransactionWithSchnorr(path: string, payload: Buffer): Promise<string>;

	signMessage(path: string, payload: Buffer): Promise<string>;

	signMessageWithSchnorr(path: string, payload: Buffer): Promise<string>;
}

export interface LedgerService extends LedgerTransport {
	destruct(): Promise<void>;
}
