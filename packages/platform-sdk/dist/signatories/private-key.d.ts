export declare class PrivateKeySignatory {
	#private;
	constructor({ signingKey, address }: { signingKey: string; address: string });
	signingKey(): string;
	address(): string;
	privateKey(): string;
}
