export declare abstract class AbstractDoubleSignatory {
	#private;
	constructor({
		signingKey,
		confirmKey,
		address,
		publicKey,
		privateKey,
	}: {
		signingKey: string;
		confirmKey: string;
		address: string;
		publicKey: string;
		privateKey: string;
	});
	signingKey(): string;
	confirmKey(): string;
	address(): string;
	publicKey(): string;
	privateKey(): string;
}
