export interface MultiSignature {
	publicKeys: string[];
	min: number;
}
export declare class MultiSignatureSignatory {
	#private;
	constructor(signature: MultiSignature, identifier?: string);
	signingList(): MultiSignature;
	identifier(): string | undefined;
}
