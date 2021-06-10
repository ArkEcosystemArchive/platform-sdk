export declare class PrivateMultiSignatureSignatory {
	#private;
	constructor(signingKey: string, signingKeys: string[]);
	signingKey(): string;
	signingKeys(): string[];
}
