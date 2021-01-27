export interface LedgerOptions {
	transport: LedgerTransport;
}

// TODO: create a proper contract for this
export type LedgerTransport = any;

export interface LedgerService {
	destruct(): Promise<void>;

	connect(transport: LedgerTransport): Promise<void>;

	disconnect(): Promise<void>;

	getVersion(): Promise<string>;

	getPublicKey(path: string): Promise<string>;

	signTransaction(path: string, payload: Buffer): Promise<string>;

	signMessage(path: string, payload: Buffer): Promise<string>;
}
