export type MultiSignatureTransaction = Record<string, any>;

export interface MultiSignatureService {
	destruct(): Promise<void>;

	all(publicKey: string, state?: string): Promise<any[]>;

	findById(id: string): Promise<MultiSignatureTransaction>;

	broadcast(transaction: MultiSignatureTransaction): Promise<string>;
}
