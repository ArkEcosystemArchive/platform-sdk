export interface LedgerOptions {
	transport: LedgerTransport;
}

export interface LedgerTransport {
	getVersion(): Promise<string>;

	getPublicKey(path: string): Promise<string>;

	signTransaction(path: string, hex: Buffer): Promise<string>;

	signMessage(path: string, hex: Buffer): Promise<string>;
}

export interface LedgerService extends LedgerTransport {
	destruct(): Promise<void>;
}
